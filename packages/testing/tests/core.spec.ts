import { assertFails, assertSucceeds } from "@firebase/rules-unit-testing"
import type { RulesTestEnvironment } from "@firebase/rules-unit-testing"
import { doc, getDoc, setDoc, deleteDoc } from "firebase/firestore"
import { getTestEnv, loadAcademicFixtures, TEST_USER_ID, academicFixtures } from "../utils.ts"

describe("Core Security (Ownership & Verification)", () => {
    let testEnv: RulesTestEnvironment

    before(async () => {
        testEnv = await getTestEnv()
    })
    beforeEach(async () => {
        await loadAcademicFixtures(testEnv)
    })
    after(async () => {
        await testEnv.clearFirestore()
    })

    it("allows users to read their own data", async () => {
        const db = testEnv.authenticatedContext(TEST_USER_ID, {
            email_verified: true
        }).firestore()

        await assertSucceeds(
            getDoc(doc(db, `users/${TEST_USER_ID}/academic/assignments`))
        )
    })

    it("prevents users from reading someone else's data", async () => {
        const db = testEnv.authenticatedContext(TEST_USER_ID, {
            email_verified: true
        }).firestore()

        await testEnv.withSecurityRulesDisabled(async (context) => {
            await context.firestore().doc("users/bob/academic/document").set({
                foo: "bar"
            })
        })

        await assertFails(
            getDoc(doc(db, "users/bob/academic/document"))
        )
    })

    it("prevents users from writing to someone else's data", async () => {
        const db = testEnv.authenticatedContext(TEST_USER_ID, {
            email_verified: true
        }).firestore()

        await assertFails(
            setDoc(doc(db, "users/bob/academic/assignments"), {
                foo: "bar"
            })
        )
    })

    it("prevents unverified users from writing data", async () => {
        const db = testEnv.authenticatedContext(TEST_USER_ID, {
            email_verified: false
        }).firestore()

        await assertFails(
            setDoc(doc(db, `users/${TEST_USER_ID}/academic/assignments`), {
                foo: "bar"
            })
        )
    })

    it("prevents unverified users from reading data", async () => {
        const db = testEnv.authenticatedContext(TEST_USER_ID, {
            email_verified: false
        }).firestore()

        await testEnv.withSecurityRulesDisabled(async (context) => {
            await context.firestore().doc(`users/${TEST_USER_ID}/academic/assignments`).set({
                foo: "bar"
            })
        })

        await assertFails(
            getDoc(doc(db, `users/${TEST_USER_ID}/academic/assignments`))
        )
    })

    it("prevents creation of documents with unauthorized names", async () => {
        const db = testEnv.authenticatedContext(TEST_USER_ID, {
            email_verified: true,
        }).firestore()

        await assertFails(
            setDoc(doc(db, `users/${TEST_USER_ID}/academic/random`), { foo: "bar" })
        )
    })

    describe("Document Deletion Protection (all documents under /users/{userId}/academic/{document})", () => {
        Object.keys(academicFixtures).forEach((docType) => {
            it(`allows updates but prevents deletion for: ${docType}`, async () => {
                const db = testEnv.authenticatedContext(TEST_USER_ID, {
                    email_verified: true,
                    premium: { academic: true }
                }).firestore()

                const docRef = doc(db, `users/${TEST_USER_ID}/academic/${docType}`)
                const payload = docType == "schedules"
                    ? { type: "alternating-ab" }
                    : docType == "settings"
                        ? { theme: "dark" }
                        : { items: [] }

                await assertSucceeds(
                    setDoc(docRef, payload, { merge: true })
                )
                await assertFails(
                    deleteDoc(docRef)
                )
            })
        })
    })
})
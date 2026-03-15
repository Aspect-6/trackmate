import { assertFails, assertSucceeds } from "@firebase/rules-unit-testing"
import { doc, setDoc, getDoc } from "firebase/firestore"
import type { RulesTestEnvironment } from "@firebase/rules-unit-testing"
import { getTestEnv, loadAcademicFixtures, TEST_USER_ID } from "../utils.ts"

describe("Premium Document Rules", () => {
    let testEnv: RulesTestEnvironment

    const premiumDocumentNames = [
        "assignments-premium",
        "assignments-premium-archive"
    ]

    before(async () => {
        testEnv = await getTestEnv()
    })
    beforeEach(async () => {
        await loadAcademicFixtures(testEnv)
    })
    after(async () => {
        await testEnv.clearFirestore()
    })

    // Premium items documents are written exclusively by the Cloud Function
    // (Admin SDK). All client writes are rejected by security rules,
    // regardless of premium status.

    describe("Client writes are always blocked", () => {
        it("rejects writes from standard users", async () => {
            const db = testEnv.authenticatedContext(TEST_USER_ID, {
                email_verified: true
            }).firestore()

            for (const docName of premiumDocumentNames) {
                await assertFails(
                    setDoc(doc(db, `users/${TEST_USER_ID}/academic/${docName}`), { items: [] })
                )
            }
        })

        it("rejects writes from premium users with { academic: true }", async () => {
            const db = testEnv.authenticatedContext(TEST_USER_ID, {
                email_verified: true,
                premium: { academic: true }
            }).firestore()

            for (const docName of premiumDocumentNames) {
                await assertFails(
                    setDoc(doc(db, `users/${TEST_USER_ID}/academic/${docName}`), { items: [] })
                )
            }
        })

        it("rejects writes from premium users with { all: true }", async () => {
            const db = testEnv.authenticatedContext(TEST_USER_ID, {
                email_verified: true,
                premium: { all: true }
            }).firestore()

            for (const docName of premiumDocumentNames) {
                await assertFails(
                    setDoc(doc(db, `users/${TEST_USER_ID}/academic/${docName}`), { items: [] })
                )
            }
        })
    })

    describe("Reads are allowed", () => {
        it("allows standard users to read premium docs", async () => {
            const db = testEnv.authenticatedContext(TEST_USER_ID, {
                email_verified: true
            }).firestore()

            for (const docName of premiumDocumentNames) {
                await assertSucceeds(
                    getDoc(doc(db, `users/${TEST_USER_ID}/academic/${docName}`))
                )
            }
        })

        it("allows premium users to read premium docs", async () => {
            const db = testEnv.authenticatedContext(TEST_USER_ID, {
                email_verified: true,
                premium: { academic: true }
            }).firestore()

            for (const docName of premiumDocumentNames) {
                await assertSucceeds(
                    getDoc(doc(db, `users/${TEST_USER_ID}/academic/${docName}`))
                )
            }
        })
    })
})

import { assertFails, assertSucceeds } from "@firebase/rules-unit-testing"
import { doc, setDoc, getDoc } from "firebase/firestore"
import type { RulesTestEnvironment } from "@firebase/rules-unit-testing"
import { getTestEnv, loadAcademicFixtures, TEST_USER_ID } from "../utils.ts"

describe("Premium Features", () => {
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

    it("prevents standard users from writing to premium docs", async () => {
        const db = testEnv.authenticatedContext(TEST_USER_ID, {
            email_verified: true
        }).firestore()

        for (const docName of premiumDocumentNames) {
            const targetDoc = `users/${TEST_USER_ID}/academic/${docName}`
            await assertFails(
                setDoc(doc(db, targetDoc), { items: [] })
            )
        }
    })

    it("allows users with { academic: true } to read & write premium docs", async () => {
        const db = testEnv.authenticatedContext(TEST_USER_ID, {
            email_verified: true,
            premium: { academic: true }
        }).firestore()

        for (const docName of premiumDocumentNames) {
            const targetDoc = `users/${TEST_USER_ID}/academic/${docName}`
            await assertSucceeds(getDoc(doc(db, targetDoc)))
            await assertSucceeds(setDoc(doc(db, targetDoc), { items: [] }))
        }
    })

    it("allows users with { all: true } to read & write premium docs", async () => {
        const db = testEnv.authenticatedContext(TEST_USER_ID, {
            email_verified: true,
            premium: { all: true }
        }).firestore()

        for (const docName of premiumDocumentNames) {
            const targetDoc = `users/${TEST_USER_ID}/academic/${docName}`
            await assertSucceeds(getDoc(doc(db, targetDoc)))
            await assertSucceeds(setDoc(doc(db, targetDoc), { items: [] }))
        }
    })
})
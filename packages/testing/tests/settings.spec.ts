import { assertFails, assertSucceeds } from "@firebase/rules-unit-testing"
import { doc, setDoc } from "firebase/firestore"
import type { RulesTestEnvironment } from "@firebase/rules-unit-testing"
import { getTestEnv, loadAcademicFixtures, TEST_USER_ID, academicFixtures } from "../utils.ts"

describe("Settings & Templates Restrictions", () => {
    let testEnv: RulesTestEnvironment
    const settingsPath = `users/${TEST_USER_ID}/academic/settings`

    before(async () => {
        testEnv = await getTestEnv()
    })
    beforeEach(async () => {
        await loadAcademicFixtures(testEnv)
    })
    after(async () => {
        await testEnv.clearFirestore()
    })

    it("allows standard users to update non-restricted settings", async () => {
        const db = testEnv.authenticatedContext(TEST_USER_ID, {
            email_verified: true
        }).firestore()

        const existingData = academicFixtures["settings"]
        const newData = { ...existingData, theme: "light" }

        await assertSucceeds(
            setDoc(doc(db, settingsPath), newData)
        )
    })

    it("prevents standard users from modifying assignmentTemplates", async () => {
        const db = testEnv.authenticatedContext(TEST_USER_ID, {
            email_verified: true
        }).firestore()

        const existingData = academicFixtures["settings"]
        const templates = [
            ...existingData.assignmentTemplates,
            { id: "foo", title: "bar" }
        ]
        const newData = { ...existingData, assignmentTemplates: templates }

        await assertFails(
            setDoc(doc(db, settingsPath), newData)
        )
    })

    it("prevents standard users from merging assignmentTemplates", async () => {
        const db = testEnv.authenticatedContext(TEST_USER_ID, {
            email_verified: true
        }).firestore()

        const existingData = academicFixtures["settings"]
        const templates = [
            ...existingData.assignmentTemplates,
            { id: "foo", title: "bar" }
        ]

        await assertFails(
            setDoc(doc(db, settingsPath), { assignmentTemplates: templates }, { merge: true })
        )
    })

    it("allows premium users to modify assignmentTemplates", async () => {
        const db = testEnv.authenticatedContext(TEST_USER_ID, {
            email_verified: true,
            premium: { academic: true }
        }).firestore()

        const existingData = academicFixtures["settings"]
        const newTemplates = [
            ...existingData.assignmentTemplates,
            { id: "foo", title: "bar" }
        ]
        const newData = { ...existingData, assignmentTemplates: newTemplates }

        await assertSucceeds(
            setDoc(doc(db, settingsPath), newData)
        )
    })

    it("allows standard users to create settings with empty assignmentTemplates", async () => {
        await testEnv.withSecurityRulesDisabled(async (context) => {
            await context.firestore().doc(settingsPath).delete()
        })

        const db = testEnv.authenticatedContext(TEST_USER_ID, {
            email_verified: true
        }).firestore()

        await assertSucceeds(
            setDoc(doc(db, settingsPath), {
                theme: "dark",
                termMode: "Semesters Only",
                assignmentTemplates: [],
                assignmentTypes: ["Homework"]
            })
        )
    })

    it("prevents standard users from creating settings document with populated assignmentTemplates", async () => {
        await testEnv.withSecurityRulesDisabled(async (context) => {
            await context.firestore().doc(settingsPath).delete()
        })

        const db = testEnv.authenticatedContext(TEST_USER_ID, {
            email_verified: true
        }).firestore()

        await assertFails(
            setDoc(doc(db, settingsPath), {
                theme: "dark",
                termMode: "Semesters Only",
                assignmentTemplates: [{ templateName: "foo" }],
                assignmentTypes: ["Homework"]
            })
        )
    })
})
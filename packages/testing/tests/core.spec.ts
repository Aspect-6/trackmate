import { assertFails, assertSucceeds } from "@firebase/rules-unit-testing"
import type { RulesTestEnvironment } from "@firebase/rules-unit-testing"
import { doc, getDoc, setDoc, deleteDoc } from "firebase/firestore"
import { getTestEnv, loadAcademicFixtures, TEST_USER_ID, academicFixtures } from "../utils.ts"

const singleObjectDocs = ["settings", "schedules"]
const itemsDocs = Object.keys(academicFixtures).filter(d => !singleObjectDocs.includes(d))

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
            setDoc(doc(db, "users/bob/academic/settings"), {
                theme: "dark",
                termMode: "Semesters Only",
                templates: [],
                assignmentTypes: ["Homework"],
                periodCount: 4,
            })
        )
    })

    it("prevents unverified users from writing data", async () => {
        const db = testEnv.authenticatedContext(TEST_USER_ID, {
            email_verified: false
        }).firestore()

        await assertFails(
            setDoc(doc(db, `users/${TEST_USER_ID}/academic/settings`), {
                theme: "dark",
                termMode: "Semesters Only",
                templates: [],
                assignmentTypes: ["Homework"],
                periodCount: 4,
            })
        )
    })

    it("prevents unverified users from reading data", async () => {
        const db = testEnv.authenticatedContext(TEST_USER_ID, {
            email_verified: false
        }).firestore()

        await testEnv.withSecurityRulesDisabled(async (context) => {
            await context.firestore().doc(`users/${TEST_USER_ID}/academic/assignments`).set({
                items: []
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
            setDoc(doc(db, `users/${TEST_USER_ID}/academic/foo`), {
                items: []
            })
        )
    })

    // Items documents can only be written by the Cloud Function (Admin SDK).
    // Client writes to items documents are always rejected by security rules.
    describe("Items Document Write Protection", () => {
        itemsDocs.forEach((docType) => {
            it(`rejects client writes to: ${docType}`, async () => {
                const db = testEnv.authenticatedContext(TEST_USER_ID, {
                    email_verified: true,
                    premium: { academic: true }
                }).firestore()

                await assertFails(
                    setDoc(doc(db, `users/${TEST_USER_ID}/academic/${docType}`), { items: [] })
                )
            })
        })
    })

    describe("Single-Object Document Writes", () => {
        it("allows client writes to settings", async () => {
            const db = testEnv.authenticatedContext(TEST_USER_ID, {
                email_verified: true,
                premium: { academic: true }
            }).firestore()

            await assertSucceeds(
                setDoc(doc(db, `users/${TEST_USER_ID}/academic/settings`), {
                    theme: "dark",
                    termMode: "Semesters Only",
                    templates: [],
                    assignmentTypes: ["Homework"],
                    periodCount: 4,
                })
            )
        })

        it("allows client writes to schedules", async () => {
            const db = testEnv.authenticatedContext(TEST_USER_ID, {
                email_verified: true
            }).firestore()

            await assertSucceeds(
                setDoc(doc(db, `users/${TEST_USER_ID}/academic/schedules`), {
                    "alternating-ab": { termConfigs: {}, terms: {} },
                    "alternating-ab-semester": { termConfigs: {}, terms: {} },
                    "semester": { terms: {} },
                    "fixed-weekly": { terms: {} },
                })
            )
        })
    })

    describe("Document Deletion Protection", () => {
        Object.keys(academicFixtures).forEach((docType) => {
            it(`prevents deletion for: ${docType}`, async () => {
                const db = testEnv.authenticatedContext(TEST_USER_ID, {
                    email_verified: true,
                    premium: { academic: true }
                }).firestore()

                await assertFails(
                    deleteDoc(doc(db, `users/${TEST_USER_ID}/academic/${docType}`))
                )
            })
        })
    })

    describe("Unauthenticated Access", () => {
        it("prevents unauthenticated reads", async () => {
            const db = testEnv.unauthenticatedContext().firestore()
            await assertFails(
                getDoc(doc(db, `users/${TEST_USER_ID}/academic/assignments`))
            )
        })

        it("prevents unauthenticated writes", async () => {
            const db = testEnv.unauthenticatedContext().firestore()
            await assertFails(
                setDoc(doc(db, `users/${TEST_USER_ID}/academic/assignments`), { items: [] })
            )
        })
    })

    describe("Missing email_verified claim", () => {
        it("prevents users with no email_verified claim from reading", async () => {
            const db = testEnv.authenticatedContext(TEST_USER_ID, {}).firestore()
            await assertFails(
                getDoc(doc(db, `users/${TEST_USER_ID}/academic/assignments`))
            )
        })

        it("prevents users with no email_verified claim from writing", async () => {
            const db = testEnv.authenticatedContext(TEST_USER_ID, {}).firestore()
            await assertFails(
                setDoc(doc(db, `users/${TEST_USER_ID}/academic/settings`), {
                    theme: "dark",
                    termMode: "Semesters Only",
                    templates: [],
                    assignmentTypes: ["Homework"],
                    periodCount: 4,
                })
            )
        })
    })

    describe("Writes outside matched path", () => {
        it("denies writes to paths outside the academic collection", async () => {
            const db = testEnv.authenticatedContext(TEST_USER_ID, {
                email_verified: true
            }).firestore()
            await assertFails(
                setDoc(doc(db, `users/${TEST_USER_ID}/foo/bar`), { foo: "bar" })
            )
        })

        it("denies reads to paths outside the academic collection", async () => {
            const db = testEnv.authenticatedContext(TEST_USER_ID, {
                email_verified: true
            }).firestore()
            await assertFails(
                getDoc(doc(db, `users/${TEST_USER_ID}/foo/bar`))
            )
        })
    })
})
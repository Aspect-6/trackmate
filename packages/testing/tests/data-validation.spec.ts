import { assertFails, assertSucceeds } from "@firebase/rules-unit-testing"
import type { RulesTestEnvironment } from "@firebase/rules-unit-testing"
import { doc, setDoc } from "firebase/firestore"
import { getTestEnv, loadAcademicFixtures, TEST_USER_ID } from "../utils.ts"

const validSettings = {
    theme: "dark",
    termMode: "Semesters Only",
    templates: [{ templateName: "Template 1" }],
    assignmentTypes: ["Homework"],
}

const validSchedules = {
    type: "alternating-ab",
    "alternating-ab": {
        termConfigs: {},
        terms: {},
    },
}

const validListDoc = { items: [] }

describe("Data Validation (hasValidShape)", () => {
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

    describe("settings document", () => {
        it("accepts a valid settings payload", async () => {
            const db = testEnv.authenticatedContext(TEST_USER_ID, {
                email_verified: true, premium: { academic: true },
            }).firestore()
            await assertSucceeds(
                setDoc(doc(db, `users/${TEST_USER_ID}/academic/settings`), validSettings)
            )
        })

        it("accepts theme = 'light'", async () => {
            const db = testEnv.authenticatedContext(TEST_USER_ID, {
                email_verified: true, premium: { academic: true },
            }).firestore()
            await assertSucceeds(
                setDoc(doc(db, `users/${TEST_USER_ID}/academic/settings`), { ...validSettings, theme: "light" })
            )
        })

        it("accepts termMode = 'Semesters With Quarters'", async () => {
            const db = testEnv.authenticatedContext(TEST_USER_ID, {
                email_verified: true, premium: { academic: true },
            }).firestore()
            await assertSucceeds(
                setDoc(doc(db, `users/${TEST_USER_ID}/academic/settings`), { ...validSettings, termMode: "Semesters With Quarters" })
            )
        })

        it("rejects an invalid theme value", async () => {
            const db = testEnv.authenticatedContext(TEST_USER_ID, {
                email_verified: true, premium: { academic: true },
            }).firestore()
            await assertSucceeds(setDoc(doc(db, `users/${TEST_USER_ID}/academic/settings`), validSettings))

            await assertFails(
                setDoc(doc(db, `users/${TEST_USER_ID}/academic/settings`), { ...validSettings, theme: "foo" })
            )
        })

        it("rejects an invalid termMode value", async () => {
            const db = testEnv.authenticatedContext(TEST_USER_ID, {
                email_verified: true, premium: { academic: true },
            }).firestore()
            await assertSucceeds(setDoc(doc(db, `users/${TEST_USER_ID}/academic/settings`), validSettings))

            await assertFails(
                setDoc(doc(db, `users/${TEST_USER_ID}/academic/settings`), { ...validSettings, termMode: "foo" })
            )
        })

        it("rejects a missing required field (theme)", async () => {
            const db = testEnv.authenticatedContext(TEST_USER_ID, {
                email_verified: true, premium: { academic: true },
            }).firestore()
            await assertSucceeds(setDoc(doc(db, `users/${TEST_USER_ID}/academic/settings`), validSettings))

            const { theme: _, ...noTheme } = validSettings
            await assertFails(
                setDoc(doc(db, `users/${TEST_USER_ID}/academic/settings`), noTheme)
            )
        })

        it("rejects a missing required field (termMode)", async () => {
            const db = testEnv.authenticatedContext(TEST_USER_ID, {
                email_verified: true, premium: { academic: true },
            }).firestore()
            await assertSucceeds(setDoc(doc(db, `users/${TEST_USER_ID}/academic/settings`), validSettings))

            const { termMode: _, ...noTermMode } = validSettings
            await assertFails(
                setDoc(doc(db, `users/${TEST_USER_ID}/academic/settings`), noTermMode)
            )
        })

        it("rejects a missing required field (templates)", async () => {
            const db = testEnv.authenticatedContext(TEST_USER_ID, {
                email_verified: true, premium: { academic: true },
            }).firestore()
            await assertSucceeds(setDoc(doc(db, `users/${TEST_USER_ID}/academic/settings`), validSettings))

            const { templates: _, ...noTemplates } = validSettings
            await assertFails(
                setDoc(doc(db, `users/${TEST_USER_ID}/academic/settings`), noTemplates)
            )
        })

        it("rejects a missing required field (assignmentTypes)", async () => {
            const db = testEnv.authenticatedContext(TEST_USER_ID, {
                email_verified: true, premium: { academic: true },
            }).firestore()
            await assertSucceeds(setDoc(doc(db, `users/${TEST_USER_ID}/academic/settings`), validSettings))

            const { assignmentTypes: _, ...noTypes } = validSettings
            await assertFails(
                setDoc(doc(db, `users/${TEST_USER_ID}/academic/settings`), noTypes)
            )
        })

        it("rejects extra fields on settings", async () => {
            const db = testEnv.authenticatedContext(TEST_USER_ID, {
                email_verified: true, premium: { academic: true },
            }).firestore()
            await assertSucceeds(setDoc(doc(db, `users/${TEST_USER_ID}/academic/settings`), validSettings))

            await assertFails(
                setDoc(doc(db, `users/${TEST_USER_ID}/academic/settings`), { ...validSettings, foo: "bar" })
            )
        })

        it("rejects empty assignmentTypes list", async () => {
            const db = testEnv.authenticatedContext(TEST_USER_ID, {
                email_verified: true, premium: { academic: true },
            }).firestore()
            await assertSucceeds(setDoc(doc(db, `users/${TEST_USER_ID}/academic/settings`), validSettings))

            await assertFails(
                setDoc(doc(db, `users/${TEST_USER_ID}/academic/settings`), { ...validSettings, assignmentTypes: [] })
            )
        })
    })

    // ── Schedules ───────────────────────────────────────────────────────
    describe("schedules document", () => {
        it("accepts a valid schedules payload", async () => {
            const db = testEnv.authenticatedContext(TEST_USER_ID, {
                email_verified: true, premium: { academic: true },
            }).firestore()
            await assertSucceeds(
                setDoc(doc(db, `users/${TEST_USER_ID}/academic/schedules`), validSchedules)
            )
        })

        it("rejects an invalid schedule type", async () => {
            const db = testEnv.authenticatedContext(TEST_USER_ID, {
                email_verified: true, premium: { academic: true },
            }).firestore()
            await assertSucceeds(setDoc(doc(db, `users/${TEST_USER_ID}/academic/schedules`), validSchedules))

            await assertFails(
                setDoc(doc(db, `users/${TEST_USER_ID}/academic/schedules`), { ...validSchedules, type: "weekly" })
            )
        })

        it("rejects a missing required field (type)", async () => {
            const db = testEnv.authenticatedContext(TEST_USER_ID, {
                email_verified: true, premium: { academic: true },
            }).firestore()
            await assertSucceeds(setDoc(doc(db, `users/${TEST_USER_ID}/academic/schedules`), validSchedules))

            const { type: _, ...noType } = validSchedules
            await assertFails(
                setDoc(doc(db, `users/${TEST_USER_ID}/academic/schedules`), noType)
            )
        })

        it("rejects a missing required field (alternating-ab)", async () => {
            const db = testEnv.authenticatedContext(TEST_USER_ID, {
                email_verified: true, premium: { academic: true },
            }).firestore()
            await assertSucceeds(setDoc(doc(db, `users/${TEST_USER_ID}/academic/schedules`), validSchedules))

            await assertFails(
                setDoc(doc(db, `users/${TEST_USER_ID}/academic/schedules`), { type: "alternating-ab" })
            )
        })

        it("rejects extra fields on schedules", async () => {
            const db = testEnv.authenticatedContext(TEST_USER_ID, {
                email_verified: true, premium: { academic: true },
            }).firestore()
            await assertSucceeds(setDoc(doc(db, `users/${TEST_USER_ID}/academic/schedules`), validSchedules))

            await assertFails(
                setDoc(doc(db, `users/${TEST_USER_ID}/academic/schedules`), { ...validSchedules, foo: "bar" })
            )
        })

        it("rejects non-map termConfigs", async () => {
            const db = testEnv.authenticatedContext(TEST_USER_ID, {
                email_verified: true, premium: { academic: true },
            }).firestore()
            await assertSucceeds(setDoc(doc(db, `users/${TEST_USER_ID}/academic/schedules`), validSchedules))

            await assertFails(
                setDoc(doc(db, `users/${TEST_USER_ID}/academic/schedules`), {
                    type: "alternating-ab",
                    "alternating-ab": { termConfigs: "foo", terms: {} },
                })
            )
        })

        it("rejects non-map terms", async () => {
            const db = testEnv.authenticatedContext(TEST_USER_ID, {
                email_verified: true, premium: { academic: true },
            }).firestore()
            await assertSucceeds(setDoc(doc(db, `users/${TEST_USER_ID}/academic/schedules`), validSchedules))

            await assertFails(
                setDoc(doc(db, `users/${TEST_USER_ID}/academic/schedules`), {
                    type: "alternating-ab",
                    "alternating-ab": { termConfigs: {}, terms: "foo" },
                })
            )
        })
    })

    describe("List-Based Documents", () => {
        const listDocTypes = [
            "assignments", "assignments-archive", "assignments-premium",
            "assignments-premium-archive", "classes", "events",
            "events-archive", "noSchool", "terms",
        ]

        listDocTypes.forEach((docType) => {
            describe(docType, () => {
                it(`accepts a valid { items: [] } payload`, async () => {
                    const db = testEnv.authenticatedContext(TEST_USER_ID, {
                        email_verified: true, premium: { academic: true },
                    }).firestore()

                    await assertSucceeds(
                        setDoc(doc(db, `users/${TEST_USER_ID}/academic/${docType}`), validListDoc)
                    )
                })

                it(`rejects extra fields`, async () => {
                    const db = testEnv.authenticatedContext(TEST_USER_ID, {
                        email_verified: true, premium: { academic: true },
                    }).firestore()

                    await assertSucceeds(
                        setDoc(doc(db, `users/${TEST_USER_ID}/academic/${docType}`), validListDoc)
                    )
                    await assertFails(
                        setDoc(doc(db, `users/${TEST_USER_ID}/academic/${docType}`), { items: [], foo: "bar" })
                    )
                })

                it(`rejects missing 'items' field`, async () => {
                    const db = testEnv.authenticatedContext(TEST_USER_ID, {
                        email_verified: true, premium: { academic: true },
                    }).firestore()

                    await assertSucceeds(
                        setDoc(doc(db, `users/${TEST_USER_ID}/academic/${docType}`), validListDoc)
                    )
                    await assertFails(
                        setDoc(doc(db, `users/${TEST_USER_ID}/academic/${docType}`), { foo: [] })
                    )
                })

                it(`rejects 'items' value not of type array`, async () => {
                    const db = testEnv.authenticatedContext(TEST_USER_ID, {
                        email_verified: true, premium: { academic: true },
                    }).firestore()
                    await assertSucceeds(setDoc(doc(db, `users/${TEST_USER_ID}/academic/${docType}`), validListDoc))

                    await assertFails(
                        setDoc(doc(db, `users/${TEST_USER_ID}/academic/${docType}`), { items: "foo" })
                    )
                })
            })

        })
    })

    describe("unauthorized document names", () => {
        it("rejects writes to document names not in the allowlist", async () => {
            const db = testEnv.authenticatedContext(TEST_USER_ID, {
                email_verified: true,
                premium: { academic: true },
            }).firestore()
            await assertFails(
                setDoc(doc(db, `users/${TEST_USER_ID}/academic/foo`), { items: [] })
            )
        })
    })
})

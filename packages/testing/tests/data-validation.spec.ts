import { assertFails, assertSucceeds } from "@firebase/rules-unit-testing"
import type { RulesTestEnvironment } from "@firebase/rules-unit-testing"
import { doc, setDoc } from "firebase/firestore"
import { getTestEnv, loadAcademicFixtures, TEST_USER_ID } from "../utils.ts"

const validSettings = {
    theme: "dark",
    termMode: "Semesters Only",
    templates: [{ templateName: "Template 1" }],
    assignmentTypes: ["Homework"],
    periodCount: 4,
}

const validSchedules = {
    "alternating-ab": {
        termConfigs: {},
        terms: {},
    },
    "alternating-ab-semester": {
        termConfigs: {},
        terms: {},
    },
    "semester": {
        terms: {},
    },
    "fixed-weekly": {
        terms: {},
    },
}

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

        it("rejects a missing required field (periodCount)", async () => {
            const db = testEnv.authenticatedContext(TEST_USER_ID, {
                email_verified: true, premium: { academic: true },
            }).firestore()
            await assertSucceeds(setDoc(doc(db, `users/${TEST_USER_ID}/academic/settings`), validSettings))

            const { periodCount: _, ...noPeriodCount } = validSettings
            await assertFails(
                setDoc(doc(db, `users/${TEST_USER_ID}/academic/settings`), noPeriodCount)
            )
        })

        it("accepts periodCount at the lower bound (1)", async () => {
            const db = testEnv.authenticatedContext(TEST_USER_ID, {
                email_verified: true, premium: { academic: true },
            }).firestore()
            await assertSucceeds(
                setDoc(doc(db, `users/${TEST_USER_ID}/academic/settings`), { ...validSettings, periodCount: 1 })
            )
        })

        it("accepts periodCount at the upper bound (8)", async () => {
            const db = testEnv.authenticatedContext(TEST_USER_ID, {
                email_verified: true, premium: { academic: true },
            }).firestore()
            await assertSucceeds(
                setDoc(doc(db, `users/${TEST_USER_ID}/academic/settings`), { ...validSettings, periodCount: 8 })
            )
        })

        it("rejects periodCount below the lower bound (0)", async () => {
            const db = testEnv.authenticatedContext(TEST_USER_ID, {
                email_verified: true, premium: { academic: true },
            }).firestore()
            await assertFails(
                setDoc(doc(db, `users/${TEST_USER_ID}/academic/settings`), { ...validSettings, periodCount: 0 })
            )
        })

        it("rejects periodCount above the upper bound (9)", async () => {
            const db = testEnv.authenticatedContext(TEST_USER_ID, {
                email_verified: true, premium: { academic: true },
            }).firestore()
            await assertFails(
                setDoc(doc(db, `users/${TEST_USER_ID}/academic/settings`), { ...validSettings, periodCount: 9 })
            )
        })

        it("rejects periodCount as a string", async () => {
            const db = testEnv.authenticatedContext(TEST_USER_ID, {
                email_verified: true, premium: { academic: true },
            }).firestore()
            await assertFails(
                setDoc(doc(db, `users/${TEST_USER_ID}/academic/settings`), { ...validSettings, periodCount: "4" })
            )
        })

        it("rejects periodCount as a non-integer number", async () => {
            const db = testEnv.authenticatedContext(TEST_USER_ID, {
                email_verified: true, premium: { academic: true },
            }).firestore()
            await assertFails(
                setDoc(doc(db, `users/${TEST_USER_ID}/academic/settings`), { ...validSettings, periodCount: 4.5 })
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

        it("rejects a missing required field (alternating-ab)", async () => {
            const db = testEnv.authenticatedContext(TEST_USER_ID, {
                email_verified: true, premium: { academic: true },
            }).firestore()
            await assertSucceeds(setDoc(doc(db, `users/${TEST_USER_ID}/academic/schedules`), validSchedules))

            await assertFails(
                setDoc(doc(db, `users/${TEST_USER_ID}/academic/schedules`), { "semester": { terms: {} } })
            )
        })

        it("rejects a missing required field (semester)", async () => {
            const db = testEnv.authenticatedContext(TEST_USER_ID, {
                email_verified: true, premium: { academic: true },
            }).firestore()
            await assertSucceeds(setDoc(doc(db, `users/${TEST_USER_ID}/academic/schedules`), validSchedules))

            await assertFails(
                setDoc(doc(db, `users/${TEST_USER_ID}/academic/schedules`), {
                    "alternating-ab": { termConfigs: {}, terms: {} },
                    "alternating-ab-semester": { termConfigs: {}, terms: {} },
                    "fixed-weekly": { terms: {} },
                })
            )
        })

        it("rejects a missing required field (fixed-weekly)", async () => {
            const db = testEnv.authenticatedContext(TEST_USER_ID, {
                email_verified: true, premium: { academic: true },
            }).firestore()
            await assertSucceeds(setDoc(doc(db, `users/${TEST_USER_ID}/academic/schedules`), validSchedules))

            await assertFails(
                setDoc(doc(db, `users/${TEST_USER_ID}/academic/schedules`), {
                    "alternating-ab": { termConfigs: {}, terms: {} },
                    "alternating-ab-semester": { termConfigs: {}, terms: {} },
                    "semester": { terms: {} },
                })
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
                    "alternating-ab": { termConfigs: "foo", terms: {} },
                    "alternating-ab-semester": { termConfigs: {}, terms: {} },
                    "semester": { terms: {} },
                    "fixed-weekly": { terms: {} },
                })
            )
        })

        it("rejects non-map terms in alternating-ab", async () => {
            const db = testEnv.authenticatedContext(TEST_USER_ID, {
                email_verified: true, premium: { academic: true },
            }).firestore()
            await assertSucceeds(setDoc(doc(db, `users/${TEST_USER_ID}/academic/schedules`), validSchedules))

            await assertFails(
                setDoc(doc(db, `users/${TEST_USER_ID}/academic/schedules`), {
                    "alternating-ab": { termConfigs: {}, terms: "foo" },
                    "alternating-ab-semester": { termConfigs: {}, terms: {} },
                    "semester": { terms: {} },
                    "fixed-weekly": { terms: {} },
                })
            )
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

    describe("Type Safety", () => {
        it("rejects templates as a string instead of list", async () => {
            const db = testEnv.authenticatedContext(TEST_USER_ID, {
                email_verified: true, premium: { academic: true },
            }).firestore()

            await assertFails(
                setDoc(doc(db, `users/${TEST_USER_ID}/academic/settings`), {
                    ...validSettings, templates: "string-instead-of-list"
                })
            )
        })

        it("rejects templates as a map instead of list", async () => {
            const db = testEnv.authenticatedContext(TEST_USER_ID, {
                email_verified: true, premium: { academic: true },
            }).firestore()

            await assertFails(
                setDoc(doc(db, `users/${TEST_USER_ID}/academic/settings`), {
                    ...validSettings, templates: { a: 1 }
                })
            )
        })

        it("rejects assignmentTypes as a string instead of list", async () => {
            const db = testEnv.authenticatedContext(TEST_USER_ID, {
                email_verified: true, premium: { academic: true },
            }).firestore()

            await assertFails(
                setDoc(doc(db, `users/${TEST_USER_ID}/academic/settings`), {
                    ...validSettings, assignmentTypes: "Homework"
                })
            )
        })

        it("rejects assignmentTypes as a map instead of list", async () => {
            const db = testEnv.authenticatedContext(TEST_USER_ID, {
                email_verified: true, premium: { academic: true },
            }).firestore()

            await assertFails(
                setDoc(doc(db, `users/${TEST_USER_ID}/academic/settings`), {
                    ...validSettings, assignmentTypes: { a: 1 }
                })
            )
        })
    })

    describe("Size Limits", () => {
        it("rejects templates list exceeding 200 elements", async () => {
            const db = testEnv.authenticatedContext(TEST_USER_ID, {
                email_verified: true, premium: { academic: true },
            }).firestore()
            await assertFails(
                setDoc(doc(db, `users/${TEST_USER_ID}/academic/settings`), {
                    ...validSettings, templates: new Array(201).fill({ templateName: "T" })
                })
            )
        })

        it("accepts templates list at exactly 200 elements", async () => {
            const db = testEnv.authenticatedContext(TEST_USER_ID, {
                email_verified: true, premium: { academic: true },
            }).firestore()
            await assertSucceeds(
                setDoc(doc(db, `users/${TEST_USER_ID}/academic/settings`), {
                    ...validSettings, templates: new Array(200).fill({ templateName: "T" })
                })
            )
        })

        it("rejects assignmentTypes list exceeding 200 elements", async () => {
            const db = testEnv.authenticatedContext(TEST_USER_ID, {
                email_verified: true, premium: { academic: true },
            }).firestore()
            await assertFails(
                setDoc(doc(db, `users/${TEST_USER_ID}/academic/settings`), {
                    ...validSettings, assignmentTypes: new Array(201).fill("Type")
                })
            )
        })

        it("accepts assignmentTypes list at exactly 200 elements", async () => {
            const db = testEnv.authenticatedContext(TEST_USER_ID, {
                email_verified: true, premium: { academic: true },
            }).firestore()
            await assertSucceeds(
                setDoc(doc(db, `users/${TEST_USER_ID}/academic/settings`), {
                    ...validSettings, assignmentTypes: new Array(200).fill("Type")
                })
            )
        })
    })

    describe("alternating-ab subobject validation", () => {
        it("rejects extra keys inside alternating-ab", async () => {
            const db = testEnv.authenticatedContext(TEST_USER_ID, {
                email_verified: true, premium: { academic: true },
            }).firestore()

            await assertFails(
                setDoc(doc(db, `users/${TEST_USER_ID}/academic/schedules`), {
                    "alternating-ab": { termConfigs: {}, terms: {}, foo: "bar" },
                    "alternating-ab-semester": { termConfigs: {}, terms: {} },
                    "semester": { terms: {} },
                    "fixed-weekly": { terms: {} },
                })
            )
        })

        it("rejects alternating-ab value that is not a map", async () => {
            const db = testEnv.authenticatedContext(TEST_USER_ID, {
                email_verified: true, premium: { academic: true },
            }).firestore()

            await assertFails(
                setDoc(doc(db, `users/${TEST_USER_ID}/academic/schedules`), {
                    "alternating-ab": "string-instead-of-map",
                    "alternating-ab-semester": { termConfigs: {}, terms: {} },
                    "semester": { terms: {} },
                    "fixed-weekly": { terms: {} },
                })
            )
        })

        it("rejects missing termConfigs inside alternating-ab", async () => {
            const db = testEnv.authenticatedContext(TEST_USER_ID, {
                email_verified: true, premium: { academic: true },
            }).firestore()

            await assertFails(
                setDoc(doc(db, `users/${TEST_USER_ID}/academic/schedules`), {
                    "alternating-ab": { terms: {} },
                    "alternating-ab-semester": { termConfigs: {}, terms: {} },
                    "semester": { terms: {} },
                    "fixed-weekly": { terms: {} },
                })
            )
        })

        it("rejects missing terms inside alternating-ab", async () => {
            const db = testEnv.authenticatedContext(TEST_USER_ID, {
                email_verified: true, premium: { academic: true },
            }).firestore()

            await assertFails(
                setDoc(doc(db, `users/${TEST_USER_ID}/academic/schedules`), {
                    "alternating-ab": { termConfigs: {} },
                    "alternating-ab-semester": { termConfigs: {}, terms: {} },
                    "semester": { terms: {} },
                    "fixed-weekly": { terms: {} },
                })
            )
        })
    })

    describe("semester subobject validation", () => {
        it("rejects extra keys inside semester", async () => {
            const db = testEnv.authenticatedContext(TEST_USER_ID, {
                email_verified: true, premium: { academic: true },
            }).firestore()

            await assertFails(
                setDoc(doc(db, `users/${TEST_USER_ID}/academic/schedules`), {
                    "alternating-ab": { termConfigs: {}, terms: {} },
                    "alternating-ab-semester": { termConfigs: {}, terms: {} },
                    "semester": { terms: {}, foo: "bar" },
                    "fixed-weekly": { terms: {} },
                })
            )
        })

        it("rejects semester value that is not a map", async () => {
            const db = testEnv.authenticatedContext(TEST_USER_ID, {
                email_verified: true, premium: { academic: true },
            }).firestore()

            await assertFails(
                setDoc(doc(db, `users/${TEST_USER_ID}/academic/schedules`), {
                    "alternating-ab": { termConfigs: {}, terms: {} },
                    "alternating-ab-semester": { termConfigs: {}, terms: {} },
                    "semester": "string-instead-of-map",
                    "fixed-weekly": { terms: {} },
                })
            )
        })

        it("rejects missing terms inside semester", async () => {
            const db = testEnv.authenticatedContext(TEST_USER_ID, {
                email_verified: true, premium: { academic: true },
            }).firestore()

            await assertFails(
                setDoc(doc(db, `users/${TEST_USER_ID}/academic/schedules`), {
                    "alternating-ab": { termConfigs: {}, terms: {} },
                    "alternating-ab-semester": { termConfigs: {}, terms: {} },
                    "semester": {},
                    "fixed-weekly": { terms: {} },
                })
            )
        })

        it("rejects non-map terms inside semester", async () => {
            const db = testEnv.authenticatedContext(TEST_USER_ID, {
                email_verified: true, premium: { academic: true },
            }).firestore()

            await assertFails(
                setDoc(doc(db, `users/${TEST_USER_ID}/academic/schedules`), {
                    "alternating-ab": { termConfigs: {}, terms: {} },
                    "alternating-ab-semester": { termConfigs: {}, terms: {} },
                    "semester": { terms: "foo" },
                    "fixed-weekly": { terms: {} },
                })
            )
        })
    })
})

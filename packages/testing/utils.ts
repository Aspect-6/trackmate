import { initializeTestEnvironment } from "@firebase/rules-unit-testing"
import type { RulesTestEnvironment } from "@firebase/rules-unit-testing"
import { setLogLevel } from "firebase/firestore"
import type { DocumentData } from "firebase/firestore"
import * as fs from "node:fs"
import { resolve } from "path"

let testEnv: RulesTestEnvironment
const MY_PROJECT_ID = "trackmate-fb7cd"

export const academicFixtures = JSON.parse(fs.readFileSync(resolve("./data/fixtures.json"), "utf8")) as any
export const TEST_USER_ID = "alice"

export async function getTestEnv() {
    if (!testEnv) {
        setLogLevel("error")
        testEnv = await initializeTestEnvironment({
            projectId: MY_PROJECT_ID,
            firestore: {
                rules: fs.readFileSync(resolve("../../firestore.rules"), "utf8"),
                host: "localhost",
                port: 8080,
            },
        })
    }
    return testEnv
}

export async function loadAcademicFixtures(env: RulesTestEnvironment) {
    await env.clearFirestore()
    
    await env.withSecurityRulesDisabled(async (context) => {
        const firestore = context.firestore()
        for (const [docId, data] of Object.entries(academicFixtures)) {
            const fullPath = `users/${TEST_USER_ID}/academic/${docId}`
            await firestore.doc(fullPath).set(data as DocumentData)
        }
    })
}

export async function cleanupTestEnv() {
    if (testEnv) {
        await testEnv.cleanup()
    }
}
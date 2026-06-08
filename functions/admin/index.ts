#!/usr/bin/env node

/**
 * TrackMate Admin CLI
 *
 * Multi-purpose admin script for managing users, premium, and data.
 * Uses Firebase Admin SDK — requires local credentials to run.
 *
 * Auth: Either set GOOGLE_APPLICATION_CREDENTIALS to a service account key,
 *       or run `gcloud auth application-default login` first.
 *
 * Usage:
 *   node index.ts <command> [args...]
 *
 * Commands:
 *   grant-premium "<uid-or-email>" [--all | --product <name>]
 *   revoke-premium "<uid-or-email>" [--all | --product <name>]
 *   get-user "<uid-or-email>"
 *   import-data <uid> <docName> <path-to-json>
 *   export-data "<uid-or-email>" [--all | --product <name>] [--out <path>]
 *
 * Examples:
 *   node index.ts get-user "john@example.com"
 *   node index.ts grant-premium "john@example.com" --all
 *   node index.ts grant-premium "abc123uid" --product academic
 *   node index.ts revoke-premium "john@example.com" --product academic
 *   node index.ts import-data "abc123uid" classes ./classes.json
 *   node index.ts export-data "john@example.com" --all
 */

import { initializeApp } from "firebase-admin/app"
import { getAuth, UserRecord } from "firebase-admin/auth"
import { getFirestore } from "firebase-admin/firestore"
import * as fs from "fs"
import { VALID_DOCS, isItemsDoc } from "../src/schemas.js"

const PROJECT_ID = "trackmate-fb7cd"
const PRODUCTS = ["academic"]

initializeApp({ projectId: PROJECT_ID })
const auth = getAuth()
const db = getFirestore()

/**
 * Resolves a uid-or-email string to a full UserRecord.
 */
async function resolveUser(uidOrEmail: string): Promise<UserRecord> {
	try {
		if (uidOrEmail.includes("@")) {
			return await auth.getUserByEmail(uidOrEmail)
		}
		return await auth.getUser(uidOrEmail)
	} catch (err) {
		console.error(`\x1b[31m[ERROR]\x1b[0m User not found: "${uidOrEmail}"`)
		process.exit(1)
	}
}

function getDefaultPremiumClaims(): Record<string, boolean> {
	const claims: Record<string, boolean> = { all: false }
	for (const product of PRODUCTS) {
		claims[product] = false
	}
	return claims
}

function parseFlags(args: string[]): Record<string, any> {
	const flags: Record<string, unknown> = {}
	for (let i = 0; i < args.length; i++) {
		if (args[i] === "--all") {
			flags.all = true
		} else if (args[i] === "--product" && args[i + 1]) {
			flags.product = args[++i]
		} else if (args[i] === "--out" && args[i + 1]) {
			flags.out = args[++i]
		}
	}
	return flags
}

function printUser(user: UserRecord) {
	const premium = user.customClaims?.premium ?? null
	console.log()
	console.log(`  UID:      ${user.uid}`)
	console.log(`  Email:    ${user.email ?? "(none)"}`)
	console.log(`  Verified: ${user.emailVerified}`)
	console.log(`  Created:  ${user.metadata.creationTime}`)
	console.log(`  Premium:  ${JSON.stringify(premium)}`)
	console.log()
}

// ── Commands ────────────────────────────────────────────────────────────

async function cmdGetUser(args: string[]) {
	if (!args[0]) {
		console.error("Usage: node index.ts get-user \"<uid-or-email>\"")
		process.exit(1)
	}
	const user = await resolveUser(args[0])
	console.log("\x1b[32m[SUCCESS]\x1b[0m Found user:")
	printUser(user)
}

async function cmdGrantPremium(args: string[]) {
	if (!args[0]) {
		console.error("Usage: node index.ts grant-premium \"<uid-or-email>\" [--all | --product <name>]")
		process.exit(1)
	}

	const user = await resolveUser(args[0])
	const flags = parseFlags(args.slice(1))
	const currentClaims = user.customClaims ?? {}
	const existingPremium = (currentClaims.premium as Record<string, boolean>) ?? {}
	const premium = { ...getDefaultPremiumClaims(), ...existingPremium }

	if (flags.all) {
		premium.all = true
	} else if (flags.product) {
		if (!PRODUCTS.includes(flags.product)) {
			console.error(`\x1b[31m[ERROR]\x1b[0m Unknown product: "${flags.product}"`)
			console.error(`Valid products: ${PRODUCTS.join(", ")}`)
			process.exit(1)
		}
		premium[flags.product] = true
	} else {
		// Default: grant all
		premium.all = true
	}

	await auth.setCustomUserClaims(user.uid, { ...currentClaims, premium })

	console.log(`\x1b[32m[SUCCESS]\x1b[0m Premium granted for ${user.email ?? user.uid}`)
	console.log(`   Claims: ${JSON.stringify(premium)}`)
}

async function cmdRevokePremium(args: string[]) {
	if (!args[0]) {
		console.error("Usage: node index.ts revoke-premium \"<uid-or-email>\" [--all | --product <name>]")
		process.exit(1)
	}

	const user = await resolveUser(args[0])
	const flags = parseFlags(args.slice(1))
	const currentClaims = user.customClaims ?? {}
	const existingPremium = (currentClaims.premium as Record<string, boolean>) ?? {}
	const premium = { ...getDefaultPremiumClaims(), ...existingPremium }

	if (flags.product) {
		if (!PRODUCTS.includes(flags.product)) {
			console.error(`\x1b[31m[ERROR]\x1b[0m Unknown product: "${flags.product}"`)
			console.error(`Valid products: ${PRODUCTS.join(", ")}`)
			process.exit(1)
		}
		premium[flags.product] = false
	} else {
		// Default: revoke everything
		for (const key of Object.keys(premium)) {
			premium[key] = false
		}
	}

	await auth.setCustomUserClaims(user.uid, { ...currentClaims, premium })

	console.log(`\x1b[32m[SUCCESS]\x1b[0m Premium revoked for ${user.email ?? user.uid}`)
	console.log(`   Claims: ${JSON.stringify(premium)}`)
}

async function cmdImportData(args: string[]) {
	const [uid, docName, jsonPath] = args

	if (!uid || !docName || !jsonPath) {
		console.error("Usage: node index.ts import-data \"<uid>\" <docName> <path-to-json>")
		process.exit(1)
	}

	if (!isItemsDoc(docName)) {
		console.error(`\x1b[31m[ERROR]\x1b[0m Invalid doc name: "${docName}"`)
		console.error(`Valid options: ${VALID_DOCS.join(", ")}`)
		process.exit(1)
	}

	if (!fs.existsSync(jsonPath)) {
		console.error(`\x1b[31m[ERROR]\x1b[0m File not found: ${jsonPath}`)
		process.exit(1)
	}

	const raw = fs.readFileSync(jsonPath, "utf-8")
	const data = JSON.parse(raw)
	const items = Array.isArray(data) ? data : data.items

	if (!Array.isArray(items)) {
		console.error("\x1b[31m[ERROR]\x1b[0m JSON must be an array or an object with an 'items' array.")
		process.exit(1)
	}

	const docPath = `users/${uid}/academic/${docName}`
	console.log(`Writing ${items.length} items to ${docPath}...`)

	await db.doc(docPath).set({ items })
	console.log(`\x1b[32m[SUCCESS]\x1b[0m Done! Wrote ${items.length} items to ${docPath}`)
}

async function cmdExportData(args: string[]) {
	if (!args[0]) {
		console.error("Usage: node index.ts export-data \"<uid-or-email>\" [--all | --product <name>] [--out <path>]")
		process.exit(1)
	}

	const user = await resolveUser(args[0])
	const flags = parseFlags(args.slice(1))

	let productsToExport = PRODUCTS
	if (flags.product) {
		if (!PRODUCTS.includes(flags.product)) {
			console.error(`\x1b[31m[ERROR]\x1b[0m Unknown product: "${flags.product}"`)
			console.error(`Valid products: ${PRODUCTS.join(", ")}`)
			process.exit(1)
		}
		productsToExport = [flags.product]
	}

	const outPath = flags.out || `export-${user.uid}.json`
	console.log(`Exporting data for user ${user.email ?? user.uid}...`)

	const exportData: Record<string, any> = {
		uid: user.uid,
		email: user.email,
		exportedAt: new Date().toISOString(),
		data: {},
	}

	for (const product of productsToExport) {
		console.log(`  Fetching product: ${product}...`)
		exportData.data[product] = {}
		const snapshot = await db.collection(`users/${user.uid}/${product}`).get()

		if (snapshot.empty) {
			console.log("    No documents found.")
			continue
		}

		for (const doc of snapshot.docs) {
			console.log(`    Exported doc: ${doc.id}`)
			exportData.data[product][doc.id] = doc.data()
		}
	}

	fs.writeFileSync(outPath, JSON.stringify(exportData, null, 2))
	console.log(`\x1b[32m[SUCCESS]\x1b[0m Export saved to ${outPath}`)
}

// ── Router ──────────────────────────────────────────────────────────────

const COMMANDS: Record<string, (args: string[]) => Promise<void>> = {
	"get-user": cmdGetUser,
	"grant-premium": cmdGrantPremium,
	"revoke-premium": cmdRevokePremium,
	"import-data": cmdImportData,
	"export-data": cmdExportData,
}

async function main() {
	const [command, ...args] = process.argv.slice(2)

	if (!command || command === "--help" || command === "-h") {
		console.log()
		console.log("TrackMate Admin CLI")
		console.log()
		console.log("Usage: node index.ts <command> [args...]")
		console.log()
		console.log("Commands:")
		console.log("  get-user \"<uid-or-email>\"                           Look up a user's info and premium claims")
		console.log("  grant-premium \"<uid-or-email>\" [--all|--product X]  Grant premium access")
		console.log("  revoke-premium \"<uid-or-email>\" [--all|--product X] Revoke premium access")
		console.log("  import-data \"<uid>\" <docName> <path-to-json>        Import data into Firestore")
		console.log("  export-data \"<uid-or-email>\" [--all|--product X]  Export a user's data to JSON")
		console.log()
		console.log("Auth: Run `gcloud auth application-default login` or set GOOGLE_APPLICATION_CREDENTIALS.")
		console.log()
		process.exit(0)
	}

	const handler = COMMANDS[command]
	if (!handler) {
		console.error(`\x1b[31m[ERROR]\x1b[0m Unknown command: "${command}"`)
		console.error('Run "node index.ts --help" for usage.')
		process.exit(1)
	}

	await handler(args)
}

main().catch((err) => {
	console.error("\x1b[31m[ERROR]\x1b[0m Fatal error:", err.message)
	process.exit(1)
})

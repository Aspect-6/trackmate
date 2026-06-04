import { onCall, HttpsError } from "firebase-functions/v2/https"
import { initializeApp } from "firebase-admin/app"
import { getAuth } from "firebase-admin/auth"
import { getFirestore } from "firebase-admin/firestore"
import { getSchemaForDoc, isPremiumDoc, isItemsDoc } from "./schemas.js"
import { validateItems } from "./validation.js"
import * as functionsV1 from "firebase-functions/v1"
import { getDefaultPremiumClaims, PremiumClaims } from "./stripe.js"

initializeApp()

const db = getFirestore()

type Product = "academic"

interface PremiumPayload {
	all?: boolean
	products?: Product[]
}

export const setPremiumClaim = onCall({ enforceAppCheck: true }, async (request) => {
	if (!request.auth) {
		throw new HttpsError("unauthenticated", "You must be logged in to use this function.")
	}

	const uid = request.auth.uid
	const data = request.data as PremiumPayload

	if (!data || (data.all === undefined && (!data.products || data.products.length === 0))) {
		throw new HttpsError("invalid-argument", "Must provide 'all' or a list of 'products'")
	}

	try {
		const premiumClaims = getDefaultPremiumClaims()

		if (data.all === true) {
			premiumClaims.all = true
		} else if (data.products && data.products.length > 0) {
			data.products.forEach((product: Product) => {
				premiumClaims[product] = true
			})
		}

		await getAuth().setCustomUserClaims(uid, { premium: premiumClaims })

		return { success: true, premium: premiumClaims }
	} catch (error) {
		console.error("Error setting premium claim:", error)
		throw new HttpsError("internal", "Failed to set premium claim.")
	}
})

export const onUserCreated = functionsV1.region("us-central1").auth.user().onCreate(async (user) => {
	const premium = getDefaultPremiumClaims()
	await getAuth().setCustomUserClaims(user.uid, { premium })
})

// ── Items Document Write Gate ───────────────────────────────────────────

const MAX_ITEMS = 5000

interface WriteItemsPayload {
	docName: string
	payload: { items: unknown[] }
}

export const writeItemsDocument = onCall({ enforceAppCheck: true }, async (request) => {
	if (!request.auth) {
		throw new HttpsError("unauthenticated", "Authentication required.")
	}
	if (!request.auth.token.email_verified) {
		throw new HttpsError("permission-denied", "Email must be verified.")
	}

	const uid = request.auth.uid
	const { docName, payload } = request.data as WriteItemsPayload

	if (!docName || typeof docName !== "string") {
		throw new HttpsError("invalid-argument", "Missing or invalid 'docName'.")
	}
	if (!isItemsDoc(docName)) {
		throw new HttpsError("invalid-argument", `"${docName}" is not a valid items document.`)
	}

	if (!payload || typeof payload !== "object" || !Array.isArray(payload.items)) {
		throw new HttpsError("invalid-argument", "Payload must be { items: [...] }.")
	}
	if (Object.keys(payload).length !== 1) {
		throw new HttpsError("invalid-argument", "Payload must only contain 'items'.")
	}
	if (payload.items.length > MAX_ITEMS) {
		throw new HttpsError("invalid-argument", `Items array exceeds limit of ${MAX_ITEMS}.`)
	}

	if (isPremiumDoc(docName)) {
		const premium = request.auth.token.premium as Partial<PremiumClaims> | undefined
		if (!premium || (premium.academic !== true && premium.all !== true)) {
			throw new HttpsError("permission-denied", "Premium subscription required.")
		}
	}

	const schema = getSchemaForDoc(docName)
	if (!schema) {
		throw new HttpsError("internal", "No schema found for document.")
	}

	const validationError = validateItems(payload.items, schema)
	if (validationError) {
		throw new HttpsError("invalid-argument", validationError)
	}

	try {
		const docRef = db.doc(`users/${uid}/academic/${docName}`)
		await docRef.set({ items: payload.items })
		return { success: true }
	} catch (error) {
		console.error(`Error writing ${docName} for user ${uid}:`, error)
		throw new HttpsError("internal", "Failed to write document.")
	}
})

export * from "./syncCanvasCalendars.js"
export * from "./stripe.js"
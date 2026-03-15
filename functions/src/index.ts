import { onCall, HttpsError } from "firebase-functions/v2/https"
import { initializeApp } from "firebase-admin/app"
import { getAuth } from "firebase-admin/auth"
import { getFirestore } from "firebase-admin/firestore"
import { getSchemaForDoc, isPremiumDoc, isItemsDoc } from "./schemas.js"
import { validateItems } from "./validation.js"

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
		const premiumClaims: Record<string, boolean> = {}

		if (data.all === true) {
			premiumClaims.all = true
		} else {
			premiumClaims.all = false
			if (data.products && data.products.length > 0) {
				data.products.forEach((product: Product) => {
					premiumClaims[product] = true
				})
			}
		}

		await getAuth().setCustomUserClaims(uid, { premium: premiumClaims })

		return { success: true, premium: premiumClaims }
	} catch (error) {
		console.error("Error setting premium claim:", error)
		throw new HttpsError("internal", "Failed to set premium claim.")
	}
})

// ── Items Document Write Gate ───────────────────────────────────────────

const MAX_ITEMS = 5000

interface WriteItemsPayload {
	docName: string
	data: { items: unknown[] }
}

export const writeItemsDocument = onCall({ enforceAppCheck: true }, async (request) => {
	if (!request.auth) {
		throw new HttpsError("unauthenticated", "Authentication required.")
	}
	if (!request.auth.token.email_verified) {
		throw new HttpsError("permission-denied", "Email must be verified.")
	}

	const uid = request.auth.uid
	const { docName, data } = request.data as WriteItemsPayload

	if (!docName || typeof docName !== "string") {
		throw new HttpsError("invalid-argument", "Missing or invalid 'docName'.")
	}
	if (!isItemsDoc(docName)) {
		throw new HttpsError("invalid-argument", `"${docName}" is not a valid items document.`)
	}

	if (!data || typeof data !== "object" || !Array.isArray(data.items)) {
		throw new HttpsError("invalid-argument", "Payload must be { items: [...] }.")
	}
	if (Object.keys(data).length !== 1) {
		throw new HttpsError("invalid-argument", "Payload must only contain 'items'.")
	}
	if (data.items.length > MAX_ITEMS) {
		throw new HttpsError("invalid-argument", `Items array exceeds limit of ${MAX_ITEMS}.`)
	}

	if (isPremiumDoc(docName)) {
		const premium = request.auth.token.premium as
			{ academic?: boolean; all?: boolean } | undefined
		if (!premium || (premium.academic !== true && premium.all !== true)) {
			throw new HttpsError("permission-denied", "Premium subscription required.")
		}
	}

	const schema = getSchemaForDoc(docName)
	if (!schema) {
		throw new HttpsError("internal", "No schema found for document.")
	}

	const validationError = validateItems(data.items, schema)
	if (validationError) {
		throw new HttpsError("invalid-argument", validationError)
	}

	try {
		const docRef = db.doc(`users/${uid}/academic/${docName}`)
		await docRef.set({ items: data.items })
		return { success: true }
	} catch (error) {
		console.error(`Error writing ${docName} for user ${uid}:`, error)
		throw new HttpsError("internal", "Failed to write document.")
	}
})
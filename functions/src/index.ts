import { onCall, HttpsError } from "firebase-functions/v2/https"
import { initializeApp } from "firebase-admin/app"
import { getAuth } from "firebase-admin/auth"

initializeApp()

type Product = "academic"

interface PremiumPayload {
	all?: boolean
	products?: Product[]
}

export const setPremiumClaim = onCall(async (request) => {
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
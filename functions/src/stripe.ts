import { onCall, onRequest, HttpsError } from "firebase-functions/v2/https"
import { defineSecret } from "firebase-functions/params"
import { getAuth } from "firebase-admin/auth"
import { getFirestore } from "firebase-admin/firestore"
import Stripe from "stripe"

const stripeSecretKey = defineSecret("STRIPE_SECRET_KEY")
const stripeWebhookSecret = defineSecret("STRIPE_WEBHOOK_SECRET")

// ── Helpers ─────────────────────────────────────────────────────────────
const getStripe = (key: string) => new Stripe(key, { apiVersion: "2026-05-27.dahlia" })

type StripeInstance = ReturnType<typeof getStripe>
type StripeEvent = ReturnType<StripeInstance["webhooks"]["constructEvent"]>
type CheckoutSession = Awaited<ReturnType<StripeInstance["checkout"]["sessions"]["create"]>>
type StripeSubscription = Awaited<ReturnType<StripeInstance["subscriptions"]["retrieve"]>>


const PRICE_IDS: Record<string, string> = {
	academic: "price_1TdxlV1hfCkQmNfln5ubzc0K",
}

const PRODUCTS = ["academic"] as const
const BUNDLE_PRODUCT = "bundle"
type Product = typeof PRODUCTS[number] | "all"
export type PremiumClaims = Record<Product, boolean>

export function getDefaultPremiumClaims(): PremiumClaims {
	const claims: Record<string, boolean> = { all: false }
	for (const product of PRODUCTS) {
		claims[product] = false
	}
	return claims as PremiumClaims
}

const APP_URL = "https://trackmate.co"
const DEV_URL = "http://localhost:5173"

function getBaseUrl(): string {
	return process.env.FUNCTIONS_EMULATOR === "true" ? DEV_URL : APP_URL
	// return DEV_URL
}

export const createCheckoutSession = onCall({ enforceAppCheck: true, secrets: [stripeSecretKey], memory: "1GiB" }, async (request) => {
	if (!request.auth) {
		throw new HttpsError("unauthenticated", "Must be logged in.")
	}
	if (!request.auth.token.email_verified) {
		throw new HttpsError("permission-denied", "Email must be verified.")
	}

	const { product } = request.data as { product?: string }
	if (!product || !PRICE_IDS[product]) {
		throw new HttpsError("invalid-argument", "Invalid product.")
	}

	const uid = request.auth.uid
	const email = request.auth.token.email
	const stripe = getStripe(stripeSecretKey.value())
	const baseUrl = getBaseUrl()

	const userDoc = await getFirestore().doc(`users/${uid}/billing/stripe`).get()
	let customerId = userDoc.data()?.customerId as string | undefined

	if (!customerId) {
		const customer = await stripe.customers.create({
			email: email ?? undefined,
			metadata: { firebaseUID: uid },
		})
		customerId = customer.id

		await getFirestore().doc(`users/${uid}/billing/stripe`).set({
			customerId,
			createdAt: new Date().toISOString(),
		})
	}

	const session = await stripe.checkout.sessions.create({
		customer: customerId,
		payment_method_types: ["card"],
		mode: "subscription",
		line_items: [{ price: PRICE_IDS[product], quantity: 1 }],
		success_url: `${baseUrl}/account?tab=plans&checkout=success`,
		cancel_url: `${baseUrl}/account?tab=plans&checkout=cancelled`,
		metadata: { firebaseUID: uid, product },
		subscription_data: {
			metadata: { firebaseUID: uid, product },
		},
	})

	return { url: session.url }
})

export const createBillingPortalSession = onCall({ enforceAppCheck: true, secrets: [stripeSecretKey], memory: "1GiB" }, async (request) => {
	if (!request.auth) {
		throw new HttpsError("unauthenticated", "Must be logged in.")
	}

	const uid = request.auth.uid
	const stripe = getStripe(stripeSecretKey.value())
	const baseUrl = getBaseUrl()

	const userDoc = await getFirestore().doc(`users/${uid}/billing/stripe`).get()
	const customerId = userDoc.data()?.customerId as string | undefined

	if (!customerId) {
		throw new HttpsError("not-found", "No billing account found.")
	}

	const session = await stripe.billingPortal.sessions.create({
		customer: customerId,
		return_url: `${baseUrl}/account?tab=plans&billing=returned`,
	})

	return { url: session.url }
})

export const stripeWebhook = onRequest({ secrets: [stripeSecretKey, stripeWebhookSecret] }, async (req, res) => {
	if (req.method !== "POST") {
		res.status(405).send("Method Not Allowed")
		return
	}

	const stripe = getStripe(stripeSecretKey.value())
	const sig = req.headers["stripe-signature"] as string

	let event: StripeEvent
	try {
		event = stripe.webhooks.constructEvent(
			req.rawBody,
			sig,
			stripeWebhookSecret.value()
		)
	} catch (err) {
		console.error("Webhook signature verification failed:", err)
		res.status(400).send("Webhook signature verification failed.")
		return
	}

	// ── Handle events ───────────────────────────────────────────
	switch (event.type) {
	case "checkout.session.completed": {
		const session = event.data.object as CheckoutSession
		await handleCheckoutComplete(session)
		break
	}
	case "customer.subscription.deleted": {
		const subscription = event.data.object as StripeSubscription
		await handleSubscriptionCancelled(subscription)
		break
	}
	case "customer.subscription.updated": {
		const subscription = event.data.object as StripeSubscription
		await handleSubscriptionUpdated(subscription)
		break
	}
	default:
		console.log(`Unhandled event type: ${event.type}`)
	}

	res.status(200).json({ received: true })
})

// ── Webhook Handlers ────────────────────────────────────────────────────

async function handleCheckoutComplete(session: CheckoutSession) {
	const uid = session.metadata?.firebaseUID
	const product = session.metadata?.product
	if (!uid || !product) {
		console.error("Missing metadata on checkout session:", session.id)
		return
	}

	const currentClaims = (await getAuth().getUser(uid)).customClaims ?? {}
	const existingPremium = (currentClaims.premium as Record<string, boolean>) ?? {}
	const premium = { ...getDefaultPremiumClaims(), ...existingPremium }

	if (product === BUNDLE_PRODUCT) {
		premium.all = true
	} else {
		premium[product as Product] = true
		premium.all = false
	}

	await getAuth().setCustomUserClaims(uid, { ...currentClaims, premium })

	await getFirestore().doc(`users/${uid}/billing/stripe`).set({
		subscriptions: {
			[product]: {
				id: session.subscription,
				status: "active",
				updatedAt: new Date().toISOString(),
			},
		},
	}, { merge: true })

	console.log(`Premium granted: ${product} for user ${uid}`)
}

async function handleSubscriptionCancelled(subscription: StripeSubscription) {
	const uid = subscription.metadata?.firebaseUID
	const product = subscription.metadata?.product
	if (!uid || !product) {
		console.error("Missing metadata on subscription:", subscription.id)
		return
	}

	const currentClaims = (await getAuth().getUser(uid)).customClaims ?? {}
	const existingPremium = (currentClaims.premium as Record<string, boolean>) ?? {}
	const premium = { ...getDefaultPremiumClaims(), ...existingPremium }

	if (product === BUNDLE_PRODUCT) {
		premium.all = false
	} else {
		premium[product as Product] = false
	}

	await getAuth().setCustomUserClaims(uid, { ...currentClaims, premium })

	await getFirestore().doc(`users/${uid}/billing/stripe`).set({
		subscriptions: {
			[product]: {
				status: "cancelled",
				updatedAt: new Date().toISOString(),
			},
		},
	}, { merge: true })

	console.log(`Premium revoked: ${product} for user ${uid}`)
}

async function handleSubscriptionUpdated(subscription: StripeSubscription) {
	const uid = subscription.metadata?.firebaseUID
	const product = subscription.metadata?.product
	if (!uid || !product) return

	if (subscription.status === "past_due" || subscription.status === "unpaid") {
		await handleSubscriptionCancelled(subscription)
	} else if (subscription.status === "active") {
		await handleCheckoutComplete({
			metadata: { firebaseUID: uid, product },
			subscription: subscription.id,
		} as unknown as CheckoutSession)
	}
}

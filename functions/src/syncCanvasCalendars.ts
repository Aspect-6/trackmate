import { onCall, HttpsError } from "firebase-functions/v2/https"
import { onSchedule } from "firebase-functions/v2/scheduler"
import { getFirestore, FieldValue, DocumentReference } from "firebase-admin/firestore"
import { getAuth } from "firebase-admin/auth"
import ical from "node-ical"
import { z } from "zod"
import { AssignmentSchema, ClassSchema, AcademicTermSchema } from "./schemas.js"
import { PremiumClaims } from "./stripe.js"

interface Assignment extends z.infer<typeof AssignmentSchema> {}
interface Class extends z.infer<typeof ClassSchema> {}
interface AcademicTerm extends z.infer<typeof AcademicTermSchema> {}

interface IcalEvent {
	type?: string
	summary?: string
	uid?: string
	start?: {
		dateOnly?: boolean
		toISOString: () => string
		toLocaleString: (locales: string, options: Intl.DateTimeFormatOptions) => string
	}
}

const db = getFirestore()

interface CanvasCourseMapping {
	canvasCourseName: string
	classId: string
}

interface CanvasIntegration {
	icsUrl: string
	termId: string
	courseMappings: CanvasCourseMapping[]
	lastSyncAt: string | null
	lastSyncStatus: "success" | "error" | "never"
	lastSyncError: string | null
	enabled: boolean
	newlyAutoCreatedClasses: string[]
	deletedCanvasUids: string[]
	timezone: string
}

export const fetchCanvasCourses = onCall({ enforceAppCheck: true }, async (request) => {
	if (!request.auth) throw new HttpsError("unauthenticated", "Must be logged in")
	const { icsUrl } = request.data as { icsUrl: string }
	if (!icsUrl) throw new HttpsError("invalid-argument", "Missing icsUrl")

	try {
		const events = await ical.async.fromURL(icsUrl)
		const courseNames = new Set<string>()

		for (const rawEvent of Object.values(events)) {
			const event = rawEvent as IcalEvent
			if (event?.type === "VEVENT" && event?.summary) {
				const match = event.summary.match(/^(.+?)\s*\[(.+?)\]\s*$/)
				if (match) {
					courseNames.add(match[2])
				}
			}
		}
		return { courses: Array.from(courseNames) }
	} catch (e: unknown) {
		console.error("Error fetching ICS:", e)
		throw new HttpsError("internal", "Failed to fetch or parse Canvas calendar")
	}
})

/**
 * Core sync logic to process Canvas events and update Firestore.
 * @param {string} uid The user ID
 * @param {CanvasIntegration} integration The user's Canvas integration settings
 */
async function syncUserCanvas(uid: string, integration: CanvasIntegration) {
	if (!integration.enabled || !integration.icsUrl || !integration.termId) return

	// 1. Check if term is over
	const termDoc = await db.doc(`users/${uid}/academic/terms`).get()
	const terms = (termDoc.data()?.items || []) as AcademicTerm[]
	const term = terms.find((t: AcademicTerm) => t.id === integration.termId)
	if (!term) return

	const todayStr = new Date().toISOString().split("T")[0]
	if (todayStr > term.endDate) return

	// 2. Fetch events
	let events: Record<string, unknown>
	try {
		events = await ical.async.fromURL(integration.icsUrl)
	} catch (e: unknown) {
		const errorMessage = e instanceof Error ? e.message : "Failed to fetch"
		await db.doc(`users/${uid}/academic/settings`).update({
			"canvasIntegration.lastSyncStatus": "error",
			"canvasIntegration.lastSyncError": errorMessage,
			"canvasIntegration.lastSyncAt": new Date().toISOString(),
		})
		return
	}

	const classesDocRef = db.doc(`users/${uid}/academic/classes`)
	const settingsDocRef = db.doc(`users/${uid}/academic/settings`)

	const assignmentsDocRef = db.doc(`users/${uid}/academic/assignments`)
	const assignmentsPremiumDocRef = db.doc(`users/${uid}/academic/assignments-premium`)
	const assignmentsArchiveDocRef = db.doc(`users/${uid}/academic/assignments-archive`)
	const assignmentsPremiumArchiveDocRef = db.doc(`users/${uid}/academic/assignments-premium-archive`)

	const [classesDoc, assignmentsDoc, assignmentsPremiumDoc, assignmentsArchiveDoc, assignmentsPremiumArchiveDoc] = await Promise.all([
		classesDocRef.get(),
		assignmentsDocRef.get(),
		assignmentsPremiumDocRef.get(),
		assignmentsArchiveDocRef.get(),
		assignmentsPremiumArchiveDocRef.get(),
	])

	const classes = (classesDoc.data()?.items || []) as Class[]

	const lists: Record<string, { ref: DocumentReference, items: Assignment[], changed: boolean }> = {
		assignments: { ref: assignmentsDocRef, items: assignmentsDoc.data()?.items || [], changed: false },
		assignmentsPremium: { ref: assignmentsPremiumDocRef, items: assignmentsPremiumDoc.data()?.items || [], changed: false },
		assignmentsArchive: { ref: assignmentsArchiveDocRef, items: assignmentsArchiveDoc.data()?.items || [], changed: false },
		assignmentsPremiumArchive: { ref: assignmentsPremiumArchiveDocRef, items: assignmentsPremiumArchiveDoc.data()?.items || [], changed: false },
	}

	const allAssignmentsMap = new Map<string, { listName: string }>()
	for (const [listName, listObj] of Object.entries(lists)) {
		for (const a of listObj.items) {
			if (a.canvasUid) {
				allAssignmentsMap.set(a.canvasUid, { listName })
			}
		}
	}

	let mappingsChanged = false
	let classesChanged = false

	const newAutoCreatedClasses: string[] = []
	const tz = integration.timezone

	for (const rawEvent of Object.values(events)) {
		const event = rawEvent as IcalEvent
		if (event?.type !== "VEVENT" || !event?.summary || !event?.uid) continue

		const match = event.summary.match(/^(.+?)\s*\[(.+?)\]\s*$/)
		if (!match) continue

		const canvasCourseName = match[2]
		const assignmentTitle = match[1].trim().substring(0, 150)

		let mapping = integration.courseMappings.find(
			(m) => m.canvasCourseName === canvasCourseName
		)

		if (!mapping) {
			const newClassId = Math.random().toString(36).substring(2, 9) + Date.now().toString(36)
			const newClass = {
				id: newClassId,
				name: canvasCourseName,
				color: "hsl(217, 60%, 57%)",
				teacherName: "",
				roomNumber: "",
				order: classes.length,
				termId: integration.termId,
				isArchived: false,
			}
			classes.push(newClass)
			classesChanged = true

			mapping = { canvasCourseName, classId: newClassId }
			integration.courseMappings.push(mapping)
			mappingsChanged = true
			newAutoCreatedClasses.push(canvasCourseName)
		}

		const classId = mapping.classId

		if (classId === "IGNORE") continue

		const dtstart = event.start
		let dueDate = ""
		let dueTime = ""
		if (dtstart) {
			if (dtstart.dateOnly) {
				dueDate = dtstart.toISOString().split("T")[0]
				dueTime = "23:59"
			} else {
				const localStr = dtstart.toLocaleString("sv-SE", { timeZone: tz })
				const [d, t] = localStr.split(" ")
				dueDate = d
				dueTime = t.substring(0, 5)
			}
		} else continue

		const canvasUid = event.uid

		if (integration.deletedCanvasUids?.includes(canvasUid)) continue

		const existing = allAssignmentsMap.get(canvasUid)

		if (existing) {
			const listObj = lists[existing.listName]
			const a = listObj.items.find((item: Assignment) => item.canvasUid === canvasUid)
			if (!a) continue // should never happen

			let updated = false
			const orig = a.canvasOriginal

			if (a.title === orig?.title && a.title !== assignmentTitle) {
				a.title = assignmentTitle
				updated = true
			}
			if (a.dueDate === orig?.dueDate && a.dueDate !== dueDate) {
				a.dueDate = dueDate
				updated = true
			}
			if (a.dueTime === orig?.dueTime && a.dueTime !== dueTime) {
				a.dueTime = dueTime
				updated = true
			}


			if (updated || !a.canvasOriginal) {
				a.canvasOriginal = { title: assignmentTitle, dueDate, dueTime, description: "" }
				listObj.changed = true
			}
		} else {
			const newAssignment: Assignment = {
				id: Math.random().toString(36).substring(2, 9) + Date.now().toString(36),
				title: assignmentTitle,
				dueDate,
				dueTime,
				priority: "Low",
				status: "To Do",
				classId,
				type: "Assignment",
				createdAt: new Date().toISOString(),
				description: "",
				subtasks: [],
				canvasUid,
				canvasOriginal: {
					title: assignmentTitle,
					dueDate,
					dueTime,
					description: "",
				},
			}
			lists.assignments.items.push(newAssignment)
			lists.assignments.changed = true
			allAssignmentsMap.set(canvasUid, { listName: "assignments" })
		}
	}

	const batch = db.batch()

	if (classesChanged) {
		batch.set(classesDocRef, { items: classes }, { merge: true })
	}
	for (const listObj of Object.values(lists)) {
		if (listObj.changed) {
			batch.set(listObj.ref, { items: listObj.items }, { merge: true })
		}
	}

	const settingsUpdate: Record<string, unknown> = {
		"canvasIntegration.lastSyncAt": new Date().toISOString(),
		"canvasIntegration.lastSyncStatus": "success",
		"canvasIntegration.lastSyncError": null,
	}

	if (mappingsChanged) {
		settingsUpdate["canvasIntegration.courseMappings"] =
			integration.courseMappings
	}
	if (newAutoCreatedClasses.length > 0) {
		settingsUpdate["canvasIntegration.newlyAutoCreatedClasses"] =
			FieldValue.arrayUnion(...newAutoCreatedClasses)
	}

	batch.update(settingsDocRef, settingsUpdate)
	await batch.commit()
}

export const syncCanvasCalendarNow = onCall({ enforceAppCheck: true }, async (request) => {
	if (!request.auth) throw new HttpsError("unauthenticated", "Must be logged in")
	const uid = request.auth.uid

	const premium = request.auth.token.premium as Partial<PremiumClaims> | undefined
	if (!premium || (premium.academic !== true && premium.all !== true)) {
		throw new HttpsError("permission-denied", "Premium subscription required.")
	}

	const settingsDoc = await db.doc(`users/${uid}/academic/settings`).get()
	const integration = settingsDoc.data()?.canvasIntegration as
		| CanvasIntegration
		| undefined
	if (!integration) {
		throw new HttpsError("failed-precondition", "Canvas not configured")
	}

	await syncUserCanvas(uid, integration)
	return { success: true }
})

export const syncCanvasCalendars = onSchedule("every 6 hours", async () => {
	const auth = getAuth()
	let pageToken: string | undefined

	do {
		const listUsersResult = await auth.listUsers(1000, pageToken)
		pageToken = listUsersResult.pageToken

		for (const userRecord of listUsersResult.users) {
			const uid = userRecord.uid

			const premium = userRecord.customClaims?.premium as Partial<PremiumClaims> | undefined
			if (!premium || (premium.academic !== true && premium.all !== true)) {
				continue
			}

			try {
				const settingsDoc = await db.doc(`users/${uid}/academic/settings`).get()
				if (settingsDoc.exists) {
					const integration = settingsDoc.data()?.canvasIntegration as
						| CanvasIntegration
						| undefined
					if (integration?.enabled) {
						await syncUserCanvas(uid, integration)
					}
				}
			} catch (e) {
				console.error(`Error syncing user ${uid}:`, e)
			}
		}
	} while (pageToken)
})

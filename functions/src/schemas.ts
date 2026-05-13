/**
 * Runtime schema definitions for Firestore items document validation.
 * These mirror the TypeScript interfaces in packages/academic/app/types/
 * but are checkable at runtime (TS interfaces are erased at compile time).
 */

import { z } from "zod"

export type Schema = z.ZodTypeAny

// ── Assignment ──────────────────────────────────────────────────────────

export const AssignmentSchema = z.object({
	id: z.string(),
	title: z.string().max(150),
	dueDate: z.string(),
	dueTime: z.string(),
	priority: z.enum(["High", "Medium", "Low"]),
	status: z.enum(["To Do", "In Progress", "Done"]),
	classId: z.string(),
	type: z.string(),
	createdAt: z.string(),
	description: z.string().max(150),
}).strict()

// Premium assignments use the same schema for now, but will be updated in the future
export const PremiumAssignmentSchema = AssignmentSchema

// ── Class ───────────────────────────────────────────────────────────────

export const ClassSchema = z.object({
	id: z.string(),
	name: z.string(),
	color: z.string(),
	teacherName: z.string(),
	roomNumber: z.string(),
	order: z.number(),
	termId: z.string().nullable().optional(),
	semesterId: z.string().nullable().optional(),
	classDayType: z.enum(["A", "B"]).optional(),
}).strict()

// ── Event ───────────────────────────────────────────────────────────────

export const EventSchema = z.object({
	id: z.string(),
	title: z.string().max(150),
	date: z.string(),
	startTime: z.string().nullable().optional(),
	endTime: z.string().nullable().optional(),
	color: z.string(),
	createdAt: z.string(),
	description: z.string().max(150),
}).strict()

// ── NoSchoolPeriod ──────────────────────────────────────────────────────

export const NoSchoolPeriodSchema = z.object({
	id: z.string(),
	name: z.string(),
	startDate: z.string(),
	endDate: z.string(),
	createdAt: z.string(),
}).strict()

// ── AcademicTerm ───────────────────────────────────────────────────────

const QuarterSchema = z.object({
	id: z.string(),
	name: z.enum(["Q1", "Q2", "Q3", "Q4"]),
	startDate: z.string(),
	endDate: z.string(),
}).strict()

const SemesterSchema = z.object({
	id: z.string(),
	name: z.enum(["Fall", "Spring"]),
	startDate: z.string(),
	endDate: z.string(),
	quarters: z.array(QuarterSchema).optional(),
}).strict()

export const AcademicTermSchema = z.object({
	id: z.string(),
	name: z.string(),
	startDate: z.string(),
	endDate: z.string(),
	termType: z.enum(["Semesters Only", "Semesters With Quarters"]),
	scheduleType: z.enum(["alternating-ab"]),
	semesters: z.array(SemesterSchema),
}).strict()

// ── Document to Schema mapping ───────────────────────────────────────────

const PREMIUM_DOCS = new Set([
	"assignments-premium",
	"assignments-premium-archive",
])

const ITEMS_DOC_SCHEMAS: Record<string, Schema> = {
	"assignments": AssignmentSchema,
	"assignments-archive": AssignmentSchema,
	"assignments-premium": PremiumAssignmentSchema,
	"assignments-premium-archive": PremiumAssignmentSchema,
	"classes": ClassSchema,
	"events": EventSchema,
	"events-archive": EventSchema,
	"noSchool": NoSchoolPeriodSchema,
	"terms": AcademicTermSchema,
}

export const getSchemaForDoc = (docId: string): Schema | null =>
	ITEMS_DOC_SCHEMAS[docId] ?? null

export const isPremiumDoc = (docId: string): boolean =>
	PREMIUM_DOCS.has(docId)

export const isItemsDoc = (docId: string): boolean =>
	docId in ITEMS_DOC_SCHEMAS

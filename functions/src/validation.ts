import { type Schema } from "./schemas.js"

/**
 * Validates an entire items array against a Zod schema.
 * @param {unknown[]} items The items array to validate.
 * @param {Schema} schema The Zod schema to validate each item against.
 * @return {string | null} Null if valid, or the first error encountered.
 */
export const validateItems = (
	items: unknown[],
	schema: Schema
): string | null => {
	const seenIds = new Set<string>()

	for (let i = 0; i < items.length; i++) {
		const result = schema.safeParse(items[i])
		if (!result.success) {
			const issue = result.error.issues[0]
			if (!issue) return `items[${i}]: validation failed`
			const prefix = issue.path.length > 0 ?
				`items[${i}].${issue.path.join(".")}` :
				`items[${i}]`
			return `${prefix}: ${issue.message}`
		}

		const id = (items[i] as Record<string, unknown>).id
		if (typeof id === "string") {
			if (seenIds.has(id)) {
				return `items[${i}]: duplicate id "${id}"`
			}
			seenIds.add(id)
		}
	}

	return null
}

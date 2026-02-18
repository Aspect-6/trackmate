import { readFileSync } from "node:fs"
import { fileURLToPath } from "node:url"
import { dirname, join } from "node:path"

const __dirname = dirname(fileURLToPath(import.meta.url))
// Pointing to the new data location based on your current project structure
const data = JSON.parse(readFileSync(join(__dirname, "data/firestore-export.json"), "utf-8"))
const assignments = data.assignments.items

// ─── Expected shape ─────────────────────────────────────────────────────────
const REQUIRED_FIELDS = ["id", "title", "type", "status", "priority", "classId", "dueDate", "dueTime", "description", "createdAt"]
const VALID_STATUSES = ["To Do", "In Progress", "Done"]
const VALID_PRIORITIES = ["Low", "Medium", "High"]
const VALID_TYPES = new Set(data.settings.assignmentTypes)

// ─── Helpers ────────────────────────────────────────────────────────────────
const fmt = (a) => `"${a.title}" (${a.id.slice(0, 8)}…)`
const isISODate = (s) => /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}\.\d{3}Z)?$/.test(s)
const isTime = (s) => /^\d{2}:\d{2}$/.test(s)

let issueCount = 0
const warn = (msg) => { issueCount++; console.log(`  ⚠  ${msg}`) }

// ─── 1. Per-assignment validation ───────────────────────────────────────────
console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
console.log("  ASSIGNMENT ANOMALY REPORT")
console.log(`  ${assignments.length} assignments total`)
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n")

console.log("── Per-Assignment Checks ──\n")

const ids = new Set()
const classIds = new Set(data.classes.items.map(c => c.id))

for (const a of assignments) {
    const problems = []

    // Missing required fields
    for (const field of REQUIRED_FIELDS) {
        if (!(field in a)) problems.push(`missing field: "${field}"`)
    }

    // Extra / unexpected fields
    const extraFields = Object.keys(a).filter(k => !REQUIRED_FIELDS.includes(k) && k !== "subject")
    if (extraFields.length > 0) problems.push(`extra fields: [${extraFields.join(", ")}]`)

    // Legacy "subject" field (seen on some older items)
    if ("subject" in a) problems.push(`has legacy "subject" field (value: "${a.subject}")`)

    // Duplicate IDs
    if (ids.has(a.id)) problems.push(`DUPLICATE id`)
    ids.add(a.id)

    // Status validity
    if (a.status && !VALID_STATUSES.includes(a.status)) problems.push(`unknown status: "${a.status}"`)

    // Priority validity
    if (a.priority && !VALID_PRIORITIES.includes(a.priority)) problems.push(`unknown priority: "${a.priority}"`)

    // Type validity
    if (a.type && !VALID_TYPES.has(a.type) && a.type !== "No Type") problems.push(`type "${a.type}" not in settings.assignmentTypes`)

    // Class ID references valid class
    if (a.classId && !classIds.has(a.classId)) problems.push(`classId "${a.classId}" not found in classes`)

    // Date format
    if (a.dueDate && !isISODate(a.dueDate)) problems.push(`bad dueDate format: "${a.dueDate}"`)
    if (a.createdAt && !isISODate(a.createdAt)) problems.push(`bad createdAt format: "${a.createdAt}"`)

    // Time format
    if (a.dueTime && !isTime(a.dueTime)) problems.push(`bad dueTime format: "${a.dueTime}"`)

    // Due date before created date (sanity)
    if (a.dueDate && a.createdAt) {
        const due = new Date(a.dueDate)
        const created = new Date(a.createdAt)
        if (due < created && (created - due) > 7 * 24 * 60 * 60 * 1000) {
            problems.push(`dueDate (${a.dueDate}) is >7 days before createdAt (${a.createdAt})`)
        }
    }

    if (problems.length > 0) {
        console.log(`${fmt(a)}:`)
        problems.forEach(p => warn(p))
        console.log()
    }
}

// ─── 2. createdAt format inconsistency ──────────────────────────────────────
console.log("\n── createdAt Format Consistency ──\n")

const isoFull = []   // "2025-12-02T12:47:11.995Z"
const isoShort = []  // "2026-01-28"

for (const a of assignments) {
    if (!a.createdAt) continue
    if (a.createdAt.includes("T")) isoFull.push(a)
    else isoShort.push(a)
}

console.log(`  Full ISO timestamps (e.g. "2025-12-02T12:47:11.995Z"):  ${isoFull.length}`)
console.log(`  Date-only strings   (e.g. "2026-01-28"):                 ${isoShort.length}`)

if (isoFull.length > 0 && isoShort.length > 0) {
    warn(`Mixed createdAt formats detected — ${isoFull.length} full ISO vs ${isoShort.length} date-only`)

    // Find the transition point
    const sorted = [...assignments].sort((a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    )

    let transitioned = false
    for (let i = 1; i < sorted.length; i++) {
        const prev = sorted[i - 1].createdAt?.includes("T")
        const curr = sorted[i].createdAt?.includes("T")
        if (prev && !curr && !transitioned) {
            console.log(`\n  Format transition around: ${sorted[i - 1].createdAt} → ${sorted[i].createdAt}`)
            console.log(`    Last full ISO: ${fmt(sorted[i - 1])} (${sorted[i - 1].createdAt})`)
            console.log(`    First date-only: ${fmt(sorted[i])} (${sorted[i].createdAt})`)
            transitioned = true
        }
    }
}

// ─── 3. Field presence across old vs new ────────────────────────────────────
console.log("\n\n── Old vs New Assignment Schema Comparison ──\n")

const sorted = [...assignments].sort((a, b) =>
    new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
)
const mid = Math.floor(sorted.length / 2)
const olderHalf = sorted.slice(0, mid)
const newerHalf = sorted.slice(mid)

const fieldFreq = (items) => {
    const freq = {}
    for (const item of items) {
        for (const key of Object.keys(item)) {
            freq[key] = (freq[key] || 0) + 1
        }
    }
    return freq
}

const oldFreq = fieldFreq(olderHalf)
const newFreq = fieldFreq(newerHalf)
const allFields = new Set([...Object.keys(oldFreq), ...Object.keys(newFreq)])

console.log(`  Comparing older half (${olderHalf.length} items, before ${olderHalf.at(-1)?.createdAt})`)
console.log(`       vs  newer half (${newerHalf.length} items, after  ${newerHalf[0]?.createdAt})\n`)

console.log("  Field                 Older Half        Newer Half")
console.log("  ─────────────────────────────────────────────────────")
for (const field of [...allFields].sort()) {
    const oldCount = oldFreq[field] || 0
    const newCount = newFreq[field] || 0
    const oldPct = ((oldCount / olderHalf.length) * 100).toFixed(0)
    const newPct = ((newCount / newerHalf.length) * 100).toFixed(0)
    const flag = oldPct !== newPct ? " ◀" : ""
    console.log(`  ${field.padEnd(22)} ${String(oldCount).padStart(3)}/${olderHalf.length} (${oldPct.padStart(3)}%)    ${String(newCount).padStart(3)}/${newerHalf.length} (${newPct.padStart(3)}%)${flag}`)
}

// ─── 4. Value distribution changes ──────────────────────────────────────────
console.log("\n\n── Value Distribution (Old vs New) ──\n")

for (const field of ["status", "priority", "type"]) {
    const oldVals = {}
    const newVals = {}
    for (const a of olderHalf) { oldVals[a[field]] = (oldVals[a[field]] || 0) + 1 }
    for (const a of newerHalf) { newVals[a[field]] = (newVals[a[field]] || 0) + 1 }
    const allVals = new Set([...Object.keys(oldVals), ...Object.keys(newVals)])

    console.log(`  ${field}:`)
    for (const val of [...allVals].sort()) {
        console.log(`    ${(val || "(empty)").padEnd(18)} old: ${String(oldVals[val] || 0).padStart(3)}   new: ${String(newVals[val] || 0).padStart(3)}`)
    }
    console.log()
}

// ─── 5. Summary ─────────────────────────────────────────────────────────────
console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
if (issueCount === 0) {
    console.log("  ✅ No anomalies found!")
} else {
    console.log(`  ❌ ${issueCount} anomalies found`)
}
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n")

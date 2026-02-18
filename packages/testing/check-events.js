import { readFileSync } from "node:fs"
import { fileURLToPath } from "node:url"
import { dirname, join } from "node:path"

const __dirname = dirname(fileURLToPath(import.meta.url))
const data = JSON.parse(readFileSync(join(__dirname, "data/firestore-export.json"), "utf-8"))
const events = data.events.items

// ─── Expected shape ─────────────────────────────────────────────────────────
const REQUIRED_FIELDS = ["id", "title", "date", "startTime", "endTime", "color", "description", "createdAt"]
// Note: "color" is expected to be an HSL or hex string

// ─── Helpers ────────────────────────────────────────────────────────────────
const fmt = (e) => `"${e.title}" (${e.id.slice(0, 8)}…)`
const isISODate = (s) => /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}\.\d{3}Z)?$/.test(s)
const isTime = (s) => /^\d{2}:\d{2}$/.test(s)

let issueCount = 0
const warn = (msg) => { issueCount++; console.log(`  ⚠  ${msg}`) }

// ─── 1. Per-event validation ──────────────────────────────────────────────
console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
console.log("  EVENT ANOMALY REPORT")
console.log(`  ${events.length} events total`)
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n")

console.log("── Per-Event Checks ──\n")

const ids = new Set()

for (const e of events) {
    const problems = []

    // Missing required fields
    for (const field of REQUIRED_FIELDS) {
        if (!(field in e)) problems.push(`missing field: "${field}"`)
    }

    // Extra / unexpected fields
    const extraFields = Object.keys(e).filter(k => !REQUIRED_FIELDS.includes(k))
    if (extraFields.length > 0) problems.push(`extra fields: [${extraFields.join(", ")}]`)

    // Duplicate IDs
    if (ids.has(e.id)) problems.push(`DUPLICATE id`)
    ids.add(e.id)

    // Date format
    if (e.date && !isISODate(e.date)) problems.push(`bad date format: "${e.date}"`)
    if (e.createdAt && !isISODate(e.createdAt)) problems.push(`bad createdAt format: "${e.createdAt}"`)

    // Time format
    if (e.startTime && !isTime(e.startTime)) problems.push(`bad startTime format: "${e.startTime}"`)
    if (e.endTime && !isTime(e.endTime)) problems.push(`bad endTime format: "${e.endTime}"`)

    // End time before start time
    if (e.startTime && e.endTime && e.startTime > e.endTime) {
        problems.push(`startTime (${e.startTime}) is after endTime (${e.endTime})`)
    }

    // Date before created date (sanity check - events might be scheduled in past, but ideally not created *after* they happen unless backfilling)
    // Actually, events can be created for past dates, so this isn't strictly an error, maybe a warning if huge discrepancy?
    // Let's skip that for now as it's usage dependent.

    if (problems.length > 0) {
        console.log(`${fmt(e)}:`)
        problems.forEach(p => warn(p))
        console.log()
    }
}

// ─── 2. createdAt format inconsistency ──────────────────────────────────────
console.log("\n── createdAt Format Consistency ──\n")

const isoFull = []   // "2025-12-02T12:47:11.995Z"
const isoShort = []  // "2026-01-28"

for (const e of events) {
    if (!e.createdAt) continue
    if (e.createdAt.includes("T")) isoFull.push(e)
    else isoShort.push(e)
}

console.log(`  Full ISO timestamps (e.g. "2025-12-02T12:47:11.995Z"):  ${isoFull.length}`)
console.log(`  Date-only strings   (e.g. "2026-01-28"):                 ${isoShort.length}`)

if (isoFull.length > 0 && isoShort.length > 0) {
    warn(`Mixed createdAt formats detected — ${isoFull.length} full ISO vs ${isoShort.length} date-only`)

    // Find the transition point
    const sorted = [...events].sort((a, b) =>
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
console.log("\n\n── Old vs New Event Schema Comparison ──\n")

const sorted = [...events].sort((a, b) =>
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

for (const field of ["title", "color"]) {
    // Only showing top 5 for title/color to avoid spam if unique
    const oldVals = {}
    const newVals = {}
    for (const e of olderHalf) { oldVals[e[field]] = (oldVals[e[field]] || 0) + 1 }
    for (const e of newerHalf) { newVals[e[field]] = (newVals[e[field]] || 0) + 1 }

    // Check if high cardinality
    const allVals = new Set([...Object.keys(oldVals), ...Object.keys(newVals)])

    console.log(`  ${field} (Top 10):`)
    const sortedVals = [...allVals].sort((a, b) => ((oldVals[b] || 0) + (newVals[b] || 0)) - ((oldVals[a] || 0) + (newVals[a] || 0))).slice(0, 10)

    for (const val of sortedVals) {
        console.log(`    ${(val.slice(0, 20) || "(empty)").padEnd(22)} old: ${String(oldVals[val] || 0).padStart(3)}   new: ${String(newVals[val] || 0).padStart(3)}`)
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

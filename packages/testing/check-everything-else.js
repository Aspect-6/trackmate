import { readFileSync } from "node:fs"
import { fileURLToPath } from "node:url"
import { dirname, join } from "node:path"

const __dirname = dirname(fileURLToPath(import.meta.url))
const data = JSON.parse(readFileSync(join(__dirname, "data/firestore-export.json"), "utf-8"))

let issueCount = 0
const warn = (msg) => { issueCount++; console.log(`  ⚠  ${msg}`) }
const isISODate = (s) => /^\d{4}-\d{2}-\d{2}$/.test(s)
const isHSL = (s) => /^hsl\(\d+, \d+%, \d+%\)$/.test(s)

console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
console.log("  TOTAL PROJECT ANOMALY REPORT")
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n")

// ─── 1. Classes ─────────────────────────────────────────────────────────────
console.log("── Classes Checks ──")
const classes = data.classes.items
const classIds = new Set(classes.map(c => c.id))
const termIds = new Set(data.terms.items.map(t => t.id))

for (const c of classes) {
    const p = []
    if (!c.id) p.push("missing id")
    if (!c.name) p.push("missing name")
    if (!isHSL(c.color)) p.push(`invalid color: ${c.color}`)
    if (typeof c.order !== "number") p.push(`invalid order: ${c.order}`)
    if (!termIds.has(c.termId)) p.push(`orphaned termId: ${c.termId}`)

    if (p.length > 0) {
        console.log(`Class "${c.name}" (${c.id?.slice(0, 8)}):`)
        p.forEach(msg => warn(msg))
    }
}
console.log(`  Processed ${classes.length} classes.\n`)

// ─── 2. NoSchool ───────────────────────────────────────────────────────────
console.log("── No-School Checks ──")
const noSchool = data.noSchool.items
for (const ns of noSchool) {
    const p = []
    if (!isISODate(ns.startDate)) p.push(`invalid startDate: ${ns.startDate}`)
    if (!isISODate(ns.endDate)) p.push(`invalid endDate: ${ns.endDate}`)
    if (!isISODate(ns.createdAt)) p.push(`invalid createdAt: ${ns.createdAt}`)
    if (ns.startDate > ns.endDate) p.push(`startDate (${ns.startDate}) is after endDate (${ns.endDate})`)

    if (p.length > 0) {
        console.log(`No-School "${ns.name}" (${ns.id?.slice(0, 8)}):`)
        p.forEach(msg => warn(msg))
    }
}
console.log(`  Processed ${noSchool.length} no-school periods.\n`)

// ─── 3. Schedules ──────────────────────────────────────────────────────────
console.log("── Schedules Checks ──")
const schedule = data.schedules
if (schedule.type !== "alternating-ab") warn(`unknown schedule type: ${schedule.type}`)
const ab = schedule["alternating-ab"]
for (const [termId, config] of Object.entries(ab.termConfigs)) {
    if (!termIds.has(termId)) warn(`schedule has config for missing termId: ${termId}`)
    if (!["A", "B"].includes(config.startDayType)) warn(`invalid startDayType: ${config.startDayType}`)
}
// Validate class IDs in schedule
for (const termKey of Object.keys(ab.terms)) {
    const semesters = ab.terms[termKey]
    for (const semesterKey of Object.keys(semesters)) {
        const days = semesters[semesterKey].days
        for (const day of days) {
            for (const classId of day.classes) {
                if (!classIds.has(classId)) warn(`schedule term ${termKey} semester ${semesterKey} day ${day.dayLabel} references missing classId: ${classId}`)
            }
        }
    }
}
console.log(`  Schedules validated.\n`)

// ─── 4. Settings & Templates ─────────────────────────────────────────────
console.log("── Settings & Templates Checks ──")
const settings = data.settings
const templates = settings.assignmentTemplates
for (const t of templates) {
    const p = []
    if (!classIds.has(t.classId)) p.push(`references missing classId: ${t.classId}`)
    if (!isISODate(t.createdAt)) p.push(`invalid createdAt: ${t.createdAt}`)
    if (!settings.assignmentTypes.includes(t.type)) p.push(`unknown assignment type: ${t.type}`)

    if (p.length > 0) {
        console.log(`Template "${t.templateName}" (${t.id?.slice(0, 8)}):`)
        p.forEach(msg => warn(msg))
    }
}
console.log(`  Processed ${templates.length} templates.\n`)

// ─── 5. Terms & Semesters ────────────────────────────────────────────────
console.log("── Terms & Semesters Checks ──")
const terms = data.terms.items
for (const t of terms) {
    const p = []
    if (!isISODate(t.startDate)) p.push(`invalid startDate: ${t.startDate}`)
    if (!isISODate(t.endDate)) p.push(`invalid endDate: ${t.endDate}`)
    if (t.startDate > t.endDate) p.push(`term starts after it ends`)

    for (const sem of t.semesters) {
        if (sem.startDate < t.startDate || sem.endDate > t.endDate) p.push(`semester "${sem.name}" is outside term bounds`)
        if (sem.startDate > sem.endDate) p.push(`semester "${sem.name}" starts after it ends`)

        if (sem.quarters) {
            for (const q of sem.quarters) {
                if (q.startDate < sem.startDate || q.endDate > sem.endDate) p.push(`quarter "${q.name}" is outside semester "${sem.name}" bounds`)
            }
        }
    }

    if (p.length > 0) {
        console.log(`Term "${t.name}" (${t.id?.slice(0, 8)}):`)
        p.forEach(msg => warn(msg))
    }
}
console.log(`  Processed ${terms.length} terms.\n`)

// ─── Global Consistency ──────────────────────────────────────────────────
console.log("── Global Consistency Checks ──")
const allIds = new Map()
const checkUniqueness = (items, source) => {
    if (!items) return
    for (const item of items) {
        if (allIds.has(item.id)) {
            warn(`DUPLICATE ID "${item.id}" found in ${source} and ${allIds.get(item.id)}`)
        }
        allIds.set(item.id, source)
    }
}

checkUniqueness(data.assignments.items, "assignments")
checkUniqueness(data.events.items, "events")
checkUniqueness(data.classes.items, "classes")
checkUniqueness(data.noSchool.items, "noSchool")
checkUniqueness(data.terms.items, "terms")
checkUniqueness(data.settings.assignmentTemplates, "templates")

console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
if (issueCount === 0) {
    console.log("  ✅ No anomalies found in other collections!")
} else {
    console.log(`  ❌ ${issueCount} anomalies found`)
}
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n")

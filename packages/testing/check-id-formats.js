import { readFileSync } from "node:fs"
import { fileURLToPath } from "node:url"
import { dirname, join } from "node:path"

const __dirname = dirname(fileURLToPath(import.meta.url))
const data = JSON.parse(readFileSync(join(__dirname, "data/firestore-export.json"), "utf-8"))

const isUUID = (s) => /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(s)
const isCustomId = (s) => /^[a-z0-9_]+$/.test(s) && s.length >= 10 && s.length <= 25

const checkCollection = (name, items) => {
    if (!items) return
    console.log(`\n── ${name} (${items.length} items) ──`)
    const stats = { uuid: 0, custom: 0, unknown: 0 }
    for (const item of items) {
        if (isUUID(item.id)) stats.uuid++
        else if (isCustomId(item.id)) stats.custom++
        else stats.unknown++
    }
    console.log(`  UUIDs:   ${stats.uuid}`)
    console.log(`  Custom:  ${stats.custom}`)
    if (stats.unknown > 0) console.log(`  Unknown: ${stats.unknown}`)

    if (stats.unknown > 0) {
        const unknown = items.find(i => !isUUID(i.id) && !isCustomId(i.id))
        console.log(`  Example Unknown: "${unknown.id}"`)
    }
}

console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
console.log("  ID FORMAT ANALYSIS REPORT")
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")

checkCollection("Assignments", data.assignments.items)
checkCollection("Events", data.events.items)
checkCollection("Classes", data.classes.items)
checkCollection("NoSchool", data.noSchool.items)
checkCollection("Terms", data.terms.items)
checkCollection("Templates", data.settings.assignmentTemplates)

console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n")

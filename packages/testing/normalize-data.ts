import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { generateId } from "../shared/lib/id";

const __dirname = dirname(fileURLToPath(import.meta.url));
const filePath = join(__dirname, "data/firestore-export.json");
const data = JSON.parse(readFileSync(filePath, "utf-8"));

// ─── ID Consistency Logic ──────────────────────────────────────────────────
const isUUID = (s: string) => /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(s);

// ─── Key Sorting Logic ──────────────────────────────────────────────────────
const PREFERRED_ORDER = [
    "id",
    "title",
    "classId",
    "type",
    "status",
    "priority",
    "date",
    "startDate",
    "endDate",
    "dueDate",
    "startTime",
    "endTime",
    "dueTime",
    "description",
    "color",
    "createdAt"
];

const sortKeys = (obj: any): any => {
    if (Array.isArray(obj)) {
        return obj.map(sortKeys);
    } else if (obj !== null && typeof obj === "object") {
        const keys = Object.keys(obj).sort((a, b) => {
            const indexA = PREFERRED_ORDER.indexOf(a);
            const indexB = PREFERRED_ORDER.indexOf(b);
            if (indexA !== -1 && indexB !== -1) return indexA - indexB;
            if (indexA !== -1) return -1;
            if (indexB !== -1) return 1;
            return a.localeCompare(b);
        });
        const newObj: any = {};
        for (const key of keys) {
            newObj[key] = sortKeys(obj[key]);
        }
        return newObj;
    }
    return obj;
};

// ─── Normalization Logic ────────────────────────────────────────────────────
let modifiedCount = 0;

const normalizeItems = (items: any[] | undefined) => {
    if (!items) return;
    for (const item of items) {
        // Fix createdAt dates
        if (item.createdAt && item.createdAt.includes("T")) {
            item.createdAt = item.createdAt.split("T")[0];
            modifiedCount++;
        }

        // Normalize IDs (convert UUIDs or temp IDs to custom format using official generator)
        if (item.id && (isUUID(item.id) || item.id.startsWith("tmp_"))) {
            item.id = generateId();
            modifiedCount++;
        }

        // Remove legacy empty "subject" if present
        if ("subject" in item && item.subject === "") {
            delete item.subject;
            modifiedCount++;
        }
    }
};

// Normalize all relevant collections
normalizeItems(data.assignments?.items);
normalizeItems(data.events?.items);
normalizeItems(data.noSchool?.items);
normalizeItems(data.settings?.assignmentTemplates);

// Always sort keys for consistency
const sortedData = sortKeys(data);

// Write back to file with tab indentation
writeFileSync(filePath, JSON.stringify(sortedData, null, "\t"));

console.log(`Normalized ${modifiedCount} values and sorted all keys in firestore-export.json.`);

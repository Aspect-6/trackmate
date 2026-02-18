import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const data = JSON.parse(readFileSync(join(__dirname, "data/firestore-export.json"), "utf-8"));

let errorCount = 0;
const logError = (path: string, value: any, message: string) => {
    errorCount++;
    console.log(`  ❌ [${path}]: "${value}" -> ${message}`);
};

const ID_REGEX = /^[a-z0-9_]{10,25}$/;
const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

const DATE_FIELDS = new Set(["createdAt", "date", "dueDate", "startDate", "endDate"]);

/**
 * Recursively validates all IDs and Dates in the JSON structure.
 */
const validate = (obj: any, path: string = "root") => {
    if (Array.isArray(obj)) {
        obj.forEach((item, index) => validate(item, `${path}[${index}]`));
    } else if (obj !== null && typeof obj === "object") {
        for (const [key, value] of Object.entries(obj)) {
            const currentPath = `${path}.${key}`;

            // Check IDs (any field named 'id' or ending in 'Id')
            if (key === "id" || key.endsWith("Id")) {
                if (typeof value !== "string") {
                    logError(currentPath, value, "ID must be a string");
                } else if (!ID_REGEX.test(value)) {
                    logError(currentPath, value, "Value does not match project ID format (alphanumeric, 10-25 chars)");
                }
            }

            // Check Dates
            if (DATE_FIELDS.has(key)) {
                if (typeof value !== "string") {
                    logError(currentPath, value, "Date must be a string");
                } else if (!DATE_REGEX.test(value)) {
                    logError(currentPath, value, "Value does not match Date-only ISO format (YYYY-MM-DD)");
                }
            }

            // Recurse
            validate(value, currentPath);
        }
    }
};

console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log("  GLOBAL DATA VALIDATION");
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

validate(data);

console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
if (errorCount === 0) {
    console.log("  ✅ SUCCESS: All IDs and Dates are valid!");
} else {
    console.log(`  ❌ FAILURE: ${errorCount} formatting errors found.`);
}
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

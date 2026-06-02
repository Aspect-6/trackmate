import React, { useState, useCallback } from "react"
import { collection, getDocs } from "firebase/firestore"
import { db, auth } from "@shared/lib"
import { Download } from "lucide-react"
import ThemeSettings from "@/pages/Settings/components/ThemeSettings"
import AssignmentTypeSettings from "@/pages/Settings/components/AssignmentTypeSettings"
import TemplateSettings from "@/pages/Settings/components/TemplateSettings"
import TermSettings from "@/pages/Settings/components/TermSettings"
import ScheduleSettings from "@/pages/Settings/components/ScheduleSettings"
import CanvasIntegrationSettings from "@/pages/Settings/components/CanvasIntegrationSettings"
import DangerZoneSettings from "@/pages/Settings/components/DangerZone"
import AppInfoFooter from "@/pages/Settings/components/AppInfoFooter"
import "./index.css"

const Settings: React.FC = () => {
    return (
        <div className="w-full max-w-2xl mx-auto">
            <ThemeSettings />

            <AssignmentTypeSettings />

            <TemplateSettings />

            <TermSettings />

            <ScheduleSettings />

            <CanvasIntegrationSettings />

            <DangerZoneSettings />

            {/* DEV ONLY: Export all Firestore data */}
            <ExportFirestoreButton />

            <AppInfoFooter />
        </div>
    )
}

const ExportFirestoreButton: React.FC = () => {
    const [exporting, setExporting] = useState(false)

    const handleExport = useCallback(async () => {
        const user = auth.currentUser
        if (!user) {
            alert("Not logged in")
            return
        }

        setExporting(true)
        try {
            const academicRef = collection(db, "users", user.uid, "academic")
            const snapshot = await getDocs(academicRef)

            const data: Record<string, unknown> = {}
            snapshot.forEach(docSnap => {
                data[docSnap.id] = docSnap.data()
            })

            const blob = new Blob(
                [JSON.stringify(data, null, 2)],
                { type: "application/json" }
            )
            const url = URL.createObjectURL(blob)

            const a = document.createElement("a")
            a.href = url
            a.download = `trackmate-export-${new Date().toISOString().slice(0, 10)}.json`
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)
            URL.revokeObjectURL(url)
        } catch (err) {
            console.error("Export failed:", err)
            alert("Export failed — check console")
        } finally {
            setExporting(false)
        }
    }, [])

    return (
        <div style={{
            margin: "32px 0 16px",
            padding: "16px",
            border: "2px dashed #f59e0b",
            borderRadius: "12px",
            background: "rgba(245, 158, 11, 0.06)"
        }}>
            <div style={{ fontSize: "12px", color: "#f59e0b", fontWeight: 600, marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Dev Tool
            </div>
            <button
                onClick={handleExport}
                disabled={exporting}
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "10px 20px",
                    background: exporting ? "#6b7280" : "#f59e0b",
                    color: "#fff",
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "14px",
                    fontWeight: 600,
                    cursor: exporting ? "not-allowed" : "pointer",
                    transition: "background 0.2s",
                    width: "100%",
                    justifyContent: "center"
                }}
            >
                <Download size={16} />
                {exporting ? "Exporting…" : "Export All Firestore Data"}
            </button>
        </div>
    )
}

export default Settings

import React from "react"
import { useClasses, useAcademicTerms } from "@/app/hooks/entities"
import type { CanvasIntegrationSettings } from "@/pages/Settings/types"
import { SETTINGS } from "@/app/styles/colors"

const CourseMappingTable: React.FC<CanvasIntegrationSettings.CourseMappingTableProps> = ({ termId, mappings, onMappingChange }) => {
    const { classes } = useClasses()
    const { getTermById } = useAcademicTerms()

    if (!mappings || mappings.length === 0) {
        return null
    }

    return (
        <div className="overflow-x-auto custom-scrollbar p-1">
            <div
                className="overflow-x-hidden shadow-sm rounded-lg w-full min-w-max"
                style={{ border: `1px solid ${SETTINGS.BORDER_PRIMARY}` }}
            >
                <table
                    className="w-full border-separate border-spacing-0"
                >
                    <thead>
                        <tr style={{ backgroundColor: SETTINGS.BACKGROUND_SECONDARY }}>
                            <th
                                className="p-3 text-left font-semibold text-sm w-1/2"
                                style={{
                                    color: SETTINGS.TEXT_SECONDARY,
                                    borderBottom: `1px solid ${SETTINGS.BORDER_PRIMARY}`,
                                    borderRight: `1px solid ${SETTINGS.BORDER_PRIMARY}`,
                                }}
                            >
                                Canvas Course
                            </th>
                            <th
                                className="p-3 text-left font-semibold text-sm w-1/2"
                                style={{
                                    color: SETTINGS.TEXT_SECONDARY,
                                    borderBottom: `1px solid ${SETTINGS.BORDER_PRIMARY}`,
                                }}
                            >
                                TrackMate Class
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {mappings.map((mapping, idx) => (
                            <tr key={idx}>
                                <td
                                    className="p-3 font-medium text-sm"
                                    style={{
                                        color: SETTINGS.TEXT_PRIMARY,
                                        borderBottom: idx < mappings.length - 1 ? `1px solid ${SETTINGS.BORDER_PRIMARY}` : "none",
                                        borderRight: `1px solid ${SETTINGS.BORDER_PRIMARY}`
                                    }}
                                >
                                    {mapping.canvasCourseName}
                                </td>
                                <td
                                    className="p-3"
                                    style={{
                                        borderBottom: idx < mappings.length - 1
                                            ? `1px solid ${SETTINGS.BORDER_PRIMARY}`
                                            : "none",
                                    }}
                                >
                                    <select
                                        className="app-select-dropdown w-full"
                                        style={{ color: SETTINGS.TEXT_PRIMARY, backgroundColor: SETTINGS.BACKGROUND_PRIMARY }}
                                        value={mapping.classId}
                                        onChange={(e) => onMappingChange(idx, e.target.value)}
                                    >
                                        <option value="IGNORE">Do Not Sync</option>
                                        <optgroup label={getTermById(termId)?.name || "Classes in Term"}>
                                            {classes.filter(c => c.termId === termId).map(c => (
                                                <option key={c.id} value={c.id}>{c.name}</option>
                                            ))}
                                        </optgroup>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default CourseMappingTable

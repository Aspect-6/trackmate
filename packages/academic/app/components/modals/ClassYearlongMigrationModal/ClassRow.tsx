import React from "react"
import { MODALS, GLOBAL } from "@/app/styles/colors"

interface ClassRowProps {
    name: string
    color: string
    teacherName: string
    roomNumber: string
    semesterLabel: string
}

const ClassRow: React.FC<ClassRowProps> = ({ name, color, teacherName, roomNumber, semesterLabel }) => {
    return (
        <div
            className="relative overflow-hidden rounded-xl"
            style={{
                backgroundColor: GLOBAL.BACKGROUND_PRIMARY,
                border: `1px solid ${MODALS.BASE.BORDER}`,
            }}
        >
            <div
                className="absolute left-0 top-0 bottom-0 w-1.5"
                style={{ backgroundColor: color }}
            />

            <div className="flex items-center justify-between p-4 pl-5">
                <div className="flex flex-col gap-0.5">
                    <span
                        className="font-bold text-base leading-tight"
                        style={{ color: GLOBAL.TEXT_PRIMARY }}
                    >
                        {name}
                    </span>
                    {(teacherName || roomNumber) && (
                        <span
                            className="text-sm opacity-75"
                            style={{ color: GLOBAL.TEXT_SECONDARY }}
                        >
                            {[teacherName, roomNumber]
                                .filter(Boolean)
                                .join(" • ")}
                        </span>
                    )}
                </div>

                <span
                    className="text-sm font-medium px-3 py-1 rounded-md"
                    style={{
                        color: GLOBAL.TEXT_SECONDARY,
                        backgroundColor: GLOBAL.BACKGROUND_SECONDARY,
                    }}
                >
                    {semesterLabel}
                </span>
            </div>
        </div>
    )
}

export default ClassRow

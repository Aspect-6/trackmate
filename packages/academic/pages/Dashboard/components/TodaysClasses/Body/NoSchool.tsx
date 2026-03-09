import React from "react"
import type { TodaysClasses } from "@/pages/Dashboard/types"
import { DASHBOARD } from "@/app/styles/colors"

const NoSchool: React.FC<TodaysClasses.Body.NoSchoolProps> = ({ noSchool }) => {
    return (
        <div className="text-center py-6 flex flex-col items-center justify-center h-full">
            <p className="font-semibold text-lg mb-1" style={{ color: DASHBOARD.TEXT_DANGER }}>No School</p>
            <p style={{ color: DASHBOARD.TEXT_SECONDARY }}>{noSchool.name}</p>
        </div>
    )
}

export default NoSchool

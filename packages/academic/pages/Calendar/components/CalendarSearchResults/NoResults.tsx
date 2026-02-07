import React from "react"
import { CALENDAR } from "@/app/styles/colors"

const NoResults: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center p-8 text-center h-64">
            <p style={{ color: CALENDAR.TEXT_TERTIARY }}>No results found</p>
        </div>
    )
}

export default NoResults

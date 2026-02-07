import React from "react"
import { formatDate } from "@shared/lib"
import { CALENDAR } from "@/app/styles/colors"

export interface SearchResultItemProps {
    item: {
        type: "assignment" | "event"
        id: string
        title: string
        date: string
        subtext: string
        color: string
    }
    onClick: (date: Date) => void
}

const SearchResultItem: React.FC<SearchResultItemProps> = ({ item, onClick }) => {
    const dateObj = new Date(item.date + "T12:00:00")

    return (
        <div
            onClick={() => onClick(dateObj)}
            className="p-3 rounded-lg cursor-pointer flex items-center gap-3 transition-colors active:scale-[0.98]"
            style={{
                backgroundColor: CALENDAR.BACKGROUND_SECONDARY,
                border: `1px solid ${CALENDAR.BORDER_PRIMARY}`,
                borderLeft: `4px solid ${item.color}`
            }}
        >
            <div className="flex-1 min-w-0">
                <h4 className="font-semibold truncate text-base" style={{ color: CALENDAR.TEXT_PRIMARY }}>
                    {item.title}
                </h4>
                <div className="flex items-center gap-2 text-sm mt-0.5" style={{ color: CALENDAR.TEXT_SECONDARY }}>
                    <span>{formatDate("short", item.date)}</span>
                    <span>•</span>
                    <span className="truncate">{item.subtext}</span>
                </div>
            </div>
        </div>
    )
}

export default React.memo(SearchResultItem)

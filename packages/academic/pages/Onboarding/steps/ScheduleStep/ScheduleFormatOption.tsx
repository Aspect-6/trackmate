import React from "react"
import { useHover } from "@shared/hooks/ui/useHover"
import { ScheduleType } from "@/app/types"
import { GLOBAL, MODALS } from "@/app/styles/colors"

interface ScheduleFormatOptionProps {
    format: { value: string; title: string; description: string }
    selectedFormat: ScheduleType
    setSelectedFormat: (format: ScheduleType) => void
}

export const ScheduleFormatOption: React.FC<ScheduleFormatOptionProps> = ({ format, selectedFormat, setSelectedFormat }) => {
    const { isHovered, hoverProps } = useHover()
    
    return (
        <button
            type="button"
            onClick={() => setSelectedFormat(format.value as ScheduleType)}
            className="w-full text-left p-3 sm:p-4 rounded-xl border transition-all h-full flex flex-col justify-start items-start"
            style={{
                backgroundColor: selectedFormat === format.value 
                    ? MODALS.ACADEMICTERM.PRIMARY_BG 
                    : isHovered ? GLOBAL.BACKGROUND_TERTIARY : GLOBAL.BACKGROUND_PRIMARY,
                borderColor: selectedFormat === format.value ? MODALS.ACADEMICTERM.PRIMARY_BG : GLOBAL.BORDER_PRIMARY,
            }}
            {...hoverProps}
        >
            <div 
                className="font-bold text-base sm:text-lg"
                style={{ color: selectedFormat === format.value ? MODALS.ACADEMICTERM.PRIMARY_TEXT : GLOBAL.TEXT_PRIMARY }}
            >
                {format.title}
            </div>
            <div 
                className={`text-xs sm:text-sm mt-1 sm:mt-1.5 transition-opacity ${selectedFormat === format.value ? "opacity-90" : "opacity-60"}`}
                style={{ color: selectedFormat === format.value ? MODALS.ACADEMICTERM.PRIMARY_TEXT : GLOBAL.TEXT_PRIMARY }}
            >
                {format.description}
            </div>
        </button>
    )
}

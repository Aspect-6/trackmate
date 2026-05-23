import React from "react"
import { useHover } from "@shared/hooks/ui/useHover"
import { MODALS } from "@/app/styles/colors"

interface SemesterToggleProps {
    semester: "Fall" | "Spring"
    onClick: () => void
}

const SemesterToggle: React.FC<SemesterToggleProps> = ({ semester, onClick }) => {
    const { isHovered, hoverProps } = useHover()
    const isFall = semester === "Fall"

    const bg = isFall ? MODALS.CLASS.PRIMARY_BG : MODALS.EVENT.PRIMARY_BG
    const bgHover = isFall ? MODALS.CLASS.PRIMARY_BG_HOVER : MODALS.EVENT.PRIMARY_BG_HOVER
    const bgDefault = isFall
        ? "var(--class-theme-18, rgba(139, 92, 246, 0.18))"
        : "var(--event-theme-18, rgba(59, 130, 246, 0.18))"

    return (
        <button
            type="button"
            onClick={onClick}
            className="px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors duration-200 flex-shrink-0 ml-4"
            style={{
                backgroundColor: isHovered ? bgHover : bgDefault,
                color: isHovered ? MODALS.CLASS.PRIMARY_TEXT : (isFall ? MODALS.CLASS.HEADING : MODALS.EVENT.HEADING),
                border: `1px solid ${bg}`,
            }}
            {...hoverProps}
        >
            {semester}
        </button>
    )
}

export default SemesterToggle

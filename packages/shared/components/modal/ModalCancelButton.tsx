import React from "react"
import { useHover } from "@shared/hooks/ui/useHover"
import { TRACKMATE_MODALS } from "@shared/styles/colors"

export interface ModalCancelButtonProps {
    onClick: () => void
    children?: React.ReactNode
    inline?: boolean
    className?: string
}

export const ModalCancelButton: React.FC<ModalCancelButtonProps> = ({
    onClick,
    children = "Cancel",
    inline = true,
    className = "",
}) => {
    const { isHovered, hoverProps } = useHover()

    return (
        <button
            type="button"
            onClick={onClick}
            className={`modal-btn ${className}`.trim()}
            style={{
                backgroundColor: isHovered ? TRACKMATE_MODALS.BASE.CANCEL_BG_HOVER : TRACKMATE_MODALS.BASE.CANCEL_BG,
                color: TRACKMATE_MODALS.BASE.CANCEL_TEXT,
                border: `1px solid ${TRACKMATE_MODALS.BASE.CANCEL_BORDER}`,
                width: inline ? "auto" : undefined,
                fontWeight: "500"
            }}
            {...hoverProps}
        >
            {children}
        </button>
    )
}

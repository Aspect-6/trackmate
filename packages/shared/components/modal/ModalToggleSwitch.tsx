import React from "react"
import { TRACKMATE } from "@shared/styles/colors"

export interface ModalToggleSwitchProps {
    checked: boolean
    onChange: (checked: boolean) => void
    activeColor?: string
    inactiveColor?: string
    thumbColor?: string
    className?: string
}

export const ModalToggleSwitch: React.FC<ModalToggleSwitchProps> = ({
    checked,
    onChange,
    activeColor = TRACKMATE.GLOBAL_ACCENT,
    inactiveColor = TRACKMATE.BORDER_PRIMARY,
    thumbColor = TRACKMATE.TEXT_WHITE,
    className = ""
}) => {
    return (
        <button
            type="button"
            role="switch"
            aria-checked={checked}
            onClick={() => onChange(!checked)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${className}`.trim()}
            style={{
                backgroundColor: checked ? activeColor : inactiveColor
            }}
        >
            <span
                className={`inline-block h-5 w-5 transform rounded-full transition-transform`}
                style={{
                    backgroundColor: thumbColor,
                    transform: checked ? "translateX(22px)" : "translateX(2px)"
                }}
            />
        </button>
    )
}

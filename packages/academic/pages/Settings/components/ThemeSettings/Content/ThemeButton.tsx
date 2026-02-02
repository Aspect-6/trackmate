import React from "react"
import { useHover } from "@shared/hooks/ui/useHover"
import type { ThemeSettings } from "@/pages/Settings/types"
import { SETTINGS } from "@/app/styles/colors"

const ThemeButton: React.FC<ThemeSettings.Content.ThemeButtonProps> = ({
    label,
    description,
    Icon,
    active,
    onClick
}) => {
    const { isHovered, hoverProps } = useHover()

    return (
        <button
            type="button"
            className="flex items-center py-3.5 px-4 rounded-xl transition-all duration-300"
            style={{
                color: active ? SETTINGS.TEXT_WHITE : SETTINGS.TEXT_PRIMARY,
                border: `1px solid ${(isHovered || active) ? SETTINGS.GLOBAL_ACCENT : SETTINGS.BORDER_PRIMARY}`,
                backgroundColor: active
                    ? SETTINGS.GLOBAL_ACCENT
                    : isHovered
                        ? SETTINGS.BACKGROUND_QUATERNARY
                        : SETTINGS.BACKGROUND_SECONDARY
            }}
            onClick={onClick}
            {...hoverProps}
        >
            <Icon
                className="w-5 h-5 mr-3 transition-colors duration-300"
                style={{ color: active ? SETTINGS.TEXT_WHITE : SETTINGS.GLOBAL_ACCENT }}
            />
            <div className="text-left">
                <div className="font-semibold leading-tight">{label}</div>
                <div className="text-xs opacity-90">{description}</div>
            </div>
        </button>
    )
}

export default ThemeButton

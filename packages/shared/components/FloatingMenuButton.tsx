import React from "react"
import { Menu, X } from "lucide-react"
import { useHover } from "@shared/hooks/ui/useHover"
import { TRACKMATE } from "@shared/styles/colors"

interface FloatingMenuButtonProps {
    onClick: () => void
    isOpen?: boolean
    backgroundColor: string
    hoverColor: string
}

const FloatingMenuButton: React.FC<FloatingMenuButtonProps> = ({
    onClick,
    isOpen = false,
    backgroundColor,
    hoverColor,
}) => {
    const { isHovered, hoverProps } = useHover()

    const leftPosition = isOpen ? "calc(100% - 3.5rem - 1.5rem)" : "1.5rem"

    return (
        <button
            onClick={onClick}
            className={`lg:hidden fixed bottom-6 w-14 h-14 rounded-full shadow-lg inset-shadow flex items-center justify-center transition-all duration-300 ease-in-out active:scale-95`}
            style={{
                backgroundColor: isHovered ? hoverColor : backgroundColor,
                color: TRACKMATE.TEXT_WHITE,
                left: leftPosition,
                zIndex: 60
            }}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            {...hoverProps}
        >
            <div className="transition-transform duration-300" style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}>
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </div>
        </button>
    )
}

export default FloatingMenuButton

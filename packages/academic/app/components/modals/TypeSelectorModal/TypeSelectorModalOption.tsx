import { GLOBAL } from "@/app/styles/colors"
import { useHover } from "@shared/hooks/ui/useHover"

interface OptionButtonProps {
    onClick: () => void
    icon: React.ReactNode
    label: string
    bg: string
    bgHover: string
}

const OptionButton: React.FC<OptionButtonProps> = ({ onClick, icon, label, bg, bgHover }) => {
    const { isHovered, hoverProps } = useHover()

    return (
        <button
            onClick={onClick}
            className="modal-btn"
            style={{
                backgroundColor: isHovered ? bgHover : bg,
                color: GLOBAL.TEXT_PRIMARY
            }}
            {...hoverProps}
        >
            {icon}
            <span className="ml-3">{label}</span>
        </button>
    )
}

export default OptionButton

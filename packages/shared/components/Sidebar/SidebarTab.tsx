import React from 'react'
import { NavLink } from 'react-router-dom'
import type { LucideIcon } from 'lucide-react'
import { TRACKMATE } from '../../styles/colors'
import { useHover } from '../../hooks/ui/useHover'

interface SidebarTabProps {
    label: string
    icon: LucideIcon
    to?: string
    onClick?: () => void
    isActive: boolean
    accentColor: string
    hoverColor: string
}

const SidebarTab: React.FC<SidebarTabProps> = ({
    label,
    icon: Icon,
    to,
    onClick,
    isActive,
    accentColor,
    hoverColor
}) => {
    const { isHovered, hoverProps } = useHover()
    const baseClasses = "w-full flex items-center p-3 rounded-lg font-medium transition duration-150"

    if (to) {
        return (
            <NavLink
                to={to}
                onClick={onClick}
                {...hoverProps}
                style={({ isActive: linkActive }) => {
                    const active = isActive || linkActive
                    return {
                        backgroundColor: active ? accentColor : (isHovered ? hoverColor : 'transparent'),
                        color: active ? undefined : TRACKMATE.TEXT_PRIMARY
                    }
                }}
                className={({ isActive: linkActive }) =>
                    `${baseClasses} ${(isActive || linkActive) && "active text-white"}`
                }
            >
                <Icon className="w-5 h-5 mr-3" />
                {label}
            </NavLink>
        )
    }

    return (
        <button
            onClick={onClick}
            {...hoverProps}
            className={`${baseClasses} ${isActive && "text-white"}`}
            style={{
                backgroundColor: isActive ? accentColor : (isHovered ? hoverColor : 'transparent'),
                color: !isActive ? TRACKMATE.TEXT_PRIMARY : undefined
            }}
        >
            <Icon className="w-5 h-5 mr-3" />
            {label}
        </button>
    )
}

export default SidebarTab

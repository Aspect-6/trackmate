import React, { useEffect } from 'react'
import { useHover } from '@/app/hooks/useHover'
import type { UpcomingAssignments } from '@/pages/Dashboard/types'
import { cn } from '@/app/lib/utils'
import { CheckCircle, Circle, PlayCircle } from 'lucide-react'
import { DASHBOARD } from '@/app/styles/colors'

const STATUS_CONFIG = {
    'To Do': {
        Icon: PlayCircle,
        color: DASHBOARD.ICON_PLAY_DEFAULT,
        hoverColor: DASHBOARD.ICON_PLAY_HOVER,
        title: "Start Assignment",
        className: undefined
    },
    'In Progress': {
        Icon: Circle,
        color: DASHBOARD.ICON_IN_PROGRESS,
        hoverColor: DASHBOARD.ICON_IN_PROGRESS_HOVER,
        title: "Mark as Done",
        className: undefined
    },
    'Completing': {
        Icon: CheckCircle,
        color: DASHBOARD.ICON_COMPLETE,
        hoverColor: DASHBOARD.ICON_COMPLETE,
        title: "Completing...",
        className: "scale-110 animate-pulse"
    }
}

const StatusButton: React.FC<UpcomingAssignments.AssignmentCard.StatusButtonProps> = ({ status, isCompleting, onClick }) => {
    const { isHovered, hoverProps, resetHover } = useHover()

    useEffect(() => { resetHover() }, [status, isCompleting, resetHover])

    const configKey = isCompleting ? 'Completing' : status
    const config = STATUS_CONFIG[configKey as keyof typeof STATUS_CONFIG]
    if (!config) return null

    const { Icon, color, hoverColor, title, className } = config

    return (
        <button
            type="button"
            onClick={onClick}
            className="group/status focus:outline-none transition-all flex-shrink-0 rounded-full p-1 hover:bg-neutral-500/5 active:scale-90"
            title={title}
            aria-label={title}
        >
            <Icon
                className={cn(
                    "w-6 h-6 transition-colors duration-200",
                    className
                )}
                style={{ color: isHovered ? hoverColor : color }}
                {...hoverProps}
            />
        </button>
    )
}

export default StatusButton

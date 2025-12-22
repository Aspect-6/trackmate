import React from 'react'
import type { AssignmentCard } from '@/pages/Dashboard/types'
import { CheckCircle, Circle, PlayCircle } from 'lucide-react'
import { DASHBOARD } from '@/app/styles/colors'
import { cn } from '@/app/lib/utils'

const StatusButton: React.FC<AssignmentCard.StatusButtonProps> = ({ status, isCompleting, onClick }) => {
    const getStatusConfig = () => {
        if (isCompleting) return {
            Icon: CheckCircle,
            color: DASHBOARD.ICON_COMPLETE,
            hoverColor: DASHBOARD.ICON_COMPLETE,
            className: "scale-110 animate-pulse",
            title: "Completing..."
        }

        switch (status) {
            case 'To Do':
                return {
                    Icon: PlayCircle,
                    color: DASHBOARD.ICON_PLAY_DEFAULT,
                    hoverColor: DASHBOARD.ICON_PLAY_HOVER,
                    title: "Start Assignment"
                }
            case 'In Progress':
                return {
                    Icon: Circle,
                    color: DASHBOARD.ICON_IN_PROGRESS,
                    hoverColor: DASHBOARD.ICON_IN_PROGRESS_HOVER,
                    title: "Complete Assignment"
                }
            case 'Done':
                return {
                    Icon: CheckCircle,
                    color: DASHBOARD.ICON_COMPLETE,
                    hoverColor: DASHBOARD.ICON_COMPLETE_HOVER,
                    title: "Mark as Undone"
                }
            default:
                return null
        }
    }

    const config = getStatusConfig()
    if (!config) return null

    const { Icon, color, hoverColor, title, className } = config

    return (
        <button
            type="button"
            onClick={onClick}
            className="group/status focus:outline-none transition-all flex-shrink-0 rounded-full p-1 hover:bg-neutral-500/5 active:scale-90"
            title={title}
            aria-label={title}
            style={{
                '--icon-color': color,
                '--icon-hover': hoverColor
            } as React.CSSProperties}
        >
            <Icon
                className={cn(
                    "w-6 h-6 transition-all duration-200 [color:var(--icon-color)] group-hover/status:[color:var(--icon-hover)]",
                    className
                )}
            />
        </button>
    )
}

export default StatusButton

import React from 'react'
import { cn } from '@/app/lib/utils'
import { DASHBOARD } from '@/app/styles/colors'

interface AssignmentDetailsTitleProps {
    status: string
    children: React.ReactNode
}

const AssignmentDetailsTitle: React.FC<AssignmentDetailsTitleProps> = ({ status, children }) => {
    return (
        <h3
            className={cn(
                "font-semibold truncate mb-1 text-base sm:text-lg",
                status === 'Done' && "line-through"
            )}
            style={{ color: status === 'Done' ? DASHBOARD.TEXT_GRAY_500 : DASHBOARD.TEXT_WHITE }}
        >
            {children}
        </h3>
    )
}

export default AssignmentDetailsTitle

import React from 'react'
import { DASHBOARD } from '@/app/styles/colors'

interface BodyProps {
    children: React.ReactNode
}

const AssignmentDetailsBody: React.FC<BodyProps> = ({ children }) => {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 text-sm" style={{ color: DASHBOARD.TEXT_GRAY_400 }}>
            {children}
        </div>
    )
}

export default AssignmentDetailsBody

import React from 'react'
import { AUTH } from '@/app/styles/colors'

interface SidebarDividerProps {
    isMobile?: boolean
}

const SidebarDivider: React.FC<SidebarDividerProps> = ({ isMobile = false }) => {
    if (isMobile) return null

    return (
        <div className="px-4 flex-shrink-0">
            <div className="border-t mb-3" style={{ borderColor: AUTH.BORDER_PRIMARY }}></div>
        </div>
    )
}

export default SidebarDivider

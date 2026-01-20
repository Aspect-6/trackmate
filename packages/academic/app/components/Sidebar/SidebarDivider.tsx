import React from 'react'
import { GLOBAL } from '@/app/styles/colors'

interface SidebarDividerProps {
    isMobile: boolean
}

const SidebarDivider: React.FC<SidebarDividerProps> = ({ isMobile }) => {
    if (isMobile) return null

    return (
        <div className="px-4 flex-shrink-0">
            <div className="border-t mb-3" style={{ borderColor: GLOBAL.BORDER_PRIMARY }}></div>
        </div>
    )
}

export default SidebarDivider

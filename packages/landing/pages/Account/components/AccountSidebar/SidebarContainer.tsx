import React from 'react'
import { AUTH } from '@/app/styles/colors'

interface SidebarContainerProps {
    isMobile?: boolean
    children: React.ReactNode
}

const SidebarContainer: React.FC<SidebarContainerProps> = ({ isMobile = false, children }) => {
    return (
        <nav
            className={`flex flex-col ${isMobile
                ? "fixed inset-0 z-50"
                : "sidebar w-64 flex-shrink-0 border-r sticky top-0 h-screen py-8 hidden lg:flex"
                }`}
            style={{
                backgroundColor: AUTH.BACKGROUND_PRIMARY,
                ...(isMobile ? {} : { borderColor: AUTH.BORDER_PRIMARY })
            }}
        >
            {children}
        </nav>
    )
}

export default SidebarContainer

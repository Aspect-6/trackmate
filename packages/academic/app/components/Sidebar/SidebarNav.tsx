import React from 'react'
import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Calendar, FileText, BookOpen, Clock, Settings } from 'lucide-react'
import { cn } from '@/app/lib/utils'
import { GLOBAL } from '@/app/styles/colors'
import { PATHS, ROUTES } from '@/app/config/paths'

// Shared navigation items generation
const NAV_ITEMS = [
    { to: PATHS['dashboard'], label: ROUTES['dashboard'].title, icon: LayoutDashboard },
    { to: PATHS['calendar'], label: ROUTES['calendar'].title, icon: Calendar },
    { to: PATHS['my-assignments'], label: ROUTES['my-assignments'].title, icon: FileText },
    { to: PATHS['my-classes'], label: ROUTES['my-classes'].title, icon: BookOpen },
    { to: PATHS['my-schedule'], label: ROUTES['my-schedule'].title, icon: Clock },
]

interface SidebarNavProps {
    onLinkClick?: () => void
    className?: string
}

const SidebarNav: React.FC<SidebarNavProps> = ({ onLinkClick, className }) => {
    return (
        <div className={cn("flex flex-col h-full", className)}>
            <div className="flex-grow space-y-2 px-4 py-2">
                {NAV_ITEMS.map((item) => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        onClick={onLinkClick}
                        style={({ isActive }) => isActive ? { backgroundColor: GLOBAL.GLOBAL_ACCENT } : { color: GLOBAL.TEXT_PRIMARY }}
                        onMouseEnter={(e) => { if (!e.currentTarget.classList.contains('active')) e.currentTarget.style.backgroundColor = GLOBAL.BACKGROUND_QUATERNARY }}
                        onMouseLeave={(e) => { if (!e.currentTarget.classList.contains('active')) e.currentTarget.style.backgroundColor = 'transparent' }}
                        className={({ isActive }) => cn(
                            "flex items-center p-3 rounded-lg font-medium transition duration-150",
                            isActive && "active text-white"
                        )}
                    >
                        <item.icon className="w-5 h-5 mr-3" />
                        {item.label}
                    </NavLink>
                ))}
            </div>

            <div className="flex-shrink-0 px-4">
                <div className="mb-2" style={{ borderBottom: `1px solid ${GLOBAL.BORDER_PRIMARY}` }}></div>
                <NavLink
                    to={PATHS['settings']}
                    onClick={onLinkClick}
                    style={({ isActive }) => isActive ? { backgroundColor: GLOBAL.GLOBAL_ACCENT } : { color: GLOBAL.TEXT_PRIMARY }}
                    onMouseEnter={(e) => { if (!e.currentTarget.classList.contains('active')) e.currentTarget.style.backgroundColor = GLOBAL.BACKGROUND_QUATERNARY }}
                    onMouseLeave={(e) => { if (!e.currentTarget.classList.contains('active')) e.currentTarget.style.backgroundColor = 'transparent' }}
                    className={({ isActive }) => cn(
                        "flex items-center p-3 rounded-lg font-medium transition duration-150",
                        isActive && "active text-white"
                    )}
                >
                    <Settings className="w-5 h-5 mr-3" />
                    {ROUTES['settings'].title}
                </NavLink>
            </div>
        </div>
    )
}

export default SidebarNav

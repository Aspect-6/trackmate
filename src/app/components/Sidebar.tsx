import React from 'react'
import { cn } from '@/app/lib/utils'
import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Calendar, FileText, BookOpen, Clock, Settings } from 'lucide-react'
import { APP_NAME } from '@/app/config/brand'
import { GLOBAL } from '@/app/styles/colors'

const Sidebar: React.FC = () => {
    const navItems = [
        { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { to: '/calendar', label: 'Calendar', icon: Calendar },
        { to: '/assignments', label: 'My Assignments', icon: FileText },
        { to: '/classes', label: 'My Classes', icon: BookOpen },
        { to: '/schedule', label: 'My Schedule', icon: Clock },
    ]

    return (
        <nav
            className="sidebar w-64 flex-shrink-0 border-r sticky top-0 h-screen py-8 hidden lg:block"
            style={{ backgroundColor: GLOBAL.SIDEBAR_BG, borderColor: GLOBAL.SIDEBAR_BORDER }}
        >
            <h1 className="text-2xl font-black px-6 mb-6" style={{ color: GLOBAL.PAGE_HEADER_TEXT }}>{APP_NAME}</h1>
            <div className="px-4">
                <div className="border-t mb-3" style={{ borderColor: GLOBAL.SIDEBAR_BORDER }}></div>
            </div>
            <div className="space-y-2 px-4">
                {navItems.map((item) => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        style={({ isActive }) => isActive ? { backgroundColor: GLOBAL.SIDEBAR_ACTIVE_TAB_GREEN_BG, color: GLOBAL.SIDEBAR_TEXT_ACTIVE } : { color: GLOBAL.SIDEBAR_TEXT_INACTIVE, backgroundColor: GLOBAL.SIDEBAR_INACTIVE_TAB_BLANK_BG }}
                        onMouseEnter={(e) => { if (!e.currentTarget.classList.contains('active')) e.currentTarget.style.backgroundColor = GLOBAL.SIDEBAR_INACTIVE_TAB_BLANK_BG_HOVER }}
                        onMouseLeave={(e) => { if (!e.currentTarget.classList.contains('active')) e.currentTarget.style.backgroundColor = GLOBAL.SIDEBAR_INACTIVE_TAB_BLANK_BG }}
                        className={({ isActive }) => cn(
                            "flex items-center p-3 rounded-lg font-medium transition duration-150",
                            isActive && "active"
                        )}
                    >
                        <item.icon className="w-5 h-5 mr-3" />
                        {item.label}
                    </NavLink>
                ))}
            </div>
            <div className="absolute bottom-0 w-full px-4 pb-4">
                <div className="border-t mb-2" style={{ borderColor: GLOBAL.SIDEBAR_BORDER }}></div>
                <NavLink
                    to="/settings"
                    style={({ isActive }) => isActive ? { backgroundColor: GLOBAL.SIDEBAR_ACTIVE_TAB_GREEN_BG, color: GLOBAL.SIDEBAR_TEXT_ACTIVE } : { color: GLOBAL.SIDEBAR_TEXT_INACTIVE, backgroundColor: GLOBAL.SIDEBAR_INACTIVE_TAB_BLANK_BG }}
                    onMouseEnter={(e) => { if (!e.currentTarget.classList.contains('active')) e.currentTarget.style.backgroundColor = GLOBAL.SIDEBAR_INACTIVE_TAB_BLANK_BG_HOVER }}
                    onMouseLeave={(e) => { if (!e.currentTarget.classList.contains('active')) e.currentTarget.style.backgroundColor = GLOBAL.SIDEBAR_INACTIVE_TAB_BLANK_BG }}
                    className={({ isActive }) => cn(
                        "flex items-center p-3 rounded-lg font-medium transition duration-150",
                        isActive && "active"
                    )}
                >
                    <Settings className="w-5 h-5 mr-3" />
                    Settings
                </NavLink>
            </div>
        </nav>
    )
}

export default Sidebar

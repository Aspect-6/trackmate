import React from 'react'
import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Calendar, FileText, BookOpen, Clock, Settings, X } from 'lucide-react'
import { cn } from '@/app/lib/utils'
import { GLOBAL } from '@/app/styles/colors'
import { APP_NAME } from '@/app/config/brand'

interface MobileSidebarProps {
    isOpen: boolean
    onClose: () => void
}

const MobileSidebar: React.FC<MobileSidebarProps> = ({ isOpen, onClose }) => {
    const navItems = [
        { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { to: '/calendar', label: 'Calendar', icon: Calendar },
        { to: '/assignments', label: 'My Assignments', icon: FileText },
        { to: '/classes', label: 'My Classes', icon: BookOpen },
        { to: '/schedule', label: 'My Schedule', icon: Clock },
    ]

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex flex-col" style={{ backgroundColor: GLOBAL.SIDEBAR_BG }}>
            <div className="flex items-center justify-between p-6" style={{ borderBottomColor: GLOBAL.SIDEBAR_BORDER, borderBottomWidth: '1px', borderBottomStyle: 'solid' }}>
                <h1 className="text-2xl font-black" style={{ color: GLOBAL.PAGE_HEADER_TEXT }}>{APP_NAME}</h1>
                <button onClick={onClose} className="text-gray-400 hover:text-white" style={{ color: GLOBAL.SIDEBAR_CLOSE_ICON }}
                    onTouchStart={(e) => e.currentTarget.style.color = GLOBAL.SIDEBAR_CLOSE_ICON_HOVER}
                    onTouchEnd={(e) => e.currentTarget.style.color = GLOBAL.SIDEBAR_CLOSE_ICON}
                >
                    <X className="w-8 h-8" />
                </button>
            </div>

            <div className="flex-grow py-6 px-6 space-y-2 overflow-y-auto">
                {navItems.map((item) => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        onClick={onClose}
                        style={({ isActive }) => isActive ? { backgroundColor: GLOBAL.SIDEBAR_ACTIVE_TAB_GREEN_BG, color: GLOBAL.SIDEBAR_TEXT_ACTIVE } : { color: GLOBAL.SIDEBAR_TEXT_INACTIVE, backgroundColor: GLOBAL.SIDEBAR_INACTIVE_TAB_BLANK_BG }}
                        onMouseEnter={(e) => { if (!e.currentTarget.classList.contains('active')) e.currentTarget.style.backgroundColor = GLOBAL.SIDEBAR_INACTIVE_TAB_BLANK_BG_HOVER }}
                        onMouseLeave={(e) => { if (!e.currentTarget.classList.contains('active')) e.currentTarget.style.backgroundColor = GLOBAL.SIDEBAR_INACTIVE_TAB_BLANK_BG }}
                        className={({ isActive }) => cn(
                            "flex items-center p-3 rounded-xl font-medium transition duration-150",
                            isActive && "active"
                        )}
                    >
                        <item.icon className="w-5 h-5 mr-3" />
                        {item.label}
                    </NavLink>
                ))}
            </div>

            <div className="p-6" style={{ borderTopColor: GLOBAL.SIDEBAR_BORDER, borderTopWidth: '1px', borderTopStyle: 'solid' }}>
                <NavLink
                    to="/settings"
                    onClick={onClose}
                    style={({ isActive }) => isActive ? { backgroundColor: GLOBAL.SIDEBAR_ACTIVE_TAB_GREEN_BG, color: GLOBAL.SIDEBAR_TEXT_ACTIVE } : { color: GLOBAL.SIDEBAR_TEXT_INACTIVE, backgroundColor: GLOBAL.SIDEBAR_INACTIVE_TAB_BLANK_BG }}
                    onMouseEnter={(e) => { if (!e.currentTarget.classList.contains('active')) e.currentTarget.style.backgroundColor = GLOBAL.SIDEBAR_INACTIVE_TAB_BLANK_BG_HOVER }}
                    onMouseLeave={(e) => { if (!e.currentTarget.classList.contains('active')) e.currentTarget.style.backgroundColor = GLOBAL.SIDEBAR_INACTIVE_TAB_BLANK_BG }}
                    className={({ isActive }) => cn(
                        "flex items-center p-3 rounded-xl font-medium transition duration-150",
                        isActive && "active"
                    )}
                >
                    <Settings className="w-5 h-5 mr-3" />
                    Settings
                </NavLink>
            </div>
        </div>
    )
}

export default MobileSidebar

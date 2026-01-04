import React, { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Plus, Menu } from 'lucide-react'
import Sidebar from '@/app/components/Sidebar'
import MobileSidebar from '@/app/components/MobileSidebar'
import { useApp } from '@/app/contexts/AppContext'
import { cn } from '@/app/lib/utils'
import { GLOBAL, MY_CLASSES } from '@/app/styles/colors'

const Layout: React.FC = () => {
    const location = useLocation()
    const { openModal } = useApp()
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
    const [isDesktopViewport, setIsDesktopViewport] = useState<boolean>(() => {
        if (typeof window === 'undefined') return true
        return window.matchMedia('(min-width: 1024px)').matches
    })

    useEffect(() => {
        if (typeof window === 'undefined') return
        const mediaQuery = window.matchMedia('(min-width: 1024px)')

        const handleChange = (event: MediaQueryListEvent | MediaQueryList) => {
            const matches = 'matches' in event ? event.matches : mediaQuery.matches
            setIsDesktopViewport(matches)
        }

        handleChange(mediaQuery)

        if (typeof mediaQuery.addEventListener === 'function') {
            mediaQuery.addEventListener('change', handleChange as EventListener)
            return () => mediaQuery.removeEventListener('change', handleChange as EventListener)
        }

        mediaQuery.addListener(handleChange as (this: MediaQueryList, ev: MediaQueryListEvent) => void)
        return () => mediaQuery.removeListener(handleChange as (this: MediaQueryList, ev: MediaQueryListEvent) => void)
    }, [])

    const isCalendar = location.pathname === '/calendar'
    const isAssignments = location.pathname === '/assignments'
    const isFixedViewportPage = isCalendar || (isAssignments && isDesktopViewport)

    const getPageTitle = () => {
        const path = location.pathname
        if (path === '/dashboard' || path === '/') return 'Dashboard'
        if (path === '/calendar') return 'Calendar'
        if (path === '/assignments') return 'My Assignments'
        if (path === '/classes') return 'My Classes'
        if (path === '/schedule') return 'My Schedule'
        if (path === '/settings') return 'Settings'
        return 'Dashboard'
    }

    return (
        <div className={cn(
            "app-container flex bg-[#0d1117] text-[#c9d1d9]",
            isFixedViewportPage ? "h-[100dvh] overflow-hidden" : "min-h-[100dvh]"
        )}
            style={{ backgroundColor: GLOBAL.WEBPAGE_BACKGROUND }}
        >
            <Sidebar />
            <MobileSidebar isOpen={isMobileSidebarOpen} onClose={() => setIsMobileSidebarOpen(false)} />

            <main className={cn(
                "content-area flex-grow min-w-0 w-full p-6 lg:p-8 flex flex-col",
                isFixedViewportPage && "h-full overflow-hidden"
            )}>
                <header className="mb-8 pb-4 flex justify-between items-center gap-3 flex-shrink-0" style={{ borderBottom: `1px solid ${GLOBAL.HEADER_DIVIDER}` }}>
                    <div className="flex items-center min-w-0 gap-3">
                        <button
                            onClick={() => setIsMobileSidebarOpen(true)}
                            className="lg:hidden focus:outline-none transition-colors -ml-2"
                            style={{ color: GLOBAL.HEADER_MENU_ICON }}
                            onMouseEnter={(e) => e.currentTarget.style.color = GLOBAL.HEADER_MENU_ICON_HOVER}
                            onMouseLeave={(e) => e.currentTarget.style.color = GLOBAL.HEADER_MENU_ICON}
                            onTouchStart={(e) => e.currentTarget.style.color = GLOBAL.HEADER_MENU_ICON_HOVER}
                            onTouchEnd={(e) => e.currentTarget.style.color = GLOBAL.HEADER_MENU_ICON}
                        >
                            <Menu className="w-7 h-7" />
                        </button>
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold truncate" style={{ color: GLOBAL.PAGE_HEADER_TEXT }}>{getPageTitle()}</h1>
                    </div>
                    <button
                        onClick={() => {
                            if (location.pathname === '/classes') return openModal('add-class')
                            if (location.pathname === '/assignments') return openModal('add-assignment')
                            if (location.pathname === '/calendar') return openModal('add-event')
                            return openModal('type-selector')
                        }}
                        className="flex items-center py-2 px-3 sm:px-4 border border-transparent rounded-lg shadow-sm text-xs sm:text-sm font-medium text-white transition duration-150 ease-in-out whitespace-nowrap flex-shrink-0"
                        style={{
                            backgroundColor: location.pathname === '/classes'
                                ? MY_CLASSES.CLASS_BUTTON_BG
                                : location.pathname === '/assignments'
                                    ? GLOBAL.ASSIGNMENT_BUTTON_BG
                                    : location.pathname === '/calendar'
                                        ? GLOBAL.EVENT_BUTTON_BG
                                        : GLOBAL.ADDITEM_BUTTON_BG
                        }}
                        onMouseEnter={(e) =>
                            e.currentTarget.style.backgroundColor = location.pathname === '/classes'
                                ? MY_CLASSES.CLASS_BUTTON_BG_HOVER
                                : location.pathname === '/assignments'
                                    ? GLOBAL.ASSIGNMENT_BUTTON_BG_HOVER
                                    : location.pathname === '/calendar'
                                        ? GLOBAL.EVENT_BUTTON_BG_HOVER
                                        : GLOBAL.ADDITEM_BUTTON_BG_HOVER
                        }
                        onMouseLeave={(e) =>
                            e.currentTarget.style.backgroundColor = location.pathname === '/classes'
                                ? MY_CLASSES.CLASS_BUTTON_BG
                                : location.pathname === '/assignments'
                                    ? GLOBAL.ASSIGNMENT_BUTTON_BG
                                    : location.pathname === '/calendar'
                                        ? GLOBAL.EVENT_BUTTON_BG
                                        : GLOBAL.ADDITEM_BUTTON_BG
                        }
                    >
                        <Plus className="w-4 h-4 sm:w-5 sm:h-5 mr-1" />
                        <span className="hidden sm:inline">{location.pathname === '/classes' ? 'Add Class' :
                            location.pathname === '/assignments' ? 'Add Assignment' :
                                location.pathname === '/calendar' ? 'Add Event' : 'Add Item'}</span>
                        <span className="sm:hidden">Add</span>
                    </button>
                </header>
                <Outlet />
            </main>
        </div>
    )
}

export default Layout

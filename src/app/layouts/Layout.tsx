import React, { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import PageHeader from '@/app/components/PageHeader'
import Sidebar from '@/app/components/Sidebar'
import { cn } from '@/app/lib/utils'
import { GLOBAL } from '@/app/styles/colors'
import { PATHS } from '@/app/config/paths'

const Layout: React.FC = () => {
    const location = useLocation()
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

    // Fixed viewport logic (kept in Layout since it affects the container)
    const isCalendar = location.pathname === PATHS['calendar']
    const isAssignments = location.pathname === PATHS['my-assignments']
    const isFixedViewportPage = isCalendar || (isAssignments && isDesktopViewport)

    return (
        <div className={cn(
            "app-container flex bg-[#0d1117] text-[#c9d1d9]",
            isFixedViewportPage ? "h-[100dvh] overflow-hidden" : "min-h-[100dvh]"
        )}
            style={{ backgroundColor: GLOBAL.WEBPAGE_BACKGROUND }}
        >
            <Sidebar variant="desktop" />
            <Sidebar variant="mobile" isOpen={isMobileSidebarOpen} onClose={() => setIsMobileSidebarOpen(false)} />

            <main className={cn(
                "content-area flex-grow min-w-0 w-full p-6 lg:p-8 flex flex-col",
                isFixedViewportPage && "h-full overflow-hidden"
            )}>
                <PageHeader onMenuClick={() => setIsMobileSidebarOpen(true)} />
                <Outlet />
            </main>
        </div>
    )
}

export default Layout

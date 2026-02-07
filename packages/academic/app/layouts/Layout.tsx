import React, { useEffect, useState } from "react"
import { Outlet, useLocation } from "react-router-dom"
import PageHeader from "@/app/components/PageHeader"
import Sidebar from "@/app/components/Sidebar"
import FloatingMenuButton from "@shared/components/FloatingMenuButton"
import { GLOBAL } from "@/app/styles/colors"
import { PATHS } from "@/app/config/paths"

const Layout: React.FC = () => {
    const location = useLocation()
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
    const [isMediumViewport, setIsMediumViewport] = useState<boolean>(() => {
        if (typeof window === "undefined") return true
        return window.matchMedia("(min-width: 768px)").matches
    })

    useEffect(() => {
        if (typeof window === "undefined") return
        const mediaQuery = window.matchMedia("(min-width: 768px)")

        const handleChange = (event: MediaQueryListEvent | MediaQueryList) => {
            const matches = "matches" in event ? event.matches : mediaQuery.matches
            setIsMediumViewport(matches)
        }

        handleChange(mediaQuery)

        if (typeof mediaQuery.addEventListener === "function") {
            mediaQuery.addEventListener("change", handleChange as EventListener)
            return () => mediaQuery.removeEventListener("change", handleChange as EventListener)
        }

        mediaQuery.addListener(handleChange as (this: MediaQueryList, ev: MediaQueryListEvent) => void)
        return () => mediaQuery.removeListener(handleChange as (this: MediaQueryList, ev: MediaQueryListEvent) => void)
    }, [])

    const isCalendar = location.pathname === PATHS["calendar"]
    const isAssignments = location.pathname === PATHS["my-assignments"]
    const isFixedViewportPage = isCalendar || (isAssignments && isMediumViewport)

    return (
        <div className={`app-container flex ${isFixedViewportPage ? "h-dvh overflow-hidden" : "min-h-dvh"}`}
            style={{ backgroundColor: GLOBAL.WEBPAGE_BACKGROUND }}
        >
            <Sidebar variant="desktop" />
            <Sidebar variant="mobile" isOpen={isMobileSidebarOpen} onClose={() => setIsMobileSidebarOpen(false)} />

            <main className={`content-area flex-grow min-w-0 w-full p-6 lg:p-8 flex flex-col ${isFixedViewportPage && "h-full overflow-hidden"}`}>
                <PageHeader />
                <Outlet />
            </main>

            <FloatingMenuButton
                onClick={() => setIsMobileSidebarOpen(prev => !prev)}
                isOpen={isMobileSidebarOpen}
                backgroundColor={GLOBAL.ADDITEM_BUTTON_BG}
                hoverColor={GLOBAL.ADDITEM_BUTTON_BG_HOVER}
            />
        </div>
    )
}

export default Layout

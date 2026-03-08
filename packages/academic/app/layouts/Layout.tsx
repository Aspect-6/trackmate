import React, { useEffect, useState } from "react"
import { Outlet, useLocation } from "react-router-dom"
import PageHeader from "@/app/components/PageHeader"
import Sidebar from "@/app/components/Sidebar"
import FloatingMenuButton from "@shared/components/FloatingMenuButton"
import { useBreakpoints } from "@/app/hooks/ui/useBreakpoints"
import { GLOBAL } from "@/app/styles/colors"
import { PATHS } from "@/app/config/paths"

const Layout: React.FC = () => {
    const location = useLocation()
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
    const { isDesktop } = useBreakpoints()

    // Lock body scroll when mobile sidebar overlay is open
    useEffect(() => {
        if (!isMobileSidebarOpen) return

        const preventScroll = (e: TouchEvent) => e.preventDefault()
        document.body.style.overflow = "hidden"
        document.documentElement.style.overflow = "hidden"
        document.addEventListener("touchmove", preventScroll, { passive: false })

        return () => {
            document.body.style.overflow = ""
            document.documentElement.style.overflow = ""
            document.removeEventListener("touchmove", preventScroll)
        }
    }, [isMobileSidebarOpen])

    const isCalendar = location.pathname === PATHS["calendar"]
    const isAssignments = location.pathname === PATHS["my-assignments"]
    const isFixedViewportPage = isCalendar || (isAssignments && isDesktop)

    return (
        <div id="app-container" className={`flex ${isFixedViewportPage ? "h-dvh overflow-hidden" : "min-h-dvh"}`}
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

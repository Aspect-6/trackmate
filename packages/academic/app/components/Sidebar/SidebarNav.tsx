import React from "react"
import { LayoutDashboard, Calendar, FileText, BookOpen, Clock, Settings, User, ExternalLink } from "lucide-react"
import { SidebarTab } from "@shared/components/Sidebar"
import { GLOBAL } from "@/app/styles/colors"
import { PATHS, ROUTES } from "@/app/config/paths"

// Shared navigation items generation
const NAV_ITEMS = [
    { to: PATHS["dashboard"], label: ROUTES["dashboard"].title, icon: LayoutDashboard },
    { to: PATHS["calendar"], label: ROUTES["calendar"].title, icon: Calendar },
    { to: PATHS["my-assignments"], label: ROUTES["my-assignments"].title, icon: FileText },
    { to: PATHS["my-classes"], label: ROUTES["my-classes"].title, icon: BookOpen },
    { to: PATHS["my-schedule"], label: ROUTES["my-schedule"].title, icon: Clock },
]

interface SidebarNavProps {
    onLinkClick?: () => void
    className?: string
}

const SidebarNav: React.FC<SidebarNavProps> = ({ onLinkClick, className }) => {
    return (
        <div className={`flex flex-col h-full ${className || ""}`}>
            <div className="flex-grow space-y-2 px-4 py-2">
                {NAV_ITEMS.map((item) => (
                    <SidebarTab
                        key={item.to}
                        label={item.label}
                        icon={item.icon}
                        to={item.to}
                        onClick={onLinkClick}
                        isActive={false} // Handled by NavLink internally
                        accentColor={GLOBAL.GLOBAL_ACCENT}
                        hoverColor={GLOBAL.BACKGROUND_QUATERNARY}
                    />
                ))}
            </div>

            <div className={`flex-shrink-0 px-4 space-y-2 ${onLinkClick ? "pb-6" : ""}`}>
                <div className="mb-2" style={{ borderBottom: `1px solid ${GLOBAL.BORDER_PRIMARY}` }} />
                <SidebarTab
                    label="Account"
                    icon={User}
                    onClick={() => {
                        window.location.href = "/account"
                        onLinkClick?.()
                    }}
                    isActive={false}
                    accentColor={GLOBAL.GLOBAL_ACCENT}
                    hoverColor={GLOBAL.BACKGROUND_QUATERNARY}
                    BadgeIcon={ExternalLink}
                />
                <SidebarTab
                    to={PATHS["settings"]}
                    label={ROUTES["settings"].title}
                    icon={Settings}
                    onClick={onLinkClick}
                    isActive={false}
                    accentColor={GLOBAL.GLOBAL_ACCENT}
                    hoverColor={GLOBAL.BACKGROUND_QUATERNARY}
                />
            </div>
        </div>
    )
}

export default SidebarNav

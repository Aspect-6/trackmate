import React from "react"
import type { AccountSidebar } from "@/pages/Account/types"
import { SidebarContainer, SidebarHeader, SidebarDivider, SidebarContent } from "@shared/components/Sidebar"
import SidebarNav from "./SidebarNav"
import { BRAND_NAME } from "@shared/config/brand"
import { ACCOUNT } from "@/app/styles/colors"

const AccountSidebar: React.FC<AccountSidebar.Props> = ({
    activeSection,
    onSectionChange,
    onSignOut,
    isMobile = false,
    isOpen,
    onClose
}) => {
    if (isMobile && !isOpen) return null

    return (
        <SidebarContainer
            isMobile={isMobile}
            backgroundColor={ACCOUNT.BACKGROUND_PRIMARY}
            borderColor={ACCOUNT.BORDER_PRIMARY}
        >
            <SidebarHeader
                isMobile={isMobile}
                brandName={BRAND_NAME}
                subtitle="Account"
                accentColor={ACCOUNT.GLOBAL_ACCENT}
                textColor={ACCOUNT.TEXT_SECONDARY}
                borderColor={ACCOUNT.BORDER_PRIMARY}
            />

            <SidebarDivider
                isMobile={isMobile}
                borderColor={ACCOUNT.BORDER_PRIMARY}
            />

            <SidebarContent>
                <SidebarNav
                    activeSection={activeSection}
                    onSectionChange={onSectionChange}
                    onSignOut={onSignOut}
                    onLinkClick={isMobile ? onClose : undefined}
                />
            </SidebarContent>
        </SidebarContainer>
    )
}

export default AccountSidebar


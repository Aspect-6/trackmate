import React from 'react'
import { AUTH } from '@/app/styles/colors'
import { BRAND_NAME } from '@shared/config/brand'
import type { AccountSidebar as AccountSidebarTypes } from '@/pages/Account/types'
import {
    SidebarContainer,
    SidebarHeader,
    SidebarDivider,
    SidebarContent
} from '@shared/components/Sidebar'

import SidebarNav from './SidebarNav'

const AccountSidebar: React.FC<AccountSidebarTypes.Props> = ({
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
            backgroundColor={AUTH.BACKGROUND_PRIMARY}
            borderColor={AUTH.BORDER_PRIMARY}
        >
            <SidebarHeader
                isMobile={isMobile}
                // onClose omitted to hide default close button
                brandName={BRAND_NAME}
                subtitle="Account"
                accentColor={AUTH.GLOBAL_ACCENT}
                textColor={AUTH.TEXT_SECONDARY}
                borderColor={AUTH.BORDER_PRIMARY}
            />

            <SidebarDivider
                isMobile={isMobile}
                borderColor={AUTH.BORDER_PRIMARY}
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


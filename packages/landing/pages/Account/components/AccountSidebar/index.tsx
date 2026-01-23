import React from 'react'
import type { AccountSidebar as AccountSidebarTypes } from '@/pages/Account/types'

import SidebarHeader from './SidebarHeader'
import SidebarNav from './SidebarNav'
import SidebarDivider from './SidebarDivider'
import SidebarContainer from './SidebarContainer'

const AccountSidebar: React.FC<AccountSidebarTypes.Props> = ({
    activeSection,
    onSectionChange,
    onSignOut,
}) => {
    // For now, we assume desktop only behavior or implicit isMobile=false as per current usage
    // If mobile responsiveness is needed later, we can add state or props
    const isMobile = false

    return (
        <SidebarContainer isMobile={isMobile}>
            <SidebarHeader isMobile={isMobile} />

            <SidebarDivider isMobile={isMobile} />

            <div className="flex-grow min-h-0 flex flex-col">
                <SidebarNav
                    activeSection={activeSection}
                    onSectionChange={onSectionChange}
                    onSignOut={onSignOut}
                />
            </div>
        </SidebarContainer>
    )
}

export default AccountSidebar


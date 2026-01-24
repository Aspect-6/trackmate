import React from 'react'
import { GLOBAL } from '@/app/styles/colors'
import { BRAND_NAME } from '@shared/config/brand'
import {
    SidebarContainer,
    SidebarHeader,
    SidebarDivider,
    SidebarContent
} from '@shared/components/Sidebar'

import SidebarNav from './SidebarNav'

interface SidebarProps {
    variant: 'desktop' | 'mobile'
    isOpen?: boolean
    onClose?: () => void
}

const Sidebar: React.FC<SidebarProps> = ({ variant, isOpen, onClose }) => {
    const isMobile = variant === 'mobile'

    if (isMobile && !isOpen) return null

    return (
        <SidebarContainer
            isMobile={isMobile}
            backgroundColor={GLOBAL.BACKGROUND_PRIMARY}
            borderColor={GLOBAL.BORDER_PRIMARY}
        >
            <SidebarHeader
                isMobile={isMobile}
                onClose={onClose}
                brandName={BRAND_NAME}
                accentColor={GLOBAL.GLOBAL_ACCENT}
                textColor={GLOBAL.TEXT_SECONDARY}
                borderColor={GLOBAL.BORDER_PRIMARY}
            />

            <SidebarDivider
                isMobile={isMobile}
                borderColor={GLOBAL.BORDER_PRIMARY}
            />

            <SidebarContent>
                <SidebarNav onLinkClick={isMobile ? onClose : undefined} />
                {/* Note: SidebarNav here is the local Academic nav content list, distinct from shared SidebarHeader/etc */}
            </SidebarContent>
        </SidebarContainer>
    )
}

export default Sidebar

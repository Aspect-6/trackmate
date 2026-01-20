import React from 'react'
import { X } from 'lucide-react'
import { cn } from '@/app/lib/utils'
import { BRAND_NAME } from '@shared/config/brand'
import { GLOBAL } from '@/app/styles/colors'

interface SidebarHeaderProps {
    isMobile: boolean
    onClose?: () => void
}

const SidebarHeader: React.FC<SidebarHeaderProps> = ({ isMobile, onClose }) => {
    return (
        <div
            className={cn(
                "flex flex-shrink-0 items-center",
                isMobile
                    ? "justify-between p-6"
                    : "px-6 mb-6"
            )}
            style={{ borderBottom: `${isMobile ? '1px' : '0px'} solid ${GLOBAL.BORDER_PRIMARY}` }}
        >
            <h1 className="text-2xl font-black" style={{ color: GLOBAL.GLOBAL_ACCENT }}>{BRAND_NAME}</h1>

            {isMobile && onClose && (
                <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-white"
                    style={{ color: GLOBAL.TEXT_SECONDARY }}
                    onTouchStart={(e) => e.currentTarget.style.color = GLOBAL.TEXT_PRIMARY}
                    onTouchEnd={(e) => e.currentTarget.style.color = GLOBAL.TEXT_SECONDARY}
                >
                    <X className="w-8 h-8" />
                </button>
            )}
        </div>
    )
}

export default SidebarHeader

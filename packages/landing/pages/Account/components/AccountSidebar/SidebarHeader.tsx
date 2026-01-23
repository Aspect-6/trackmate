import React from 'react'
import { X } from 'lucide-react'
import { BRAND_NAME } from '@shared/config/brand'
import { AUTH } from '@/app/styles/colors'

interface SidebarHeaderProps {
    isMobile?: boolean
    onClose?: () => void
}

const SidebarHeader: React.FC<SidebarHeaderProps> = ({ isMobile = false, onClose }) => {
    return (
        <div
            className={`flex flex-shrink-0 items-center ${isMobile
                ? "justify-between p-6"
                : "px-6 mb-6"
                }`}
            style={{ borderBottom: `${isMobile ? '1px' : '0px'} solid ${AUTH.BORDER_PRIMARY}` }}
        >
            <h1 className="text-2xl font-black" style={{ color: AUTH.GLOBAL_ACCENT }}>{BRAND_NAME}</h1>

            {isMobile && onClose && (
                <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-white"
                    style={{ color: AUTH.TEXT_SECONDARY }}
                    onTouchStart={(e) => e.currentTarget.style.color = AUTH.TEXT_PRIMARY}
                    onTouchEnd={(e) => e.currentTarget.style.color = AUTH.TEXT_SECONDARY}
                >
                    <X className="w-8 h-8" />
                </button>
            )}
        </div>
    )
}

export default SidebarHeader

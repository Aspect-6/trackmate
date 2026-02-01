import React from 'react'
import { useHover } from '@shared/hooks/ui/useHover'
import type { ProfileSection } from '@/pages/Account/types'
import { Check, X } from 'lucide-react'
import { ACCOUNT } from '@/app/styles/colors'

export const EmailRowActions: React.FC<ProfileSection.Content.EmailRow.ActionsProps> = ({
    onSave,
    onCancel,
    variant
}) => {
    const { isHovered, hoverProps } = useHover()
    const isDesktop = variant === 'desktop'

    const containerClasses = isDesktop
        ? "hidden sm:flex gap-2 flex-shrink-0"
        : "flex sm:hidden gap-2 mt-3"

    const buttonBaseClasses = "rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
    const layoutClasses = isDesktop ? "px-4 py-2" : "flex-1 px-4 py-2 justify-center"

    return (
        <div className={containerClasses}>
            <button
                onClick={onSave}
                className={`${buttonBaseClasses} ${layoutClasses}`}
                style={{ backgroundColor: isHovered ? ACCOUNT.PRIMARY_BUTTON_BG_HOVER : ACCOUNT.PRIMARY_BUTTON_BG, color: ACCOUNT.TEXT_WHITE }}
                {...hoverProps}
            >
                <Check size={16} />
                <span>Save</span>
            </button>
            <button
                onClick={onCancel}
                className={`${buttonBaseClasses} ${layoutClasses} transition-opacity hover:opacity-80`}
                style={{
                    backgroundColor: 'transparent',
                    border: `1px solid ${ACCOUNT.BORDER_PRIMARY}`,
                    color: ACCOUNT.TEXT_PRIMARY,
                }}
            >
                <X size={16} />
                <span>Cancel</span>
            </button>
        </div>
    )
}

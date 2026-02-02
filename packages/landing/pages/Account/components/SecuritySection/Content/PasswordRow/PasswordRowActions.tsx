import React from 'react'
import { useHover } from '@shared/hooks/ui/useHover'
import type { SecuritySection } from '@/pages/Account/types'
import { Check, X } from 'lucide-react'
import { ACCOUNT } from '@/app/styles/colors'

export const PasswordRowActions: React.FC<SecuritySection.Content.PasswordRow.ActionsProps> = ({
    onSave,
    onCancel,
    loading
}) => {
    const { isHovered, hoverProps } = useHover()

    return (
        <div className="flex gap-2 mt-3 w-full max-w-sm">
            <button
                onClick={onSave}
                disabled={loading}
                className="flex-1 justify-center px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                style={{
                    backgroundColor: isHovered ? ACCOUNT.PRIMARY_BUTTON_BG_HOVER : ACCOUNT.PRIMARY_BUTTON_BG,
                    color: ACCOUNT.TEXT_WHITE
                }}
                {...hoverProps}
            >
                <Check size={16} />
                <span>Save</span>
            </button>
            <button
                onClick={onCancel}
                className="flex-1 justify-center px-4 py-2 rounded-lg text-sm font-medium transition-opacity hover:opacity-80 flex items-center gap-2"
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

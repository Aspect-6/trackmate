import React from 'react'
import { Trash2 } from 'lucide-react'
import { useHover } from '@shared/hooks/ui/useHover'
import type { Account } from '@/pages/Account/types'
import { AUTH } from '@/app/styles/colors'

export const InitialView: React.FC<Account.DataSection.Content.DeleteAccountCard.InitialView.Props> = ({ onInitiateDelete }) => {
    const { isHovered, hoverProps } = useHover()

    return (
        <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between transition-opacity duration-300 animate-in fade-in slide-in-from-bottom-4">
            <div className="space-y-2 max-w-lg">
                <h4 className="font-semibold text-lg" style={{ color: AUTH.TEXT_PRIMARY }}>
                    Delete Account
                </h4>
                <p className="text-sm leading-relaxed" style={{ color: AUTH.TEXT_SECONDARY }}>
                    Permanently remove your account and all of its contents from the TrackMate platform.
                    This action is <span className="font-medium" style={{ color: AUTH.TEXT_DANGER }}>not reversible</span>,
                    so please continue with caution.
                </p>
            </div>

            <button
                {...hoverProps}
                onClick={onInitiateDelete}
                className="group relative flex items-center gap-2 px-5 py-2.5 rounded-lg border text-sm font-semibold transition-all duration-200 whitespace-nowrap"
                style={{
                    borderColor: isHovered ? AUTH.TEXT_DANGER : 'rgba(239, 68, 68, 0.3)',
                    backgroundColor: isHovered ? AUTH.TEXT_DANGER : 'transparent',
                    color: isHovered ? AUTH.TEXT_WHITE : AUTH.TEXT_DANGER,
                }}
            >
                <Trash2 size={16} className="transition-transform group-hover:scale-110" />
                Delete Account
            </button>
        </div>
    )
}

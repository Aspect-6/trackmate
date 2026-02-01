import React from 'react'
import { Trash2 } from 'lucide-react'
import { useHover } from '@shared/hooks/ui/useHover'
import type { DataSection } from '@/pages/Account/types'
import { ACCOUNT } from '@/app/styles/colors'

export const InitialView: React.FC<DataSection.Content.DeleteAccountCard.InitialViewProps> = ({ onInitiateDelete }) => {
    const { isHovered, hoverProps } = useHover()

    return (
        <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
            <div className="space-y-2 max-w-lg">
                <h4 className="font-semibold text-lg" style={{ color: ACCOUNT.TEXT_PRIMARY }}>
                    Delete Account
                </h4>
                <p className="text-sm leading-relaxed" style={{ color: ACCOUNT.TEXT_SECONDARY }}>
                    Permanently remove your account and all of its contents from the TrackMate platform.
                    This action is <span className="font-medium" style={{ color: ACCOUNT.TEXT_DANGER }}>not reversible</span>,
                    so please continue with caution.
                </p>
            </div>

            <button
                onClick={onInitiateDelete}
                className="group relative flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm justify-center font-semibold transition-all duration-300 whitespace-nowrap w-full sm:w-auto"
                style={{
                    border: `1px solid ${ACCOUNT.DANGER_ZONE_BORDER}`,
                    backgroundColor: isHovered ? ACCOUNT.DANGER_ZONE_BORDER : 'transparent',
                    color: ACCOUNT.TEXT_DANGER,
                }}
                {...hoverProps}
            >
                <Trash2 size={16} className="transition-transform group-hover:scale-110 duration-300" />
                Delete Account
            </button>
        </div>
    )
}

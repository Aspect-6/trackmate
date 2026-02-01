import React from 'react'
import { Trash2, AlertTriangle, X } from 'lucide-react'
import { useHover } from '@shared/hooks/ui/useHover'
import type { DataSection } from '@/pages/Account/types'
import { ACCOUNT } from '@/app/styles/colors'

export const ConfirmationView: React.FC<DataSection.Content.DeleteAccountCard.ConfirmationViewProps> = ({
    error,
    loading,
    onConfirmDelete,
    onCancelDelete,
}) => {
    const { isHovered: isCancelHovered, hoverProps: cancelHoverProps } = useHover()
    const { isHovered: isDeleteHovered, hoverProps: deleteHoverProps } = useHover()

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-2">
                <h4 className="text-xl font-bold flex items-center gap-2" style={{ color: ACCOUNT.TEXT_DANGER }}>
                    Are you absolutely sure?
                </h4>
                <p className="text-sm" style={{ color: ACCOUNT.TEXT_SECONDARY }}>
                    This will permanently remove your access to all TrackMate services.
                </p>
            </div>

            {error && (
                <div
                    className="px-4 py-3 rounded-lg text-sm flex items-start gap-2"
                    style={{
                        backgroundColor: ACCOUNT.DANGER_ZONE_BG,
                        border: `1px solid ${ACCOUNT.DANGER_ZONE_BORDER}`,
                        color: ACCOUNT.TEXT_DANGER
                    }}
                >
                    <AlertTriangle size={16} className="shrink-0 mt-0.5" />
                    {error}
                </div>
            )}

            <div className="flex flex-col-reverse sm:flex-row gap-3 pt-2">
                <button
                    {...cancelHoverProps}
                    onClick={onCancelDelete}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-colors"
                    style={{
                        border: `1px solid ${ACCOUNT.CANCEL_BUTTON_BORDER}`,
                        color: ACCOUNT.CANCEL_BUTTON_TEXT,
                        backgroundColor: isCancelHovered ? ACCOUNT.CANCEL_BUTTON_BG_HOVER : ACCOUNT.CANCEL_BUTTON_BG,
                    }}
                >
                    <X size={16} />
                    Cancel, Keep My Account
                </button>

                <button
                    {...deleteHoverProps}
                    onClick={onConfirmDelete}
                    disabled={loading}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all"
                    style={{
                        backgroundColor: (!loading && isDeleteHovered) ? ACCOUNT.DELETE_BUTTON_BG_HOVER : ACCOUNT.DELETE_BUTTON_BG,
                        color: ACCOUNT.DELETE_BUTTON_TEXT,
                        boxShadow: ACCOUNT.DANGER_ZONE_CONFIRM_DELETE_SHADOW
                    }}
                >
                    {loading ? (
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                        <Trash2 size={16} />
                    )}
                    {loading ? 'Deleting Account...' : 'Yes, Delete My Account'}
                </button>
            </div>
        </div>
    )
}

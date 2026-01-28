import React from 'react'
import { Trash2, AlertTriangle, X } from 'lucide-react'
import { useHover } from '@shared/hooks/ui/useHover'
import type { Account } from '@/pages/Account/types'
import { AUTH } from '@/app/styles/colors'

export const ConfirmationView: React.FC<Account.DataSection.Content.DeleteAccountCard.ConfirmationView.Props> = ({
    error,
    loading,
    onConfirmDelete,
    onCancelDelete,
}) => {
    const { isHovered: isCancelHovered, hoverProps: cancelHoverProps } = useHover()
    const { isHovered: isDeleteHovered, hoverProps: deleteHoverProps } = useHover()

    return (
        <div className="space-y-6 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex flex-col gap-2">
                <h4 className="text-xl font-bold flex items-center gap-2" style={{ color: AUTH.TEXT_DANGER }}>
                    Are you absolutely sure?
                </h4>
                <p className="text-sm" style={{ color: AUTH.TEXT_SECONDARY }}>
                    This will permanently remove your access to all TrackMate services.
                </p>
            </div>

            {error && (
                <div
                    className="px-4 py-3 rounded-lg border text-sm flex items-start gap-2"
                    style={{
                        backgroundColor: 'rgba(239, 68, 68, 0.1)',
                        borderColor: 'rgba(239, 68, 68, 0.2)',
                        color: AUTH.TEXT_DANGER
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
                        border: `1px solid ${AUTH.CANCEL_BUTTON_BORDER}`,
                        color: AUTH.CANCEL_BUTTON_TEXT,
                        backgroundColor: isCancelHovered ? AUTH.CANCEL_BUTTON_BG_HOVER : AUTH.CANCEL_BUTTON_BG,
                    }}
                >
                    <X size={16} />
                    Cancel, keep my account
                </button>

                <button
                    {...deleteHoverProps}
                    onClick={onConfirmDelete}
                    disabled={loading}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all shadow-lg shadow-red-500/10 hover:shadow-red-500/20"
                    style={{
                        backgroundColor: (!loading && isDeleteHovered) ? AUTH.DELETE_BUTTON_BG_HOVER : AUTH.DELETE_BUTTON_BG,
                        color: AUTH.DELETE_BUTTON_TEXT,
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

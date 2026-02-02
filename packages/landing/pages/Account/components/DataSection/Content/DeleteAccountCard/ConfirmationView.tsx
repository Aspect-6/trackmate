import React from 'react'
import type { DataSection } from '@/pages/Account/types'
import { Trash2, AlertTriangle, X } from 'lucide-react'
import { Button } from '@/app/components/Button'
import { ACCOUNT } from '@/app/styles/colors'

export const ConfirmationView: React.FC<DataSection.Content.DeleteAccountCard.ConfirmationViewProps> = ({
    error,
    loading,
    onConfirmDelete,
    onCancelDelete,
}) => {


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
                <Button
                    variant="secondary"
                    onClick={onCancelDelete}
                    className="flex-1 px-6 py-2.5"
                >
                    <X size={16} />
                    Cancel, Keep My Account
                </Button>

                <Button
                    variant="danger"
                    onClick={onConfirmDelete}
                    disabled={loading}
                    isLoading={loading}
                    className="flex-1 px-6 py-2.5 font-bold"
                >
                    {loading ? (
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                        <Trash2 size={16} />
                    )}
                    {loading ? 'Deleting Account...' : 'Yes, Delete My Account'}
                </Button>
            </div>
        </div>
    )
}

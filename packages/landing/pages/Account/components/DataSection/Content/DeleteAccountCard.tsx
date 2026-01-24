import React from 'react'
import { Trash2 } from 'lucide-react'
import { AUTH } from '@/app/styles/colors'
import type { DataSection } from '@/pages/Account/types'

const DeleteAccountCard: React.FC<DataSection.Content.DeleteAccountCardProps> = ({
    showConfirm,
    error,
    loading,
    onInitiateDelete,
    onConfirmDelete,
    onCancelDelete,
}) => {
    return (
        <>
            <h3 className="text-lg font-semibold mb-4" style={{ color: '#ef4444' }}>
                Delete Account
            </h3>

            <div
                className="p-6 rounded-xl max-w-xl"
                style={{
                    backgroundColor: 'rgba(239, 68, 68, 0.05)',
                    border: '1px solid rgba(239, 68, 68, 0.2)',
                }}
            >
                <div className="flex items-start gap-4 mb-6">
                    <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: 'rgba(239, 68, 68, 0.15)' }}
                    >
                        <Trash2 size={20} style={{ color: '#ef4444' }} />
                    </div>
                    <div>
                        <p className="font-medium mb-1" style={{ color: AUTH.TEXT_PRIMARY }}>
                            This action is irreversible
                        </p>
                        <p className="text-sm" style={{ color: AUTH.TEXT_SECONDARY }}>
                            Once you delete your account, all your data will be permanently removed.
                            This includes your profile, settings, and any associated information.
                            You will no longer have access to any of TrackMate.
                        </p>
                    </div>
                </div>

                {error && (
                    <p className="text-sm mb-4" style={{ color: AUTH.TEXT_DANGER }}>{error}</p>
                )}

                {!showConfirm ? (
                    <button
                        onClick={onInitiateDelete}
                        className="px-5 py-3 rounded-lg text-sm font-semibold transition-opacity hover:opacity-80"
                        style={{
                            backgroundColor: 'transparent',
                            border: '1px solid #ef4444',
                            color: '#ef4444',
                        }}
                    >
                        I want to delete my account
                    </button>
                ) : (
                    <div className="p-4 rounded-lg" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)' }}>
                        <p className="font-medium mb-4" style={{ color: '#ef4444' }}>
                            Are you absolutely sure?
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={onConfirmDelete}
                                disabled={loading}
                                className="px-5 py-3 rounded-lg text-sm font-semibold transition-opacity hover:opacity-80"
                                style={{ backgroundColor: '#ef4444', color: '#fff' }}
                            >
                                {loading ? 'Deleting...' : 'Yes, delete my account'}
                            </button>
                            <button
                                onClick={onCancelDelete}
                                className="px-5 py-3 rounded-lg text-sm font-semibold transition-opacity hover:opacity-80"
                                style={{
                                    backgroundColor: AUTH.BACKGROUND_TERTIARY,
                                    color: AUTH.TEXT_PRIMARY,
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default DeleteAccountCard

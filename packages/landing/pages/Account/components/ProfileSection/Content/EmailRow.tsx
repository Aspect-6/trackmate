import React from 'react'
import { Mail, Check, X } from 'lucide-react'
import { AUTH } from '@/app/styles/colors'
import type { ProfileSection } from '@/pages/Account/types'

const EmailRow: React.FC<ProfileSection.Content.EmailRowProps> = ({
    user,
    hasPassword,
    isEditing,
    newEmail,
    error,
    success,
    onEditStart,
    onEditCancel,
    onEmailChange,
    onSave,
}) => {
    return (
        <div
            className="p-5 rounded-xl mb-4"
            style={{
                backgroundColor: AUTH.BACKGROUND_TERTIARY,
                border: `1px solid ${AUTH.BORDER_PRIMARY}`,
            }}
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: AUTH.BACKGROUND_QUATERNARY }}
                    >
                        <Mail size={20} style={{ color: AUTH.GLOBAL_ACCENT }} />
                    </div>
                    <div>
                        <p className="text-sm" style={{ color: AUTH.TEXT_SECONDARY }}>Email</p>
                        {!isEditing ? (
                            <p className="font-medium" style={{ color: AUTH.TEXT_PRIMARY }}>{user.email}</p>
                        ) : (
                            <input
                                type="email"
                                value={newEmail}
                                onChange={(e) => onEmailChange(e.target.value)}
                                placeholder="New email"
                                className="mt-1 px-3 py-2 rounded-lg text-sm outline-none w-64"
                                style={{
                                    backgroundColor: AUTH.BACKGROUND_TERTIARY,
                                    border: `1px solid ${AUTH.BORDER_PRIMARY}`,
                                    color: AUTH.TEXT_PRIMARY,
                                }}
                                autoFocus
                            />
                        )}
                    </div>
                </div>
                {hasPassword ? (
                    !isEditing ? (
                        <button
                            onClick={onEditStart}
                            className="px-4 py-2 rounded-lg text-sm font-medium transition-opacity hover:opacity-80"
                            style={{
                                backgroundColor: AUTH.BACKGROUND_TERTIARY,
                                color: AUTH.TEXT_PRIMARY,
                            }}
                        >
                            Edit
                        </button>
                    ) : (
                        <div className="flex gap-2">
                            <button
                                onClick={onSave}
                                className="p-2 rounded-lg transition-opacity hover:opacity-80"
                                style={{ backgroundColor: '#22c55e', color: '#fff' }}
                            >
                                <Check size={18} />
                            </button>
                            <button
                                onClick={onEditCancel}
                                className="p-2 rounded-lg transition-opacity hover:opacity-80"
                                style={{ backgroundColor: AUTH.BACKGROUND_TERTIARY, color: AUTH.TEXT_PRIMARY }}
                            >
                                <X size={18} />
                            </button>
                        </div>
                    )
                ) : (
                    <span
                        className="px-3 py-1 rounded-full text-xs font-medium"
                        style={{
                            backgroundColor: 'rgba(66, 133, 244, 0.15)',
                            color: '#4285F4',
                        }}
                    >
                        Managed by Google
                    </span>
                )}
            </div>
            {error && <p className="text-sm mt-2" style={{ color: AUTH.TEXT_DANGER }}>{error}</p>}
            {success && <p className="text-sm mt-2" style={{ color: '#22c55e' }}>{success}</p>}
        </div>
    )
}

export default EmailRow

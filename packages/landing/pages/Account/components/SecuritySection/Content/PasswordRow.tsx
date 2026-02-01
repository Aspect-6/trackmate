import React from 'react'
import { Lock, Check, X } from 'lucide-react'
import type { SecuritySection } from '@/pages/Account/types'
import { ACCOUNT } from '@/app/styles/colors'

const PasswordRow: React.FC<SecuritySection.Content.PasswordRowProps> = ({
    hasPassword,
    isEditing,
    currentPassword,
    newPassword,
    confirmPassword,
    error,
    success,
    loading,
    onEditStart,
    onEditCancel,
    onCurrentPasswordChange,
    onNewPasswordChange,
    onConfirmPasswordChange,
    onSave,
}) => {
    return (
        <div
            className="p-5 rounded-xl"
            style={{
                backgroundColor: ACCOUNT.BACKGROUND_TERTIARY,
                border: `1px solid ${ACCOUNT.BORDER_PRIMARY}`,
            }}
        >
            <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                    <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: hasPassword ? ACCOUNT.BACKGROUND_QUATERNARY : ACCOUNT.BACKGROUND_QUATERNARY }}
                    >
                        <Lock size={20} style={{ color: hasPassword ? ACCOUNT.GLOBAL_ACCENT : ACCOUNT.TEXT_SECONDARY }} />
                    </div>
                    <div>
                        <p className="text-sm" style={{ color: ACCOUNT.TEXT_SECONDARY }}>Password</p>
                        {!hasPassword ? (
                            <p className="text-sm" style={{ color: ACCOUNT.TEXT_SECONDARY }}>
                                Not available — Must sign up with email and password to use this feature
                            </p>
                        ) : !isEditing ? (
                            <p className="font-medium" style={{ color: ACCOUNT.TEXT_PRIMARY }}>••••••••</p>
                        ) : (
                            <div className="space-y-3 mt-2">
                                <input
                                    type="password"
                                    value={currentPassword}
                                    onChange={(e) => onCurrentPasswordChange(e.target.value)}
                                    placeholder="Current password"
                                    className="px-3 py-2 rounded-lg text-sm outline-none w-64 block"
                                    style={{
                                        backgroundColor: ACCOUNT.BACKGROUND_TERTIARY,
                                        border: `1px solid ${ACCOUNT.BORDER_PRIMARY}`,
                                        color: ACCOUNT.TEXT_PRIMARY,
                                    }}
                                    autoFocus
                                />
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => onNewPasswordChange(e.target.value)}
                                    placeholder="New password"
                                    className="px-3 py-2 rounded-lg text-sm outline-none w-64 block"
                                    style={{
                                        backgroundColor: ACCOUNT.BACKGROUND_TERTIARY,
                                        border: `1px solid ${ACCOUNT.BORDER_PRIMARY}`,
                                        color: ACCOUNT.TEXT_PRIMARY,
                                    }}
                                />
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => onConfirmPasswordChange(e.target.value)}
                                    placeholder="Confirm new password"
                                    className="px-3 py-2 rounded-lg text-sm outline-none w-64 block"
                                    style={{
                                        backgroundColor: ACCOUNT.BACKGROUND_TERTIARY,
                                        border: `1px solid ${ACCOUNT.BORDER_PRIMARY}`,
                                        color: ACCOUNT.TEXT_PRIMARY,
                                    }}
                                />
                            </div>
                        )}
                    </div>
                </div>
                {hasPassword && (
                    !isEditing ? (
                        <button
                            onClick={onEditStart}
                            className="px-4 py-2 rounded-lg text-sm font-medium transition-opacity hover:opacity-80"
                            style={{
                                backgroundColor: ACCOUNT.BACKGROUND_TERTIARY,
                                color: ACCOUNT.TEXT_PRIMARY,
                            }}
                        >
                            Change
                        </button>
                    ) : (
                        <div className="flex gap-2">
                            <button
                                onClick={onSave}
                                disabled={loading}
                                className="p-2 rounded-lg transition-opacity hover:opacity-80"
                                style={{ backgroundColor: ACCOUNT.TEXT_SUCCESS, color: ACCOUNT.TEXT_PRIMARY }}
                            >
                                <Check size={18} />
                            </button>
                            <button
                                onClick={onEditCancel}
                                className="p-2 rounded-lg transition-opacity hover:opacity-80"
                                style={{ backgroundColor: ACCOUNT.BACKGROUND_TERTIARY, color: ACCOUNT.TEXT_PRIMARY }}
                            >
                                <X size={18} />
                            </button>
                        </div>
                    )
                )}
            </div>
            {error && <p className="text-sm mt-3" style={{ color: ACCOUNT.TEXT_DANGER }}>{error}</p>}
            {success && <p className="text-sm mt-3" style={{ color: ACCOUNT.TEXT_SUCCESS }}>{success}</p>}
        </div>
    )
}

export default PasswordRow

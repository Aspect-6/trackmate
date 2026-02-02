import React from 'react'
import { useHover } from '@shared/hooks/ui/useHover'
import { Lock, Check, X, Pencil } from 'lucide-react'
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
    const { isHovered, hoverProps } = useHover()

    return (
        <div
            className="p-5 rounded-xl"
            style={{
                backgroundColor: ACCOUNT.BACKGROUND_TERTIARY,
                border: `1px solid ${ACCOUNT.BORDER_PRIMARY}`,
            }}
        >
            <div className="flex items-center justify-between gap-4">
                <div className="flex items-start gap-4 flex-1 min-w-0">
                    <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: hasPassword ? ACCOUNT.BACKGROUND_QUATERNARY : ACCOUNT.BACKGROUND_QUATERNARY }}
                    >
                        <Lock size={20} style={{ color: hasPassword ? ACCOUNT.GLOBAL_ACCENT : ACCOUNT.TEXT_SECONDARY }} />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm pb-1" style={{ color: ACCOUNT.TEXT_SECONDARY }}>Password</p>
                        {!hasPassword ? (
                            <p className="text-sm" style={{ color: ACCOUNT.TEXT_SECONDARY }}>
                                Not available — Must sign up with email and password to use this feature
                            </p>
                        ) : !isEditing ? (
                            <p className="font-medium" style={{ color: ACCOUNT.TEXT_PRIMARY }}>••••••••</p>
                        ) : (
                            <div className="space-y-3">
                                <input
                                    type="password"
                                    value={currentPassword}
                                    onChange={(e) => onCurrentPasswordChange(e.target.value)}
                                    placeholder="Current password"
                                    className="px-3 py-2 rounded-lg text-sm outline-none w-full block max-w-sm"
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
                                    className="px-3 py-2 rounded-lg text-sm outline-none w-full block max-w-sm"
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
                                    className="px-3 py-2 rounded-lg text-sm outline-none w-full block max-w-sm"
                                    style={{
                                        backgroundColor: ACCOUNT.BACKGROUND_TERTIARY,
                                        border: `1px solid ${ACCOUNT.BORDER_PRIMARY}`,
                                        color: ACCOUNT.TEXT_PRIMARY,
                                    }}
                                />
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
                                        onClick={onEditCancel}
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
                            </div>
                        )}
                        {error && <p className="text-sm mt-3" style={{ color: ACCOUNT.TEXT_DANGER }}>{error}</p>}
                        {success && <p className="text-sm mt-3" style={{ color: ACCOUNT.TEXT_SUCCESS }}>{success}</p>}
                    </div>
                </div>
                {hasPassword && !isEditing && (
                    <button
                        onClick={onEditStart}
                        className="p-2 rounded-lg hover:opacity-80 transition-opacity"
                        style={{ color: ACCOUNT.TEXT_PRIMARY }}
                        title="Change password"
                    >
                        <Pencil size={18} />
                    </button>
                )}
            </div>


        </div>
    )
}

export default PasswordRow

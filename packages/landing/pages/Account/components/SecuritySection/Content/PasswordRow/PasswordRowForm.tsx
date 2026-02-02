import React from "react"
import type { SecuritySection } from "@/pages/Account/types"
import { PasswordRowInput } from "./PasswordRowInput"
import { PasswordRowActions } from "./PasswordRowActions"
import { ACCOUNT } from "@/app/styles/colors"

export const PasswordRowForm: React.FC<SecuritySection.Content.PasswordRow.FormProps> = ({
    currentPassword,
    newPassword,
    confirmPassword,
    error,
    success,
    loading,
    onCurrentPasswordChange,
    onNewPasswordChange,
    onConfirmPasswordChange,
    onSave,
    onCancel,
}) => {
    return (
        <React.Fragment>
            <div className="flex flex-row items-center justify-between gap-4">
                <PasswordRowInput>
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
                        <PasswordRowActions onSave={onSave} onCancel={onCancel} loading={loading} />
                        {error && <p className="text-sm mt-3" style={{ color: ACCOUNT.TEXT_DANGER }}>{error}</p>}
                        {success && <p className="text-sm mt-3" style={{ color: ACCOUNT.TEXT_SUCCESS }}>{success}</p>}
                    </div>
                </PasswordRowInput>
            </div>
        </React.Fragment>
    )
}

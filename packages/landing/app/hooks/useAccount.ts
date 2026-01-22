import { useState } from "react"
import {
    updateUserPassword,
    updateUserEmail,
    updateUserDisplayName,
    deleteUserAccount,
    linkGoogleAccount,
    unlinkGoogleAccount
} from "@/app/lib/auth"
import type { AuthError } from "@/app/types"

interface AccountOperationResult {
    success: boolean
    error: AuthError | null
}

/**
 * Hook that manages account-related operations like changing password,
 * updating email, and account deletion.
 */
export const useAccount = () => {
    const [loading, setLoading] = useState(false)

    const attempt = async (operation: () => Promise<void>): Promise<AccountOperationResult> => {
        setLoading(true)
        try {
            await operation()
            return { success: true, error: null }
        } catch (error) {
            return { success: false, error: error as AuthError }
        } finally {
            setLoading(false)
        }
    }

    const changePassword = (currentPassword: string, newPassword: string) =>
        attempt(() => updateUserPassword(currentPassword, newPassword))

    const changeEmail = (newEmail: string) =>
        attempt(() => updateUserEmail(newEmail))

    const changeDisplayName = (displayName: string) =>
        attempt(() => updateUserDisplayName(displayName))

    const deleteAccount = () =>
        attempt(() => deleteUserAccount())

    const linkGoogle = () =>
        attempt(() => linkGoogleAccount())

    const unlinkGoogle = () =>
        attempt(() => unlinkGoogleAccount())

    return {
        changePassword,
        changeEmail,
        changeDisplayName,
        deleteAccount,
        linkGoogle,
        unlinkGoogle,
        loading
    }
}

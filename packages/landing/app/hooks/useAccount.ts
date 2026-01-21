import { useState } from "react"
import {
    updateUserPassword,
    updateUserEmail,
    deleteUserAccount
} from "@/app/lib/auth"

interface AccountOperationResult {
    success: boolean
    error: Error | null
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
        } catch (error: any) {
            return { success: false, error }
        } finally {
            setLoading(false)
        }
    }

    const changePassword = (newPassword: string) =>
        attempt(() => updateUserPassword(newPassword))

    const changeEmail = (newEmail: string) =>
        attempt(() => updateUserEmail(newEmail))

    const deleteAccount = () =>
        attempt(() => deleteUserAccount())

    return {
        changePassword,
        changeEmail,
        deleteAccount,
        loading
    }
}


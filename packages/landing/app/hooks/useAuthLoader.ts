import { useState } from "react"
import { User } from "firebase/auth"
import { AuthResult } from "@/app/types"

/**
 * Hook that provides loading state and an attempt wrapper for auth operations.
 */
export const useAuthLoader = () => {
    const [loading, setLoading] = useState(false)

    const attempt = async (authFn: () => Promise<User | null>): Promise<AuthResult> => {
        setLoading(true)
        try {
            const user = await authFn()
            return { user, error: null }
        } catch (error: any) {
            return { user: null, error }
        } finally {
            setLoading(false)
        }
    }

    return { loading, attempt }
}

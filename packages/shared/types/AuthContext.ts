import { User } from "firebase/auth"
import { ReactNode } from "react"

export interface AuthProviderProps {
    children: ReactNode
}

/**
 * Context interface for managing authentication state.
 */
export interface AuthContextType {
    /** The current authenticated user, or null if not signed in */
    user: User | null
    /** Whether the initial auth check is in progress */
    loading: boolean
    /** Whether the current user has a premium subscription (academic or all) */
    isPremium: boolean
}

import { User } from 'firebase/auth'

/**
 * Context interface for managing authentication state.
 */
export interface AuthContextType {
    /** The current authenticated user, or null if not signed in */
    user: User | null
    /** Whether the initial auth check is in progress */
    loading: boolean
}

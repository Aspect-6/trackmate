import type { User } from "firebase/auth"

/**
 * Types of toast notifications available
 */
export type ToastType = 'success' | 'error'

/**
 * Context interface for managing toast notifications
 */
export interface ToastContextType {
    /** Displays a toast message with a specific type */
    showToast: (message: string, type?: ToastType) => void
}

/**
 * Firebase auth error structure
 */
export interface AuthError {
    code: string
    message: string
}

/**
 * Result of an auth operation (sign in or sign up)
 */
export interface AuthResult {
    user: User | null
    error: AuthError | null
}

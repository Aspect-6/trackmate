/**
 * Types of toast notifications available.
 */
export type ToastType = "success" | "error"

export interface Toast {
    id: number
    message: string
    type: ToastType
    isHiding?: boolean
}

/**
 * Context interface for managing toast notifications.
 */
export interface ToastContextType {
    /** Displays a toast message with a specific type */
    showToast: (message: string, type: ToastType) => void
}

import React, { createContext, useContext, useState, useCallback } from "react"
import { CheckCircle, AlertCircle } from "lucide-react"
import type { ToastType, Toast, ToastContextType, ToastProviderProps } from "@shared/types/ToastContext"

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
    const [toasts, setToasts] = useState<Toast[]>([])

    const showToast = useCallback((message: string, type: ToastType) => {
        const id = Date.now()
        setToasts(prev => [...prev, { id, message, type }])

        setTimeout(() => {
            setToasts(prev => prev.map(t => t.id === id ? { ...t, isHiding: true } : t))

            setTimeout(() => {
                setToasts(prev => prev.filter(t => t.id !== id))
            }, 300)
        }, 3000)
    }, [])

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <div className="toast-container">
                {toasts.map(toast => (
                    <div
                        key={toast.id}
                        className={`toast-notification toast-${toast.type} ${toast.isHiding ? "hide" : ""}`}
                    >
                        <div className="flex items-center">
                            {toast.type === "success" ? (
                                <CheckCircle className="w-5 h-5 mr-2" />
                            ) : (
                                <AlertCircle className="w-5 h-5 mr-2" />
                            )}
                            <span>{toast.message}</span>
                        </div>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    )
}

export const useToast = (): ToastContextType => {
    const context = useContext(ToastContext)
    if (!context) {
        throw new Error("useToast must be used within a ToastProvider")
    }
    return context
}


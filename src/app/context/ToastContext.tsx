import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import { CheckCircle, AlertCircle } from 'lucide-react'
import type { ToastContextType, ToastType } from '@/app/types'

interface Toast {
    id: number
    message: string
    type: ToastType
    isHiding?: boolean
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

interface ToastProviderProps {
    children: ReactNode
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
    const [toasts, setToasts] = useState<Toast[]>([])

    const showToast = useCallback((message: string, type: ToastType = 'success') => {
        const id = Date.now()
        setToasts(prev => [...prev, { id, message, type }])

        setTimeout(() => {
            // Add hide class for animation before removing? 
            // For simplicity in React, we might just remove it, or we can handle the exit animation.
            // The legacy CSS has a .hide class for slideOut.
            // To support that, we'd need a two-step removal.
            // Let's try to implement the exit animation.

            setToasts(prev => prev.map(t => t.id === id ? { ...t, isHiding: true } : t))

            setTimeout(() => {
                setToasts(prev => prev.filter(t => t.id !== id))
            }, 300) // Match animation duration
        }, 3000)
    }, [])

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <div className="toast-container">
                {toasts.map(toast => (
                    <div
                        key={toast.id}
                        className={`toast-notification toast-${toast.type} ${toast.isHiding ? 'hide' : ''}`}
                    >
                        <div className="flex items-center">
                            {toast.type === 'success' ? (
                                <CheckCircle className="w-5 h-5 mr-2" />
                            ) : (
                                <AlertCircle className="w-5 h-5 mr-2" />
                            )}
                            <span>{toast.message}</span>
                        </div>
                        {/* Legacy didn't seem to have a close button in the description, but it's good UX. 
                            The user said "copy its implementation", so maybe I should stick to exactly what legacy had?
                            Legacy JS: 
                            const toast = document.createElement('div')
                            toast.className = `toast-notification toast-${type}`
                            toast.innerHTML = `
                                <div class="flex items-center">
                                    ${icon}
                                    <span>${message}</span>
                                </div>
                            `
                            
                            It didn't have a close button. I'll omit it to be safe and match legacy exactly.
                        */}
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    )
}

export const useToast = (): ToastContextType => {
    const context = useContext(ToastContext)
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider')
    }
    return context
}


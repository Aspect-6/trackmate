import React, { createContext, useContext, useState, useCallback, useMemo, ReactNode } from "react"

interface ModalEntry {
    name: string
    data: any
}

interface ModalContextType {
    /** The topmost modal name */
    activeModal: string | null
    /** The topmost modal data */
    modalData: any
    /** The full ordered stack of open modals */
    modalStack: ModalEntry[]
    /** Push a new modal onto the stack or replace current modal */
    openModal: (modalName: string, data?: any, options?: { stack?: boolean }) => void
    /** Pop the topmost modal off the stack */
    closeModal: () => void
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

interface ModalProviderProps {
    children: ReactNode
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
    const [modalStack, setModalStack] = useState<ModalEntry[]>([])

    const openModal = useCallback((modalName: string, data: any = null, options?: { stack?: boolean }): void => {
        setModalStack(prev => {
            if (options?.stack) {
                return [...prev, { name: modalName, data }]
            }
            return [{ name: modalName, data }]
        })
    }, [])

    const closeModal = useCallback((): void => {
        setModalStack(prev => prev.slice(0, -1))
    }, [])

    const value = useMemo(() => {
        const top = modalStack.length > 0 ? modalStack[modalStack.length - 1]! : null
        return {
            activeModal: top?.name ?? null,
            modalData: top?.data ?? null,
            modalStack,
            openModal,
            closeModal,
        }
    }, [modalStack, openModal, closeModal])

    return (
        <ModalContext.Provider value={value}>
            {children}
        </ModalContext.Provider>
    )
}

export const useModal = (): ModalContextType => {
    const context = useContext(ModalContext)
    if (!context) {
        throw new Error("useModal must be used within a ModalProvider")
    }
    return context
}

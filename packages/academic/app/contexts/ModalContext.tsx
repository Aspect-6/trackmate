import React, { createContext, useContext, useState, useCallback, ReactNode } from "react"

interface ModalContextType {
    activeModal: string | null
    modalData: any
    openModal: (modalName: string, data?: any) => void
    closeModal: () => void
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

interface ModalProviderProps {
    children: ReactNode
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
    const [activeModal, setActiveModal] = useState<string | null>(null)
    const [modalData, setModalData] = useState<any>(null)

    const openModal = useCallback((modalName: string, data: any = null): void => {
        setActiveModal(modalName)
        setModalData(data)
    }, [])

    const closeModal = useCallback((): void => {
        setActiveModal(null)
        setModalData(null)
    }, [])

    return (
        <ModalContext.Provider value={{ activeModal, modalData, openModal, closeModal }}>
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

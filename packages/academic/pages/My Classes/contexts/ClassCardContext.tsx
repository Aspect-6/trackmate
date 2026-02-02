import { createContext } from "react"

export interface ClassCardContextType {
    attributes: any
    listeners: any
}

export const ClassCardContext = createContext<ClassCardContextType | null>(null)

export const ClassCardProvider = ClassCardContext.Provider

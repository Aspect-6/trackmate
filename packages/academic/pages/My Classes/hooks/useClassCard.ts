import { useContext } from "react"
import { ClassCardContext } from "@/pages/My Classes/contexts/ClassCardContext"

export const useClassCard = () => {
    const context = useContext(ClassCardContext)
    if (!context) {
        throw new Error("useClassCard must be used within a ClassCard")
    }
    return context
}

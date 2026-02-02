import React, { useCallback } from "react"
import { useModal } from "@/app/contexts/ModalContext"
import { useClasses } from "@/app/hooks/entities"
import ClassBoard from "./components/ClassBoard"
import "./index.css"

const MyClasses: React.FC = () => {
    const { openModal } = useModal()
    const { classes, reorderClasses } = useClasses()

    const handleAddClass = useCallback(() => {
        openModal("add-class")
    }, [openModal])

    const handleEditClass = useCallback((id: string) => {
        openModal("edit-class", id)
    }, [openModal])

    return (
        <div className="space-y-6">
            <ClassBoard
                classes={classes}
                onReorder={reorderClasses}
                onAddClass={handleAddClass}
                openEditClass={handleEditClass}
            />
        </div>
    )
}

export default MyClasses

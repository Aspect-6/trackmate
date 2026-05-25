import React, { useCallback, useState } from "react"
import { useModal } from "@/app/contexts/ModalContext"
import { useHover } from "@shared/hooks/ui/useHover"
import { useClasses } from "@/app/hooks/entities"
import ClassBoard from "./components/ClassBoard"
import { MY_CLASSES } from "@/app/styles/colors"
import "./index.css"

const MyClasses: React.FC = () => {
    const { openModal } = useModal()
    const { classes, reorderClasses, updateClass } = useClasses()
    const [viewMode, setViewMode] = useState<"active" | "archived">("active")

    const { isHovered: isActiveHovered, hoverProps: activeHoverProps } = useHover()
    const { isHovered: isArchivedHovered, hoverProps: archivedHoverProps } = useHover()

    const handleAddClass = useCallback(() => {
        openModal("add-class")
    }, [openModal])

    const handleEditClass = useCallback((id: string) => {
        openModal("edit-class", id)
    }, [openModal])

    const handleToggleArchive = useCallback((id: string, currentStatus: boolean) => {
        updateClass(id, { isArchived: !currentStatus })
    }, [updateClass])

    const activeClasses = classes.filter(c => !c.isArchived)
    const archivedClasses = classes.filter(c => c.isArchived)
    
    const isActive = viewMode === "active"
    const isArchived = viewMode === "archived"
    const classesToDisplay = isActive ? activeClasses : archivedClasses

    return (
        <div className="space-y-6">
            <div className="flex p-1 w-fit rounded-full border" style={{ borderColor: MY_CLASSES.BORDER_PRIMARY, backgroundColor: MY_CLASSES.BACKGROUND_BLACK_05 }}>
                <button
                    onClick={() => setViewMode("active")}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${isActive ? "shadow-sm" : ""}`}
                    style={{
                        backgroundColor: isActive ? MY_CLASSES.GLOBAL_ACCENT : 'transparent',
                        color: isActive ? MY_CLASSES.TEXT_WHITE : (isActiveHovered ? MY_CLASSES.TEXT_PRIMARY : MY_CLASSES.TEXT_SECONDARY)
                    }}
                    {...activeHoverProps}
                >
                    Active
                </button>
                <button
                    onClick={() => setViewMode("archived")}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${isArchived ? "shadow-sm" : ""}`}
                    style={{
                        backgroundColor: isArchived ? MY_CLASSES.GLOBAL_ACCENT : 'transparent',
                        color: isArchived ? MY_CLASSES.TEXT_WHITE : (isArchivedHovered ? MY_CLASSES.TEXT_PRIMARY : MY_CLASSES.TEXT_SECONDARY)
                    }}
                    {...archivedHoverProps}
                >
                    Archived
                </button>
            </div>

            <ClassBoard
                classes={classesToDisplay}
                onReorder={reorderClasses}
                onAddClass={handleAddClass}
                openEditClass={handleEditClass}
                onToggleArchive={handleToggleArchive}
            />
        </div>
    )
}

export default MyClasses

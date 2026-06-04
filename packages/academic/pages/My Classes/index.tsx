import React, { useState, useCallback } from "react"
import { useModal } from "@/app/contexts/ModalContext"
import { useHover } from "@shared/hooks/ui/useHover"
import { useClasses, useAcademicTerms } from "@/app/hooks/entities"
import ClassBoard from "./components/ClassBoard"
import { MY_CLASSES } from "@/app/styles/colors"
import "./index.css"

const MyClasses: React.FC = () => {
    const { openModal } = useModal()
    const { classes, reorderClasses, updateClass } = useClasses()
    const { getTermDisplay } = useAcademicTerms()
    const [viewMode, setViewMode] = useState<"active" | "archived">("active")
    const [activeArchivedTermId, setActiveArchivedTermId] = useState<string | null>(null)

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

    const archivedTerms = Array.from(new Set(archivedClasses.map(c => c.termId || "unassigned")))

    if (viewMode === "archived" && archivedTerms.length > 0 && (!activeArchivedTermId || !archivedTerms.includes(activeArchivedTermId))) {
        setActiveArchivedTermId(archivedTerms[0]!)
    }

    const isActive = viewMode === "active"
    const isArchived = viewMode === "archived"

    const classesToDisplay = isActive
        ? activeClasses
        : archivedClasses.filter(c => (c.termId || "unassigned") === activeArchivedTermId)

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full">
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

                {isArchived && archivedTerms.length > 0 && (
                    <select
                        value={activeArchivedTermId || ""}
                        onChange={(e) => setActiveArchivedTermId(e.target.value)}
                        className="app-select-dropdown text-sm !py-2.5 !pl-4.5 !pr-8 !bg-transparent !rounded-full flex-shrink-0 max-w-sm md:w-auto md:max-w-xs"
                        style={{ minWidth: "180px" }}
                    >
                        {archivedTerms.map(termId => (
                            <option key={termId} value={termId}>
                                {termId === "unassigned" ? "Unassigned" : getTermDisplay(termId)}
                            </option>
                        ))}
                    </select>
                )}
            </div>

            <ClassBoard
                classes={classesToDisplay}
                currentView={viewMode}
                onReorder={reorderClasses}
                onAddClass={handleAddClass}
                openEditClass={handleEditClass}
                onToggleArchive={handleToggleArchive}
            />
        </div>
    )
}

export default MyClasses

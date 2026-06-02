import React from "react"
import { DndContext, closestCenter } from "@dnd-kit/core"
import type { TemplateSettings } from "@/pages/Settings/types"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"

const TemplateList: React.FC<TemplateSettings.TemplateListProps> = ({
    sensors,
    onDragEnd,
    items,
    children
}) => {
    return (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
            <SortableContext items={items} strategy={verticalListSortingStrategy}>
                <div className="space-y-2 max-h-64 overflow-y-auto custom-scrollbar pr-1">
                    {children}
                </div>
            </SortableContext>
        </DndContext>
    )
}

export default TemplateList
export { default as TemplateListRow } from "./TemplateListRow"

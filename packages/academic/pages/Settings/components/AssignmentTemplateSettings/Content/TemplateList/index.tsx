import React from "react"
import { DndContext, closestCenter } from "@dnd-kit/core"
import type { AssignmentTemplateSettings } from "@/pages/Settings/types"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"

const TemplateList: React.FC<AssignmentTemplateSettings.Content.TemplateList.Props> = ({
    sensors,
    onDragEnd,
    items,
    children
}) => {
    return (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
            <SortableContext items={items} strategy={verticalListSortingStrategy}>
                <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                    {children}
                </div>
            </SortableContext>
        </DndContext>
    )
}

export default TemplateList
export { default as TemplateRow } from "./TemplateRow"

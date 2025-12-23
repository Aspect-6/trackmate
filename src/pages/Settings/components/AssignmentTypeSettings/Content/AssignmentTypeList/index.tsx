import React from 'react'
import type { AssignmentTypeSettings } from '@/pages/Settings/types'
import { DndContext, closestCenter } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

const AssignmentTypeList: React.FC<AssignmentTypeSettings.Content.AssignmentTypeList.Props> = ({
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

export default AssignmentTypeList

export { default as AssignmentTypeListRow } from './AssignmentTypeListRow'

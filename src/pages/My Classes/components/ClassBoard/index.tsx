import React from 'react'
import type { ClassBoard } from '@/pages/My Classes/types'
import { useApp } from '@/app/contexts/AppContext'
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent
} from '@dnd-kit/core'
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    rectSortingStrategy
} from '@dnd-kit/sortable'
import ClassBoardEmptyState from './ClassBoardEmptyState'
import ClassCard from './ClassCard'
import ClassCardColorStrip from './ClassCard/ClassCardColorStrip'
import ClassCardContainer from './ClassCard/ClassCardContainer'
import ClassCardHeader, { ClassCardTitle, ClassCardButtons } from './ClassCard/Header'
import ClassCardBody, { ClassCardInstructor, ClassCardRoom, ClassCardColor, ClassCardTerm } from './ClassCard/Body'

const ClassBoard: React.FC<ClassBoard.Props> = ({ classes, onReorder, onAddClass, openEditClass }) => {
    const { openModal } = useApp()
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    )

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event

        if (over && active.id !== over.id) {
            const oldIndex = classes.findIndex((c) => c.id === active.id)
            const newIndex = classes.findIndex((c) => c.id === over.id)
            onReorder(arrayMove(classes, oldIndex, newIndex))
        }
    }

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
        >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {classes.length === 0 ? (
                    <ClassBoardEmptyState onAddClass={onAddClass} />
                ) : (
                    <SortableContext
                        items={classes.map(c => c.id)}
                        strategy={rectSortingStrategy}
                    >
                        {classes.map((classInfo) => (
                            <ClassCard key={classInfo.id} classInfo={classInfo}>
                                <ClassCardColorStrip color={classInfo.color} />
                                <ClassCardContainer>
                                    <ClassCardHeader>
                                        <ClassCardTitle name={classInfo.name} />
                                        <ClassCardButtons
                                            onEdit={() => openEditClass(classInfo.id)}
                                            onDelete={() => openModal('delete-class', classInfo.id)}
                                        />
                                    </ClassCardHeader>
                                    <ClassCardBody>
                                        <ClassCardInstructor teacherName={classInfo.teacherName} />
                                        <ClassCardRoom roomNumber={classInfo.roomNumber} />
                                        <ClassCardTerm termId={classInfo.termId} semesterId={classInfo.semesterId} />
                                        <ClassCardColor color={classInfo.color} />
                                    </ClassCardBody>
                                </ClassCardContainer>
                            </ClassCard>
                        ))}
                    </SortableContext>
                )}
            </div>
        </DndContext>
    )
}

export default ClassBoard

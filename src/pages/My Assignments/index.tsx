import React, { useState } from 'react';
import { useApp } from '@/app/context/AppContext';
import { Status } from '@/app/types';
import AssignmentColumn from '@/pages/My Assignments/components/AssignmentColumn';
import '@/pages/My Assignments/index.css';

const Assignments: React.FC = () => {
    const { assignments, updateAssignment, getClassById, openModal } = useApp();
    const [draggedId, setDraggedId] = useState<string | null>(null);

    const handleDragStart = (e: React.DragEvent, id: string) => {
        e.dataTransfer.effectAllowed = "move";
        // Defer state update to ensure drag image is captured at full opacity
        setTimeout(() => setDraggedId(id), 0);
    };

    const handleDragEnd = () => {
        setDraggedId(null);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const handleDrop = (e: React.DragEvent, status: Status) => {
        e.preventDefault();
        if (draggedId) {
            updateAssignment(draggedId, { status });
            setDraggedId(null);
        }
    };

    return (
        <div className="my-assignments-page h-full flex flex-col">
            <div className="flex-grow flex flex-col lg:flex-row gap-4 overflow-x-auto pb-4">
                <AssignmentColumn
                    status="To Do"
                    title="Upcoming"
                    headerColorClass="text-gray-300"
                    assignments={assignments}
                    draggedId={draggedId}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                    onAssignmentClick={(id) => openModal('edit-assignment', id)}
                    getClassById={getClassById}
                />
                <AssignmentColumn
                    status="In Progress"
                    title="In Progress"
                    headerColorClass="text-orange-300"
                    assignments={assignments}
                    draggedId={draggedId}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                    onAssignmentClick={(id) => openModal('edit-assignment', id)}
                    getClassById={getClassById}
                />
                <AssignmentColumn
                    status="Done"
                    title="Done"
                    headerColorClass="text-green-300"
                    assignments={assignments}
                    draggedId={draggedId}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                    onAssignmentClick={(id) => openModal('edit-assignment', id)}
                    getClassById={getClassById}
                />
            </div>
        </div>
    );
};

export default Assignments;

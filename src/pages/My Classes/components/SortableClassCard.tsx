import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { SortableClassCardProps } from '@/pages/My Classes/types';
import ClassCardHeader from '@/pages/My Classes/components/ClassCardHeader';
import ClassCardDetails from '@/pages/My Classes/components/ClassCardDetails';
import { MY_CLASSES } from '@/app/styles/colors';

const SortableClassCard: React.FC<SortableClassCardProps> = ({ classInfo, openModal }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id: classInfo.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 10 : 1,
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <div
            ref={setNodeRef}
            style={{
                ...style,
                backgroundColor: MY_CLASSES.CLASS_CARD_BG,
                border: isDragging ? '2px dashed #8b5cf6' : '1px solid #30363d',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)'
            }}
            className={`rounded-xl overflow-hidden flex flex-col transition-shadow duration-200 hover:shadow-lg group ${isDragging ? '' : 'hover:border-violet-500/50'}`}
        >
            <div
                className="h-3 w-full"
                style={{ backgroundColor: classInfo.color }}
            ></div>
            <div className="p-6 flex-grow">
                <ClassCardHeader
                    name={classInfo.name}
                    attributes={attributes}
                    listeners={listeners}
                    onEdit={() => openModal('edit-class', classInfo.id)}
                    onDelete={() => openModal('delete-class', classInfo.id)}
                />
                <ClassCardDetails
                    teacherName={classInfo.teacherName}
                    roomNumber={classInfo.roomNumber}
                    color={classInfo.color}
                />
            </div>
        </div>
    );
};

export default SortableClassCard;

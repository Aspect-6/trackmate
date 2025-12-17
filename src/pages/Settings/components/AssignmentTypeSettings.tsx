import React, { useState } from 'react';
import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors, closestCenter } from '@dnd-kit/core';
import { SortableContext, arrayMove, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Plus, Trash2, GripVertical } from 'lucide-react';
import { AssignmentType } from '@/app/types';
import { SETTINGS, GLOBAL } from '@/app/styles/colors';
import { AssignmentTypeSettingsProps } from '@/pages/Settings/types';

const AssignmentTypeSettings: React.FC<AssignmentTypeSettingsProps> = ({
    types,
    onAddType,
    onRemoveType,
    onReorderTypes
}) => {
    const [newType, setNewType] = useState<string>('');
    const sensors = useSensors(
        useSensor(MouseSensor, { activationConstraint: { distance: 8 } }),
        useSensor(TouchSensor, { activationConstraint: { delay: 150, tolerance: 8 } })
    );

    const handleAdd = () => {
        const success = onAddType(newType);
        if (success) {
            setNewType('');
        }
    };

    const handleDragEnd = (event: any) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;
        const oldIndex = types.findIndex(t => t === active.id);
        const newIndex = types.findIndex(t => t === over.id);
        if (oldIndex === -1 || newIndex === -1) return;
        const updated = arrayMove(types, oldIndex, newIndex);
        onReorderTypes(updated);
    };

    const SortableRow: React.FC<{ type: AssignmentType }> = ({ type }) => {
        const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: type });
        const style = {
            transform: CSS.Translate.toString(transform),
            transition,
            opacity: isDragging ? 0.8 : 1,
            backgroundColor: SETTINGS.CARD_BG,
            borderColor: SETTINGS.CARD_BORDER
        } as React.CSSProperties;

        return (
            <div
                ref={setNodeRef}
                style={style}
                className="flex items-center justify-between gap-3 px-3 py-2 rounded-lg border"
            >
                <div className="flex items-center gap-3 text-sm sm:text-base" style={{ color: SETTINGS.BODY_TEXT }}>
                    <button
                        type="button"
                        className="p-1 rounded hover:bg-white/5 cursor-grab touch-none"
                        style={{ touchAction: 'none' }}
                        {...attributes}
                        {...listeners}
                        aria-label={`Drag ${type}`}
                    >
                        <GripVertical className="w-4 h-4 opacity-60" />
                    </button>
                    <span className="font-medium">{type}</span>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={() => onRemoveType(type)}
                        disabled={types.length === 1}
                        className="p-2 rounded-lg border disabled:opacity-40 hover:bg-red-500/10"
                        style={{ borderColor: SETTINGS.CARD_BORDER, color: GLOBAL.DELETE_BUTTON_BG }}
                        aria-label={`Remove ${type}`}
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div
            className="settings-card p-5 sm:p-6 rounded-xl mb-6 space-y-4"
            style={{
                backgroundColor: SETTINGS.MODULE_BG,
                border: `1px solid ${SETTINGS.MODULE_BORDER}`,
                boxShadow: SETTINGS.MODULE_SHADOW
            }}
        >
            <div className="flex items-center justify-between gap-3">
                <div>
                    <h2 className="text-lg sm:text-xl font-bold" style={{ color: SETTINGS.SCHEDULE_SETTINGS_HEADER }}>
                        Assignment Types
                    </h2>
                    <p className="text-sm sm:text-base" style={{ color: SETTINGS.BODY_TEXT }}>
                        Reorder, add, or remove the items that show up in assignment type dropdowns.
                    </p>
                </div>
            </div>

            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={types} strategy={verticalListSortingStrategy}>
                    <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                        {types.map(type => (
                            <SortableRow key={type} type={type} />
                        ))}
                    </div>
                </SortableContext>
            </DndContext>

            <div className="flex flex-col sm:flex-row gap-3">
                <input
                    type="text"
                    value={newType}
                    onChange={e => setNewType(e.target.value)}
                    placeholder="Add a new type"
                    className="flex-1 rounded-lg border px-3 py-2"
                    style={{ backgroundColor: SETTINGS.CARD_BG, borderColor: SETTINGS.CARD_BORDER, color: SETTINGS.BODY_TEXT }}
                />
                <button
                    type="button"
                    onClick={handleAdd}
                    className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium text-white transition-colors hover:brightness-95"
                    style={{
                        backgroundColor: GLOBAL.ADDITEM_BUTTON_BG
                    }}
                >
                    <Plus className="w-4 h-4" />
                    Add Type
                </button>
            </div>
        </div>
    );
};

export default AssignmentTypeSettings;

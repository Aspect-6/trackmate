import React, { useEffect, useState } from 'react';
import { useApp } from '@/app/context/AppContext';
import { Class } from '@/app/types';
import {
    GLOBAL,
    MY_CLASSES
} from '@/app/styles/colors';

const COLORS = ['#ef4444', '#f97316', '#f59e0b', '#eab308', '#84cc16', '#22c55e', '#10b981', '#14b8a6', '#06b6d4', '#0ea5e9', '#3b82f6', '#6366f1', '#8b5cf6', '#a855f7', '#d946ef', '#ec4899', '#f43f5e', '#64748b'];

interface ModalProps {
    onClose: () => void;
}

interface ClassModalProps extends ModalProps {
    classId: string;
}

export const AddClassModal: React.FC<ModalProps> = ({ onClose }) => {
    const { addClass } = useApp();
    const [selectedColor, setSelectedColor] = useState<string>(COLORS[0]!);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        const newClass = {
            name: formData.get('name') as string,
            color: selectedColor,
            teacherName: formData.get('teacherName') as string,
            roomNumber: formData.get('roomNumber') as string
        };
        const success = addClass(newClass);
        if (success) onClose();
    };

    return (
        <div className="high-contrast-card w-full max-w-md p-6 rounded-xl">
            <h2 className="text-xl font-bold mb-4" style={{ color: MY_CLASSES.CLASS_TEXT_THEME }}>Add New Class</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Row 1: Class Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Class Name</label>
                    <input
                        type="text"
                        name="name"
                        required
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[var(--focus-color)]"
                        style={{ '--focus-color': MY_CLASSES.CLASS_MODAL_BUTTON_BG } as React.CSSProperties}
                        placeholder="e.g., AP History"
                    />
                </div>

                {/* Row 2: Instructor & Room Number */}
                <div className="flex space-x-4">
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-400 mb-1">Instructor Name (Optional)</label>
                        <input
                            type="text"
                            name="teacherName"
                            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[var(--focus-color)]"
                            style={{ '--focus-color': MY_CLASSES.CLASS_MODAL_BUTTON_BG } as React.CSSProperties}
                            placeholder="e.g., Ms. Johnson"
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-400 mb-1">Room Number (Optional)</label>
                        <input
                            type="text"
                            name="roomNumber"
                            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[var(--focus-color)]"
                            style={{ '--focus-color': MY_CLASSES.CLASS_MODAL_BUTTON_BG } as React.CSSProperties}
                            placeholder="e.g., B105"
                        />
                    </div>
                </div>

                {/* Row 3: Color Code */}
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Color Code</label>
                    <div className="color-tile-grid">
                        {COLORS.map(color => (
                            <div
                                key={color}
                                onClick={() => setSelectedColor(color)}
                                className={`color-tile ${selectedColor === color ? 'selected' : ''}`}
                                style={{ backgroundColor: color }}
                            />
                        ))}
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-end space-x-3 mt-6">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 rounded-lg text-sm font-medium"
                        style={{ backgroundColor: GLOBAL.CANCEL_BUTTON_BG, color: GLOBAL.CANCEL_BUTTON_TEXT }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = GLOBAL.CANCEL_BUTTON_BG_HOVER}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = GLOBAL.CANCEL_BUTTON_BG}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 rounded-lg text-sm font-medium text-white transition-colors duration-150"
                        style={{ backgroundColor: MY_CLASSES.CLASS_MODAL_BUTTON_BG }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = MY_CLASSES.CLASS_MODAL_BUTTON_BG_HOVER}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = MY_CLASSES.CLASS_MODAL_BUTTON_BG}
                    >
                        Create Class
                    </button>
                </div>
            </form>
        </div>
    );
};

export const EditClassModal: React.FC<ClassModalProps> = ({ onClose, classId }) => {
    const { classes, updateClass, openModal } = useApp();
    const [formData, setFormData] = useState<Class | null>(null);

    useEffect(() => {
        const classInfo = classes.find(c => c.id === classId);
        if (classInfo) setFormData(classInfo);
    }, [classId, classes]);

    if (!formData) return null;

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        updateClass(classId, formData);
        onClose();
    };

    return (
        <div className="high-contrast-card w-full max-w-md p-6 rounded-xl">
            <h2 className="text-xl font-bold mb-4" style={{ color: MY_CLASSES.CLASS_TEXT_THEME }}>Edit Class Details</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Row 1: Class Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Class Name</label>
                    <input
                        type="text"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[var(--focus-color)]"
                        style={{ '--focus-color': MY_CLASSES.CLASS_MODAL_BUTTON_BG } as React.CSSProperties}
                    />
                </div>

                {/* Row 2: Instructor & Room Number */}
                <div className="flex space-x-4">
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-400 mb-1">Instructor Name (Optional)</label>
                        <input
                            type="text"
                            value={formData.teacherName}
                            onChange={e => setFormData({ ...formData, teacherName: e.target.value })}
                            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[var(--focus-color)]"
                            style={{ '--focus-color': MY_CLASSES.CLASS_MODAL_BUTTON_BG } as React.CSSProperties}
                            placeholder="e.g., Ms. Johnson"
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-400 mb-1">Room Number (Optional)</label>
                        <input
                            type="text"
                            value={formData.roomNumber}
                            onChange={e => setFormData({ ...formData, roomNumber: e.target.value })}
                            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[var(--focus-color)]"
                            style={{ '--focus-color': MY_CLASSES.CLASS_MODAL_BUTTON_BG } as React.CSSProperties}
                            placeholder="e.g., B105"
                        />
                    </div>
                </div>

                {/* Row 3: Color Code */}
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Color Code</label>
                    <div className="color-tile-grid">
                        {COLORS.map(color => (
                            <div
                                key={color}
                                onClick={() => setFormData({ ...formData, color })}
                                className={`color-tile ${formData.color === color ? 'selected' : ''}`}
                                style={{ backgroundColor: color }}
                            />
                        ))}
                    </div>
                </div>
                <div className="flex justify-between mt-6 pt-4 border-t border-gray-700">
                    <button type="button" onClick={() => { onClose(); openModal('delete-class', classId); }} className="px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150" style={{ backgroundColor: GLOBAL.DELETE_BUTTON_BG, color: GLOBAL.DELETE_BUTTON_TEXT }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = GLOBAL.DELETE_BUTTON_BG_HOVER} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = GLOBAL.DELETE_BUTTON_BG}>Delete</button>
                    <div className="flex space-x-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded-lg text-sm font-medium"
                            style={{ backgroundColor: GLOBAL.CANCEL_BUTTON_BG, color: GLOBAL.CANCEL_BUTTON_TEXT }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = GLOBAL.CANCEL_BUTTON_BG_HOVER}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = GLOBAL.CANCEL_BUTTON_BG}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 rounded-lg text-sm font-medium text-white transition-colors duration-150"
                            style={{ backgroundColor: MY_CLASSES.CLASS_MODAL_BUTTON_BG }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = MY_CLASSES.CLASS_MODAL_BUTTON_BG_HOVER}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = MY_CLASSES.CLASS_MODAL_BUTTON_BG}
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export const DeleteClassModal: React.FC<ClassModalProps> = ({ onClose, classId }) => {
    const { classes, deleteClass } = useApp();
    const classToDelete = classes.find(c => c.id === classId);

    if (!classToDelete) return null;

    const handleDelete = () => {
        deleteClass(classId);
        onClose();
    };

    return (
        <div className="high-contrast-card w-full max-w-md p-6 rounded-xl">
            <h2 className="text-xl font-bold mb-4 text-red-400">Delete Class?</h2>
            <p className="text-gray-300 mb-4">
                Are you sure you want to delete <strong>{classToDelete.name}</strong>? This will delete all assignments from this class.
            </p>
            <div className="flex justify-end space-x-3">
                <button
                    onClick={onClose}
                    className="px-4 py-2 rounded-lg text-sm font-medium"
                    style={{ backgroundColor: GLOBAL.CANCEL_BUTTON_BG, color: GLOBAL.CANCEL_BUTTON_TEXT }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = GLOBAL.CANCEL_BUTTON_BG_HOVER}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = GLOBAL.CANCEL_BUTTON_BG}
                >
                    Cancel
                </button>
                <button onClick={handleDelete} className="px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150" style={{ backgroundColor: GLOBAL.DELETE_BUTTON_BG, color: GLOBAL.DELETE_BUTTON_TEXT }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = GLOBAL.DELETE_BUTTON_BG_HOVER} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = GLOBAL.DELETE_BUTTON_BG}>Delete Class</button>
            </div>
        </div>
    );
};

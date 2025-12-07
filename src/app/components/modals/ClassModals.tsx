import React, { useEffect, useState } from 'react';
import { useApp } from '@/app/context/AppContext';
import { Class } from '@/app/types';
import {
    GLOBAL,
    MY_CLASSES
} from '@/app/styles/colors';

interface ModalProps {
    onClose: () => void;
}

interface ClassModalProps extends ModalProps {
    classId: string;
}

export const AddClassModal: React.FC<ModalProps> = ({ onClose }) => {
    const { addClass } = useApp();
    const [selectedColor, setSelectedColor] = useState<string>(MY_CLASSES.CLASS_COLORS[0]!);

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
        <div className="modal-container" style={{ backgroundColor: GLOBAL.MODAL_BG }}>
            <h2 className="text-xl font-bold mb-4" style={{ color: MY_CLASSES.CLASS_TEXT_THEME }}>Add New Class</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Row 1: Class Name */}
                <div>
                    <label className="modal-label">Class Name</label>
                    <input
                        type="text"
                        name="name"
                        required
                        className="modal-input"
                        style={{ '--focus-color': MY_CLASSES.CLASS_MODAL_BUTTON_BG } as React.CSSProperties}
                        placeholder="e.g., AP History"
                    />
                </div>

                {/* Row 2: Instructor & Room Number */}
                <div className="flex space-x-4">
                    <div className="flex-1">
                        <label className="modal-label">Instructor Name (Optional)</label>
                        <input
                            type="text"
                            name="teacherName"
                            className="modal-input"
                            style={{ '--focus-color': MY_CLASSES.CLASS_MODAL_BUTTON_BG } as React.CSSProperties}
                            placeholder="e.g., Ms. Johnson"
                        />
                    </div>
                    <div className="flex-1">
                        <label className="modal-label">Room Number (Optional)</label>
                        <input
                            type="text"
                            name="roomNumber"
                            className="modal-input"
                            style={{ '--focus-color': MY_CLASSES.CLASS_MODAL_BUTTON_BG } as React.CSSProperties}
                            placeholder="e.g., B105"
                        />
                    </div>
                </div>

                {/* Row 3: Color Code */}
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Color Code</label>
                    <div className="color-tile-grid">
                        {MY_CLASSES.CLASS_COLORS.map(color => (
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
                        className="modal-btn modal-btn-cancel modal-btn-inline"
                        style={{
                            '--modal-btn-bg': GLOBAL.CANCEL_BUTTON_BG,
                            '--modal-btn-bg-hover': GLOBAL.CANCEL_BUTTON_BG_HOVER,
                            '--modal-btn-text': GLOBAL.CANCEL_BUTTON_TEXT,
                            '--modal-btn-border': GLOBAL.CANCEL_BUTTON_BORDER
                        } as React.CSSProperties}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="modal-btn modal-btn-inline"
                        style={{
                            '--modal-btn-bg': MY_CLASSES.CLASS_MODAL_BUTTON_BG,
                            '--modal-btn-bg-hover': MY_CLASSES.CLASS_MODAL_BUTTON_BG_HOVER,
                            '--modal-btn-text': '#ffffff'
                        } as React.CSSProperties}
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
        <div className="modal-container" style={{ backgroundColor: GLOBAL.MODAL_BG }}>
            <h2 className="text-xl font-bold mb-4" style={{ color: MY_CLASSES.CLASS_TEXT_THEME }}>Edit Class Details</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Row 1: Class Name */}
                <div>
                    <label className="modal-label">Class Name</label>
                    <input
                        type="text"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="modal-input"
                        style={{ '--focus-color': MY_CLASSES.CLASS_MODAL_BUTTON_BG } as React.CSSProperties}
                    />
                </div>

                {/* Row 2: Instructor & Room Number */}
                <div className="flex space-x-4">
                    <div className="flex-1">
                        <label className="modal-label">Instructor Name (Optional)</label>
                        <input
                            type="text"
                            value={formData.teacherName}
                            onChange={e => setFormData({ ...formData, teacherName: e.target.value })}
                            className="modal-input"
                            style={{ '--focus-color': MY_CLASSES.CLASS_MODAL_BUTTON_BG } as React.CSSProperties}
                            placeholder="e.g., Ms. Johnson"
                        />
                    </div>
                    <div className="flex-1">
                        <label className="modal-label">Room Number (Optional)</label>
                        <input
                            type="text"
                            value={formData.roomNumber}
                            onChange={e => setFormData({ ...formData, roomNumber: e.target.value })}
                            className="modal-input"
                            style={{ '--focus-color': MY_CLASSES.CLASS_MODAL_BUTTON_BG } as React.CSSProperties}
                            placeholder="e.g., B105"
                        />
                    </div>
                </div>

                {/* Row 3: Color Code */}
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Color Code</label>
                    <div className="color-tile-grid">
                        {MY_CLASSES.CLASS_COLORS.map(color => (
                            <div
                                key={color}
                                onClick={() => setFormData({ ...formData, color })}
                                className={`color-tile ${formData.color === color ? 'selected' : ''}`}
                                style={{ backgroundColor: color }}
                            />
                        ))}
                    </div>
                </div>
                <div className="flex justify-between mt-6">
                    <button
                        type="button"
                        onClick={() => { onClose(); openModal('delete-class', classId); }}
                        className="modal-btn modal-btn-inline"
                        style={{
                            '--modal-btn-bg': GLOBAL.DELETE_BUTTON_BG,
                            '--modal-btn-bg-hover': GLOBAL.DELETE_BUTTON_BG_HOVER,
                            '--modal-btn-text': GLOBAL.DELETE_BUTTON_TEXT
                        } as React.CSSProperties}
                    >
                        Delete
                    </button>
                    <div className="flex space-x-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="modal-btn modal-btn-cancel modal-btn-inline"
                            style={{
                                '--modal-btn-bg': GLOBAL.CANCEL_BUTTON_BG,
                                '--modal-btn-bg-hover': GLOBAL.CANCEL_BUTTON_BG_HOVER,
                                '--modal-btn-text': GLOBAL.CANCEL_BUTTON_TEXT,
                                '--modal-btn-border': GLOBAL.CANCEL_BUTTON_BORDER
                            } as React.CSSProperties}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="modal-btn modal-btn-inline"
                            style={{
                                '--modal-btn-bg': MY_CLASSES.CLASS_MODAL_BUTTON_BG,
                                '--modal-btn-bg-hover': MY_CLASSES.CLASS_MODAL_BUTTON_BG_HOVER,
                                '--modal-btn-text': '#ffffff'
                            } as React.CSSProperties}
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
        <div className="modal-container" style={{ backgroundColor: GLOBAL.MODAL_BG }}>
            <h2 className="text-xl font-bold mb-4 text-red-400">Delete Class?</h2>
            <p className="text-gray-300 mb-4" style={{ color: GLOBAL.MODAL_DELETE_BODY }}>
                Are you sure you want to delete <strong>{classToDelete.name}</strong>? This will delete all assignments from this class.
            </p>
            <div className="flex justify-end space-x-3">
                <button
                    onClick={onClose}
                    className="modal-btn modal-btn-cancel modal-btn-inline"
                    style={{
                        '--modal-btn-bg': GLOBAL.CANCEL_BUTTON_BG,
                        '--modal-btn-bg-hover': GLOBAL.CANCEL_BUTTON_BG_HOVER,
                        '--modal-btn-text': GLOBAL.CANCEL_BUTTON_TEXT,
                        '--modal-btn-border': GLOBAL.CANCEL_BUTTON_BORDER
                    } as React.CSSProperties}
                >
                    Cancel
                </button>
                <button
                    onClick={handleDelete}
                    className="modal-btn modal-btn-inline"
                    style={{
                        '--modal-btn-bg': GLOBAL.DELETE_BUTTON_BG,
                        '--modal-btn-bg-hover': GLOBAL.DELETE_BUTTON_BG_HOVER,
                        '--modal-btn-text': GLOBAL.DELETE_BUTTON_TEXT
                    } as React.CSSProperties}
                >
                    Delete Class
                </button>
            </div>
        </div>
    );
};

import React, { useEffect, useState } from 'react';
import { useApp } from '@/app/context/AppContext';
import { todayString } from '@/app/lib/utils';
import { Assignment, Priority, Status } from '@/app/types';
import { GLOBAL } from '@/app/styles/colors';

interface ModalProps {
    onClose: () => void;
}

interface EditModalProps extends ModalProps {
    assignmentId: string;
}

export const AddAssignmentModal: React.FC<ModalProps> = ({ onClose }) => {
    const { classes, addAssignment } = useApp();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);

        let dueDate = formData.get('dueDate') as string;
        // Validate date: if missing or invalid, default to today
        if (!dueDate || isNaN(new Date(dueDate).getTime())) {
            dueDate = todayString();
        }

        let priority = formData.get('priority') as string;
        if (!['High', 'Medium', 'Low'].includes(priority)) {
            priority = 'Low';
        }

        const newAssignment = {
            title: formData.get('title') as string,
            classId: formData.get('classId') as string,
            subject: formData.get('subject') as string,
            dueDate: dueDate,
            priority: priority as Priority,
            status: 'To Do' as Status
        };
        addAssignment(newAssignment);
        onClose();
    };

    return (
        <div className="w-full max-w-md p-6 rounded-xl" style={{ backgroundColor: GLOBAL.MODAL_BG }}>
            <h2 className="text-xl font-bold mb-4" style={{ color: GLOBAL.ASSIGNMENT_HEADING_TEXT }}>Add New Assignment</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Title</label>
                    <input type="text" name="title" required
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[var(--focus-color)]"
                        placeholder="e.g. Read Chapter 4"
                        style={{ '--focus-color': GLOBAL.ASSIGNMENT_BUTTON_BG } as React.CSSProperties}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Class</label>
                    <select name="classId" required
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[var(--focus-color)]"
                        style={{ '--focus-color': GLOBAL.ASSIGNMENT_BUTTON_BG } as React.CSSProperties}
                    >
                        {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Subject/Topic (Optional)</label>
                    <input type="text" name="subject"
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[var(--focus-color)]"
                        placeholder="e.g. Thermodynamics"
                        style={{ '--focus-color': GLOBAL.ASSIGNMENT_BUTTON_BG } as React.CSSProperties}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Due Date</label>
                    <input type="date" name="dueDate" required defaultValue={todayString()}
                        className="w-full max-w-full min-w-0 box-border mt-1 p-2 rounded bg-gray-700 border border-gray-600 focus:ring-[var(--focus-color)] focus:border-[var(--focus-color)] text-white appearance-none"
                        style={{ '--focus-color': GLOBAL.ASSIGNMENT_BUTTON_BG } as React.CSSProperties}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Priority</label>
                    <select name="priority"
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[var(--focus-color)]"
                        style={{ '--focus-color': GLOBAL.ASSIGNMENT_BUTTON_BG } as React.CSSProperties}
                    >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                </div>
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
                        style={{ backgroundColor: GLOBAL.ASSIGNMENT_BUTTON_BG }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = GLOBAL.ASSIGNMENT_BUTTON_BG_HOVER}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = GLOBAL.ASSIGNMENT_BUTTON_BG}
                    >
                        Add Assignment
                    </button>
                </div>
            </form>
        </div>
    );
};

export const EditAssignmentModal: React.FC<EditModalProps> = ({ onClose, assignmentId }) => {
    const { classes, assignments, updateAssignment, openModal } = useApp();
    const [formData, setFormData] = useState<Assignment | null>(null);

    useEffect(() => {
        const assignment = assignments.find(a => a.id === assignmentId);
        if (assignment) setFormData(assignment);
    }, [assignmentId, assignments]);

    if (!formData) return null;

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validate data before updating
        const validPriorities: Priority[] = ['High', 'Medium', 'Low'];
        const validStatuses: Status[] = ['To Do', 'In Progress', 'Done'];

        const safeData = { ...formData };

        if (!validPriorities.includes(safeData.priority)) {
            safeData.priority = 'Low';
        }

        if (!validStatuses.includes(safeData.status)) {
            safeData.status = 'To Do';
        }

        if (!safeData.dueDate || isNaN(new Date(safeData.dueDate).getTime())) {
            safeData.dueDate = todayString();
        }

        updateAssignment(assignmentId, safeData);
        onClose();
    };

    return (
        <div className="w-full max-w-md p-6 rounded-xl" style={{ backgroundColor: GLOBAL.MODAL_BG }}>
            <h2 className="text-xl font-bold mb-4" style={{ color: GLOBAL.ASSIGNMENT_HEADING_TEXT }}>Edit Assignment</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Title</label>
                    <input
                        type="text"
                        value={formData.title}
                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                        required
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[var(--focus-color)]"
                        style={{ '--focus-color': GLOBAL.ASSIGNMENT_BUTTON_BG } as React.CSSProperties}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Class</label>
                    <select
                        value={formData.classId}
                        onChange={e => setFormData({ ...formData, classId: e.target.value })}
                        required
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[var(--focus-color)]"
                        style={{ '--focus-color': GLOBAL.ASSIGNMENT_BUTTON_BG } as React.CSSProperties}
                    >
                        {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Subject/Topic</label>
                    <input
                        type="text"
                        value={formData.subject || ''}
                        onChange={e => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[var(--focus-color)]"
                        style={{ '--focus-color': GLOBAL.ASSIGNMENT_BUTTON_BG } as React.CSSProperties}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Due Date</label>
                    <input
                        type="date"
                        value={formData.dueDate}
                        onChange={e => setFormData({ ...formData, dueDate: e.target.value })}
                        required
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[var(--focus-color)]"
                        style={{ '--focus-color': GLOBAL.ASSIGNMENT_BUTTON_BG } as React.CSSProperties}
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Priority</label>
                        <select
                            value={formData.priority}
                            onChange={e => setFormData({ ...formData, priority: e.target.value as Priority })}
                            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[var(--focus-color)]"
                            style={{ '--focus-color': GLOBAL.ASSIGNMENT_BUTTON_BG } as React.CSSProperties}
                        >
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Status</label>
                        <select
                            value={formData.status}
                            onChange={e => setFormData({ ...formData, status: e.target.value as Status })}
                            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[var(--focus-color)]"
                            style={{ '--focus-color': GLOBAL.ASSIGNMENT_BUTTON_BG } as React.CSSProperties}
                        >
                            <option value="To Do">To Do</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Done">Done</option>
                        </select>
                    </div>
                </div>
                <div className="flex justify-between mt-6">
                    <button type="button" onClick={() => { onClose(); openModal('delete-assignment', assignmentId); }} className="px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150" style={{ backgroundColor: GLOBAL.DELETE_BUTTON_BG, color: GLOBAL.DELETE_BUTTON_TEXT }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = GLOBAL.DELETE_BUTTON_BG_HOVER} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = GLOBAL.DELETE_BUTTON_BG}>Delete</button>
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
                            style={{ backgroundColor: GLOBAL.ASSIGNMENT_BUTTON_BG }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = GLOBAL.ASSIGNMENT_BUTTON_BG_HOVER}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = GLOBAL.ASSIGNMENT_BUTTON_BG}
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};
export const DeleteAssignmentModal: React.FC<EditModalProps> = ({ onClose, assignmentId }) => {
    const { assignments, deleteAssignment } = useApp();
    const assignmentToDelete = assignments.find(a => a.id === assignmentId);

    if (!assignmentToDelete) return null;

    const handleDelete = () => {
        deleteAssignment(assignmentId);
        onClose();
    };

    return (
        <div className="w-full max-w-md p-6 rounded-xl" style={{ backgroundColor: GLOBAL.MODAL_BG }}>
            <h2 className="text-xl font-bold mb-4 text-red-400">Delete Assignment?</h2>
            <p className="text-gray-300 mb-4">
                Are you sure you want to delete <strong>{assignmentToDelete.title}</strong>?
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
                <button onClick={handleDelete} className="px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150" style={{ backgroundColor: GLOBAL.DELETE_BUTTON_BG, color: GLOBAL.DELETE_BUTTON_TEXT }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = GLOBAL.DELETE_BUTTON_BG_HOVER} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = GLOBAL.DELETE_BUTTON_BG}>Delete Assignment</button>
            </div>
        </div>
    );
};

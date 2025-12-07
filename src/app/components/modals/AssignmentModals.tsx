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

        let status = formData.get('status') as string;
        if (!['To Do', 'In Progress', 'Done'].includes(status)) {
            status = 'To Do';
        }

        const newAssignment = {
            title: formData.get('title') as string,
            classId: formData.get('classId') as string,
            description: formData.get('description') as string,
            dueDate: dueDate,
            priority: priority as Priority,
            status: status as Status
        };
        addAssignment(newAssignment);
        onClose();
    };

    return (
        <div className="modal-container" style={{ backgroundColor: GLOBAL.MODAL_BG }}>
            <h2 className="text-xl font-bold mb-4" style={{ color: GLOBAL.ASSIGNMENT_HEADING_TEXT }}>Add New Assignment</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="modal-label">Title</label>
                    <input type="text" name="title" required
                        className="modal-input"
                        placeholder="e.g. Read Chapter 4"
                        style={{ '--focus-color': GLOBAL.ASSIGNMENT_BUTTON_BG } as React.CSSProperties}
                    />
                </div>
                <div>
                    <label className="modal-label">Class</label>
                    <select name="classId" required
                        className="modal-select"
                        style={{ '--focus-color': GLOBAL.ASSIGNMENT_BUTTON_BG } as React.CSSProperties}
                    >
                        {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                </div>
                <div>
                    <label className="modal-label">Due Date</label>
                    <input type="date" name="dueDate" required defaultValue={todayString()}
                        className="modal-date-input"
                        style={{ '--focus-color': GLOBAL.ASSIGNMENT_BUTTON_BG } as React.CSSProperties}
                    />
                </div>
                <div>
                    <label className="modal-label">Description (Optional)</label>
                    <textarea name="description" rows={2}
                        className="modal-textarea"
                        style={{ '--focus-color': GLOBAL.ASSIGNMENT_BUTTON_BG } as React.CSSProperties}
                    ></textarea>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="modal-label">Priority</label>
                        <select name="priority"
                            className="modal-select"
                            style={{ '--focus-color': GLOBAL.ASSIGNMENT_BUTTON_BG } as React.CSSProperties}
                        >
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </div>
                    <div>
                        <label className="modal-label">Status</label>
                        <select name="status"
                            className="modal-select"
                            defaultValue="To Do"
                            style={{ '--focus-color': GLOBAL.ASSIGNMENT_BUTTON_BG } as React.CSSProperties}
                        >
                            <option value="To Do">To Do</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Done">Done</option>
                        </select>
                    </div>
                </div>
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
                            '--modal-btn-bg': GLOBAL.ASSIGNMENT_BUTTON_BG,
                            '--modal-btn-bg-hover': GLOBAL.ASSIGNMENT_BUTTON_BG_HOVER,
                            '--modal-btn-text': '#ffffff'
                        } as React.CSSProperties}
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
        <div className="modal-container" style={{ backgroundColor: GLOBAL.MODAL_BG }}>
            <h2 className="text-xl font-bold mb-4" style={{ color: GLOBAL.ASSIGNMENT_HEADING_TEXT }}>Edit Assignment</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="modal-label">Title</label>
                    <input
                        type="text"
                        value={formData.title}
                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                        required
                        className="modal-input"
                        style={{ '--focus-color': GLOBAL.ASSIGNMENT_BUTTON_BG } as React.CSSProperties}
                    />
                </div>
                <div>
                    <label className="modal-label">Class</label>
                    <select
                        value={formData.classId}
                        onChange={e => setFormData({ ...formData, classId: e.target.value })}
                        required
                        className="modal-select"
                        style={{ '--focus-color': GLOBAL.ASSIGNMENT_BUTTON_BG } as React.CSSProperties}
                    >
                        {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                </div>
                <div>
                    <label className="modal-label">Due Date</label>
                    <input
                        type="date"
                        value={formData.dueDate}
                        onChange={e => setFormData({ ...formData, dueDate: e.target.value })}
                        required
                        className="modal-input"
                        style={{ '--focus-color': GLOBAL.ASSIGNMENT_BUTTON_BG } as React.CSSProperties}
                    />
                </div>
                <div>
                    <label className="modal-label">Description</label>
                    <textarea
                        value={formData.description || ''}
                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                        rows={2}
                        className="modal-textarea"
                        style={{ '--focus-color': GLOBAL.ASSIGNMENT_BUTTON_BG } as React.CSSProperties}
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="modal-label">Priority</label>
                        <select
                            value={formData.priority}
                            onChange={e => setFormData({ ...formData, priority: e.target.value as Priority })}
                            className="modal-select"
                            style={{ '--focus-color': GLOBAL.ASSIGNMENT_BUTTON_BG } as React.CSSProperties}
                        >
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </div>
                    <div>
                        <label className="modal-label">Status</label>
                        <select
                            value={formData.status}
                            onChange={e => setFormData({ ...formData, status: e.target.value as Status })}
                            className="modal-select"
                            style={{ '--focus-color': GLOBAL.ASSIGNMENT_BUTTON_BG } as React.CSSProperties}
                        >
                            <option value="To Do">To Do</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Done">Done</option>
                        </select>
                    </div>
                </div>
                <div className="flex justify-between mt-6">
                    <button
                        type="button"
                        onClick={() => { onClose(); openModal('delete-assignment', assignmentId); }}
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
                                '--modal-btn-bg': GLOBAL.ASSIGNMENT_BUTTON_BG,
                                '--modal-btn-bg-hover': GLOBAL.ASSIGNMENT_BUTTON_BG_HOVER,
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
export const DeleteAssignmentModal: React.FC<EditModalProps> = ({ onClose, assignmentId }) => {
    const { assignments, deleteAssignment } = useApp();
    const assignmentToDelete = assignments.find(a => a.id === assignmentId);

    if (!assignmentToDelete) return null;

    const handleDelete = () => {
        deleteAssignment(assignmentId);
        onClose();
    };

    return (
        <div className="modal-container" style={{ backgroundColor: GLOBAL.MODAL_BG }}>
            <h2 className="text-xl font-bold mb-4 text-red-400">Delete Assignment?</h2>
            <p className="text-gray-300 mb-4" style={{ color: GLOBAL.MODAL_DELETE_BODY }}>
                Are you sure you want to delete <strong>{assignmentToDelete.title}</strong>?
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
                    Delete Assignment
                </button>
            </div>
        </div>
    );
};

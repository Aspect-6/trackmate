import React, { useEffect, useState } from 'react';
import { DEFAULT_ASSIGNMENT_TYPES, useApp } from '@/app/context/AppContext';
import { useToast } from '@/app/context/ToastContext';
import { todayString } from '@/app/lib/utils';
import { Assignment, AssignmentType, Priority, Status } from '@/app/types';
import { GLOBAL } from '@/app/styles/colors';

interface ModalProps {
    onClose: () => void;
}

interface EditModalProps extends ModalProps {
    assignmentId: string;
}

export const AddAssignmentModal: React.FC<ModalProps> = ({ onClose }) => {
    const { classes, addAssignment, assignmentTypes } = useApp();
    const { showToast } = useToast();
    const [activeTab, setActiveTab] = useState<'details' | 'settings'>('details');
    const [formData, setFormData] = useState<{
        title: string;
        classId: string;
        description: string;
        dueDate: string;
        dueTime: string;
        priority: Priority;
        status: Status;
        type: AssignmentType;
    }>({
        title: '',
        classId: '',
        description: '',
        dueDate: todayString(),
        dueTime: '23:59',
        priority: 'Low',
        status: 'To Do',
        type: ''
    });

    const currentTypes = assignmentTypes.length ? assignmentTypes : DEFAULT_ASSIGNMENT_TYPES;

    useEffect(() => {
        if (classes.length > 0 && !formData.classId) {
            const firstClassId = classes[0]?.id || '';
            if (firstClassId) {
                setFormData(prev => ({ ...prev, classId: prev.classId || firstClassId }));
            }
        }
    }, [classes, formData.classId]);

    useEffect(() => {
        const types = assignmentTypes.length ? assignmentTypes : DEFAULT_ASSIGNMENT_TYPES;
        const fallbackType = types[0] ?? '';
        if (!formData.type && types.length) {
            setFormData(prev => ({ ...prev, type: fallbackType }));
        } else if (formData.type && !types.includes(formData.type)) {
            setFormData(prev => ({ ...prev, type: fallbackType }));
        }
    }, [assignmentTypes, formData.type]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const validPriorities: Priority[] = ['High', 'Medium', 'Low'];
        const validStatuses: Status[] = ['To Do', 'In Progress', 'Done'];
        const validTypes: AssignmentType[] = currentTypes.length ? currentTypes : DEFAULT_ASSIGNMENT_TYPES;

        const safeData = { ...formData };

        if (!safeData.title.trim()) {
            showToast('Please enter a title.', 'error');
            return;
        }

        if (!safeData.classId && classes.length > 0) {
            safeData.classId = classes[0]?.id || '';
        }

        if (!validPriorities.includes(safeData.priority)) {
            safeData.priority = 'Low';
        }

        if (!validStatuses.includes(safeData.status)) {
            safeData.status = 'To Do';
        }

        if (!safeData.dueDate || isNaN(new Date(safeData.dueDate).getTime())) {
            safeData.dueDate = todayString();
        }

        if (!safeData.dueTime || typeof safeData.dueTime !== 'string') {
            safeData.dueTime = '23:59';
        }

        const fallbackType = validTypes[0] ?? '';
        if (!safeData.type || !validTypes.includes(safeData.type as AssignmentType)) {
            safeData.type = fallbackType;
        }

        addAssignment(safeData);
        showToast('Assignment added!', 'success');
        onClose();
    };

    return (
        <div className="modal-container" style={{ backgroundColor: GLOBAL.MODAL_BG }}>
            <h2 className="text-xl font-bold mb-4" style={{ color: GLOBAL.ASSIGNMENT_HEADING_TEXT }}>Add New Assignment</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="modal-tabs" role="tablist" aria-label="Assignment form sections">
                    <button
                        type="button"
                        className={`modal-tab ${activeTab === 'details' ? 'active' : ''}`}
                        onClick={() => setActiveTab('details')}
                        aria-selected={activeTab === 'details'}
                    >
                        Details
                    </button>
                    <button
                        type="button"
                        className={`modal-tab ${activeTab === 'settings' ? 'active' : ''}`}
                        onClick={() => setActiveTab('settings')}
                        aria-selected={activeTab === 'settings'}
                    >
                        Settings
                    </button>
                </div>

                {activeTab === 'details' ? (
                    <div className="modal-tab-panel space-y-4">
                        <div>
                            <label className="modal-label">Title</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={e => setFormData({ ...formData, title: e.target.value })}
                                className="modal-input"
                                placeholder="e.g. Read Chapter 4"
                                style={{ '--focus-color': GLOBAL.ASSIGNMENT_BUTTON_BG } as React.CSSProperties}
                            />
                        </div>
                        <div>
                            <label className="modal-label">Class</label>
                            <select
                                name="classId"
                                value={formData.classId}
                                onChange={e => setFormData({ ...formData, classId: e.target.value })}
                                required
                                className="modal-select"
                                style={{ '--focus-color': GLOBAL.ASSIGNMENT_BUTTON_BG } as React.CSSProperties}
                            >
                                {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                            </select>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="modal-label">Due Date</label>
                                <input
                                    type="date"
                                    name="dueDate"
                                    value={formData.dueDate}
                                    onChange={e => setFormData({ ...formData, dueDate: e.target.value })}
                                    required
                                    className="modal-date-input"
                                    style={{ '--focus-color': GLOBAL.ASSIGNMENT_BUTTON_BG } as React.CSSProperties}
                                />
                            </div>
                            <div>
                                <label className="modal-label">Due Time</label>
                                <input
                                    type="time"
                                    name="dueTime"
                                    value={formData.dueTime}
                                    onChange={e => setFormData({ ...formData, dueTime: e.target.value || '23:59' })}
                                    required
                                    className="modal-date-input"
                                    style={{ '--focus-color': GLOBAL.ASSIGNMENT_BUTTON_BG } as React.CSSProperties}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="modal-label">Description (Optional)</label>
                            <textarea
                                name="description"
                                rows={2}
                                value={formData.description}
                                onChange={e => setFormData({ ...formData, description: e.target.value })}
                                className="modal-textarea"
                                style={{ '--focus-color': GLOBAL.ASSIGNMENT_BUTTON_BG } as React.CSSProperties}
                            ></textarea>
                        </div>
                    </div>
                ) : (
                    <div className="modal-tab-panel space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="modal-label">Priority</label>
                                <select
                                    name="priority"
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
                                    name="status"
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
                        <div>
                            <label className="modal-label">Type</label>
                            <select
                                name="type"
                                className="modal-select"
                                value={formData.type}
                                onChange={e => setFormData({ ...formData, type: e.target.value as AssignmentType })}
                                style={{ '--focus-color': GLOBAL.ASSIGNMENT_BUTTON_BG } as React.CSSProperties}
                            >
                                {currentTypes.map(type => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                )}

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
    const { classes, assignments, assignmentTypes, updateAssignment, openModal } = useApp();
    const { showToast } = useToast();
    const [formData, setFormData] = useState<Assignment | null>(null);
    const [activeTab, setActiveTab] = useState<'details' | 'settings'>('details');

    const currentTypes = assignmentTypes.length ? assignmentTypes : DEFAULT_ASSIGNMENT_TYPES;

    useEffect(() => {
        const assignment = assignments.find(a => a.id === assignmentId);
        if (assignment) setFormData(assignment);
    }, [assignmentId, assignments]);

    useEffect(() => {
        if (!formData) return;
        const fallbackType = currentTypes[0] ?? '';
        if (!formData.type && currentTypes.length) {
            setFormData(prev => prev ? { ...prev, type: fallbackType } : prev);
        } else if (formData.type && !currentTypes.includes(formData.type)) {
            setFormData(prev => prev ? { ...prev, type: fallbackType } : prev);
        }
    }, [assignmentTypes, currentTypes, formData]);

    if (!formData) return null;

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validate data before updating
        const validPriorities: Priority[] = ['High', 'Medium', 'Low'];
        const validStatuses: Status[] = ['To Do', 'In Progress', 'Done'];
        const validTypes: AssignmentType[] = currentTypes.length ? currentTypes : DEFAULT_ASSIGNMENT_TYPES;

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

        if (!safeData.dueTime || typeof safeData.dueTime !== 'string') {
            safeData.dueTime = '23:59';
        }

        const fallbackType = validTypes[0] ?? '';
        if (!safeData.type || !validTypes.includes(safeData.type as AssignmentType)) {
            safeData.type = fallbackType;
        }

        if (!safeData.title.trim()) {
            showToast('Please enter a title.', 'error');
            return;
        }

        updateAssignment(assignmentId, safeData);
        showToast('Assignment updated.', 'success');
        onClose();
    };

    return (
        <div className="modal-container" style={{ backgroundColor: GLOBAL.MODAL_BG }}>
            <h2 className="text-xl font-bold mb-4" style={{ color: GLOBAL.ASSIGNMENT_HEADING_TEXT }}>Edit Assignment</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="modal-tabs" role="tablist" aria-label="Assignment form sections">
                    <button
                        type="button"
                        className={`modal-tab ${activeTab === 'details' ? 'active' : ''}`}
                        onClick={() => setActiveTab('details')}
                        aria-selected={activeTab === 'details'}
                    >
                        Details
                    </button>
                    <button
                        type="button"
                        className={`modal-tab ${activeTab === 'settings' ? 'active' : ''}`}
                        onClick={() => setActiveTab('settings')}
                        aria-selected={activeTab === 'settings'}
                    >
                        Settings
                    </button>
                </div>

                {activeTab === 'details' ? (
                    <div className="modal-tab-panel space-y-4">
                        <div>
                            <label className="modal-label">Title</label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={e => setFormData({ ...formData, title: e.target.value })}
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
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="modal-label">Due Date</label>
                                <input
                                    type="date"
                                    value={formData.dueDate}
                                    onChange={e => setFormData({ ...formData, dueDate: e.target.value })}
                                    required
                                    className="modal-date-input"
                                    style={{ '--focus-color': GLOBAL.ASSIGNMENT_BUTTON_BG } as React.CSSProperties}
                                />
                            </div>
                            <div>
                                <label className="modal-label">Due Time</label>
                                <input
                                    type="time"
                                    value={formData.dueTime || '23:59'}
                                    onChange={e => setFormData({ ...formData, dueTime: e.target.value || '23:59' })}
                                    required
                                    className="modal-date-input"
                                    style={{ '--focus-color': GLOBAL.ASSIGNMENT_BUTTON_BG } as React.CSSProperties}
                                />
                            </div>
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
                    </div>
                ) : (
                    <div className="modal-tab-panel space-y-4">
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
                        <div>
                            <label className="modal-label">Type</label>
                            <select
                                name="type"
                                className="modal-select"
                                value={formData.type || currentTypes[0] || ''}
                                onChange={e => setFormData({ ...formData, type: e.target.value as AssignmentType })}
                                style={{ '--focus-color': GLOBAL.ASSIGNMENT_BUTTON_BG } as React.CSSProperties}
                            >
                                {currentTypes.map(type => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                )}

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

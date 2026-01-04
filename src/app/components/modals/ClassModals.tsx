import React, { useEffect, useState } from 'react'
import { useApp } from '@/app/contexts/AppContext'
import { Class } from '@/app/types'
import { MODALS } from '@/app/styles/colors'

interface ModalProps {
    onClose: () => void
}

interface ClassModalProps extends ModalProps {
    classId: string
}

export const AddClassModal: React.FC<ModalProps> = ({ onClose }) => {
    const { addClass, academicTerms } = useApp()
    const [activeTab, setActiveTab] = useState<'details' | 'settings'>('details')
    const [selectedColor, setSelectedColor] = useState<string>(MODALS.CLASS.COLORS[0]!)
    const [selectedTermId, setSelectedTermId] = useState<string>('')
    const [selectedSemesterId, setSelectedSemesterId] = useState<string>('')

    const selectedTerm = academicTerms.find(t => t.id === selectedTermId)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = e.currentTarget
        const formData = new FormData(form)
        const newClass = {
            name: formData.get('name') as string,
            color: selectedColor,
            teacherName: formData.get('teacherName') as string,
            roomNumber: formData.get('roomNumber') as string,
            termId: selectedTermId || undefined,
            semesterId: selectedSemesterId || undefined
        }
        const success = addClass(newClass)
        if (success) onClose()
    }

    return (
        <div className="modal-container" style={{ backgroundColor: MODALS.BASE.BG }}>
            <h2 className="text-xl font-bold mb-4" style={{ color: MODALS.CLASS.HEADING }}>Add New Class</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="modal-tabs" role="tablist" aria-label="Class form sections">
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
                        {/* Class Name */}
                        <div>
                            <label className="modal-label">Class Name</label>
                            <input
                                type="text"
                                name="name"
                                required
                                className="modal-input"
                                style={{ '--focus-color': MODALS.CLASS.PRIMARY_BG } as React.CSSProperties}
                                placeholder="e.g., AP History"
                            />
                        </div>

                        {/* Instructor & Room Number */}
                        <div className="flex space-x-4">
                            <div className="flex-1">
                                <label className="modal-label">Instructor Name (Optional)</label>
                                <input
                                    type="text"
                                    name="teacherName"
                                    className="modal-input"
                                    style={{ '--focus-color': MODALS.CLASS.PRIMARY_BG } as React.CSSProperties}
                                    placeholder="e.g., Ms. Johnson"
                                />
                            </div>
                            <div className="flex-1">
                                <label className="modal-label">Room Number (Optional)</label>
                                <input
                                    type="text"
                                    name="roomNumber"
                                    className="modal-input"
                                    style={{ '--focus-color': MODALS.CLASS.PRIMARY_BG } as React.CSSProperties}
                                    placeholder="e.g., B105"
                                />
                            </div>
                        </div>

                        {/* Color Code */}
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Color Code</label>
                            <div className="color-tile-grid custom-scrollbar-horizontal">
                                {MODALS.CLASS.COLORS.map(color => (
                                    <div
                                        key={color}
                                        onClick={() => setSelectedColor(color)}
                                        className={`color-tile ${selectedColor === color ? 'selected' : ''}`}
                                        style={{ backgroundColor: color }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="modal-tab-panel space-y-4">
                        {/* Term Selection */}
                        <div>
                            <label className="modal-label">Academic Term (Optional)</label>
                            <select
                                value={selectedTermId}
                                onChange={e => {
                                    setSelectedTermId(e.target.value)
                                    setSelectedSemesterId('')
                                }}
                                className="modal-select"
                                style={{ '--focus-color': MODALS.CLASS.PRIMARY_BG } as React.CSSProperties}
                            >
                                <option value="">No Term Assigned</option>
                                {academicTerms.map(term => (
                                    <option key={term.id} value={term.id}>{term.name}</option>
                                ))}
                            </select>
                        </div>
                        {selectedTerm && selectedTerm.semesters.length > 0 && (
                            <div>
                                <label className="modal-label">Semester (Optional)</label>
                                <select
                                    value={selectedSemesterId}
                                    onChange={e => setSelectedSemesterId(e.target.value)}
                                    className="modal-select"
                                    style={{ '--focus-color': MODALS.CLASS.PRIMARY_BG } as React.CSSProperties}
                                >
                                    <option value="">Year-long (Both Semesters)</option>
                                    {selectedTerm.semesters.map(sem => (
                                        <option key={sem.id} value={sem.id}>{sem.name}</option>
                                    ))}
                                </select>
                            </div>
                        )}

                        {/* Term Note */}
                        <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
                            Classes added to a year-long term will occur every other day, while classes marked for a semester will occur every day for that semester.
                        </p>
                    </div>
                )}

                {/* Buttons */}
                <div className="flex justify-end space-x-3 mt-6">
                    <button
                        type="button"
                        onClick={onClose}
                        className="modal-btn modal-btn-cancel modal-btn-inline"
                        style={{
                            '--modal-btn-bg': MODALS.BASE.CANCEL_BG,
                            '--modal-btn-bg-hover': MODALS.BASE.CANCEL_BG_HOVER,
                            '--modal-btn-text': MODALS.BASE.CANCEL_TEXT,
                            '--modal-btn-border': MODALS.BASE.CANCEL_BORDER
                        } as React.CSSProperties}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="modal-btn modal-btn-inline"
                        style={{
                            '--modal-btn-bg': MODALS.CLASS.PRIMARY_BG,
                            '--modal-btn-bg-hover': MODALS.CLASS.PRIMARY_BG_HOVER,
                            '--modal-btn-text': MODALS.CLASS.PRIMARY_TEXT
                        } as React.CSSProperties}
                    >
                        Create Class
                    </button>
                </div>
            </form>
        </div>
    )
}

export const EditClassModal: React.FC<ClassModalProps> = ({ onClose, classId }) => {
    const { classes, updateClass, openModal, academicTerms } = useApp()
    const [formData, setFormData] = useState<Class | null>(null)
    const [activeTab, setActiveTab] = useState<'details' | 'settings'>('details')

    const selectedTerm = formData?.termId ? academicTerms.find(t => t.id === formData.termId) : undefined

    useEffect(() => {
        const classInfo = classes.find(c => c.id === classId)
        if (classInfo) setFormData(classInfo)
    }, [classId, classes])

    if (!formData) return null

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        updateClass(classId, formData)
        onClose()
    }

    return (
        <div className="modal-container" style={{ backgroundColor: MODALS.BASE.BG }}>
            <h2 className="text-xl font-bold mb-4" style={{ color: MODALS.CLASS.HEADING }}>Edit Class</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="modal-tabs" role="tablist" aria-label="Class form sections">
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
                        {/* Class Name */}
                        <div>
                            <label className="modal-label">Class Name</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                required
                                className="modal-input"
                                style={{ '--focus-color': MODALS.CLASS.PRIMARY_BG } as React.CSSProperties}
                            />
                        </div>

                        {/* Instructor & Room Number */}
                        <div className="flex space-x-4">
                            <div className="flex-1">
                                <label className="modal-label">Instructor Name (Optional)</label>
                                <input
                                    type="text"
                                    value={formData.teacherName}
                                    onChange={e => setFormData({ ...formData, teacherName: e.target.value })}
                                    className="modal-input"
                                    style={{ '--focus-color': MODALS.CLASS.PRIMARY_BG } as React.CSSProperties}
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
                                    style={{ '--focus-color': MODALS.CLASS.PRIMARY_BG } as React.CSSProperties}
                                    placeholder="e.g., B105"
                                />
                            </div>
                        </div>

                        {/* Color Code */}
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Color Code</label>
                            <div className="color-tile-grid custom-scrollbar-horizontal">
                                {MODALS.CLASS.COLORS.map(color => (
                                    <div
                                        key={color}
                                        onClick={() => setFormData({ ...formData, color })}
                                        className={`color-tile ${formData.color === color ? 'selected' : ''}`}
                                        style={{ backgroundColor: color }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="modal-tab-panel space-y-4">
                        {/* Term Selection */}
                        <div>
                            <label className="modal-label">Academic Term (Optional)</label>
                            <select
                                value={formData.termId || ''}
                                onChange={e => setFormData({ ...formData, termId: e.target.value || undefined, semesterId: undefined })}
                                className="modal-select"
                                style={{ '--focus-color': MODALS.CLASS.PRIMARY_BG } as React.CSSProperties}
                            >
                                <option value="">No Term Assigned</option>
                                {academicTerms.map(term => (
                                    <option key={term.id} value={term.id}>{term.name}</option>
                                ))}
                            </select>
                        </div>
                        {selectedTerm && selectedTerm.semesters.length > 0 && (
                            <div>
                                <label className="modal-label">Semester (Optional)</label>
                                <select
                                    value={formData.semesterId || ''}
                                    onChange={e => setFormData({ ...formData, semesterId: e.target.value || undefined })}
                                    className="modal-select"
                                    style={{ '--focus-color': MODALS.CLASS.PRIMARY_BG } as React.CSSProperties}
                                >
                                    <option value="">Year-long (Both Semesters)</option>
                                    {selectedTerm.semesters.map(sem => (
                                        <option key={sem.id} value={sem.id}>{sem.name}</option>
                                    ))}
                                </select>
                            </div>
                        )}

                        {/* Term Note */}
                        <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
                            Classes added to a year-long term will occur every other day, while classes marked for a semester will occur every day for that semester.
                        </p>
                    </div>
                )}

                <div className="flex justify-between mt-6">
                    <button
                        type="button"
                        onClick={() => { onClose(); openModal('delete-class', classId) }}
                        className="modal-btn modal-btn-inline"
                        style={{
                            '--modal-btn-bg': MODALS.BASE.DELETE_BG,
                            '--modal-btn-bg-hover': MODALS.BASE.DELETE_BG_HOVER,
                            '--modal-btn-text': MODALS.BASE.DELETE_TEXT
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
                                '--modal-btn-bg': MODALS.BASE.CANCEL_BG,
                                '--modal-btn-bg-hover': MODALS.BASE.CANCEL_BG_HOVER,
                                '--modal-btn-text': MODALS.BASE.CANCEL_TEXT,
                                '--modal-btn-border': MODALS.BASE.CANCEL_BORDER
                            } as React.CSSProperties}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="modal-btn modal-btn-inline"
                            style={{
                                '--modal-btn-bg': MODALS.CLASS.PRIMARY_BG,
                                '--modal-btn-bg-hover': MODALS.CLASS.PRIMARY_BG_HOVER,
                                '--modal-btn-text': MODALS.CLASS.PRIMARY_TEXT
                            } as React.CSSProperties}
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export const DeleteClassModal: React.FC<ClassModalProps> = ({ onClose, classId }) => {
    const { classes, deleteClass } = useApp()
    const classToDelete = classes.find(c => c.id === classId)

    if (!classToDelete) return null

    const handleDelete = () => {
        deleteClass(classId)
        onClose()
    }

    return (
        <div className="modal-container" style={{ backgroundColor: MODALS.BASE.BG }}>
            <h2 className="text-xl font-bold mb-4" style={{ color: MODALS.BASE.DELETE_HEADING }}>Delete Class?</h2>
            <p className="text-gray-300 mb-4" style={{ color: MODALS.BASE.DELETE_BODY }}>
                Are you sure you want to delete <strong>{classToDelete.name}</strong>? This will delete all assignments from this class.
            </p>
            <div className="flex justify-end space-x-3">
                <button
                    onClick={onClose}
                    className="modal-btn modal-btn-cancel modal-btn-inline"
                    style={{
                        '--modal-btn-bg': MODALS.BASE.CANCEL_BG,
                        '--modal-btn-bg-hover': MODALS.BASE.CANCEL_BG_HOVER,
                        '--modal-btn-text': MODALS.BASE.CANCEL_TEXT,
                        '--modal-btn-border': MODALS.BASE.CANCEL_BORDER
                    } as React.CSSProperties}
                >
                    Cancel
                </button>
                <button
                    onClick={handleDelete}
                    className="modal-btn modal-btn-inline"
                    style={{
                        '--modal-btn-bg': MODALS.BASE.DELETE_BG,
                        '--modal-btn-bg-hover': MODALS.BASE.DELETE_BG_HOVER,
                        '--modal-btn-text': MODALS.BASE.DELETE_TEXT
                    } as React.CSSProperties}
                >
                    Delete Class
                </button>
            </div>
        </div>
    )
}

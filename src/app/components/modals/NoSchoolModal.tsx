import React, { useEffect, useState } from 'react'
import { useApp } from '@/app/contexts/AppContext'
import { todayString } from '@/app/lib/utils'
import { NoSchoolPeriod } from '@/app/types'
import { MODALS } from '@/app/styles/colors'

interface ModalProps {
    onClose: () => void
}

interface NoSchoolModalProps extends ModalProps {
    noSchoolId: string
}

export const AddNoSchoolModal: React.FC<ModalProps> = ({ onClose }) => {
    const { addNoSchool } = useApp()

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = e.currentTarget
        const formData = new FormData(form)

        let startDate = formData.get('startDate') as string
        if (!startDate || isNaN(new Date(startDate).getTime())) {
            startDate = todayString()
        }

        let endDate = formData.get('endDate') as string
        if (!endDate || isNaN(new Date(endDate).getTime())) {
            endDate = todayString()
        }

        const newNoSchool = {
            name: formData.get('name') as string,
            startDate: startDate,
            endDate: endDate
        }
        addNoSchool(newNoSchool)
        onClose()
    }

    return (
        <div className="modal-container" style={{ backgroundColor: MODALS.BASE.BG }}>
            <h2 className="text-xl font-bold mb-4" style={{ color: MODALS.SCHEDULE.HEADING }}>Add No School Period</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="modal-label">Reason / Name</label>
                    <input type="text" name="name" required
                        className="modal-input"
                        placeholder="e.g. Winter Break"
                        style={{ '--focus-color': MODALS.SCHEDULE.PRIMARY_BG } as React.CSSProperties}
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="modal-label">Start Date</label>
                        <input type="date" name="startDate" required defaultValue={todayString()}
                            className="modal-date-input"
                            style={{ '--focus-color': MODALS.SCHEDULE.PRIMARY_BG } as React.CSSProperties}
                        />
                    </div>
                    <div>
                        <label className="modal-label">End Date</label>
                        <input type="date" name="endDate" required defaultValue={todayString()}
                            className="modal-date-input"
                            style={{ '--focus-color': MODALS.SCHEDULE.PRIMARY_BG } as React.CSSProperties}
                        />
                    </div>
                </div>
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
                            '--modal-btn-bg': MODALS.SCHEDULE.PRIMARY_BG,
                            '--modal-btn-bg-hover': MODALS.SCHEDULE.PRIMARY_BG_HOVER,
                            '--modal-btn-text': MODALS.SCHEDULE.PRIMARY_TEXT
                        } as React.CSSProperties}
                    >
                        Add Period
                    </button>
                </div>
            </form>
        </div>
    )
}

export const EditNoSchoolModal: React.FC<NoSchoolModalProps> = ({ onClose, noSchoolId }) => {
    const { noSchool, updateNoSchool, openModal } = useApp()
    const [formData, setFormData] = useState<NoSchoolPeriod | null>(null)

    useEffect(() => {
        const period = noSchool.find(ns => ns.id === noSchoolId)
        if (period) setFormData(period)
    }, [noSchoolId, noSchool])

    if (!formData) return null

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const safeData = { ...formData }
        if (!safeData.startDate || isNaN(new Date(safeData.startDate).getTime())) {
            safeData.startDate = todayString()
        }
        if (!safeData.endDate || isNaN(new Date(safeData.endDate).getTime())) {
            safeData.endDate = todayString()
        }

        updateNoSchool(noSchoolId, safeData)
        onClose()
    }

    return (
        <div className="modal-container" style={{ backgroundColor: MODALS.BASE.BG }}>
            <h2 className="text-xl font-bold mb-4" style={{ color: MODALS.SCHEDULE.HEADING }}>Edit No School Period</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="modal-label">Reason / Name</label>
                    <input
                        type="text"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="modal-input"
                        style={{ '--focus-color': MODALS.SCHEDULE.PRIMARY_BG } as React.CSSProperties}
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="modal-label">Start Date</label>
                        <input
                            type="date"
                            value={formData.startDate}
                            onChange={e => setFormData({ ...formData, startDate: e.target.value })}
                            required
                            className="modal-date-input"
                            style={{ '--focus-color': MODALS.SCHEDULE.PRIMARY_BG } as React.CSSProperties}
                        />
                    </div>
                    <div>
                        <label className="modal-label">End Date</label>
                        <input
                            type="date"
                            value={formData.endDate}
                            onChange={e => setFormData({ ...formData, endDate: e.target.value })}
                            required
                            className="modal-date-input"
                            style={{ '--focus-color': MODALS.SCHEDULE.PRIMARY_BG } as React.CSSProperties}
                        />
                    </div>
                </div>
                <div className="flex justify-between mt-6">
                    <button
                        type="button"
                        onClick={() => { onClose(); openModal('delete-no-school', noSchoolId) }}
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
                                '--modal-btn-bg': MODALS.SCHEDULE.PRIMARY_BG,
                                '--modal-btn-bg-hover': MODALS.SCHEDULE.PRIMARY_BG_HOVER,
                                '--modal-btn-text': MODALS.SCHEDULE.PRIMARY_TEXT
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

export const DeleteNoSchoolModal: React.FC<NoSchoolModalProps> = ({ onClose, noSchoolId }) => {
    const { noSchool, deleteNoSchool } = useApp()
    const periodToDelete = noSchool.find(ns => ns.id === noSchoolId)

    if (!periodToDelete) return null

    const handleDelete = () => {
        deleteNoSchool(noSchoolId)
        onClose()
    }

    return (
        <div className="modal-container" style={{ backgroundColor: MODALS.BASE.BG }}>
            <h2 className="text-xl font-bold mb-4" style={{ color: MODALS.BASE.DELETE_HEADING }}>Delete No School Period?</h2>
            <p className="text-gray-300 mb-4" style={{ color: MODALS.BASE.DELETE_BODY }}>
                Are you sure you want to delete <strong>{periodToDelete.name}</strong>?
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
                    Delete Period
                </button>
            </div>
        </div>
    )
}

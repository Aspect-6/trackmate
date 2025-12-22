import React, { useEffect, useState } from 'react'
import { useApp } from '@/app/context/AppContext'
import { todayString } from '@/app/lib/utils'
import { Event } from '@/app/types'
import { GLOBAL, MODALS } from '@/app/styles/colors'

interface ModalProps {
    onClose: () => void
}

interface EventModalProps extends ModalProps {
    eventId: string
}

export const AddEventModal: React.FC<ModalProps> = ({ onClose }) => {
    const { addEvent } = useApp()
    const [selectedColor, setSelectedColor] = useState<string>(MODALS.EVENT.COLORS[0]!)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = e.currentTarget
        const formData = new FormData(form)

        let date = formData.get('date') as string
        if (!date || isNaN(new Date(date).getTime())) {
            date = todayString()
        }

        const newEvent = {
            title: formData.get('title') as string,
            date: date,
            startTime: (formData.get('startTime') as string) || null,
            endTime: (formData.get('endTime') as string) || null,
            description: formData.get('description') as string,
            color: selectedColor
        }
        addEvent(newEvent)
        onClose()
    }

    return (
        <div className="modal-container" style={{ backgroundColor: GLOBAL.MODAL_BG }}>
            <h2 className="text-xl font-bold mb-4" style={{ color: GLOBAL.EVENT_HEADING_TEXT }}>Add New Event</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="modal-label">Event Title</label>
                    <input type="text" name="title" required
                        className="modal-input"
                        placeholder="Club Meeting"
                        style={{ '--focus-color': GLOBAL.EVENT_BUTTON_BG } as React.CSSProperties}
                    />
                </div>
                <div>
                    <label className="modal-label">Date</label>
                    <input
                        type="date"
                        name="date"
                        required
                        defaultValue={todayString()}
                        className="modal-date-input"
                        style={{ '--focus-color': GLOBAL.EVENT_BUTTON_BG } as React.CSSProperties}
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="modal-label">Start Time (Optional)</label>
                        <input
                            type="time"
                            name="startTime"
                            placeholder="--:--"
                            className="modal-date-input"
                            style={{ '--focus-color': GLOBAL.EVENT_BUTTON_BG } as React.CSSProperties}
                        />
                    </div>
                    <div>
                        <label className="modal-label">End Time (Optional)</label>
                        <input
                            type="time"
                            name="endTime"
                            placeholder="--:--"
                            className="modal-date-input"
                            style={{ '--focus-color': GLOBAL.EVENT_BUTTON_BG } as React.CSSProperties}
                        />
                    </div>
                </div>
                <p className="text-xs text-gray-400">Leave blank for all-day.</p>
                <div>
                    <label className="modal-label">Description (Optional)</label>
                    <textarea name="description" rows={2}
                        className="modal-textarea"
                        style={{ '--focus-color': GLOBAL.EVENT_BUTTON_BG } as React.CSSProperties}
                    ></textarea>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Color Code</label>
                    <div className="color-tile-grid">
                        {MODALS.EVENT.COLORS.map(color => (
                            <div
                                key={color}
                                onClick={() => setSelectedColor(color)}
                                className={`color-tile ${selectedColor === color ? 'selected' : ''}`}
                                style={{ backgroundColor: color }}
                            />
                        ))}
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
                            '--modal-btn-bg': GLOBAL.EVENT_BUTTON_BG,
                            '--modal-btn-bg-hover': GLOBAL.EVENT_BUTTON_BG_HOVER,
                            '--modal-btn-text': '#ffffff'
                        } as React.CSSProperties}
                    >
                        Add Event
                    </button>
                </div>
            </form>
        </div>
    )
}

export const EditEventModal: React.FC<EventModalProps> = ({ onClose, eventId }) => {
    const { events, updateEvent, openModal } = useApp()
    const [formData, setFormData] = useState<Event | null>(null)

    useEffect(() => {
        const event = events.find(e => e.id === eventId)
        if (event) setFormData(event)
    }, [eventId, events])

    if (!formData) return null

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const safeData = { ...formData }
        if (!safeData.date || isNaN(new Date(safeData.date).getTime())) {
            safeData.date = todayString()
        }

        updateEvent(eventId, safeData)
        onClose()
    }

    return (
        <div className="modal-container" style={{ backgroundColor: GLOBAL.MODAL_BG }}>
            <h2 className="text-xl font-bold mb-4" style={{ color: GLOBAL.EVENT_HEADING_TEXT }}>Edit Event</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="modal-label">Event Title</label>
                    <input
                        type="text"
                        value={formData.title}
                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                        required
                        className="modal-input"
                        style={{ '--focus-color': GLOBAL.EVENT_BUTTON_BG } as React.CSSProperties}
                    />
                </div>
                <div>
                    <label className="modal-label">Date</label>
                    <input
                        type="date"
                        value={formData.date}
                        onChange={e => setFormData({ ...formData, date: e.target.value })}
                        required
                        className="modal-date-input"
                        style={{ '--focus-color': GLOBAL.EVENT_BUTTON_BG } as React.CSSProperties}
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="modal-label">Start Time (Optional)</label>
                        <input
                            type="time"
                            value={formData.startTime || ''}
                            onChange={e => setFormData({ ...formData, startTime: e.target.value || null })}
                            className="modal-date-input"
                            style={{ '--focus-color': GLOBAL.EVENT_BUTTON_BG } as React.CSSProperties}
                        />
                    </div>
                    <div>
                        <label className="modal-label">End Time (Optional)</label>
                        <input
                            type="time"
                            value={formData.endTime || ''}
                            onChange={e => setFormData({ ...formData, endTime: e.target.value || null })}
                            className="modal-date-input"
                            style={{ '--focus-color': GLOBAL.EVENT_BUTTON_BG } as React.CSSProperties}
                        />
                    </div>
                </div>
                <p className="text-xs text-gray-400">Leave blank for all-day.</p>
                <div>
                    <label className="modal-label">Description</label>
                    <textarea
                        value={formData.description || ''}
                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                        rows={2}
                        className="modal-textarea"
                        style={{ '--focus-color': GLOBAL.EVENT_BUTTON_BG } as React.CSSProperties}
                    ></textarea>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Color Code</label>
                    <div className="color-tile-grid">
                        {MODALS.EVENT.COLORS.map(color => (
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
                        onClick={() => { onClose(); openModal('delete-event', eventId) }}
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
                                '--modal-btn-bg': GLOBAL.EVENT_BUTTON_BG,
                                '--modal-btn-bg-hover': GLOBAL.EVENT_BUTTON_BG_HOVER,
                                '--modal-btn-text': '#ffffff'
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

export const DeleteEventModal: React.FC<EventModalProps> = ({ onClose, eventId }) => {
    const { events, deleteEvent } = useApp()
    const eventToDelete = events.find(e => e.id === eventId)

    if (!eventToDelete) return null

    const handleDelete = () => {
        deleteEvent(eventId)
        onClose()
    }

    return (
        <div className="modal-container" style={{ backgroundColor: MODALS.BASE.BG }}>
            <h2 className="text-xl font-bold mb-4" style={{ color: MODALS.BASE.DELETE_HEADING }}>Delete Event?</h2>
            <p className="text-gray-300 mb-4" style={{ color: MODALS.BASE.DELETE_BODY }}>
                Are you sure you want to delete <strong>{eventToDelete.title}</strong>?
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
                    Delete Event
                </button>
            </div>
        </div>
    )
}

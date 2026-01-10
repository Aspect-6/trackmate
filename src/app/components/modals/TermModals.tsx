import React, { useState } from 'react'
import { AcademicTerm } from '@/app/types'
import { useAcademicTerms } from '@/app/hooks/entities'
import { useToast } from '@/app/contexts/ToastContext'
import { generateId } from '@/app/lib/utils'
import { GLOBAL, MODALS } from '@/app/styles/colors'

interface ModalProps {
    onClose: () => void
}

interface EditTermModalProps extends ModalProps {
    termId: string
}

export const AddTermModal: React.FC<ModalProps> = ({ onClose }) => {
    const { addAcademicTerm, academicTerms, termMode } = useAcademicTerms()
    const { showToast } = useToast()

    const [name, setName] = useState('')
    const [termStart, setTermStart] = useState('')
    const [termEnd, setTermEnd] = useState('')

    // Semesters-only mode fields
    const [fallEnd, setFallEnd] = useState('')
    const [springStart, setSpringStart] = useState('')

    // Quarters mode fields
    const [q1End, setQ1End] = useState('')
    const [q2Start, setQ2Start] = useState('')
    const [q2End, setQ2End] = useState('')
    const [q3Start, setQ3Start] = useState('')
    const [q3End, setQ3End] = useState('')
    const [q4Start, setQ4Start] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (!name || !termStart || !termEnd) {
            showToast('All fields are required.', 'error')
            return
        }

        if (termMode === 'Semesters Only') {
            if (!fallEnd || !springStart) {
                showToast('All fields are required.', 'error')
                return
            }
        } else {
            if (!q1End || !q2Start || !q2End || !q3Start || !q3End || !q4Start) {
                showToast('All fields are required.', 'error')
                return
            }
        }

        if (academicTerms.some(t => t.name.toLowerCase() === name.trim().toLowerCase())) {
            showToast('A term with this name already exists.', 'error')
            return
        }

        const newStart = new Date(termStart)
        const newEnd = new Date(termEnd)

        const hasOverlap = academicTerms.some(t => {
            const existingStart = new Date(t.startDate)
            const existingEnd = new Date(t.endDate)
            return (
                (newStart >= existingStart && newStart <= existingEnd) ||
                (newEnd >= existingStart && newEnd <= existingEnd) ||
                (newStart <= existingStart && newEnd >= existingEnd)
            )
        })

        if (hasOverlap) {
            showToast('This term overlaps with an existing term.', 'error')
            return
        }

        if (termStart >= termEnd) {
            showToast('Year start must be before end.', 'error')
            return
        }

        let newTerm: Omit<AcademicTerm, 'id'>

        if (termMode === 'Semesters Only') {
            if (termStart >= fallEnd) {
                showToast('Fall end must be after year start.', 'error')
                return
            }
            if (fallEnd >= springStart) {
                showToast('Spring start must be after fall end.', 'error')
                return
            }
            if (springStart >= termEnd) {
                showToast('Spring start must be before year end.', 'error')
                return
            }

            newTerm = {
                name,
                startDate: termStart,
                endDate: termEnd,
                termType: 'Semesters Only',
                semesters: [
                    { id: generateId(), name: 'Fall', startDate: termStart, endDate: fallEnd },
                    { id: generateId(), name: 'Spring', startDate: springStart, endDate: termEnd }
                ]
            }
        } else {
            if (q1End <= termStart) { showToast('Q1 end must be after year start.', 'error'); return }
            if (q2Start <= q1End) { showToast('Q2 start must be after Q1 end.', 'error'); return }
            if (q2End <= q2Start) { showToast('Q2 end must be after Q2 start.', 'error'); return }
            if (q3Start <= q2End) { showToast('Q3 start must be after Q2 end.', 'error'); return }
            if (q3End <= q3Start) { showToast('Q3 end must be after Q3 start.', 'error'); return }
            if (q4Start <= q3End) { showToast('Q4 start must be after Q3 end.', 'error'); return }
            if (q4Start >= termEnd) { showToast('Q4 start must be before year end.', 'error'); return }

            newTerm = {
                name,
                startDate: termStart,
                endDate: termEnd,
                termType: 'Semesters With Quarters',
                semesters: [
                    {
                        id: generateId(),
                        name: 'Fall',
                        startDate: termStart,
                        endDate: q2End,
                        quarters: [
                            { id: generateId(), name: 'Q1', startDate: termStart, endDate: q1End },
                            { id: generateId(), name: 'Q2', startDate: q2Start, endDate: q2End }
                        ]
                    },
                    {
                        id: generateId(),
                        name: 'Spring',
                        startDate: q3Start,
                        endDate: termEnd,
                        quarters: [
                            { id: generateId(), name: 'Q3', startDate: q3Start, endDate: q3End },
                            { id: generateId(), name: 'Q4', startDate: q4Start, endDate: termEnd }
                        ]
                    }
                ]
            }
        }

        addAcademicTerm(newTerm)
        showToast('Academic term added!', 'success')
        onClose()
    }

    return (
        <div className="modal-container overflow-y-auto max-h-[90vh]" style={{ backgroundColor: MODALS.BASE.BG }}>
            <h2 className="text-xl font-bold mb-4" style={{ color: MODALS.ACADEMICTERM.HEADING }}>Add Academic Term</h2>
            <div className="text-sm my-4 text-left" style={{ color: GLOBAL.TEXT_TERTIARY }}>
                {termMode === 'Semesters Only'
                    ? 'Add a term with Fall and Spring semesters.'
                    : 'Add a term with four quarters with two quarters for the Fall and Spring semesters each.'}
            </div>
            <div className="width-full"><div className="border-t mb-4" style={{ borderColor: GLOBAL.SIDEBAR_BORDER }}></div></div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="modal-label">Term Name</label>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="2025-2026" className="modal-input" style={{ '--focus-color': MODALS.ACADEMICTERM.PRIMARY_BG } as React.CSSProperties} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="modal-label">Year Start</label>
                        <input type="date" value={termStart} onChange={e => setTermStart(e.target.value)} className="modal-date-input" style={{ '--focus-color': MODALS.ACADEMICTERM.PRIMARY_BG } as React.CSSProperties} />
                    </div>
                    <div>
                        <label className="modal-label">Year End</label>
                        <input type="date" value={termEnd} onChange={e => setTermEnd(e.target.value)} className="modal-date-input" style={{ '--focus-color': MODALS.ACADEMICTERM.PRIMARY_BG } as React.CSSProperties} />
                    </div>
                </div>

                {termMode === 'Semesters Only' ? (
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="modal-label">Fall Semester End</label>
                            <input type="date" value={fallEnd} onChange={e => setFallEnd(e.target.value)} className="modal-date-input" style={{ '--focus-color': MODALS.ACADEMICTERM.PRIMARY_BG } as React.CSSProperties} />
                            <span className="text-xs opacity-50 block mt-1" style={{ color: MODALS.BASE.DELETE_BODY }}>Starts on Year Start</span>
                        </div>
                        <div>
                            <label className="modal-label">Spring Semester Start</label>
                            <input type="date" value={springStart} onChange={e => setSpringStart(e.target.value)} className="modal-date-input" style={{ '--focus-color': MODALS.ACADEMICTERM.PRIMARY_BG } as React.CSSProperties} />
                            <span className="text-xs opacity-50 block mt-1" style={{ color: MODALS.BASE.DELETE_BODY }}>Ends on Year End</span>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="modal-label">Q1 End</label>
                                <input type="date" value={q1End} onChange={e => setQ1End(e.target.value)} className="modal-date-input" style={{ '--focus-color': MODALS.ACADEMICTERM.PRIMARY_BG } as React.CSSProperties} />
                                <span className="text-xs opacity-50 block mt-1" style={{ color: MODALS.BASE.DELETE_BODY }}>Starts on Year Start</span>
                            </div>
                            <div>
                                <label className="modal-label">Q2 Start</label>
                                <input type="date" value={q2Start} onChange={e => setQ2Start(e.target.value)} className="modal-date-input" style={{ '--focus-color': MODALS.ACADEMICTERM.PRIMARY_BG } as React.CSSProperties} />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="modal-label">Q2 End</label>
                                <input type="date" value={q2End} onChange={e => setQ2End(e.target.value)} className="modal-date-input" style={{ '--focus-color': MODALS.ACADEMICTERM.PRIMARY_BG } as React.CSSProperties} />
                                <span className="text-xs opacity-50 block mt-1" style={{ color: MODALS.BASE.DELETE_BODY }}>Serves as Fall semester end</span>
                            </div>
                            <div>
                                <label className="modal-label">Q3 Start</label>
                                <input type="date" value={q3Start} onChange={e => setQ3Start(e.target.value)} className="modal-date-input" style={{ '--focus-color': MODALS.ACADEMICTERM.PRIMARY_BG } as React.CSSProperties} />
                                <span className="text-xs opacity-50 block mt-1" style={{ color: MODALS.BASE.DELETE_BODY }}>Serves as Spring semester start</span>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="modal-label">Q3 End</label>
                                <input type="date" value={q3End} onChange={e => setQ3End(e.target.value)} className="modal-date-input" style={{ '--focus-color': MODALS.ACADEMICTERM.PRIMARY_BG } as React.CSSProperties} />
                            </div>
                            <div>
                                <label className="modal-label">Q4 Start</label>
                                <input type="date" value={q4Start} onChange={e => setQ4Start(e.target.value)} className="modal-date-input" style={{ '--focus-color': MODALS.ACADEMICTERM.PRIMARY_BG } as React.CSSProperties} />
                                <span className="text-xs opacity-50 block mt-1" style={{ color: MODALS.BASE.DELETE_BODY }}>Ends on Year End</span>
                            </div>
                        </div>
                    </>
                )}

                <div className="flex justify-end space-x-3 mt-6">
                    <button type="button" onClick={onClose} className="modal-btn modal-btn-cancel modal-btn-inline" style={{ '--modal-btn-bg': MODALS.BASE.CANCEL_BG, '--modal-btn-bg-hover': MODALS.BASE.CANCEL_BG_HOVER, '--modal-btn-text': MODALS.BASE.CANCEL_TEXT, '--modal-btn-border': MODALS.BASE.CANCEL_BORDER } as React.CSSProperties}>Cancel</button>
                    <button type="submit" className="modal-btn modal-btn-inline" style={{ '--modal-btn-bg': MODALS.ACADEMICTERM.PRIMARY_BG, '--modal-btn-bg-hover': MODALS.ACADEMICTERM.PRIMARY_BG_HOVER, '--modal-btn-text': MODALS.ACADEMICTERM.PRIMARY_TEXT } as React.CSSProperties}>Add Term</button>
                </div>
            </form>
        </div>
    )
}

export const EditTermModal: React.FC<EditTermModalProps> = ({ onClose, termId }) => {
    const { academicTerms, updateAcademicTerm } = useAcademicTerms()
    const { showToast } = useToast()

    const term = academicTerms.find(t => t.id === termId)
    const fallSemester = term?.semesters?.find(s => s.name === 'Fall')
    const springSemester = term?.semesters?.find(s => s.name === 'Spring')

    const [name, setName] = useState(term?.name || '')
    const [termStart, setTermStart] = useState(term?.startDate || '')
    const [termEnd, setTermEnd] = useState(term?.endDate || '')
    const [fallEnd, setFallEnd] = useState(fallSemester?.endDate || '')
    const [springStart, setSpringStart] = useState(springSemester?.startDate || '')
    const [q1End, setQ1End] = useState(fallSemester?.quarters?.find(q => q.name === 'Q1')?.endDate || '')
    const [q2Start, setQ2Start] = useState(fallSemester?.quarters?.find(q => q.name === 'Q2')?.startDate || '')
    const [q2End, setQ2End] = useState(fallSemester?.endDate || '')
    const [q3Start, setQ3Start] = useState(springSemester?.startDate || '')
    const [q3End, setQ3End] = useState(springSemester?.quarters?.find(q => q.name === 'Q3')?.endDate || '')
    const [q4Start, setQ4Start] = useState(springSemester?.quarters?.find(q => q.name === 'Q4')?.startDate || '')

    if (!term) return null

    const isQuartersMode = term.termType === 'Semesters With Quarters'

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (!name || !termStart || !termEnd) {
            showToast('All fields are required.', 'error')
            return
        }

        if (isQuartersMode) {
            if (!q1End || !q2Start || !q2End || !q3Start || !q3End || !q4Start) {
                showToast('All fields are required.', 'error')
                return
            }
        } else {
            if (!fallEnd || !springStart) {
                showToast('All fields are required.', 'error')
                return
            }
        }

        if (academicTerms.some(t => t.id !== termId && t.name.toLowerCase() === name.trim().toLowerCase())) {
            showToast('A term with this name already exists.', 'error')
            return
        }

        const newStart = new Date(termStart)
        const newEnd = new Date(termEnd)

        const hasOverlap = academicTerms.some(t => {
            if (t.id === termId) return false
            const existingStart = new Date(t.startDate)
            const existingEnd = new Date(t.endDate)
            return (
                (newStart >= existingStart && newStart <= existingEnd) ||
                (newEnd >= existingStart && newEnd <= existingEnd) ||
                (newStart <= existingStart && newEnd >= existingEnd)
            )
        })

        if (hasOverlap) {
            showToast('This term overlaps with an existing term.', 'error')
            return
        }

        if (termStart >= termEnd) {
            showToast('Year start must be before end.', 'error')
            return
        }

        let updatedTerm: Omit<AcademicTerm, 'id'>

        if (isQuartersMode) {
            if (q1End <= termStart) { showToast('Q1 end must be after year start.', 'error'); return }
            if (q2Start <= q1End) { showToast('Q2 start must be after Q1 end.', 'error'); return }
            if (q2End <= q2Start) { showToast('Q2 end must be after Q2 start.', 'error'); return }
            if (q3Start <= q2End) { showToast('Q3 start must be after Q2 end.', 'error'); return }
            if (q3End <= q3Start) { showToast('Q3 end must be after Q3 start.', 'error'); return }
            if (q4Start <= q3End) { showToast('Q4 start must be after Q3 end.', 'error'); return }
            if (q4Start >= termEnd) { showToast('Q4 start must be before year end.', 'error'); return }

            updatedTerm = {
                name,
                startDate: termStart,
                endDate: termEnd,
                termType: 'Semesters With Quarters',
                semesters: [
                    {
                        id: fallSemester?.id || generateId(),
                        name: 'Fall',
                        startDate: termStart,
                        endDate: q2End,
                        quarters: [
                            { id: fallSemester?.quarters?.[0]?.id || generateId(), name: 'Q1', startDate: termStart, endDate: q1End },
                            { id: fallSemester?.quarters?.[1]?.id || generateId(), name: 'Q2', startDate: q2Start, endDate: q2End }
                        ]
                    },
                    {
                        id: springSemester?.id || generateId(),
                        name: 'Spring',
                        startDate: q3Start,
                        endDate: termEnd,
                        quarters: [
                            { id: springSemester?.quarters?.[0]?.id || generateId(), name: 'Q3', startDate: q3Start, endDate: q3End },
                            { id: springSemester?.quarters?.[1]?.id || generateId(), name: 'Q4', startDate: q4Start, endDate: termEnd }
                        ]
                    }
                ]
            }
        } else {
            if (termStart >= fallEnd) { showToast('Fall end must be after year start.', 'error'); return }
            if (fallEnd >= springStart) { showToast('Spring start must be after fall end.', 'error'); return }
            if (springStart >= termEnd) { showToast('Spring start must be before year end.', 'error'); return }

            updatedTerm = {
                name,
                startDate: termStart,
                endDate: termEnd,
                termType: 'Semesters Only',
                semesters: [
                    { id: fallSemester?.id || generateId(), name: 'Fall', startDate: termStart, endDate: fallEnd },
                    { id: springSemester?.id || generateId(), name: 'Spring', startDate: springStart, endDate: termEnd }
                ]
            }
        }

        updateAcademicTerm(termId, updatedTerm)
        showToast('Academic term updated!', 'success')
        onClose()
    }

    return (
        <div className="modal-container overflow-y-auto max-h-[90vh]" style={{ backgroundColor: MODALS.BASE.BG }}>
            <h2 className="text-xl font-bold mb-4" style={{ color: MODALS.ACADEMICTERM.HEADING }}>Edit Academic Term</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="modal-label">Term Name</label>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="2025-2026" className="modal-input" style={{ '--focus-color': MODALS.ACADEMICTERM.PRIMARY_BG } as React.CSSProperties} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="modal-label">Year Start</label>
                        <input type="date" value={termStart} onChange={e => setTermStart(e.target.value)} className="modal-date-input" style={{ '--focus-color': MODALS.ACADEMICTERM.PRIMARY_BG } as React.CSSProperties} />
                    </div>
                    <div>
                        <label className="modal-label">Year End</label>
                        <input type="date" value={termEnd} onChange={e => setTermEnd(e.target.value)} className="modal-date-input" style={{ '--focus-color': MODALS.ACADEMICTERM.PRIMARY_BG } as React.CSSProperties} />
                    </div>
                </div>

                {isQuartersMode ? (
                    <>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="modal-label">Q1 End</label>
                                <input type="date" value={q1End} onChange={e => setQ1End(e.target.value)} className="modal-date-input" style={{ '--focus-color': MODALS.ACADEMICTERM.PRIMARY_BG } as React.CSSProperties} />
                                <span className="text-xs opacity-50 block mt-1" style={{ color: MODALS.BASE.DELETE_BODY }}>Starts on Year Start</span>
                            </div>
                            <div>
                                <label className="modal-label">Q2 Start</label>
                                <input type="date" value={q2Start} onChange={e => setQ2Start(e.target.value)} className="modal-date-input" style={{ '--focus-color': MODALS.ACADEMICTERM.PRIMARY_BG } as React.CSSProperties} />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="modal-label">Q2 End</label>
                                <input type="date" value={q2End} onChange={e => setQ2End(e.target.value)} className="modal-date-input" style={{ '--focus-color': MODALS.ACADEMICTERM.PRIMARY_BG } as React.CSSProperties} />
                                <span className="text-xs opacity-50 block mt-1" style={{ color: MODALS.BASE.DELETE_BODY }}>Serves as Fall semester end</span>
                            </div>
                            <div>
                                <label className="modal-label">Q3 Start</label>
                                <input type="date" value={q3Start} onChange={e => setQ3Start(e.target.value)} className="modal-date-input" style={{ '--focus-color': MODALS.ACADEMICTERM.PRIMARY_BG } as React.CSSProperties} />
                                <span className="text-xs opacity-50 block mt-1" style={{ color: MODALS.BASE.DELETE_BODY }}>Serves as Spring semester start</span>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="modal-label">Q3 End</label>
                                <input type="date" value={q3End} onChange={e => setQ3End(e.target.value)} className="modal-date-input" style={{ '--focus-color': MODALS.ACADEMICTERM.PRIMARY_BG } as React.CSSProperties} />
                            </div>
                            <div>
                                <label className="modal-label">Q4 Start</label>
                                <input type="date" value={q4Start} onChange={e => setQ4Start(e.target.value)} className="modal-date-input" style={{ '--focus-color': MODALS.ACADEMICTERM.PRIMARY_BG } as React.CSSProperties} />
                                <span className="text-xs opacity-50 block mt-1" style={{ color: MODALS.BASE.DELETE_BODY }}>Ends on Year End</span>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="modal-label">Fall Semester End</label>
                            <input type="date" value={fallEnd} onChange={e => setFallEnd(e.target.value)} className="modal-date-input" style={{ '--focus-color': MODALS.ACADEMICTERM.PRIMARY_BG } as React.CSSProperties} />
                            <span className="text-xs opacity-50 block mt-1" style={{ color: MODALS.BASE.DELETE_BODY }}>Starts on Year Start</span>
                        </div>
                        <div>
                            <label className="modal-label">Spring Semester Start</label>
                            <input type="date" value={springStart} onChange={e => setSpringStart(e.target.value)} className="modal-date-input" style={{ '--focus-color': MODALS.ACADEMICTERM.PRIMARY_BG } as React.CSSProperties} />
                            <span className="text-xs opacity-50 block mt-1" style={{ color: MODALS.BASE.DELETE_BODY }}>Ends on Year End</span>
                        </div>
                    </div>
                )}

                <div className="flex justify-end space-x-3 mt-6">
                    <button type="button" onClick={onClose} className="modal-btn modal-btn-cancel modal-btn-inline" style={{ '--modal-btn-bg': MODALS.BASE.CANCEL_BG, '--modal-btn-bg-hover': MODALS.BASE.CANCEL_BG_HOVER, '--modal-btn-text': MODALS.BASE.CANCEL_TEXT, '--modal-btn-border': MODALS.BASE.CANCEL_BORDER } as React.CSSProperties}>Cancel</button>
                    <button type="submit" className="modal-btn modal-btn-inline" style={{ '--modal-btn-bg': MODALS.ACADEMICTERM.PRIMARY_BG, '--modal-btn-bg-hover': MODALS.ACADEMICTERM.PRIMARY_BG_HOVER, '--modal-btn-text': MODALS.ACADEMICTERM.PRIMARY_TEXT } as React.CSSProperties}>Save Changes</button>
                </div>
            </form>
        </div>
    )
}

export const DeleteTermModal: React.FC<EditTermModalProps> = ({ onClose, termId }) => {
    const { academicTerms, deleteAcademicTerm } = useAcademicTerms()
    const { showToast } = useToast()

    const term = academicTerms.find(t => t.id === termId)

    if (!term) return null

    const handleDelete = () => {
        deleteAcademicTerm(termId)
        showToast('Academic term deleted.', 'success')
        onClose()
    }

    return (
        <div className="modal-container" style={{ backgroundColor: MODALS.BASE.BG }}>
            <h2 className="text-xl font-bold mb-4" style={{ color: MODALS.BASE.DELETE_HEADING }}>Delete Academic Term?</h2>
            <p className="text-gray-300 mb-4" style={{ color: MODALS.BASE.DELETE_BODY }}>
                Are you sure you want to delete <strong>{term.name}</strong>? Any classes in this term will be unassigned. This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
                <button onClick={onClose} className="modal-btn modal-btn-cancel modal-btn-inline" style={{ '--modal-btn-bg': MODALS.BASE.CANCEL_BG, '--modal-btn-bg-hover': MODALS.BASE.CANCEL_BG_HOVER, '--modal-btn-text': MODALS.BASE.CANCEL_TEXT, '--modal-btn-border': MODALS.BASE.CANCEL_BORDER } as React.CSSProperties}>Cancel</button>
                <button onClick={handleDelete} className="modal-btn modal-btn-inline" style={{ '--modal-btn-bg': MODALS.BASE.DELETE_BG, '--modal-btn-bg-hover': MODALS.BASE.DELETE_BG_HOVER, '--modal-btn-text': MODALS.BASE.DELETE_TEXT } as React.CSSProperties}>Delete Term</button>
            </div>
        </div>
    )
}

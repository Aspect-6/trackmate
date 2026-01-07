import React from 'react'
import { useApp } from '@/app/contexts/AppContext'
import { GLOBAL, MODALS } from '@/app/styles/colors'
import type { SemesterScheduleData } from '@/app/types'
import type { SemesterName, ScheduleDayType } from '@/pages/My Schedule/types'
import { BookOpen, Calendar } from 'lucide-react'

interface SemesterClassSelectorModalProps {
    onClose: () => void
    data: {
        semester: SemesterName
        dayType: ScheduleDayType
        periodIndex: number
        termId: string | null
        onSelect: (classId: string | null, isSemesterClass: boolean) => void
        otherSemesterSchedule: SemesterScheduleData
    }
}

export const SemesterClassSelectorModal: React.FC<SemesterClassSelectorModalProps> = ({ onClose, data }) => {
    const { classes } = useApp()
    const { semester, dayType, periodIndex, termId, onSelect, otherSemesterSchedule } = data

    const handleSelect = (classId: string, isSemesterClass: boolean) => {
        onSelect(classId, isSemesterClass)
        onClose()
    }

    // Get all class IDs used in the other semester
    const otherSemesterClassIds = new Set(
        otherSemesterSchedule.days.flatMap(day =>
            day.classes.filter((id): id is string => id !== null)
        )
    )

    // Filter classes:
    // 1. Must belong to the selected term
    // 2. Only SEMESTER classes should be filtered from appearing in the other semester
    const availableClasses = classes.filter(classData => {
        // Must have a termId and it must match the selected term
        if (!classData.termId || classData.termId !== termId) {
            return false
        }
        // If it's a semester class and used in the other semester, filter it out
        if (classData.semesterId && otherSemesterClassIds.has(classData.id)) {
            return false
        }
        return true
    })

    const dayLabel = dayType === 'A' ? 'A-Day' : 'B-Day'

    return (
        <div
            className="w-full max-w-md p-6 rounded-2xl flex flex-col max-h-[50vh]"
            style={{
                backgroundColor: MODALS.BASE.BG,
                border: `1px solid ${MODALS.BASE.BORDER}`,
                boxShadow: '0 12px 30px rgba(0,0,0,0.25)'
            }}
        >
            <div className="flex-shrink-0 pb-4 mb-3 border-b" style={{ borderColor: 'var(--header-divider-color, rgba(128,128,128,0.1))' }}>
                <h2 className="text-2xl font-bold mb-4" style={{ color: MODALS.CLASS.HEADING }}>
                    Select Class
                </h2>
                <div className="flex flex-wrap items-center gap-2">
                    <div
                        className="px-3 py-1 rounded-md text-sm font-medium flex items-center gap-2 border"
                        style={{
                            borderColor: 'var(--border-light)',
                            color: 'var(--text-primary)',
                            backgroundColor: 'transparent'
                        }}
                    >
                        <Calendar size={14} className="opacity-60" />
                        <span>{semester} Semester</span>
                    </div>
                    <div
                        className="px-3 py-1 rounded-md text-sm font-medium flex items-center gap-2 border"
                        style={{
                            borderColor: 'var(--border-light)',
                            color: 'var(--text-secondary)',
                            backgroundColor: 'transparent'
                        }}
                    >
                        <span>{dayLabel} • Period {periodIndex + 1}</span>
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto min-h-0 pr-1 -mr-1">
                <div className="space-y-3">
                    {availableClasses.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-12 text-center opacity-60">
                            <BookOpen size={32} className="mb-3 text-[var(--text-tertiary)]" />
                            <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                                No classes available
                            </p>
                            <p className="text-xs mt-1" style={{ color: 'var(--text-tertiary)' }}>
                                Add classes to this term to see them here
                            </p>
                        </div>
                    ) : (
                        availableClasses.map(classData => (
                            <button
                                key={classData.id}
                                onClick={() => handleSelect(classData.id, !!classData.semesterId)}
                                className="w-full group relative overflow-hidden rounded-xl text-left transition-all duration-200 hover:translate-x-1"
                                style={{
                                    backgroundColor: GLOBAL.BACKGROUND_PRIMARY,
                                    border: `1px solid ${MODALS.BASE.BORDER}`
                                }}
                            >
                                <div
                                    className="absolute left-0 top-0 bottom-0 w-1.5 transition-all duration-200 group-hover:w-2"
                                    style={{ backgroundColor: classData.color }}
                                />
                                <div className="p-4 pl-5">
                                    <div className="font-bold text-base md:text-lg leading-tight mb-1" style={{ color: 'var(--text-primary)' }}>
                                        {classData.name}
                                    </div>
                                    <div className="text-sm flex items-center gap-2 opacity-80" style={{ color: 'var(--text-secondary)' }}>
                                        <span className="font-medium text-[var(--text-primary)] opacity-75">
                                            {classData.semesterId ? 'Semester' : 'Year-long'}
                                        </span>
                                        {(classData.teacherName || classData.roomNumber) && (
                                            <>
                                                <span>•</span>
                                                {classData.teacherName && (
                                                    <span>{classData.teacherName}</span>
                                                )}
                                                {classData.teacherName && classData.roomNumber && (
                                                    <span>•</span>
                                                )}
                                                {classData.roomNumber && classData.roomNumber}
                                            </>
                                        )}
                                    </div>
                                </div>
                            </button>
                        ))
                    )}
                </div>
            </div>

            <div className="flex-shrink-0 pt-6 mt-2 flex justify-end">
                <button
                    onClick={onClose}
                    className="modal-btn modal-btn-cancel"
                    style={{
                        '--modal-btn-bg': MODALS.BASE.CANCEL_BG,
                        '--modal-btn-bg-hover': MODALS.BASE.CANCEL_BG_HOVER,
                        '--modal-btn-text': MODALS.BASE.CANCEL_TEXT,
                        '--modal-btn-border': MODALS.BASE.CANCEL_BORDER,
                        width: '100%',
                        justifyContent: 'center'
                    } as React.CSSProperties}
                >
                    Cancel
                </button>
            </div>
        </div>
    )
}

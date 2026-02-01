import React from 'react'
import { useClasses } from '@/app/hooks/entities'
import type { SemesterScheduleData } from '@/app/types'
import type { SemesterName, ScheduleDayType } from '@/pages/My Schedule/types'
import { ModalCancelButton } from '@shared/components/modal/ModalCancelButton'
import { BookOpen, Calendar } from 'lucide-react'
import { GLOBAL, MODALS } from '@/app/styles/colors'

interface AlternatingABClassSelectorModalProps {
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

export const AlternatingABClassSelectorModal: React.FC<AlternatingABClassSelectorModalProps> = ({ onClose, data }) => {
    const { classes } = useClasses()
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

    // Filter classes
    const availableClasses = classes.filter(classData => {
        if (!classData.termId || classData.termId !== termId) {
            return false
        }
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
            }}
        >
            <div className="flex-shrink-0 pb-4 mb-3 border-b" style={{ borderColor: GLOBAL.BORDER_SECONDARY }}>
                <h2 className="text-2xl font-bold mb-4" style={{ color: MODALS.CLASS.HEADING }}>
                    Select Class
                </h2>
                <div className="flex flex-wrap items-center gap-2">
                    <div
                        className="px-3 py-1 rounded-md text-sm font-medium flex items-center gap-2 border"
                        style={{
                            borderColor: GLOBAL.BORDER_SECONDARY,
                            color: GLOBAL.TEXT_PRIMARY,
                            backgroundColor: 'transparent'
                        }}
                    >
                        <Calendar size={14} className="opacity-60" />
                        <span>{semester} Semester</span>
                    </div>
                    <div
                        className="px-3 py-1 rounded-md text-sm font-medium flex items-center gap-2 border"
                        style={{
                            borderColor: GLOBAL.BORDER_SECONDARY,
                            color: GLOBAL.TEXT_SECONDARY,
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
                            <BookOpen size={32} className="mb-3" style={{ color: GLOBAL.TEXT_TERTIARY }} />
                            <p className="text-sm font-medium" style={{ color: GLOBAL.TEXT_SECONDARY }}>
                                No classes available
                            </p>
                            <p className="text-xs mt-1" style={{ color: GLOBAL.TEXT_TERTIARY }}>
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
                                    <div className="font-bold text-base md:text-lg leading-tight mb-1" style={{ color: GLOBAL.TEXT_PRIMARY }}>
                                        {classData.name}
                                    </div>
                                    <div className="text-sm flex items-center gap-2 opacity-80" style={{ color: GLOBAL.TEXT_SECONDARY }}>
                                        <span className="font-medium opacity-75" style={{ color: GLOBAL.TEXT_PRIMARY }}>
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
                <ModalCancelButton onClick={onClose} inline={false} className="justify-center" />
            </div>
        </div>
    )
}

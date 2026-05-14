import React from "react"
import { useAcademicTerms, useClasses } from "@/app/hooks/entities"
import type { SemesterName } from "@/pages/My Schedule/types"
import { ModalCancelButton } from "@shared/components/modal/ModalCancelButton"
import { BookOpen, Calendar } from "lucide-react"
import { GLOBAL, MODALS } from "@/app/styles/colors"

interface SemesterClassSelectorModalProps {
    onClose: () => void
    data: {
        semester: SemesterName
        periodIndex: number
        termId: string | null
        onSelect: (classId: string | null) => void
    }
}

/**
 * Class picker for the semester schedule.
 *
 * Semester classes are tied to a single semester (Fall xor Spring), so the
 * list only shows classes belonging to this term whose semester matches the
 * cell's semester. The picker has no day-type concept.
 */
export const SemesterClassSelectorModal: React.FC<SemesterClassSelectorModalProps> = ({ onClose, data }) => {
    const { classes } = useClasses()
    const { academicTerms } = useAcademicTerms()
    const { semester, periodIndex, termId, onSelect } = data

    const handleSelect = (classId: string) => {
        onSelect(classId)
        onClose()
    }

    const term = academicTerms.find(t => t.id === termId)
    const matchingSemester = term?.semesters.find(s => s.name === semester)

    const availableClasses = classes.filter(classData =>
        classData.termId === termId &&
        classData.semesterId === matchingSemester?.id
    )

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
                            backgroundColor: "transparent"
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
                            backgroundColor: "transparent"
                        }}
                    >
                        <span>Period {periodIndex + 1}</span>
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar min-h-0 pr-1 -mr-1">
                <div className="space-y-3">
                    {availableClasses.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-12 text-center opacity-60">
                            <BookOpen size={32} className="mb-3" style={{ color: GLOBAL.TEXT_TERTIARY }} />
                            <p className="text-sm font-medium" style={{ color: GLOBAL.TEXT_SECONDARY }}>
                                No classes available
                            </p>
                            <p className="text-xs mt-1" style={{ color: GLOBAL.TEXT_TERTIARY }}>
                                Add a {semester} class to this term to see it here
                            </p>
                        </div>
                    ) : (
                        availableClasses.map(classData => (
                            <button
                                key={classData.id}
                                onClick={() => handleSelect(classData.id)}
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
                                            {semester} Semester
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

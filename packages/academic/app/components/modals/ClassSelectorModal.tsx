import React from "react"
import { useAcademicTerms, useClasses } from "@/app/hooks/entities"
import { isAlternatingAB } from "@/app/lib/schedule"
import type { SemesterName } from "@/pages/My Schedule/types"
import { BookOpen, Calendar } from "lucide-react"
import { ModalContainer, ModalHeader, ModalFooter, ModalCancelButton } from "@shared/components/modal"
import { GLOBAL, MODALS } from "@/app/styles/colors"

interface ClassSelectorModalProps {
    onClose: () => void
    data: {
        scheduleType: "alternating-ab" | "alternating-ab-semester" | "fixed-weekly" | "semester"
        semester: SemesterName
        periodIndex: number
        termId: string | null
        dayLabel?: string // "A-Day", "B-Day", "Monday", etc.
        onSelect: (classId: string | null, isSemesterClass: boolean) => void
    }
}

export const ClassSelectorModal: React.FC<ClassSelectorModalProps> = ({ onClose, data }) => {
    const { classes } = useClasses()
    const { academicTerms } = useAcademicTerms()
    const { scheduleType, semester, periodIndex, termId, dayLabel, onSelect } = data

    const handleSelect = (classId: string, isSemesterClass: boolean) => {
        onSelect(classId, isSemesterClass)
        onClose()
    }

    const term = academicTerms.find(t => t.id === termId)
    const matchingSemester = term?.semesters.find(s => s.name === semester)

    const availableClasses = classes.filter(classData => {
        if (classData.termId !== termId) return false
        
        // Year-long only AB: show only year-long classes
        if (scheduleType === "alternating-ab") return !classData.semesterId
        // Mixed AB: show all classes for this term
        if (scheduleType === "alternating-ab-semester") return true
        // Semester / Fixed Weekly: show matching semester + year-long
        return classData.semesterId === matchingSemester?.id || !classData.semesterId
    })

    const renderEmptyStateText = () => {
        if (scheduleType === "alternating-ab") {
            return "Add year-long classes to this term to see them here"
        }
        if (scheduleType === "alternating-ab-semester") {
            return "Add classes to this term to see them here"
        }
        return `Add a ${semester} class to this term to see it here`
    }

    return (
        <ModalContainer className="flex flex-col !max-h-[500px]">
            <div className="flex-shrink-0 pb-4 mb-3" style={{ borderBottom: `1px solid ${GLOBAL.BORDER_SECONDARY}` }}>
                <ModalHeader color={MODALS.CLASS.HEADING}>
                    Select Class
                </ModalHeader>
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
                        <span>
                            {isAlternatingAB(scheduleType) ? `${semester} Semester` : 
                             scheduleType === "fixed-weekly" ? `${semester} • ${dayLabel}` :
                             `${semester} Semester`}
                        </span>
                    </div>
                    <div
                        className="px-3 py-1 rounded-md text-sm font-medium flex items-center gap-2 border"
                        style={{
                            borderColor: GLOBAL.BORDER_SECONDARY,
                            color: GLOBAL.TEXT_SECONDARY,
                            backgroundColor: "transparent"
                        }}
                    >
                        <span>
                            {isAlternatingAB(scheduleType) ? `${dayLabel} • Period ${periodIndex + 1}` : 
                             `Period ${periodIndex + 1}`}
                        </span>
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar min-h-0 pr-1">
                <div className="space-y-3">
                    {availableClasses.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-12 text-center opacity-60">
                            <BookOpen size={32} className="mb-3" style={{ color: GLOBAL.TEXT_TERTIARY }} />
                            <p className="text-sm font-medium" style={{ color: GLOBAL.TEXT_SECONDARY }}>
                                No classes available
                            </p>
                            <p className="text-xs mt-1" style={{ color: GLOBAL.TEXT_TERTIARY }}>
                                {renderEmptyStateText()}
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
                                            {isAlternatingAB(scheduleType)
                                                ? (classData.semesterId ? "Semester" : "Year-long")
                                                : `${semester} Semester`}
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

            <ModalFooter>
                <ModalCancelButton onClick={onClose} inline={false} className="justify-center" />
            </ModalFooter>
        </ModalContainer>
    )
}

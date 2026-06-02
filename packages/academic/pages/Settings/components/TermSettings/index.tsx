import React from "react"
import { useAcademicTerms } from "@/app/hooks/entities"
import { formatDate } from "@shared/lib"
import { BaseModuleHeader, BaseModuleDescription } from "@/pages/Settings/components/BaseModule"
import TermItem from "./TermItem"
import TermItemHeader from "./TermItem/Header"
import TermItemHeaderName from "./TermItem/Header/Name"
import TermItemHeaderDates from "./TermItem/Header/Dates"
import TermItemHeaderEditButton from "./TermItem/Header/EditButton"
import TermItemHeaderDeleteButton from "./TermItem/Header/DeleteButton"
import TermItemBody from "./TermItem/Body"
import TermItemBodySemester from "./TermItem/Body/Semester"
import AddTermButton from "./AddTermButton"
import NoTermsYetButton from "./NoTermsYetButton"
import { SETTINGS } from "@/app/styles/colors"

const TermSettingsComponent: React.FC = () => {
    const { academicTerms } = useAcademicTerms()

    return (
        <div
            className="settings-card p-5 sm:p-6 rounded-xl shadow-md mb-6 space-y-4"
            style={{
                backgroundColor: SETTINGS.BACKGROUND_PRIMARY,
                border: `1px solid ${SETTINGS.BORDER_PRIMARY}`,
            }}
        >
            <div className="flex items-center justify-between mb-4">
                <BaseModuleHeader title="Academic Terms" />
            </div>

            <BaseModuleDescription className="mb-4">
                Define your school years and semesters to configure your schedule.
            </BaseModuleDescription>

            <div className="flex flex-col gap-4">
                {academicTerms.length === 0 ? (
                    <NoTermsYetButton>
                        No academic terms yet. Click to add term.
                    </NoTermsYetButton>
                ) : (
                    <>
                        <div className="flex flex-col gap-3 h-90 sm:h-105 overflow-scroll custom-scrollbar">
                            {academicTerms.map((term) => (
                                <TermItem key={term.id}>
                                    <TermItemHeader>
                                        <div className="flex flex-col gap-1">
                                            <TermItemHeaderName>{term.name}</TermItemHeaderName>
                                            <TermItemHeaderDates>{formatDate("medium", term.startDate)} — {formatDate("medium", term.endDate)}</TermItemHeaderDates>
                                        </div>
                                        <div className="flex items-center gap-1 -mr-2 -mt-2">
                                            <TermItemHeaderEditButton term={term} />
                                            <TermItemHeaderDeleteButton term={term} />
                                        </div>
                                    </TermItemHeader>

                                    <TermItemBody>
                                        <TermItemBodySemester
                                            name="Fall"
                                            startDate={term.semesters.find(sem => sem.name === "Fall")!.startDate}
                                            endDate={term.semesters.find(sem => sem.name === "Fall")!.endDate}
                                        />
                                        <TermItemBodySemester
                                            name="Spring"
                                            startDate={term.semesters.find(sem => sem.name === "Spring")!.startDate}
                                            endDate={term.semesters.find(sem => sem.name === "Spring")!.endDate}
                                        />
                                    </TermItemBody>
                                </TermItem>
                            ))}
                        </div>
                        <AddTermButton>Add Term</AddTermButton>
                    </>
                )}
            </div>
        </div>
    )
}

export default TermSettingsComponent
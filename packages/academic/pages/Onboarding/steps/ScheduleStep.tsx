import React from "react"
import { useToast } from "@shared/contexts/ToastContext"
import { useAcademicTerms } from "@/app/hooks/entities"
import { ScheduleType } from "@/app/types"
import { ModalSubmitButton } from "@shared/components/modal"
import { GLOBAL, MODALS } from "@/app/styles/colors"

interface ScheduleStepProps {
    onNext: () => void
}

export const ScheduleStep: React.FC<ScheduleStepProps> = ({ onNext }) => {
    const { academicTerms, updateAcademicTerm } = useAcademicTerms()
    const { showToast } = useToast()
    const [selectedFormat, setSelectedFormat] = React.useState<ScheduleType>("semester")

    const handleSubmit = (e: React.SubmitEvent) => {
        e.preventDefault()
        
        const latestTerm = academicTerms[0]
        if (latestTerm) {
            updateAcademicTerm(latestTerm.id, { scheduleType: selectedFormat })
            showToast("Schedule format selected!", "success")
            onNext()
        } else {
            showToast("No academic term found to update.", "error")
        }
    }

    const formats = [
        {
            value: "semester",
            title: "Standard Semesters",
            description: "You have the same classes every day for the entire semester."
        },
        {
            value: "fixed-weekly",
            title: "Fixed Weekly",
            description: "You have the same classes on specific days of the week, like Monday, Wednesday, and Friday."
        },
        {
            value: "alternating-ab",
            title: "Alternating A/B",
            description: "\"A\" and \"B\" days rotate continuously throughout the year. You have each class every other day."
        },
        {
            value: "alternating-ab-semester",
            title: "Alternating A/B + Semesters",
            description: "The same as Alternating A/B, but with the ability to also have some semester classes mixed in with your year-long A/B ones."
        }
    ] as const

    return (
        <div className="flex flex-col animate-slide-up-fade">
            <h1 className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2" style={{ color: MODALS.ACADEMICTERM.HEADING }}>
                Choose Your Schedule Format
            </h1>
            <p className="text-base sm:text-lg mb-4 sm:mb-8" style={{ color: GLOBAL.TEXT_SECONDARY }}>
                How do your classes repeat? You can always change this later in Settings.
            </p>

            <div className="p-4 sm:p-6 rounded-2xl border" style={{ backgroundColor: GLOBAL.BACKGROUND_SECONDARY, borderColor: GLOBAL.BORDER_PRIMARY }}>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        {formats.map(format => (
                            <button
                                key={format.value}
                                type="button"
                                onClick={() => setSelectedFormat(format.value as ScheduleType)}
                                className="w-full text-left p-3 sm:p-4 rounded-xl border transition-all h-full"
                                style={{
                                    backgroundColor: selectedFormat === format.value ? MODALS.ACADEMICTERM.PRIMARY_BG : GLOBAL.BACKGROUND_PRIMARY,
                                    borderColor: selectedFormat === format.value ? MODALS.ACADEMICTERM.PRIMARY_BG : GLOBAL.BORDER_PRIMARY,
                                }}
                            >
                                <div 
                                    className="font-bold text-base sm:text-lg"
                                    style={{ color: selectedFormat === format.value ? MODALS.ACADEMICTERM.PRIMARY_TEXT : GLOBAL.TEXT_PRIMARY }}
                                >
                                    {format.title}
                                </div>
                                <div 
                                    className={`text-xs sm:text-sm mt-1 sm:mt-1.5 transition-opacity ${selectedFormat === format.value ? "opacity-90" : "opacity-60"}`}
                                    style={{ color: selectedFormat === format.value ? MODALS.ACADEMICTERM.PRIMARY_TEXT : GLOBAL.TEXT_PRIMARY }}
                                >
                                    {format.description}
                                </div>
                            </button>
                        ))}
                    </div>

                    <div className="flex justify-end pt-4">
                        <ModalSubmitButton
                            type="submit"
                            bgColor={MODALS.SCHEDULE.PRIMARY_BG}
                            bgColorHover={MODALS.SCHEDULE.PRIMARY_BG_HOVER}
                            textColor={MODALS.SCHEDULE.PRIMARY_TEXT}
                        >
                            Next Step
                        </ModalSubmitButton>
                    </div>
                </form>
            </div>
        </div>
    )
}

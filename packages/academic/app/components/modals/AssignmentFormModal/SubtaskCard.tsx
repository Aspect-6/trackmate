import React, { useEffect, useRef } from "react"
import { ChevronDown, X } from "lucide-react"
import { useHover } from "@shared/hooks/ui/useHover"
import type { Status, Subtask } from "@/app/types"
import { GLOBAL } from "@/app/styles/colors"
import {
    ModalLabel,
    ModalTextInput,
    ModalDateInput,
    ModalTimeInput,
    ModalSelectInput,
    ModalSelectInputOption,
} from "@shared/components/modal"

export interface SubtaskCardProps {
    subtask: Subtask
    focusColor: string
    isExpanded: boolean
    shouldFocus: boolean
    onExpand: () => void
    onToggleExpand: () => void
    onUpdate: (patch: Partial<Subtask>) => void
    onRemove: () => void
}

const SubtaskCard: React.FC<SubtaskCardProps> = ({
    subtask,
    focusColor,
    isExpanded,
    shouldFocus,
    onExpand,
    onToggleExpand,
    onUpdate,
    onRemove,
}) => {
    const cardRef = useRef<HTMLDivElement>(null)
    const { isHovered: isRemoveHovered, hoverProps: removeHoverProps } = useHover()
    const { isHovered: isChevronHovered, hoverProps: chevronHoverProps } = useHover()

    useEffect(() => {
        if (shouldFocus && cardRef.current) {
            cardRef.current.scrollIntoView({ block: "nearest", behavior: "smooth" })
        }
    }, [shouldFocus])

    const handleTitleFocus = () => {
        if (!isExpanded) onExpand()
    }

    return (
        <div
            ref={cardRef}
            className="rounded-lg overflow-hidden"
            style={{
                border: `1px solid ${GLOBAL.BORDER_PRIMARY}`,
                backgroundColor: GLOBAL.BACKGROUND_PRIMARY,
            }}
        >
            <div className="flex items-center gap-1.5 p-2">
                <ModalTextInput
                    name={`subtask-title-${subtask.id}`}
                    value={subtask.title}
                    onChange={e => onUpdate({ title: e.target.value })}
                    onFocus={handleTitleFocus}
                    placeholder="Subtask title"
                    focusColor={focusColor}
                    className="!mb-0 flex-1 min-w-0"
                />
                <button
                    type="button"
                    onClick={onToggleExpand}
                    className="shrink-0 p-1.5 rounded-md transition-colors"
                    style={{ color: isChevronHovered ? GLOBAL.TEXT_PRIMARY : GLOBAL.TEXT_SECONDARY }}
                    aria-label={isExpanded ? "Collapse subtask details" : "Expand subtask details"}
                    aria-expanded={isExpanded}
                    {...chevronHoverProps}
                >
                    <ChevronDown
                        size={18}
                        className="transition-transform duration-200 ease-out"
                        style={{ transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)" }}
                    />
                </button>
                <button
                    type="button"
                    onClick={onRemove}
                    className="shrink-0 p-1.5 rounded-md transition-colors"
                    style={{ color: isRemoveHovered ? GLOBAL.TEXT_PRIMARY : GLOBAL.TEXT_SECONDARY }}
                    aria-label="Remove subtask"
                    {...removeHoverProps}
                >
                    <X size={16} />
                </button>
            </div>

            <div
                className="grid transition-[grid-template-rows] duration-200 ease-out"
                style={{ gridTemplateRows: isExpanded ? "1fr" : "0fr" }}
            >
                <div className="overflow-hidden">
                    <div className="px-2 pb-2 pt-0 space-y-2">
                        <div className="grid grid-cols-3 gap-2">
                            <div>
                                <ModalLabel>Due Date</ModalLabel>
                                <ModalDateInput
                                    name={`subtask-date-${subtask.id}`}
                                    value={subtask.dueDate}
                                    onChange={e => onUpdate({ dueDate: e.target.value })}
                                    required
                                    focusColor={focusColor}
                                />
                            </div>
                            <div>
                                <ModalLabel>Due Time</ModalLabel>
                                <ModalTimeInput
                                    name={`subtask-time-${subtask.id}`}
                                    value={subtask.dueTime}
                                    onChange={e => onUpdate({ dueTime: e.target.value || "23:59" })}
                                    required
                                    focusColor={focusColor}
                                />
                            </div>
                            <div>
                                <ModalLabel>Status</ModalLabel>
                                <ModalSelectInput
                                    name={`subtask-status-${subtask.id}`}
                                    value={subtask.status}
                                    onChange={e => onUpdate({ status: e.target.value as Status })}
                                    focusColor={focusColor}
                                >
                                    <ModalSelectInputOption value="To Do">To Do</ModalSelectInputOption>
                                    <ModalSelectInputOption value="In Progress">In Progress</ModalSelectInputOption>
                                    <ModalSelectInputOption value="Done">Done</ModalSelectInputOption>
                                </ModalSelectInput>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SubtaskCard

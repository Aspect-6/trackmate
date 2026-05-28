import React, { useEffect, useState } from "react"
import { generateId, todayString } from "@shared/lib"
import type { Status, Subtask } from "@/app/types"
import { ModalLabel } from "@shared/components/modal"
import AddSubtaskButton from "./AddSubtaskButton"
import SubtaskCard from "./SubtaskCard"
import { GLOBAL } from "@/app/styles/colors"

export interface SubtasksSectionProps {
    subtasks: Subtask[]
    onChange: (subtasks: Subtask[]) => void
    maxCount: number
    focusColor: string
    focusSubtaskId?: string
}

const SubtasksSection: React.FC<SubtasksSectionProps> = ({
    subtasks,
    onChange,
    maxCount,
    focusColor,
    focusSubtaskId,
}) => {
    const [expandedId, setExpandedId] = useState<string | null>(null)
    const atLimit = subtasks.length >= maxCount

    useEffect(() => {
        if (focusSubtaskId) setExpandedId(focusSubtaskId)
    }, [focusSubtaskId])

    useEffect(() => {
        if (expandedId && !subtasks.some(s => s.id === expandedId)) setExpandedId(null)
    }, [subtasks, expandedId])

    const handleAdd = () => {
        if (atLimit) return
        const newId = generateId()
        onChange([
            ...subtasks,
            {
                id: newId,
                title: "",
                dueDate: todayString(),
                dueTime: "23:59",
                status: "To Do" as Status,
            },
        ])
        setExpandedId(newId)
    }

    const handleRemove = (id: string) => {
        onChange(subtasks.filter(s => s.id !== id))
        if (expandedId === id) setExpandedId(null)
    }

    const handleExpand = (id: string) => setExpandedId(id)
    const handleToggleExpand = (id: string) => setExpandedId(current => (current === id ? null : id))

    return (
        <div className="space-y-3 pt-2 border-t" style={{ borderColor: GLOBAL.BORDER_PRIMARY }}>
            <div className="flex items-center justify-between gap-2">
                <ModalLabel className="!mb-0">Subtasks</ModalLabel>
                <div className="flex items-center gap-2 shrink-0">
                    <AddSubtaskButton onClick={handleAdd} disabled={atLimit} maxCount={maxCount} />
                    <span className="text-xs font-medium tabular-nums" style={{ color: GLOBAL.TEXT_SECONDARY }}>
                        {subtasks.length}/{maxCount}
                    </span>
                </div>
            </div>

            <div
                className="min-h-32 max-h-32 overflow-y-auto space-y-2 pr-1 custom-scrollbar"
            >
                {subtasks.length === 0 ? (
                    <p className="text-sm py-2" style={{ color: GLOBAL.TEXT_SECONDARY }}>
                        No subtasks yet
                    </p>
                ) : (
                    subtasks.map(subtask => (
                        <SubtaskCard
                            key={subtask.id}
                            subtask={subtask}
                            focusColor={focusColor}
                            isExpanded={expandedId === subtask.id}
                            shouldFocus={focusSubtaskId === subtask.id}
                            onExpand={() => handleExpand(subtask.id)}
                            onToggleExpand={() => handleToggleExpand(subtask.id)}
                            onUpdate={patch => onChange(
                                subtasks.map(s => (s.id === subtask.id ? { ...s, ...patch } : s))
                            )}
                            onRemove={() => handleRemove(subtask.id)}
                        />
                    ))
                )}
            </div>
        </div>
    )
}

export default SubtasksSection

import React from "react"
import { ModalDateInput, ModalLabel } from "@shared/components/modal"
import DueTimeField from "./DueTimeField"

export interface DueDateTimeRowProps {
    dueDate: string
    onChangeDueDate: (value: string) => void
    dueTime: string
    onChangeDueTime: (value: string) => void
    focusColor: string
}

const DueDateTimeRow: React.FC<DueDateTimeRowProps> = ({
    dueDate,
    onChangeDueDate,
    dueTime,
    onChangeDueTime,
    focusColor,
}) => {
    return (
        <div className="grid grid-cols-2 gap-4">
            <div>
                <ModalLabel>Due Date</ModalLabel>
                <ModalDateInput
                    name="dueDate"
                    value={dueDate}
                    onChange={(e) => onChangeDueDate(e.target.value)}
                    required
                    focusColor={focusColor}
                />
            </div>
            <DueTimeField
                value={dueTime}
                onChange={onChangeDueTime}
                focusColor={focusColor}
            />
        </div>
    )
}

export default DueDateTimeRow

import React from "react"
import { ModalLabel, ModalTimeInput } from "@shared/components/modal"

export interface DueTimeFieldProps {
    value: string
    onChange: (value: string) => void
    focusColor: string
}

const DueTimeField: React.FC<DueTimeFieldProps> = ({ value, onChange, focusColor }) => {
    return (
        <div>
            <ModalLabel>Due Time</ModalLabel>
            <ModalTimeInput
                name="dueTime"
                value={value}
                onChange={(e) => onChange(e.target.value || "23:59")}
                required
                focusColor={focusColor}
            />
        </div>
    )
}

export default DueTimeField

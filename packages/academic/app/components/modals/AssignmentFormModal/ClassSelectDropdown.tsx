import React from "react"
import type { Class } from "@/app/types"
import {
    ModalLabel,
    ModalSelectInput,
    ModalSelectInputOption,
} from "@shared/components/modal"

export interface ClassSelectDropdownProps {
    classes: Class[]
    value: string
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
    focusColor: string
}

const ClassSelectDropdown: React.FC<ClassSelectDropdownProps> = ({ classes, value, onChange, focusColor }) => {
    return (
        <div>
            <ModalLabel>Class</ModalLabel>
            <ModalSelectInput
                name="classId"
                value={value}
                onChange={onChange}
                required
                focusColor={focusColor}
            >
                {classes.map(c => (
                    <ModalSelectInputOption key={c.id} value={c.id}>
                        {c.name}
                    </ModalSelectInputOption>
                ))}
            </ModalSelectInput>
        </div>
    )
}

export default ClassSelectDropdown

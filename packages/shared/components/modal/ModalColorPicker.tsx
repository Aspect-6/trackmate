import React from "react"
import { ModalLabel } from "./ModalLabel"

export interface ModalColorPickerProps {
    colors: readonly string[]
    value: string
    onChange: (color: string) => void
    label?: string
}

export const ModalColorPicker: React.FC<ModalColorPickerProps> = ({
    colors,
    value,
    onChange,
    label = "Color Code"
}) => {
    return (
        <div>
            <ModalLabel>{label}</ModalLabel>
            <div className="color-tile-grid custom-scrollbar-horizontal">
                {colors.map(color => (
                    <div
                        key={color}
                        onClick={() => onChange(color)}
                        className={`color-tile ${value === color ? "selected" : ""}`}
                        style={{ backgroundColor: color }}
                    />
                ))}
            </div>
        </div>
    )
}

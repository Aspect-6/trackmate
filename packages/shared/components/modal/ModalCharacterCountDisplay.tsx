import React from "react"
import { TRACKMATE } from "@shared/styles/colors"

export interface ModalCharacterCountDisplayProps {
    current: number
    max: number
    className?: string
}

export const ModalCharacterCountDisplay: React.FC<ModalCharacterCountDisplayProps> = ({
    current,
    max,
    className = ""
}) => {
    return (
        <div className={`flex justify-end ${className}`.trim()}>
            <span style={{
                fontSize: "10px",
                color: current >= max ? TRACKMATE.TEXT_DANGER : TRACKMATE.TEXT_TERTIARY
            }}>
                {current}/{max}
            </span>
        </div>
    )
}

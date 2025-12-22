import React from 'react'
import type { ClassBoard } from '@/pages/My Classes/types'

const ClassCardColorStrip: React.FC<ClassBoard.Card.ColorStripProps> = ({ color }) => {
    return (
        <div
            className="h-3 w-full"
            style={{ backgroundColor: color }}
        />
    )
}

export default ClassCardColorStrip

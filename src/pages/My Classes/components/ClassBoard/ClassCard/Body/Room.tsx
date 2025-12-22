import React from 'react'
import type { ClassBoard } from '@/pages/My Classes/types'

const ClassCardRoom: React.FC<ClassBoard.Card.Body.RoomProps> = ({ roomNumber }) => {
    return (
        <div className="flex items-center text-sm">
            <span className="w-24 class-detail-label">Room:</span>
            <span className="class-detail-value font-medium">{roomNumber || 'N/A'}</span>
        </div>
    )
}

export default ClassCardRoom

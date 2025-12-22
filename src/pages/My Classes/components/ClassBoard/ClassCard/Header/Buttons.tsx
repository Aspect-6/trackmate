import React from 'react'
import type { ClassBoard } from '@/pages/My Classes/types'
import { Trash2, Edit2 } from 'lucide-react'

const ClassCardButtons: React.FC<ClassBoard.Card.Header.ButtonsProps> = ({ onEdit, onDelete }) => {
    return (
        <div className="flex space-x-2 ml-4 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
            <button
                onClick={onEdit}
                className="p-1 transition-colors"
                title="Edit Class"
            >
                <Edit2 className="w-4 h-4 class-card-icon" />
            </button>
            <button
                onClick={onDelete}
                className="p-1 transition-colors"
                title="Delete Class"
            >
                <Trash2 className="w-4 h-4 class-card-icon delete" />
            </button>
        </div>
    )
}

export default ClassCardButtons

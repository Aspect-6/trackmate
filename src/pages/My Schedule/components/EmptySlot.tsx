import React from 'react'
import { EmptySlotProps } from '@/pages/My Schedule/types'


const EmptySlot: React.FC<EmptySlotProps> = ({ onClick }) => {
    return (
        <div
            onClick={onClick}
            className="p-4 rounded-lg flex flex-col min-h-[200px] cursor-pointer empty-slot"
        >
            <div className="flex-grow flex items-center justify-center">
                <h4 className="font-semibold text-center">
                    Empty Slot<br />
                    <span className="text-xs empty-slot-subtext">Click to add class</span>
                </h4>
            </div>
        </div>
    )
}

export default EmptySlot

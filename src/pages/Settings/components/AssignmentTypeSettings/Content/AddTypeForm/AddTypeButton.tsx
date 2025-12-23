import React from 'react'
import type { AssignmentTypeSettings } from '@/pages/Settings/types'
import { Plus } from 'lucide-react'
import { GLOBAL } from '@/app/styles/colors'

const AddTypeButton: React.FC<AssignmentTypeSettings.Content.AddTypeForm.AddTypeButtonProps> = ({ onClick, children }) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium text-white transition-colors hover:brightness-95"
            style={{
                backgroundColor: GLOBAL.ADDITEM_BUTTON_BG
            }}
        >
            <Plus className="w-4 h-4" />
            {children}
        </button>
    )
}

export default AddTypeButton

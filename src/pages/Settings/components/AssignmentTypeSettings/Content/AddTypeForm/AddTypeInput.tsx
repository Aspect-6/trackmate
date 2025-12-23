import React from 'react'
import type { AssignmentTypeSettings } from '@/pages/Settings/types'
import { SETTINGS } from '@/app/styles/colors'

const AddTypeInput: React.FC<AssignmentTypeSettings.Content.AddTypeForm.AddTypeInputProps> = ({ value, onChange, placeholder = 'Add a new type' }) => {
    return (
        <input
            type="text"
            value={value}
            onChange={e => onChange(e.target.value)}
            placeholder={placeholder}
            className="flex-1 rounded-lg border px-3 py-2"
            style={{ backgroundColor: SETTINGS.CARD_BG, borderColor: SETTINGS.CARD_BORDER, color: SETTINGS.BODY_TEXT }}
        />
    )
}

export default AddTypeInput

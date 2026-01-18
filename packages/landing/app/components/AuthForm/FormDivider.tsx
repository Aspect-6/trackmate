import React from 'react'
import { AUTH } from '@/app/styles/colors'

const FormDivider: React.FC = () => {
    return (
        <div className="flex items-center my-6">
            <div
                className="flex-1 h-px"
                style={{ backgroundColor: AUTH.BORDER_PRIMARY }}
            />
            <span
                className="px-4 text-sm"
                style={{ color: AUTH.TEXT_SECONDARY }}
            >
                or
            </span>
            <div
                className="flex-1 h-px"
                style={{ backgroundColor: AUTH.BORDER_PRIMARY }}
            />
        </div>
    )
}

export default FormDivider

import React from 'react'
import type { DangerZone } from '@/pages/Settings/types'

const DangerZoneRowButton: React.FC<DangerZone.Content.DangerRow.ButtonProps> = ({ onClick, children }) => {
    return (
        <button
            onClick={onClick}
            className="w-[180px] max-sm:w-full py-2.5 px-3.5 rounded-lg font-bold transition-colors inline-flex items-center justify-center"
            style={{
                backgroundColor: 'var(--settings-module-bg)',
                color: 'var(--settings-danger-btn-text)',
                border: '1px solid var(--settings-danger-btn-border)'
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--settings-danger-btn-bg-hover)'
                e.currentTarget.style.color = 'var(--settings-danger-btn-text-hover)'
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--settings-module-bg)'
                e.currentTarget.style.color = 'var(--settings-danger-btn-text)'
            }}
        >
            {children}
        </button>
    )
}

export default DangerZoneRowButton

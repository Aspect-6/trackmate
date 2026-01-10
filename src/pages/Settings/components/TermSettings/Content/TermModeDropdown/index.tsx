import React from 'react'
import { useAcademicTerms } from '@/app/hooks/entities'
import type { TermSettings } from '@/pages/Settings/types'
import type { TermMode } from '@/app/types'
import { SETTINGS } from '@/app/styles/colors'

const TermModeDropdown: React.FC<TermSettings.Content.TermModeDropdown.Props> = ({
    className,
    children,
    messages
}) => {
    const { termMode, setTermMode } = useAcademicTerms()

    return (
        <div className={className}>
            <select
                value={termMode}
                onChange={(e) => setTermMode(e.target.value as TermMode)}
                className="app-select-dropdown"
            >
                {children}
            </select>
            <span className="text-sm opacity-60 block mt-1.5 ml-2" style={{ color: SETTINGS.TEXT_SECONDARY }}>
                {messages[termMode]}
            </span>
        </div>
    )
}

export default TermModeDropdown

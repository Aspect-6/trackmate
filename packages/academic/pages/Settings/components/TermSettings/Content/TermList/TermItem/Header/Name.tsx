import React from 'react'
import type { TermSettings } from '@/pages/Settings/types'
import { Calendar } from 'lucide-react'
import { GLOBAL } from '@/app/styles/colors'

const TermItemHeaderName: React.FC<TermSettings.Content.TermList.TermItem.Header.NameProps> = ({ children }) => {
    return (
        <div className="flex items-center gap-2 text-base sm:text-lg font-semibold">
            <Calendar size={18} style={{ color: GLOBAL.GLOBAL_ACCENT }} />
            <span>{children}</span>
        </div>
    )
}

export default TermItemHeaderName

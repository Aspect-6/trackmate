import React from 'react'
import { Mail } from 'lucide-react'
import { AUTH } from '@/app/styles/colors'
import type { LinkedAccountsSection } from '@/pages/Account/types'

const EmailPasswordRow: React.FC<LinkedAccountsSection.Content.EmailPasswordRowProps> = ({ isActive, email }) => {
    return (
        <div
            className="p-5 rounded-xl mb-4"
            style={{
                backgroundColor: AUTH.BACKGROUND_TERTIARY,
                border: `1px solid ${AUTH.BORDER_PRIMARY}`,
            }}
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: isActive ? AUTH.BACKGROUND_QUATERNARY : AUTH.BACKGROUND_QUATERNARY }}
                    >
                        <Mail size={20} style={{ color: isActive ? AUTH.GLOBAL_ACCENT : AUTH.TEXT_SECONDARY }} />
                    </div>
                    <div>
                        <p className="font-medium" style={{ color: AUTH.TEXT_PRIMARY }}>Email & Password</p>
                        <p className="text-sm" style={{ color: AUTH.TEXT_SECONDARY }}>
                            {isActive ? email : 'Not set up'}
                        </p>
                    </div>
                </div>
                {isActive ? (
                    <span
                        className="px-3 py-1 rounded-full text-xs font-medium"
                        style={{
                            backgroundColor: 'rgba(34, 197, 94, 0.15)',
                            color: '#22c55e',
                        }}
                    >
                        Active
                    </span>
                ) : (
                    <span
                        className="px-3 py-1 rounded-full text-xs font-medium"
                        style={{
                            backgroundColor: AUTH.BACKGROUND_TERTIARY,
                            color: AUTH.TEXT_SECONDARY,
                        }}
                    >
                        Not available
                    </span>
                )}
            </div>
        </div>
    )
}

export default EmailPasswordRow

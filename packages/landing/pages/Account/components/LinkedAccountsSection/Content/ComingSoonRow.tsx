import React from 'react'
import type { LinkedAccountsSection } from '@/pages/Account/types'
import { ACCOUNT } from '@/app/styles/colors'

const ComingSoonRow: React.FC<LinkedAccountsSection.Content.ComingSoonRowProps> = ({
    providerName,
    Icon,
}) => {
    return (
        <div
            className="p-5 rounded-xl opacity-60 mb-4"
            style={{
                backgroundColor: ACCOUNT.BACKGROUND_TERTIARY,
                border: `1px solid ${ACCOUNT.BORDER_PRIMARY}`,
            }}
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: ACCOUNT.BACKGROUND_QUATERNARY }}
                    >
                        <Icon className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="font-medium" style={{ color: ACCOUNT.TEXT_PRIMARY }}>{providerName}</p>
                        <p className="text-sm" style={{ color: ACCOUNT.TEXT_SECONDARY }}>
                            Not connected
                        </p>
                    </div>
                </div>
                <span
                    className="px-3 py-1 rounded-full text-xs font-medium"
                    style={{
                        backgroundColor: ACCOUNT.BACKGROUND_QUATERNARY,
                        color: ACCOUNT.TEXT_SECONDARY,
                    }}
                >
                    Coming Soon
                </span>
            </div>
        </div>
    )
}

export default ComingSoonRow

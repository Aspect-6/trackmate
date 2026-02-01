import React from 'react'
import type { LinkedAccountsSection } from '@/pages/Account/types'
import { ACCOUNT } from '@/app/styles/colors'

const ProviderRow: React.FC<LinkedAccountsSection.Content.ProviderRowProps> = ({
    title,
    description,
    icon,
    iconBackgroundColor = ACCOUNT.BACKGROUND_QUATERNARY,
    action,
}) => {
    return (
        <div
            className="p-5 rounded-xl mb-4"
            style={{
                backgroundColor: ACCOUNT.BACKGROUND_TERTIARY,
                border: `1px solid ${ACCOUNT.BORDER_PRIMARY}`,
            }}
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: iconBackgroundColor }}
                    >
                        {icon}
                    </div>
                    <div>
                        <p className="font-medium" style={{ color: ACCOUNT.TEXT_PRIMARY }}>{title}</p>
                        <div className="text-sm" style={{ color: ACCOUNT.TEXT_SECONDARY }}>
                            {description}
                        </div>
                    </div>
                </div>
                {action}
            </div>
        </div>
    )
}

export default ProviderRow

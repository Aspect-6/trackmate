import React, { useState } from 'react'
import { Hash, Copy, Check } from 'lucide-react'
import { AUTH } from '@/app/styles/colors'
import type { ProfileSection } from '@/pages/Account/types'

const AccountIdRow: React.FC<ProfileSection.Content.AccountIdRowProps> = ({
    userId,
}) => {
    const [copied, setCopied] = useState(false)

    const handleCopy = () => {
        navigator.clipboard.writeText(userId)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div
            className="p-5 rounded-xl"
            style={{
                backgroundColor: AUTH.BACKGROUND_TERTIARY,
                border: `1px solid ${AUTH.BORDER_PRIMARY}`,
            }}
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: AUTH.BACKGROUND_QUATERNARY }}
                    >
                        <Hash size={20} style={{ color: AUTH.GLOBAL_ACCENT }} />
                    </div>
                    <div>
                        <p className="text-sm" style={{ color: AUTH.TEXT_SECONDARY }}>Account ID</p>
                        <p className="font-mono text-sm break-all pr-2" style={{ color: AUTH.TEXT_PRIMARY }}>{userId}</p>
                    </div>
                </div>
                <button
                    onClick={handleCopy}
                    className="p-2 rounded-lg transition-all hover:opacity-80"
                    style={{
                        backgroundColor: copied ? 'rgba(34, 197, 94, 0.15)' : undefined,
                        color: copied ? '#22c55e' : AUTH.TEXT_PRIMARY,
                    }}
                    title={copied ? 'Copied!' : 'Copy to clipboard'}
                >
                    {copied ? <Check size={18} /> : <Copy size={18} />}
                </button>
            </div>
        </div>
    )
}

export default AccountIdRow

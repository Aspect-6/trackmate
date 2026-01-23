import React from 'react'
import { ShieldCheck } from 'lucide-react'
import { AUTH } from '@/app/styles/colors'
import type { SecuritySection } from '@/pages/Account/types'

const EmailVerificationRow: React.FC<SecuritySection.Content.EmailVerificationRowProps> = ({
    isVerified,
    verificationSent,
    verificationError,
    onResend,
}) => {
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
                        style={{ backgroundColor: isVerified ? 'rgba(34, 197, 94, 0.15)' : AUTH.BACKGROUND_QUATERNARY }}
                    >
                        <ShieldCheck size={20} style={{ color: isVerified ? '#22c55e' : AUTH.GLOBAL_ACCENT }} />
                    </div>
                    <div>
                        <p className="text-sm" style={{ color: AUTH.TEXT_SECONDARY }}>Email Verification</p>
                        <p className="font-medium" style={{ color: isVerified ? '#22c55e' : AUTH.TEXT_PRIMARY }}>
                            {isVerified ? 'Verified' : 'Not verified'}
                        </p>
                    </div>
                </div>
                {!isVerified && (
                    <button
                        onClick={onResend}
                        className="px-4 py-2 rounded-lg text-sm font-medium transition-opacity hover:opacity-80"
                        style={{
                            backgroundColor: AUTH.GLOBAL_ACCENT,
                            color: '#fff',
                        }}
                    >
                        Resend Email
                    </button>
                )}
                {isVerified && (
                    <span
                        className="px-3 py-1 rounded-full text-xs font-medium"
                        style={{
                            backgroundColor: 'rgba(34, 197, 94, 0.15)',
                            color: '#22c55e',
                        }}
                    >
                        Secured
                    </span>
                )}
            </div>
            {verificationSent && (
                <p className="text-sm mt-3" style={{ color: '#22c55e' }}>Verification email sent! Check your inbox.</p>
            )}
            {verificationError && (
                <p className="text-sm mt-3" style={{ color: AUTH.TEXT_DANGER }}>{verificationError}</p>
            )}
        </div>
    )
}

export default EmailVerificationRow

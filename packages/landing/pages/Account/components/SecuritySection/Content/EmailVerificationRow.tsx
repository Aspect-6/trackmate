import React from 'react'
import { ShieldCheck } from 'lucide-react'
import type { SecuritySection } from '@/pages/Account/types'
import { ACCOUNT } from '@/app/styles/colors'

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
                backgroundColor: ACCOUNT.BACKGROUND_TERTIARY,
                border: `1px solid ${ACCOUNT.BORDER_PRIMARY}`,
            }}
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: isVerified ? ACCOUNT.TEXT_SUCCESS_15 : ACCOUNT.BACKGROUND_QUATERNARY }}
                    >
                        <ShieldCheck size={20} style={{ color: isVerified ? ACCOUNT.TEXT_SUCCESS : ACCOUNT.GLOBAL_ACCENT }} />
                    </div>
                    <div>
                        <p className="text-sm" style={{ color: ACCOUNT.TEXT_SECONDARY }}>Email Verification</p>
                        <p className="font-medium" style={{ color: isVerified ? ACCOUNT.TEXT_SUCCESS : ACCOUNT.TEXT_PRIMARY }}>
                            {isVerified ? 'Verified' : 'Not verified'}
                        </p>
                    </div>
                </div>
                {!isVerified && (
                    <button
                        onClick={onResend}
                        className="px-4 py-2 rounded-lg text-sm font-medium transition-opacity hover:opacity-80"
                        style={{
                            backgroundColor: ACCOUNT.GLOBAL_ACCENT,
                            color: ACCOUNT.TEXT_PRIMARY,
                        }}
                    >
                        Resend Email
                    </button>
                )}
                {isVerified && (
                    <span
                        className="px-3 py-1 rounded-full text-xs font-medium"
                        style={{
                            backgroundColor: ACCOUNT.TEXT_SUCCESS_15,
                            color: ACCOUNT.TEXT_SUCCESS,
                        }}
                    >
                        Secured
                    </span>
                )}
            </div>
            {verificationSent && (
                <p className="text-sm mt-3" style={{ color: ACCOUNT.TEXT_SUCCESS }}>Verification email sent! Check your inbox.</p>
            )}
            {verificationError && (
                <p className="text-sm mt-3" style={{ color: ACCOUNT.TEXT_DANGER }}>{verificationError}</p>
            )}
        </div>
    )
}

export default EmailVerificationRow

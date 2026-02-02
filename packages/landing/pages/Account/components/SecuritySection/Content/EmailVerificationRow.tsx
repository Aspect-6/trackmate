import React from "react"
import type { SecuritySection } from "@/pages/Account/types"
import { ShieldCheck, Check } from "lucide-react"
import { Button } from "@/app/components/Button"
import { ACCOUNT } from "@/app/styles/colors"

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
                        style={{ backgroundColor: ACCOUNT.BACKGROUND_QUATERNARY }}
                    >
                        <ShieldCheck size={20} style={{ color: ACCOUNT.GLOBAL_ACCENT }} />
                    </div>
                    <div>
                        <p className="text-sm" style={{ color: ACCOUNT.TEXT_SECONDARY }}>Email Verification</p>
                        <p className="font-medium" style={{ color: isVerified ? ACCOUNT.TEXT_SUCCESS : ACCOUNT.TEXT_PRIMARY }}>
                            {isVerified ? "Verified" : "Not verified"}
                        </p>
                    </div>
                </div>
                {!isVerified && (
                    <Button
                        variant="primary"
                        onClick={onResend}
                        className="px-4 py-2"
                    >
                        Resend Email
                    </Button>
                )}
                {isVerified && (
                    <div
                        className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{
                            backgroundColor: ACCOUNT.GLOBAL_ACCENT_15,
                        }}
                    >
                        <Check size={16} strokeWidth={3} style={{ color: ACCOUNT.GLOBAL_ACCENT }} />
                    </div>
                )}
            </div>
            {verificationSent && (
                <p className="text-sm mt-3" style={{ color: ACCOUNT.GLOBAL_ACCENT }}>Verification email sent! Check your inbox.</p>
            )}
            {verificationError && (
                <p className="text-sm mt-3" style={{ color: ACCOUNT.TEXT_DANGER }}>{verificationError}</p>
            )}
        </div>
    )
}

export default EmailVerificationRow

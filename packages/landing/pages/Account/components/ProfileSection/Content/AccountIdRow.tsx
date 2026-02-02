import React, { useState } from "react"
import type { ProfileSection } from "@/pages/Account/types"
import { Hash, Copy, Check } from "lucide-react"
import { Button } from "@/app/components/Button"
import { ACCOUNT } from "@/app/styles/colors"

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
                        <Hash size={20} style={{ color: ACCOUNT.GLOBAL_ACCENT }} />
                    </div>
                    <div>
                        <p className="text-sm" style={{ color: ACCOUNT.TEXT_SECONDARY }}>Account ID</p>
                        <p className="font-mono text-sm break-all pr-2" style={{ color: ACCOUNT.TEXT_PRIMARY }}>{userId}</p>
                    </div>
                </div>
                <Button
                    variant="icon"
                    onClick={handleCopy}
                    className="p-2"
                    title={copied ? "Copied!" : "Copy to clipboard"}
                    style={{
                        backgroundColor: copied ? ACCOUNT.TEXT_SUCCESS_15 : undefined,
                        color: copied ? ACCOUNT.TEXT_SUCCESS : ACCOUNT.TEXT_PRIMARY,
                    }}
                >
                    {copied ? <Check size={18} /> : <Copy size={18} />}
                </Button>
            </div>
        </div>
    )
}

export default AccountIdRow

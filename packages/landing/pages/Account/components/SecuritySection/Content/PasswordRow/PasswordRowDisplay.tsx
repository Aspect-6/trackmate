import React from "react"
import type { SecuritySection } from "@/pages/Account/types"
import { Lock, Pencil } from "lucide-react"
import { Button } from "@/app/components/Button"
import { ACCOUNT } from "@/app/styles/colors"

export const PasswordRowDisplay: React.FC<SecuritySection.Content.PasswordRow.DisplayProps> = ({
    hasPassword,
    onEditStart,
}) => {
    return (
        <div className="flex items-center justify-between gap-4">
            <div className="flex items-start gap-4 flex-1 min-w-0">
                <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: hasPassword ? ACCOUNT.BACKGROUND_QUATERNARY : ACCOUNT.BACKGROUND_QUATERNARY }}
                >
                    <Lock size={20} style={{ color: hasPassword ? ACCOUNT.GLOBAL_ACCENT : ACCOUNT.TEXT_SECONDARY }} />
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-sm" style={{ color: ACCOUNT.TEXT_SECONDARY }}>Password</p>
                    {!hasPassword ? (
                        <p className="text-sm" style={{ color: ACCOUNT.TEXT_SECONDARY }}>
                            Not available — Must sign up with email and password to use this feature
                        </p>
                    ) : (
                        <p className="font-medium" style={{ color: ACCOUNT.TEXT_PRIMARY }}>••••••••</p>
                    )}
                </div>
            </div>
            {hasPassword && (
                <Button
                    variant="icon"
                    onClick={onEditStart}
                    className="p-2"
                    title="Change password"
                >
                    <Pencil size={18} />
                </Button>
            )}
        </div>
    )
}

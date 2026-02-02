import React from "react"
import type { DataSection } from "@/pages/Account/types"
import { Trash2 } from "lucide-react"
import { Button } from "@/app/components/Button"
import { ACCOUNT } from "@/app/styles/colors"

export const InitialView: React.FC<DataSection.Content.DeleteAccountCard.InitialViewProps> = ({ onInitiateDelete }) => {

    return (
        <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
            <div className="space-y-2 max-w-lg">
                <h4 className="font-semibold text-lg" style={{ color: ACCOUNT.TEXT_PRIMARY }}>
                    Delete Account
                </h4>
                <p className="text-sm leading-relaxed" style={{ color: ACCOUNT.TEXT_SECONDARY }}>
                    Permanently remove your account and all of its contents from the TrackMate platform.
                    This action is <span className="font-medium" style={{ color: ACCOUNT.TEXT_DANGER }}>not reversible</span>,
                    so please continue with caution.
                </p>
            </div>

            <Button
                variant="danger-outline"
                onClick={onInitiateDelete}
                className="group relative px-5 py-2.5 w-full sm:w-auto whitespace-nowrap"
            >
                <Trash2 size={16} className="transition-transform group-hover:scale-110 duration-300 will-change-transform" />
                Delete Account
            </Button>
        </div>
    )
}

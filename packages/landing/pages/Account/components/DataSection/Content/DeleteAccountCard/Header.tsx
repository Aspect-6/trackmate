import React from "react"
import { AlertTriangle } from "lucide-react"
import { ACCOUNT } from "@/app/styles/colors"

export const Header: React.FC = () => (
    <h3 className="text-lg font-semibold mb-6 flex items-center gap-2" style={{ color: ACCOUNT.TEXT_DANGER }}>
        <AlertTriangle size={20} />
        Danger Zone
    </h3>
)
import React from "react"
import { APP_FULL_NAME, CURRENT_APP_VERSION } from "@/app/config/brand"
import { DEVELOPER_NAME } from "@shared/config/brand"

const AppInfoFooter: React.FC = () => {
    return (
        <div id="app-info-footer" className="mt-8 text-center text-gray-500 text-sm">
            <p>{APP_FULL_NAME} (v{CURRENT_APP_VERSION}) – {DEVELOPER_NAME}</p>
        </div>
    )
}

export default AppInfoFooter

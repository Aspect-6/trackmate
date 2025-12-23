import React from 'react'
import { APP_NAME, CURRENT_APP_VERSION, DEVELOPER_NAME } from '@/app/config/brand'

const AppInfoFooter: React.FC = () => {
    return (
        <div className="mt-8 text-center text-gray-500 text-sm">
            <p>{APP_NAME} (v{CURRENT_APP_VERSION}) – {DEVELOPER_NAME}</p>
        </div>
    )
}

export default AppInfoFooter

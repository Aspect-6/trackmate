import React from "react"
import { useSettings } from "@/app/hooks/useSettings"
import { GLOBAL } from "@/app/styles/colors"

interface DataLoaderProps {
    children: React.ReactNode
}

/**
 * Wrapper component that blocks rendering until Firestore data is loaded.
 * This prevents the flash of default/empty state on initial load.
 */
const DataLoader: React.FC<DataLoaderProps> = ({ children }) => {
    const { loading } = useSettings()

    if (loading) {
        return (
            <div className="flex flex-1 items-center justify-center">
                <div 
                    className="animate-spin rounded-full h-8 w-8"
                    style={{ borderBottom: `2px solid ${GLOBAL.TEXT_SECONDARY}` }}
                />
            </div>
        )
    }

    return children
}

export default DataLoader

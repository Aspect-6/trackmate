import React from "react"
import { useSettings } from "@/app/hooks/useSettings"
import { GLOBAL } from "@/app/styles/colors"

interface DataLoaderProps {
    children: React.ReactNode
}

/**
 * Wrapper component that blocks rendering until critical Firestore data is loaded.
 * This prevents the flash of default/empty state on initial load.
 * 
 * Place this inside RequireAuth to ensure user is authenticated before loading data.
 */
const DataLoader: React.FC<DataLoaderProps> = ({ children }) => {
    const { loading } = useSettings()

    if (loading) {
        return (
            <div className="flex flex-1 items-center justify-center">
                <div 
                    className="animate-spin rounded-full h-8 w-8 border-b-2"
                    style={{ borderColor: GLOBAL.TEXT_SECONDARY }}
                />
            </div>
        )
    }

    return <>{children}</>
}

export default DataLoader

import { useEffect, useState, useCallback } from "react"
import { Status } from "@/app/types"

export const useColumnVisibility = (isMobile: boolean) => {
    const [openColumns, setOpenColumns] = useState<Record<Status, boolean>>({
        "To Do": true,
        "In Progress": false,
        "Done": false,
    })

    useEffect(() => {
        if (isMobile) {
            setOpenColumns({
                "To Do": true,
                "In Progress": false,
                "Done": false,
            })
        }
    }, [isMobile])

    const toggleColumn = useCallback(
        (status: Status) => {
            if (!isMobile) return
            setOpenColumns((prev) => ({
                ...prev,
                [status]: !prev[status],
            }))
        },
        [isMobile],
    )

    return { openColumns, toggleColumn }
}


import React from "react"
import { useLocation } from "react-router-dom"
import { useToast } from "@shared/contexts/ToastContext"
import { useModal } from "@/app/contexts/ModalContext"
import { useHover } from "@shared/hooks/ui/useHover"
import { useHeaderAction } from "@/app/hooks/ui/useHeaderAction"
import { useClasses } from "@/app/hooks/entities"
import { Plus } from "lucide-react"
import { getRouteByPath, DEFAULT_ROUTE } from "@/app/config/paths"
import { GLOBAL } from "@/app/styles/colors"

const PageHeader: React.FC = () => {
    const location = useLocation()
    const { openModal } = useModal()
    const { showToast } = useToast()
    const { totalNum: totalClasses, classes } = useClasses()

    const currentRoute = getRouteByPath(location.pathname) ?? DEFAULT_ROUTE

    // Get button config/action
    const addButton = useHeaderAction()

    const { isHovered: isAddHovered, hoverProps: addHoverProps } = useHover()

    return (
        <header className="mb-8 pb-4 flex justify-between items-center gap-3 flex-shrink-0" style={{ borderBottom: `1px solid ${GLOBAL.HEADER_DIVIDER}` }}>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold truncate" style={{ color: GLOBAL.GLOBAL_ACCENT }}>
                {currentRoute.title}
            </h1>
            <button
                onClick={() => {
                    if (addButton.modal === "assignment-kind-chooser") {
                        if (totalClasses === 0) {
                            showToast("Add a class first before adding assignments", "error")
                            return
                        } else if (classes.filter(c => !c.isArchived).length === 0) {
                            showToast("Cannot add assignments without a non-archived class", "error")
                            return
                        }
                    }
                    openModal(addButton.modal)
                }}
                className="flex items-center py-2 px-3 sm:px-4 border border-transparent rounded-lg shadow-sm text-xs sm:text-sm font-medium text-white transition duration-150 ease-in-out whitespace-nowrap flex-shrink-0"
                style={{ backgroundColor: isAddHovered ? addButton.bgHover : addButton.bg }}
                {...addHoverProps}
            >
                <Plus className="w-4 h-4 sm:w-5 sm:h-5 mr-1" />
                <span className="hidden sm:inline">{addButton.label}</span>
                <span className="sm:hidden">Add</span>
            </button>
        </header>
    )
}

export default PageHeader

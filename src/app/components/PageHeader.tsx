import React from 'react'
import { useLocation } from 'react-router-dom'
import { Plus, Menu } from 'lucide-react'
import { useApp } from '@/app/contexts/AppContext'
import { getRouteByPath, DEFAULT_ROUTE } from '@/app/config/paths'
import { GLOBAL } from '@/app/styles/colors'
import { useHeaderAction } from '@/app/hooks/useHeaderAction'
import { useHover } from '@/app/hooks/useHover'

interface PageHeaderProps {
    onMenuClick: () => void
}

const PageHeader: React.FC<PageHeaderProps> = ({ onMenuClick }) => {
    const location = useLocation()
    const { openModal } = useApp()

    // Get current route config for page title
    const currentRoute = getRouteByPath(location.pathname) ?? DEFAULT_ROUTE

    // Get button config/action
    const addButton = useHeaderAction()

    // Hover states
    const { isHovered: isMenuHovered, hoverProps: menuHoverProps } = useHover()
    const { isHovered: isAddHovered, hoverProps: addHoverProps } = useHover()

    return (
        <header className="mb-8 pb-4 flex justify-between items-center gap-3 flex-shrink-0" style={{ borderBottom: `1px solid ${GLOBAL.HEADER_DIVIDER}` }}>
            <div className="flex items-center min-w-0 gap-3">
                <button
                    onClick={onMenuClick}
                    className="lg:hidden focus:outline-none transition-colors -ml-2"
                    style={{ color: isMenuHovered ? GLOBAL.HEADER_MENU_ICON_HOVER : GLOBAL.HEADER_MENU_ICON }}
                    {...menuHoverProps}
                >
                    <Menu className="w-7 h-7" />
                </button>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold truncate" style={{ color: GLOBAL.PAGE_HEADER_TEXT }}>
                    {currentRoute.title}
                </h1>
            </div>
            <button
                onClick={() => openModal(addButton.modal)}
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

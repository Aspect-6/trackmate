import React from 'react'
import { ArrowLeft, User, Link2, Lock, Database, LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { AUTH } from '@/app/styles/colors'
import type { ActiveSection } from '@/pages/Account/types'

interface SidebarNavProps {
    activeSection: ActiveSection
    onSectionChange: (section: ActiveSection) => void
    onSignOut: () => void
    onLinkClick?: () => void
    className?: string
}

const navItems: Array<{ id: ActiveSection; label: string; icon: typeof User }> = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'linked', label: 'Linked Accounts', icon: Link2 },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'data', label: 'Your Data', icon: Database },
]

const SidebarNav: React.FC<SidebarNavProps> = ({
    activeSection,
    onSectionChange,
    onSignOut,
    onLinkClick,
    className
}) => {
    const navigate = useNavigate()

    return (
        <div className={`flex flex-col h-full ${className || ''}`}>
            <div className="flex-grow space-y-2 px-4 py-2">
                {navItems.map(({ id, label, icon: Icon }) => {
                    const isActive = activeSection === id
                    return (
                        <button
                            key={id}
                            onClick={() => {
                                onSectionChange(id)
                                onLinkClick?.()
                            }}
                            className={`w-full flex items-center p-3 rounded-lg font-medium transition duration-150 ${isActive ? "text-white" : ""}`}
                            style={{
                                backgroundColor: isActive ? AUTH.GLOBAL_ACCENT : 'transparent',
                                color: isActive ? '#fff' : AUTH.TEXT_PRIMARY,
                            }}
                            onMouseEnter={(e) => {
                                if (!isActive) e.currentTarget.style.backgroundColor = AUTH.BACKGROUND_QUATERNARY
                            }}
                            onMouseLeave={(e) => {
                                if (!isActive) e.currentTarget.style.backgroundColor = 'transparent'
                            }}
                        >
                            <Icon className="w-5 h-5 mr-3" />
                            {label}
                        </button>
                    )
                })}
            </div>

            <div className="flex-shrink-0 px-4">
                <div className="mb-2" style={{ borderBottom: `1px solid ${AUTH.BORDER_PRIMARY}` }}></div>
                <button
                    onClick={() => {
                        navigate('/landing')
                        onLinkClick?.()
                    }}
                    className="w-full flex items-center p-3 rounded-lg font-medium transition duration-150"
                    style={{ color: AUTH.TEXT_PRIMARY }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = AUTH.BACKGROUND_QUATERNARY}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                    <ArrowLeft className="w-5 h-5 mr-3" />
                    Back to Home
                </button>
                <button
                    onClick={() => {
                        onSignOut()
                        onLinkClick?.()
                    }}
                    className="w-full flex items-center p-3 rounded-lg font-medium transition duration-150"
                    style={{ color: AUTH.TEXT_PRIMARY }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = AUTH.BACKGROUND_QUATERNARY}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                    <LogOut className="w-5 h-5 mr-3" />
                    Sign Out
                </button>
            </div>
        </div>
    )
}

export default SidebarNav

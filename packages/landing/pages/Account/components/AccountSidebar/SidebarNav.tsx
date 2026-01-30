import { ArrowLeft, User, Link2, Lock, Database, LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import type { AccountSidebar, ActiveSection } from '@/pages/Account/types'
import { AUTH } from '@/app/styles/colors'
import { SidebarTab } from '@shared/components/Sidebar'

const navItems: Array<{ id: ActiveSection; label: string; icon: typeof User }> = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'linked', label: 'Linked Accounts', icon: Link2 },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'data', label: 'Your Data', icon: Database },
]

const SidebarNav: React.FC<AccountSidebar.SidebarNavProps> = ({
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
                        <SidebarTab
                            key={id}
                            label={label}
                            icon={Icon}
                            onClick={() => {
                                onSectionChange(id)
                                onLinkClick?.()
                            }}
                            isActive={isActive}
                            accentColor={AUTH.GLOBAL_ACCENT}
                            hoverColor={AUTH.BACKGROUND_QUATERNARY}
                        />
                    )
                })}
            </div>

            <div className="flex-shrink-0 px-4 space-y-2 pb-6">
                <div className="mb-2" style={{ borderBottom: `1px solid ${AUTH.BORDER_PRIMARY}` }}></div>
                <SidebarTab
                    label="Back to Home"
                    icon={ArrowLeft}
                    onClick={() => {
                        navigate('/landing')
                        onLinkClick?.()
                    }}
                    isActive={false}
                    accentColor={AUTH.GLOBAL_ACCENT}
                    hoverColor={AUTH.BACKGROUND_QUATERNARY}
                />
                <SidebarTab
                    label="Sign Out"
                    icon={LogOut}
                    onClick={() => {
                        onSignOut()
                        onLinkClick?.()
                    }}
                    isActive={false}
                    accentColor={AUTH.GLOBAL_ACCENT}
                    hoverColor={AUTH.BACKGROUND_QUATERNARY}
                />
            </div>
        </div>
    )
}

export default SidebarNav

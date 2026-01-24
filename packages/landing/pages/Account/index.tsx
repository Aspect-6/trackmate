import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Menu } from 'lucide-react'
import { useCurrentUser } from '@/app/hooks/useCurrentUser'
import { signOutUser } from '@/app/lib/auth'
import { AUTH } from '@/app/styles/colors'

import type { ActiveSection } from './types'
import AccountSidebar from './components/AccountSidebar'
import ProfileSection from './components/ProfileSection'
import LinkedAccountsSection from './components/LinkedAccountsSection'
import SecuritySection from './components/SecuritySection'
import DataSection from './components/DataSection'

const Account: React.FC = () => {
    const { user, loading: userLoading } = useCurrentUser()
    const navigate = useNavigate()
    const [activeSection, setActiveSection] = useState<ActiveSection>('profile')
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    useEffect(() => {
        if (!userLoading && !user) {
            navigate('/sign-in', { replace: true })
        }
    }, [user, userLoading, navigate])

    if (userLoading) {
        return (
            <div className="min-h-dvh flex items-center justify-center" style={{ backgroundColor: AUTH.BACKGROUND_PRIMARY }}>
                <p style={{ color: AUTH.TEXT_SECONDARY }}>Loading...</p>
            </div>
        )
    }

    if (!user) return null

    const handleSignOut = async () => {
        await signOutUser()
        navigate('/landing')
    }

    return (
        <div className="min-h-dvh flex flex-col lg:flex-row" style={{ backgroundColor: AUTH.BACKGROUND_PRIMARY }}>
            {/* Mobile Header */}
            <div className="lg:hidden p-4 flex items-center border-b" style={{ borderColor: AUTH.BORDER_PRIMARY }}>
                <button
                    onClick={() => setIsMobileMenuOpen(true)}
                    className="p-2 -ml-2 rounded-md hover:bg-gray-800 transition-colors"
                    style={{ color: AUTH.TEXT_PRIMARY }}
                >
                    <Menu className="w-6 h-6" />
                </button>
            </div>

            {/* Desktop Sidebar */}
            <AccountSidebar
                activeSection={activeSection}
                onSectionChange={setActiveSection}
                onSignOut={handleSignOut}
            />

            {/* Mobile Sidebar */}
            <AccountSidebar
                isMobile
                isOpen={isMobileMenuOpen}
                onClose={() => setIsMobileMenuOpen(false)}
                activeSection={activeSection}
                onSectionChange={(section) => {
                    setActiveSection(section)
                    setIsMobileMenuOpen(false)
                }}
                onSignOut={handleSignOut}
            />

            <main className="flex-1 px-6 py-8 lg:p-10">
                {activeSection === 'profile' && <ProfileSection />}
                {activeSection === 'linked' && <LinkedAccountsSection />}
                {activeSection === 'security' && <SecuritySection />}
                {activeSection === 'data' && <DataSection />}
            </main>
        </div>
    )
}

export default Account

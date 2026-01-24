import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Menu } from 'lucide-react'
import { useCurrentUser } from '@shared/hooks/useCurrentUser'
import { useToast } from '@shared/contexts/ToastContext'
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
    const { showToast } = useToast()
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()

    // Initialize active section from URL or default to 'profile'
    const tabParam = searchParams.get('tab')
    const validSections: ActiveSection[] = ['profile', 'linked', 'security', 'data']
    const initialSection = (tabParam && validSections.includes(tabParam as ActiveSection))
        ? (tabParam as ActiveSection)
        : 'profile'

    const [activeSection, setActiveSection] = useState<ActiveSection>(initialSection)

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    useEffect(() => {
        if (!userLoading && !user) {
            navigate('/sign-in', { replace: true })
        }
    }, [user, userLoading, navigate])

    // Check for verification requirement redirect
    useEffect(() => {
        if (searchParams.get('verificationRequired') === 'true') {
            showToast('Please verify your email before accessing the application', 'error')
            // Remove the param to avoid showing toast again on refresh/nav
            setSearchParams(params => {
                params.delete('verificationRequired')
                return params
            }, { replace: true })
        }
    }, [searchParams, setSearchParams, showToast])

    useEffect(() => {
        setSearchParams(params => {
            params.set('tab', activeSection)
            return params
        }, { replace: true })
    }, [activeSection, setSearchParams])

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
            <div className="lg:hidden p-4 flex items-center border-b" style={{ borderColor: AUTH.BORDER_PRIMARY }}>
                <button
                    onClick={() => setIsMobileMenuOpen(true)}
                    className="p-2 -ml-2 rounded-md hover:bg-gray-800 transition-colors"
                    style={{ color: AUTH.TEXT_PRIMARY }}
                >
                    <Menu className="w-6 h-6" />
                </button>
            </div>

            <AccountSidebar
                activeSection={activeSection}
                onSectionChange={setActiveSection}
                onSignOut={handleSignOut}
            />

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

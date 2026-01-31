import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom'
import { useAuth } from '@shared/contexts/AuthContext'
import { useToast } from '@shared/contexts/ToastContext'
import { useRedirect } from '@shared/hooks/useRedirect'
import { signOutUser } from '@/app/lib/auth'
import { AUTH } from '@/app/styles/colors'
import TrackMateLogo from '@shared/components/TrackMateLogo'
import type { ActiveSection } from './types'
import AccountSidebar from './components/AccountSidebar'
import ProfileSection from './components/ProfileSection'
import LinkedAccountsSection from './components/LinkedAccountsSection'
import SecuritySection from './components/SecuritySection'
import DataSection from './components/DataSection'
import { BRAND_NAME } from '@shared/config/brand'
import FloatingMenuButton from '@shared/components/FloatingMenuButton'

const Account: React.FC = () => {
    const { user, loading: userLoading } = useAuth()
    const { showToast } = useToast()
    const navigate = useNavigate()
    const redirect = useRedirect()
    const location = useLocation()
    const [searchParams, setSearchParams] = useSearchParams()

    // Initialize active section from URL or default to 'profile'
    const tabParam = searchParams.get('tab')
    const validSections: ActiveSection[] = ['profile', 'linked', 'security', 'data']
    const initialSection = (tabParam && validSections.includes(tabParam as ActiveSection))
        ? (tabParam as ActiveSection)
        : 'profile'

    const [activeSection, setActiveSection] = useState<ActiveSection>(initialSection)

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    // Redirect to sign-in with return URL if not authenticated
    useEffect(() => {
        if (!userLoading && !user) {
            const currentPath = `${location.pathname}${location.search}${location.hash}`
            redirect(`/sign-in?redirect=${encodeURIComponent(currentPath)}`)
        }
    }, [user, userLoading, redirect, location])

    // Check for verification requirement redirect
    useEffect(() => {
        if (searchParams.get('verificationRequired') === 'true') {
            showToast('Please verify your email before accessing the application', 'error')
            setSearchParams(params => {
                params.delete('verificationRequired')
                return params
            }, { replace: true })
        }
    }, [searchParams, setSearchParams, showToast])

    useEffect(() => {
        if (searchParams.get('tab') !== activeSection) {
            setSearchParams(params => {
                params.set('tab', activeSection)
                return params
            }, { replace: true })
        }
    }, [activeSection, searchParams, setSearchParams])

    if (userLoading) {
        return (
            <div className="min-h-dvh flex flex-col items-center justify-center" style={{ backgroundColor: AUTH.BACKGROUND_PRIMARY }}>
                <TrackMateLogo size={100} showBackground={false} crop className='mr-2 mb-4' />
                <h1 className="text-3xl font-bold" style={{ color: AUTH.TEXT_SECONDARY }}>
                    {BRAND_NAME}
                </h1>
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

            <FloatingMenuButton
                onClick={() => setIsMobileMenuOpen(prev => !prev)}
                isOpen={isMobileMenuOpen}
                backgroundColor={AUTH.GLOBAL_ACCENT}
                hoverColor={AUTH.GLOBAL_ACCENT}
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

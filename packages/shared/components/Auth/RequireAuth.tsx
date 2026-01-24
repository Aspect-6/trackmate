import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '@shared/contexts/AuthContext'

interface RequireAuthProps {
    redirectTo?: string
    requireEmailVerification?: boolean
    unverifiedRedirectTo?: string
}

/**
 * Route guard that ensures a user is authenticated.
 * Redirects to the login page (default /sign-in) if no user is found.
 */
const RequireAuth: React.FC<RequireAuthProps> = ({
    redirectTo = '/sign-in',
    requireEmailVerification = false,
    unverifiedRedirectTo = '/account?tab=security'
}) => {
    const { user, loading } = useAuth()
    const location = useLocation()

    if (loading) {
        return (
            <div className="flex h-screen w-screen items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
        )
    }

    if (!user) {
        const isCrossSpaRedirect = location.pathname.startsWith('/academic') && !redirectTo.startsWith('/academic')

        if (redirectTo.startsWith('http') || isCrossSpaRedirect) {
            window.location.replace(redirectTo)
            return null
        }
        return <Navigate to={redirectTo} state={{ from: location }} replace />
    }

    if (requireEmailVerification && !user.emailVerified) {
        // Redirect to security page if email is not verified
        const to = `${unverifiedRedirectTo}${unverifiedRedirectTo.includes('?') ? '&' : '?'}verificationRequired=true`

        // Check for cross-SPA redirect
        const isCrossSpaRedirect = location.pathname.startsWith('/academic') && !to.startsWith('/academic')

        // Handle cross-app potential for unverified redirect
        if (to.startsWith('http') || isCrossSpaRedirect) {
            window.location.replace(to)
            return null
        }

        return <Navigate to={to} replace />
    }

    return <Outlet />
}

export default RequireAuth

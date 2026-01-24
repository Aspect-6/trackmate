import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useCurrentUser } from '../../hooks/useCurrentUser'

interface RequireAuthProps {
    redirectTo?: string
}

/**
 * Route guard that ensures a user is authenticated.
 * Redirects to the login page (default /sign-in) if no user is found.
 */
const RequireAuth: React.FC<RequireAuthProps> = ({ redirectTo = '/sign-in' }) => {
    const { user, loading } = useCurrentUser()
    const location = useLocation()

    if (loading) {
        return (
            <div className="flex h-screen w-screen items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
        )
    }

    if (!user) {
        // If redirectTo is a full URL (cross-origin/cross-port), we must use window.location
        if (redirectTo.startsWith('http')) {
            // Render nothing or a loading state while we redirect
            // Application code should handle the redirect effect
            // We can't use Navigate for external links
            // We use a small inline component to trigger the window location change
            return <ExternalRedirect to={redirectTo} />
        }

        // Redirect to login page, but save the current location they were trying to go to
        // so we can redirect them back after they login
        return <Navigate to={redirectTo} state={{ from: location }} replace />
    }

    return <Outlet />
}

const ExternalRedirect: React.FC<{ to: string }> = ({ to }) => {
    React.useEffect(() => {
        window.location.replace(to)
    }, [to])
    return null
}

export default RequireAuth

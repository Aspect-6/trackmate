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
        const isCrossSpaRedirect = location.pathname.startsWith('/academic') && !redirectTo.startsWith('/academic')
        
        if (redirectTo.startsWith('http') || isCrossSpaRedirect) {
            window.location.replace(redirectTo)
            return null
        }
        return <Navigate to={redirectTo} state={{ from: location }} replace />
    }

    return <Outlet />
}

export default RequireAuth

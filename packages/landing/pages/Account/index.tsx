import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCurrentUser } from '@/app/hooks/useCurrentUser'
import { AUTH } from '@/app/styles/colors'

const Account: React.FC = () => {
    const { user, loading } = useCurrentUser()
    const navigate = useNavigate()

    useEffect(() => {
        if (!loading && !user) {
            navigate('/sign-in', { replace: true })
        }
    }, [user, loading, navigate])

    if (loading) {
        return (
            <div className="min-h-dvh flex items-center justify-center">
                <p style={{ color: AUTH.TEXT_SECONDARY }}>Loading...</p>
            </div>
        )
    }

    if (!user) {
        return null
    }

    return (
        <div className="min-h-dvh flex items-center justify-center p-4">
            <div
                className="relative z-10 w-full max-w-md p-8 rounded-2xl shadow-2xl text-center"
                style={{
                    backgroundColor: AUTH.BACKGROUND_SECONDARY,
                    border: `1px solid ${AUTH.BORDER_PRIMARY}`,
                    boxShadow: '0 0 60px rgba(59, 130, 246, 0.15), 0 0 20px rgba(59, 130, 246, 0.04)',
                }}
            >
                <h1
                    className="text-2xl font-bold mb-4"
                    style={{ color: AUTH.TEXT_PRIMARY }}
                >
                    Account
                </h1>
                <p style={{ color: AUTH.TEXT_SECONDARY }}>
                    Signed in as {user.email}
                </p>
            </div>
        </div>
    )
}

export default Account

import React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import VerifyEmailAction from './components/VerifyEmail'
import ResetPasswordAction from './components/ResetPasswordAction'
import { useEffect } from 'react'

type AuthAction = 'verifyEmail' | 'resetPassword' | 'verifyAndChangeEmail'

const AuthAction: React.FC = () => {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()

    const mode = searchParams.get('mode') as AuthAction | null
    const oobCode = searchParams.get('oobCode')

    useEffect(() => {
        if (!mode || !oobCode) {
            navigate('/sign-in')
        }
    }, [mode, oobCode, navigate])

    if (!mode || !oobCode) {
        return null
    }

    switch (mode) {
        case 'verifyEmail':
            return <VerifyEmailAction oobCode={oobCode} />
        case 'verifyAndChangeEmail':
            return null
        case 'resetPassword':
            return <ResetPasswordAction oobCode={oobCode} />
        default:
            return null
    }
}

export default AuthAction

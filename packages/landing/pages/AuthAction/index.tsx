import React, { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import VerifyEmailAction from './components/VerifyEmail'
import VerifyAndChangeEmailAction from './components/VerifyAndChangeEmailAction'
import RecoverEmailAction from './components/RecoverEmailAction'
import ResetPasswordAction from './components/ResetPasswordAction'

type AuthAction = 'verifyEmail' | 'resetPassword' | 'verifyAndChangeEmail' | 'recoverEmail'

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
            return <VerifyAndChangeEmailAction oobCode={oobCode} />
        case 'recoverEmail':
            return <RecoverEmailAction oobCode={oobCode} />
        case 'resetPassword':
            return <ResetPasswordAction oobCode={oobCode} />
        default:
            return null
    }
}

export default AuthAction

import React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import VerifyEmailAction from './components/VerifyEmail'
import ResetPasswordAction from './components/ResetPasswordAction'
import { useEffect } from 'react'

type ActionMode = 'verifyEmail' | 'resetPassword' | 'recoverEmail'

const ActionHandler: React.FC = () => {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    
    const mode = searchParams.get('mode') as ActionMode | null
    const oobCode = searchParams.get('oobCode')

    useEffect(() => {
        // Redirect if missing required parameters or unsupported mode
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
        case 'resetPassword':
            return <ResetPasswordAction oobCode={oobCode} />
        case 'recoverEmail':
            return null
        default:
            return null
    }
}

export default ActionHandler

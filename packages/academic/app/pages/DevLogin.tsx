import React from 'react'
import { useNavigate } from 'react-router-dom'
import { signInWithPopup } from 'firebase/auth'
import { auth, googleAuthProvider } from '@shared/lib/firebase'
import { GLOBAL } from '@/app/styles/colors'

const DevLogin: React.FC = () => {
    const navigate = useNavigate()

    const handleLogin = async () => {
        try {
            await signInWithPopup(auth, googleAuthProvider)
            navigate('/academic/dashboard')
        } catch (error) {
            console.error("Dev login failed", error)
            alert("Login failed, check console")
        }
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4" style={{ backgroundColor: GLOBAL.BACKGROUND_PRIMARY, color: GLOBAL.TEXT_PRIMARY }}>
            <h1 className="text-2xl font-bold mb-4">Academic App Dev Login</h1>
            <p className="mb-6 text-center max-w-md" style={{ color: GLOBAL.TEXT_SECONDARY }}>
                This page exists only for local development because auth tokens are not shared across localhost ports.
            </p>
            <button
                onClick={handleLogin}
                className="px-6 py-3 rounded-lg font-medium transition-opacity hover:opacity-90"
                style={{ backgroundColor: GLOBAL.GLOBAL_ACCENT, color: 'white' }}
            >
                Sign in with Google
            </button>
        </div>
    )
}

export default DevLogin

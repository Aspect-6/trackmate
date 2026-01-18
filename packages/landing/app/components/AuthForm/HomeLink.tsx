import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { AUTH } from '@/app/styles/colors'

const HomeLink: React.FC = () => {
    const navigate = useNavigate()
    return (
        <button
            onClick={() => navigate('/landing')}
            className="flex items-center text-left text-sm font-bold mb-6 transition-opacity hover:opacity-80"
            style={{ color: AUTH.TEXT_PRIMARY }}
        >
            <ArrowLeft className="mr-2" size={16} /> Home
        </button>
    )
}

export default HomeLink

import React from 'react'
import { AUTH } from '@/app/styles/colors'
import { ArrowLeft } from 'lucide-react'

const HomeLink: React.FC = () => {
    return (
        <a
            href="/"
            className="flex items-center text-left text-sm font-bold mb-6 transition-opacity hover:opacity-80"
            style={{ color: AUTH.TEXT_PRIMARY }}
        >
            <ArrowLeft className="mr-2" size={16} /> Home
        </a>
    )
}

export default HomeLink

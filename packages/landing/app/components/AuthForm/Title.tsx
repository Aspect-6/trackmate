import React from 'react'
import { BRAND_NAME } from '@shared/config/brand'
import { AUTH } from '@/app/styles/colors'

interface TitleProps {
    children: React.ReactNode
}

const Title: React.FC<TitleProps> = ({ children }) => {
    return (
        <div className="text-center mb-8">
            <h1
                className="text-3xl font-bold tracking-tight"
                style={{ color: AUTH.TEXT_PRIMARY }}
            >
                {BRAND_NAME}
            </h1>
            <p
                className="mt-2 text-sm"
                style={{ color: AUTH.TEXT_SECONDARY }}
            >
                {children}
            </p>
        </div>
    )
}

export default Title

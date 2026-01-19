import React from 'react'
import { LANDING } from '@/app/styles/colors'

interface HeroMessageProps {
    children: React.ReactNode
}

const HeroMessage: React.FC<HeroMessageProps> = ({ children }) => {
    return (
        <p style={{
            fontSize: 'clamp(1.02rem, 2vw, 1.35rem)',
            color: LANDING.TEXT_SECONDARY,
            marginBottom: '3rem',
            lineHeight: 1.6,
        }}>
            {children}
        </p>
    )
}

export default HeroMessage

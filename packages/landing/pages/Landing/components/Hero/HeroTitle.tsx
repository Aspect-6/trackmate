import React from 'react'

interface HeroTitleProps {
    children: React.ReactNode
}

const HeroTitle: React.FC<HeroTitleProps> = ({ children }) => {
    return (
        <h1 style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 700,
            color: 'hsl(0, 0%, 95%)',
            marginBottom: '1rem',
            letterSpacing: '-0.02em',
        }}>
            {children}
        </h1>
    )
}

export default HeroTitle

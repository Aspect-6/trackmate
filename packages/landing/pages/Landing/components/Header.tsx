import React from 'react'

interface HeaderProps {
    children: React.ReactNode
}

const Header: React.FC<HeaderProps> = ({ children }) => {
    return (
        <header style={{
            width: '100%',
            maxWidth: '1200px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: '0.75rem',
            marginBottom: '4rem',
        }}>
            {children}
        </header>
    )
}

export default Header

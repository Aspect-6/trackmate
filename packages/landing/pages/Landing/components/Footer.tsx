import React from 'react'
import { LANDING } from '@/app/styles/colors'

interface FooterProps {
    children: React.ReactNode
}

const Footer: React.FC<FooterProps> = ({ children }) => {
    return (
        <footer style={{
            marginTop: '4rem',
            paddingTop: '2rem',
            borderTop: `1px solid ${LANDING.BORDER_PRIMARY}`,
            width: '100%',
            maxWidth: '1200px',
            textAlign: 'center',
        }}>
            <p style={{
                fontSize: '0.85rem',
                color: LANDING.TEXT_TERTIARY,
            }}>
                {children}
            </p>
        </footer>
    )
}

export default Footer

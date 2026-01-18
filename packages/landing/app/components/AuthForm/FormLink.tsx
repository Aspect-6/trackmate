import React from 'react'
import { useHover } from '@shared/hooks/ui/useHover'
import { AUTH } from '@/app/styles/colors'

interface FormLinkProps {
    href: string
    children: React.ReactNode
}

const FormLink: React.FC<FormLinkProps> = ({ href, children }) => {
    const { isHovered, hoverProps } = useHover()

    return (
        <a
            href={href}
            className="font-medium transition-all duration-200"
            style={{
                color: AUTH.FOCUS_COLOR,
                filter: isHovered ? 'brightness(1.2)' : 'none',
                textDecoration: isHovered ? 'underline' : 'none',
            }}
            {...hoverProps}
        >
            {children}
        </a>
    )
}

export default FormLink

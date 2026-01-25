import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useHover } from '@shared/hooks/ui/useHover'
import { AUTH } from '@/app/styles/colors'

interface FormLinkProps {
    href: string
    children: React.ReactNode
}

const FormLink: React.FC<FormLinkProps> = ({ href, children }) => {
    const { isHovered, hoverProps } = useHover()
    const navigate = useNavigate()

    return (
        <button
            onClick={() => navigate(href)}
            className="font-medium text-sm transition-all duration-200"
            style={{
                color: AUTH.FOCUS_COLOR,
                filter: isHovered ? 'brightness(1.2)' : 'none',
                textDecoration: isHovered ? 'underline' : 'none',
            }}
            {...hoverProps}
        >
            {children}
        </button>
    )
}

export default FormLink

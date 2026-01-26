import React from 'react'
import { AUTH } from '@/app/styles/colors'

interface ContainerProps {
    children: React.ReactNode
}

export const Container: React.FC<ContainerProps> = ({ children }) => (
    <div
        className="relative overflow-hidden rounded-xl border transition-all duration-300 ease-in-out"
        style={{
            backgroundColor: 'rgba(239, 68, 68, 0.03)',
            borderColor: 'rgba(239, 68, 68, 0.2)',
        }}
    >
        <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
                backgroundImage: `repeating-linear-gradient(45deg, ${AUTH.TEXT_DANGER} 0, ${AUTH.TEXT_DANGER} 1px, transparent 0, transparent 50%)`,
                backgroundSize: '10px 10px',
            }}
        />
        <div className="relative p-6 sm:p-8">
            {children}
        </div>
    </div>
)

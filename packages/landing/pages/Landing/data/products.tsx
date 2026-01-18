import React from 'react'
import { GraduationCap } from 'lucide-react'

export interface Product {
    title: string
    description: string
    icon: React.ReactNode
    href: string
    accentColor: string
    comingSoon?: boolean
}

export const PRODUCTS: Product[] = [
    {
        title: 'TrackMate Academic',
        description: 'Manage your classes, assignments, schedules, and academic life all in one place.',
        icon: <GraduationCap className="w-10 h-10" />,
        href: '/academic',
        accentColor: 'hsl(158, 60%, 36%)',
    },
    {
        title: 'TrackMate Projects',
        description: 'Organize long-term projects, milestones, and shared work from start to finish.',
        icon: <GraduationCap className="w-10 h-10" />,
        href: '/',
        accentColor: 'hsl(210, 35%, 41%)',
        comingSoon: true,
    },
]

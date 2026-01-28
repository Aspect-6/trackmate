import React from 'react'
import type { Landing } from '@/pages/Landing/types'
import { LANDING } from '@/app/styles/colors'

const ComingSoonBadge: React.FC<Landing.ProductCard.ComingSoonBadge.Props> = () => {
    return (
        <span
            className="absolute top-4 right-4 text-xs font-semibold px-3 py-1 rounded-full"
            style={{
                backgroundColor: LANDING.BORDER_SECONDARY,
                color: LANDING.TEXT_SECONDARY,
            }}
        >
            Coming Soon
        </span>
    )
}

export default ComingSoonBadge

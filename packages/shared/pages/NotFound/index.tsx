import React from "react"
import { useNavigate } from "react-router-dom"
import { useHover } from "@shared/hooks/ui/useHover"
import { BRAND_NAME } from "@shared/config/brand"
import { TRACKMATE } from "@shared/styles/colors"

interface NotFoundProps {
    text: string
    path: string
    buttonBg: string
    buttonBgHover: string
}

const NotFound: React.FC<NotFoundProps> = ({ text, path, buttonBg, buttonBgHover }) => {
    const navigate = useNavigate()
    const { isHovered: isPrimaryHovered, hoverProps: primaryHoverProps } = useHover()
    const { isHovered: isSecondaryHovered, hoverProps: secondaryHoverProps } = useHover()

    return (
        <div
            className="not-found-page radial-background min-h-dvh flex flex-col items-center justify-center p-8 text-center"
            style={{ backgroundColor: TRACKMATE.WEBPAGE_BACKGROUND }}
        >
            <h1 className="text-5xl sm:text-8xl font-extrabold text-white/80 mb-2 select-none">
                404
            </h1>

            <h2 className="text-2xl sm:text-3xl font-semibold text-white/90 mt-2 mb-3">
                Page Not Found
            </h2>
            <p className="text-base sm:text-lg text-white/50 max-w-md mb-10">
                The page you're looking for doesn't exist or has been moved.
                Let's get you back on track.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
                <button
                    className="py-2.5 px-5 md:py-3.5 md:px-8 rounded-xl font-semibold text-sm transition-all duration-200 cursor-pointer"
                    style={{
                        color: TRACKMATE.TEXT_PRIMARY,
                        backgroundColor: isPrimaryHovered ? buttonBgHover : buttonBg
                    }}
                    onClick={() => navigate(path)}
                    {...primaryHoverProps}
                >
                    {text}
                </button>
                <button
                    className="py-2.5 px-5 md:py-3.5 md:px-8 rounded-xl font-semibold text-sm transition-all duration-200 cursor-pointer"
                    style={{
                        color: TRACKMATE.TEXT_PRIMARY,
                        border: `1px solid ${TRACKMATE.BORDER_SECONDARY}`,
                        backgroundColor: isSecondaryHovered ? TRACKMATE.BACKGROUND_TERTIARY : "transparent"
                    }}
                    onClick={() => navigate(-1)}
                    {...secondaryHoverProps}
                >
                    Go Back
                </button>
            </div>

            <p className="absolute bottom-8 text-sm text-white/30">
                {BRAND_NAME}
            </p>
        </div>
    )
}

export default NotFound

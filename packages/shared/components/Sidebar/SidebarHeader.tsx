import React from "react"

interface SidebarHeaderProps {
    isMobile?: boolean
    brandName: string
    subtitle?: string
    accentColor?: string
    textColor?: string
    borderColor?: string
}

const SidebarHeader: React.FC<SidebarHeaderProps> = ({
    isMobile = false,
    brandName,
    subtitle,
    accentColor,
    textColor,
    borderColor,
}) => {
    return (
        <div
            className={`flex flex-shrink-0 items-center ${isMobile
                ? "justify-between p-6"
                : "px-6 mb-6"
                }`}
            style={{
                borderBottom: `${isMobile ? "1px" : "0px"} solid ${borderColor || "transparent"}`,
            }}
        >
            <div>
                <h1 className="text-2xl font-black" style={{ color: accentColor }}>{brandName}</h1>
                {subtitle && (
                    <p className="text-xs font-bold uppercase tracking-widest mt-1" style={{ color: textColor, opacity: 0.6 }}>
                        {subtitle}
                    </p>
                )}
            </div>
        </div>
    )
}

export default SidebarHeader

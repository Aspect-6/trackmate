import React from "react";

interface LogoProps {
    size?: number | string;
    showBackground?: boolean;
    crop?: boolean;
    color?: string;
    className?: string;
}

const TrackMateLogo: React.FC<LogoProps> = ({
    size = 200,
    showBackground = true,
    crop = false,
    color = "var(--global-accent)",
    className = ""
}) => {
    const viewBox = crop ? "34 25 130 150" : "0 0 200 200";

    return (
        <svg
            width={size}
            height={size}
            viewBox={viewBox}
            className={className}
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="TrackMate Logo"
        >
            <defs>
                <filter id="shadow" x="-20%" y="-20%" width="150%" height="150%">
                    <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
                    <feOffset dx="2" dy="2" result="offsetblur" />
                    <feComponentTransfer>
                        <feFuncA type="linear" slope="0.3" />
                    </feComponentTransfer>
                    <feMerge>
                        <feMergeNode />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            {showBackground && (
                <rect width="200" height="200" fill="white" />
            )}

            <g filter="url(#shadow)">
                <g fill="none" stroke={color} strokeWidth="9" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="43" y="30" width="120" height="140" rx="13" />
                    <line x1="33" y1="55" x2="53" y2="55" />
                    <line x1="33" y1="85" x2="53" y2="85" />
                    <line x1="33" y1="115" x2="53" y2="115" />
                    <line x1="33" y1="145" x2="53" y2="145" />
                </g>

                <g fill="none" stroke={color} strokeWidth="17" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="76" y1="70" x2="130" y2="70" />
                    <line x1="103" y1="70" x2="103" y2="135" />
                    <line x1="73" y1="70" x2="73" y2="80" strokeWidth="12" />
                    <line x1="133" y1="70" x2="133" y2="80" strokeWidth="12" />
                    <line x1="91" y1="138" x2="115" y2="138" strokeWidth="12" />
                </g>
            </g>
        </svg>
    );
};

export default TrackMateLogo;
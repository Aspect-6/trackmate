import React, { useEffect, useMemo, useState } from "react"
import type { ClassBoard } from "@/pages/My Classes/types"
import { MY_CLASSES } from "@/app/styles/colors"

const cssColorToHex = (value: string): string => {
    if (typeof window === "undefined") return value
    const canvas = document.createElement("canvas")
    canvas.width = canvas.height = 1
    const ctx = canvas.getContext("2d")
    if (!ctx) return value
    ctx.fillStyle = value
    const normalized = ctx.fillStyle

    if (normalized.startsWith("#")) {
        if (normalized.length === 4) {
            return `#${normalized[1]}${normalized[1]}${normalized[2]}${normalized[2]}${normalized[3]}${normalized[3]}`.toUpperCase()
        }
        if (normalized.length === 9) {
            return normalized.slice(0, 7).toUpperCase()
        }
        return normalized.toUpperCase()
    }

    const rgbMatch = normalized.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i)
    if (!rgbMatch) return normalized.toUpperCase()

    const [, r, g, b] = rgbMatch
    if (!r || !g || !b) return normalized.toUpperCase()

    const toHex = (num: string) => {
        const hex = Number(num).toString(16).padStart(2, "0")
        return hex
    }

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase()
}

const ClassCardColor: React.FC<ClassBoard.Card.Body.ColorProps> = ({ color }) => {
    const [resolvedColor, setResolvedColor] = useState<string>("transparent")
    const [colorLabel, setColorLabel] = useState<string>("N/A")

    const resolveColorValue = useMemo(() => {
        if (!color) return null
        const variableMatch = color.match(/var\((--[^)]+)\)/)
        if (variableMatch && typeof window !== "undefined") {
            const varName = variableMatch[1]
            if (!varName) return null
            return getComputedStyle(document.documentElement)
                .getPropertyValue(varName)
                .trim() || null
        }
        return color
    }, [color])

    useEffect(() => {
        if (!color) {
            setResolvedColor("transparent")
            setColorLabel("N/A")
            return
        }

        const usableColor = resolveColorValue || color
        const hex = cssColorToHex(usableColor)
        setResolvedColor(usableColor)
        setColorLabel(hex.startsWith("#") ? hex : usableColor.toUpperCase())
    }, [color, resolveColorValue])

    return (
        <div className="flex items-center text-sm">
            <span className="w-24" style={{ color: MY_CLASSES.TEXT_SECONDARY }}>Color:</span>
            <div className="flex items-center space-x-2">
                <div
                    className="w-4 h-4 rounded-full"
                    style={{ border: `1px solid ${MY_CLASSES.BORDER_SECONDARY}`, backgroundColor: resolvedColor }}
                />
                <span className="text-xs uppercase" style={{ color: MY_CLASSES.TEXT_PRIMARY }}>{colorLabel}</span>
            </div>
        </div>
    )
}

export default ClassCardColor

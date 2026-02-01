import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import type { ClassValue } from "clsx"

/**
 * Merges Tailwind CSS classes with clsx, handling conflicts intelligently.
 * @param inputs - Class names, arrays, or objects to merge.
 * @returns The merged class string.
 */
export function cn(...inputs: ClassValue[]): string {
    return twMerge(clsx(inputs))
}

/**
 * Determines the appropriate text color (black or white) for a given background color.
 * Uses luminance calculation to ensure readability.
 * @param hexColor - The background color in hex format.
 * @returns 'black' or 'white'.
 */
export const getTextColorForBackground = (hexColor: string): string => {
    if (!hexColor) return 'white'
    const r = parseInt(hexColor.substring(1, 3), 16)
    const g = parseInt(hexColor.substring(3, 5), 16)
    const b = parseInt(hexColor.substring(5, 7), 16)
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
    return luminance > 0.5 ? 'black' : 'white'
}

/**
 * Formats an event time range for display.
 * @param start - Start time in 24-hour format (HH:MM) or null.
 * @param end - End time in 24-hour format (HH:MM) or null.
 * @returns Formatted time string (e.g., "2:30 PM - 4:00 PM", "All Day").
 */
export const formatEventTimeRange = (start: string | null, end: string | null): string => {
    const formatTime = (time: string) =>
        new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })

    if (!start && !end) return 'All Day'
    if (start && !end) return formatTime(start)
    if (!start && end) return `Until ${formatTime(end)}`
    return `${formatTime(start!)} - ${formatTime(end!)}`
}

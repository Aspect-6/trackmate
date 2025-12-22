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
 * Generates a unique identifier string.
 * Combines a random string with the current timestamp.
 * @returns A unique ID string.
 */
export const generateId = (): string => Math.random().toString(36).substring(2, 9) + Date.now().toString(36)

/**
 * Formats a date string into a short format (e.g., "Jan 1").
 * @param dateString - The date string to format.
 * @returns The formatted date string, or an empty string if input is invalid.
 */
export const formatDate = (dateString: string): string => {
    if (!dateString) return ''
    // Append T00:00:00 to force local time interpretation for YYYY-MM-DD strings
    const dateToParse = dateString.includes('T') ? dateString : `${dateString}T00:00:00`
    const date = new Date(dateToParse)
    if (isNaN(date.getTime())) return ''
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

/**
 * Formats a date string into a full date format (e.g., "January 1, 2023").
 * @param dateString - The date string to format.
 * @returns The formatted full date string.
 */
export const formatFullDate = (dateString: string): string => {
    if (!dateString) return ''
    // Append T00:00:00 to force local time interpretation for YYYY-MM-DD strings
    const dateToParse = dateString.includes('T') ? dateString : `${dateString}T00:00:00`
    const date = new Date(dateToParse)
    if (isNaN(date.getTime())) return ''
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

/**
 * Returns the current date as a string in 'YYYY-MM-DD' format.
 * Uses local time.
 * @returns The current date string.
 */
export const todayString = (): string => {
    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const day = String(now.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
}

/**
 * Converts a Date object to a 'YYYY-MM-DD' string using local time.
 * @param date - The Date object to convert.
 * @returns The date string in 'YYYY-MM-DD' format.
 */
export const dateToLocalISOString = (date: Date): string => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
}

/**
 * Parses a 'YYYY-MM-DD' string into a Date object in local time.
 * @param dateString - The date string to parse.
 * @returns The parsed Date object. Returns current date if parsing fails.
 */
export const parseDateLocal = (dateString: string): Date => {
    if (!dateString) return new Date()
    const parts = dateString.split('-').map(Number)
    if (parts[0] === undefined || parts[1] === undefined || parts[2] === undefined) {
        return new Date()
    }
    return new Date(parts[0], parts[1] - 1, parts[2])
}

/**
 * Determines the appropriate text color (black or white) for a given background color.
 * Uses luminance calculation to ensure readability.
 * @param hexColor - The background color in hex format (e.g., "#FFFFFF").
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
 * Parses a 12-hour time string (e.g., "2:30 PM") into a 24-hour format string (e.g., "14:30").
 * @param input - The time string to parse.
 * @returns The time in 24-hour format (HH:MM), or null if invalid.
 */
export const parse12HourTime = (input: string): string | null => {
    const match = input.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)?$/i)
    if (!match) return null
    const [, hour, minute, ampm] = match
    if (!hour || !minute) return null
    let hourNum = parseInt(hour)
    const minuteNum = parseInt(minute)
    if (ampm) {
        const ampmUpper = ampm.toUpperCase()
        if (ampmUpper === 'AM') {
            if (hourNum === 12) hourNum = 0
        } else {
            if (hourNum !== 12) hourNum += 12
        }
    }
    return `${hourNum.toString().padStart(2, '0')}:${minuteNum.toString().padStart(2, '0')}`
}

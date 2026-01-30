/**
 * Converts a Date object to a 'YYYY-MM-DD' string using local time.
 * @param date - The Date object to convert. Defaults to current date.
 * @returns The date string in 'YYYY-MM-DD' format.
 */
export const dateToLocalISOString = (date: Date = new Date()): string => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
}

/**
 * Returns the current date as a string in 'YYYY-MM-DD' format.
 * Uses local time.
 * @returns The current date string.
 */
export const todayString = (): string => dateToLocalISOString()

type DateFormat = 'short' | 'medium' | 'long' | 'full' | 'period'

/**
 * Formats a date string into the specified format.
 * @param dateString - The date string in 'YYYY-MM-DD' format.
 * @param format - 'short' (Jan 1), 'medium' (Jan 1, 2026), or 'long' (January 1, 2026)
 * @returns The formatted date string, or an empty string if input is invalid.
 */
export const formatDate = (format: DateFormat, dateString: string): string => {
    if (!dateString) return ''
    const dateToParse = dateString.includes('T') ? dateString : `${dateString}T00:00:00`
    const date = new Date(dateToParse)
    if (isNaN(date.getTime())) return ''

    const options: Record<DateFormat, Intl.DateTimeFormatOptions> = {
        short: { month: 'short', day: 'numeric' },
        medium: { month: 'short', day: 'numeric', year: 'numeric' },
        long: { month: 'long', day: 'numeric', year: 'numeric' },
        full: { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' },
        period: { year: 'numeric', month: 'long' },
    }

    return date.toLocaleDateString('en-US', options[format])
}

/**
 * Formats a date string with relative terms for Today/Tomorrow.
 * @param format - The date format to use if not Today/Tomorrow.
 * @param dateString - The date string in 'YYYY-MM-DD' format.
 * @returns "Today", "Tomorrow", or the formatted date string.
 */
export const formatDateRelative = (format: DateFormat, dateString: string): string => {
    if (!dateString) return ''

    const today = todayString()
    const tomorrow = dateToLocalISOString(new Date(Date.now() + 86400000))

    if (dateString === today) return 'Today'
    if (dateString === tomorrow) return 'Tomorrow'

    return formatDate(format, dateString)
}

/**
 * Formats a 24-hour time string to 12-hour format with AM/PM.
 * @param time - The time string in 'HH:MM' format (e.g., '14:30').
 * @returns The formatted time string (e.g., '2:30 PM'), or empty string if invalid.
 */
export const formatTime = (time: string): string => {
    if (!time) return ''
    const [hoursStr, minutesStr] = time.split(':')
    const hours = parseInt(hoursStr ?? '', 10)
    const minutes = parseInt(minutesStr ?? '', 10)
    if (isNaN(hours) || isNaN(minutes)) return ''

    const period = hours >= 12 ? 'PM' : 'AM'
    const hours12 = hours % 12 || 12
    return `${hours12}:${String(minutes).padStart(2, '0')} ${period}`
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
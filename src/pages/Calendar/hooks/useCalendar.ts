import { useState, useMemo } from 'react'
import { useApp } from '@/app/context/AppContext'
import { Assignment, Event, NoSchoolPeriod } from '@/app/types'
import { todayString, dateToLocalISOString, parseDateLocal } from '@/app/lib/utils'
import type { UseCalendar } from '@/pages/Calendar/types'

export const useCalendar = () => {
    const { assignments, events, noSchool, getDayTypeForDate, getClassesForDate } = useApp()
    const [currentDate, setCurrentDate] = useState(new Date())
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)

    const changeMonth = (offset: number) => {
        const newDate = new Date(currentDate)
        newDate.setMonth(newDate.getMonth() + offset)
        setCurrentDate(newDate)
        setSelectedDate(null)
    }

    const month = currentDate.getMonth()
    const year = currentDate.getFullYear()
    const monthName = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })

    const assignmentsByDate = useMemo(() => assignments.reduce<Record<string, Assignment[]>>((acc, a) => {
        if (a.dueDate) {
            if (!acc[a.dueDate]) acc[a.dueDate] = []
            acc[a.dueDate]!.push(a)
        }
        return acc
    }, {}), [assignments])

    const eventsByDate = useMemo(() => events.reduce<Record<string, Event[]>>((acc, e) => {
        if (e.date) {
            if (!acc[e.date]) acc[e.date] = []
            acc[e.date]!.push(e)
        }
        return acc
    }, {}), [events])

    const noSchoolByDate = useMemo(() => noSchool.reduce<Record<string, NoSchoolPeriod>>((acc, ns) => {
        const start = parseDateLocal(ns.startDate)
        const end = parseDateLocal(ns.endDate)
        for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
            const dateStr = dateToLocalISOString(d)
            acc[dateStr] = ns
        }
        return acc
    }, {}), [noSchool])

    const calendarCells = useMemo(() => {
        const cells: UseCalendar.CalendarCell[] = []
        const firstDayOfMonth = new Date(year, month, 1).getDay()
        const daysInMonth = new Date(year, month + 1, 0).getDate()
        const todayStr = todayString()

        // Empty start days
        for (let i = 0; i < firstDayOfMonth; i++) {
            cells.push({ type: 'empty', key: `empty-start-${i}` })
        }

        // Days
        for (let day = 1; day <= daysInMonth; day++) {
            const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
            const isToday = dateString === todayStr
            const ns = noSchoolByDate[dateString]

            const dayAssignments = assignmentsByDate[dateString] || []
            const dayEvents = [...(eventsByDate[dateString] || [])].sort((a, b) => {
                if (a.startTime && b.startTime) return a.startTime.localeCompare(b.startTime)
                if (a.startTime) return -1
                if (b.startTime) return 1
                return 0
            })

            cells.push({
                type: 'day',
                key: `day-${day}`,
                day,
                dateString,
                isToday,
                noSchool: ns,
                assignments: dayAssignments,
                events: dayEvents
            })
        }

        // Empty end days
        for (let i = 0; i < remainingCells; i++) {
            cells.push({ type: 'empty', key: `empty-end-${i}` })
        }

        return cells
    }, [year, month, assignmentsByDate, eventsByDate, noSchoolByDate])

    const sidePanelData = useMemo(() => {
        if (!selectedDate) return null

        const dateString = dateToLocalISOString(selectedDate)
        const noSchoolDay = noSchool.find(ns => dateString >= ns.startDate && dateString <= ns.endDate) || null
        const dayType = getDayTypeForDate ? getDayTypeForDate(dateString) : null
        const classes = !noSchoolDay && dayType && getClassesForDate ? getClassesForDate(dateString) : []
        const dueAssignments = assignments.filter(a => a.dueDate === dateString)
        const dayEvents = events.filter(e => e.date === dateString).sort((a, b) => {
            if (a.startTime && b.startTime) return a.startTime.localeCompare(b.startTime)
            if (a.startTime) return -1
            if (b.startTime) return 1
            return 0
        })

        const formattedDate = selectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

        return {
            date: selectedDate,
            dateString,
            formattedDate,
            noSchoolDay,
            dayType,
            classes,
            dueAssignments,
            dayEvents
        }
    }, [selectedDate, assignments, events, noSchool, getDayTypeForDate, getClassesForDate])

    return {
        currentDate,
        selectedDate,
        setSelectedDate,
        changeMonth,
        sidePanelData,
        calendarCells,
        monthName,
        month,
        year
    }
}

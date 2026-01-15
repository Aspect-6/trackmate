import { useToast } from '@shared/contexts/ToastContext'
import { useAssignments, useClasses, useEvents, useNoSchool, useAcademicTerms } from '@/app/hooks/entities'
import { useDangerZone } from '@/pages/Settings/hooks/useDangerZone'

export interface DeleteModalConfig {
    title: string
    entityName?: string
    description?: string
    message?: string
    buttonText: string
    onDelete: () => void
}

export const useDeleteModalConfig = (activeModal: string | null, modalData: any): DeleteModalConfig | null => {
    const { assignments, deleteAssignment } = useAssignments()
    const { classes, deleteClass, updateClass } = useClasses()
    const { events, deleteEvent } = useEvents()
    const { noSchoolPeriods: noSchool, deleteNoSchool } = useNoSchool()
    const { academicTerms, deleteAcademicTerm } = useAcademicTerms()
    const { deleteAllAssignments, deleteAllEvents, clearAllData } = useDangerZone()
    const { showToast } = useToast()

    if (!activeModal) return null

    // 1. Handle Bulk Deletes and Special Actions
    if (activeModal === 'delete-assignments') {
        return {
            title: "Delete All Assignments?",
            message: "This will permanently delete every assignment from your account. This action cannot be undone.",
            buttonText: "Delete All Assignments",
            onDelete: deleteAllAssignments
        }
    }
    if (activeModal === 'delete-events') {
        return {
            title: "Delete All Events?",
            message: "This will permanently delete every calendar event from your account. This action cannot be undone.",
            buttonText: "Delete All Events",
            onDelete: deleteAllEvents
        }
    }
    if (activeModal === 'clear-all-data') {
        return {
            title: "Clear All Data?",
            message: "This will permanently delete all assignments, classes, events, schedules, no-school days, and custom assignment types. This action cannot be undone.",
            buttonText: "Delete Everything",
            onDelete: clearAllData
        }
    }

    // 2. Configuration Map for Single Item Deletes
    const configMap: Record<string, { data: any[], getName: (item: any) => string, action: (id: string) => void, label: string, msg: string, desc?: string }> = {
        'delete-assignment': {
            data: assignments,
            getName: i => i.title,
            action: deleteAssignment,
            label: 'Assignment',
            msg: 'Successfully deleted assignment'
        },
        'delete-class': {
            data: classes,
            getName: i => i.name,
            action: (id: string) => {
                // Cascade: delete all assignments for this class first
                assignments
                    .filter(a => a.classId === id)
                    .forEach(a => deleteAssignment(a.id))
                deleteClass(id)
            },
            label: 'Class',
            msg: 'Successfully deleted class',
            desc: 'This will delete all assignments from this class.'
        },
        'delete-event': {
            data: events,
            getName: i => i.title,
            action: deleteEvent,
            label: 'Event',
            msg: 'Successfully deleted event'
        },
        'delete-no-school': {
            data: noSchool,
            getName: i => i.name,
            action: deleteNoSchool,
            label: 'No School Period',
            msg: 'Successfully deleted no school period'
        },
        'delete-term': {
            data: academicTerms,
            getName: i => i.name,
            action: (id: string) => {
                // Cascade: unassign classes from this term before deleting
                classes
                    .filter(c => c.termId === id)
                    .forEach(c => updateClass(c.id, { termId: undefined, semesterId: undefined }))
                deleteAcademicTerm(id)
            },
            label: 'Academic Term',
            msg: 'Successfully deleted academic term',
            desc: 'Any classes in this term will be unassigned. This action cannot be undone.'
        }
    }

    const config = configMap[activeModal]
    if (!config) return null

    const item = config.data.find(i => i.id === modalData)
    if (!item) return null

    return {
        title: `Delete ${config.label}?`,
        entityName: config.getName(item),
        description: config.desc,
        buttonText: `Delete ${config.label === 'No School Period' ? 'Period' : config.label.split(' ').pop() || config.label}`,
        onDelete: () => {
            config.action(modalData)
            showToast(config.msg, 'success')
        }
    }
}

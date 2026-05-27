export const SUBTASK_ID_PREFIX = "subtask:"

export const makeSubtaskDisplayId = (parentId: string, subtaskId: string): string =>
    `${SUBTASK_ID_PREFIX}${parentId}:${subtaskId}`

export const isSubtaskDisplayId = (id: string): boolean =>
    id.startsWith(SUBTASK_ID_PREFIX)

export const parseSubtaskDisplayId = (id: string): { parentId: string; subtaskId: string } | null => {
    if (!isSubtaskDisplayId(id)) return null
    const rest = id.slice(SUBTASK_ID_PREFIX.length)
    const parts = rest.split(":")
    if (parts.length !== 2) return null
    const [parentId, subtaskId] = parts
    if (!parentId || !subtaskId) return null
    return { parentId, subtaskId }
}

export type EditAssignmentModalData = {
    assignmentId: string
    focusSubtaskId?: string
}

export const getEditAssignmentModalData = (id: string): EditAssignmentModalData => {
    const parsed = parseSubtaskDisplayId(id)
    if (!parsed) return { assignmentId: id }
    return {
        assignmentId: parsed.parentId,
        focusSubtaskId: parsed.subtaskId,
    }
}


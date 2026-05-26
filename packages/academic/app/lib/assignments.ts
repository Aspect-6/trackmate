import type { Assignment, Status, Subtask } from "@/app/types"
import { makeSubtaskDisplayId, parseSubtaskDisplayId } from "@/app/lib/subtaskIds"

/** Fields that can be updated on a nested subtask. */
export type SubtaskPatch = Partial<Pick<Subtask, "title" | "dueDate" | "dueTime" | "status">>

export type AssignmentListUpdater = (value: Assignment[] | ((prev: Assignment[]) => Assignment[])) => void

export interface AssignmentStoreSetters {
    setStandardItems: AssignmentListUpdater
    setPremiumItems: AssignmentListUpdater
}

export const normalizeSubtasks = (a: Assignment): NonNullable<Assignment["subtasks"]> => a.subtasks ?? []

export const getSubtaskCount = (a: Assignment): number => a.subtasks?.length ?? 0

export const isPremiumTargetForSubtaskCount = (count: number): boolean => count >= 3

export const computeParentStatusFromSubtasks = (
    currentParentStatus: Status,
    subtasks: NonNullable<Assignment["subtasks"]>
): Status => {
    const allToDo = subtasks.length > 0 && subtasks.every(s => s.status === "To Do")
    const allDone = subtasks.length > 0 && subtasks.every(s => s.status === "Done")

    if (currentParentStatus === "Done" && allDone) return "Done"
    if (allToDo) return "To Do"
    return "In Progress"
}

export const flattenAssignmentsForDisplay = (parents: Assignment[]): Assignment[] => {
    const flat: Assignment[] = []

    for (const parent of parents) {
        flat.push(parent)

        for (const st of normalizeSubtasks(parent)) {
            flat.push({
                id: makeSubtaskDisplayId(parent.id, st.id),
                title: st.title,
                dueDate: st.dueDate,
                dueTime: st.dueTime,
                status: st.status,
                classId: parent.classId,
                priority: undefined,
                type: undefined,
                description: undefined,
                createdAt: parent.createdAt,
            })
        }
    }

    return flat
}

const hasSubtaskPatch = (patch: SubtaskPatch): boolean => Object.keys(patch).length > 0

export const assignmentPartialToSubtaskPatch = (updates: Partial<Assignment>): SubtaskPatch => {
    const patch: SubtaskPatch = {}
    if (updates.status !== undefined) patch.status = updates.status
    if (updates.title !== undefined) patch.title = updates.title
    if (updates.dueDate !== undefined) patch.dueDate = updates.dueDate
    if (updates.dueTime !== undefined) patch.dueTime = updates.dueTime
    return patch
}

export const applyParentStatusRules = (
    parent: Assignment,
    updates: Partial<Assignment>,
    nextSubtasks: NonNullable<Assignment["subtasks"]>
): { nextSubtasks: NonNullable<Assignment["subtasks"]>; nextStatus: Status } => {
    const updatesStatus = updates.status
    let subtasks = nextSubtasks

    const isExplicitDone = updatesStatus === "Done"
    if (isExplicitDone) {
        subtasks = subtasks.map(s => ({ ...s, status: "Done" as const }))
    }

    const baseParentStatus = isExplicitDone
        ? "Done"
        : (parent.status === "Done" ? "In Progress" : (updatesStatus ?? parent.status))

    const constrainedStatus = subtasks.length === 0
        ? (updatesStatus ?? parent.status)
        : computeParentStatusFromSubtasks(baseParentStatus, subtasks)

    const nextStatus: Status = isExplicitDone ? "Done" : constrainedStatus

    return { nextSubtasks: subtasks, nextStatus }
}

export const applySubtaskPatch = (
    parent: Assignment,
    subtaskId: string,
    patch: SubtaskPatch
): Assignment | null => {
    if (!hasSubtaskPatch(patch)) return null

    const subtasks = normalizeSubtasks(parent).map(s => {
        if (s.id !== subtaskId) return s
        return { ...s, ...patch }
    })

    const nextParentStatus = computeParentStatusFromSubtasks(parent.status, subtasks)

    return {
        ...parent,
        subtasks,
        status: nextParentStatus,
    }
}

export const buildUpdatedParent = (parent: Assignment, updates: Partial<Assignment>): Assignment => {
    const resolvedSubtasks = updates.subtasks ?? normalizeSubtasks(parent)
    const { nextSubtasks, nextStatus } = applyParentStatusRules(parent, updates, resolvedSubtasks)

    return {
        ...parent,
        ...updates,
        subtasks: nextSubtasks,
        status: nextStatus,
    }
}

type CommitParentParams = {
    parents: Assignment[]
    parentId: string
    nextParent: Assignment
    isInPremiumDoc: boolean
    setters: AssignmentStoreSetters
}

/** Writes `nextParent` in-place or moves it between standard/premium lists. */
export const commitParentUpdate = ({
    parents,
    parentId,
    nextParent,
    isInPremiumDoc,
    setters,
}: CommitParentParams): Assignment[] => {
    const targetPremium = isPremiumTargetForSubtaskCount(getSubtaskCount(nextParent))

    if (targetPremium !== isInPremiumDoc) {
        const remaining = parents.filter(p => p.id !== parentId)
        if (targetPremium) {
            setters.setPremiumItems(prev => [...prev, nextParent])
        } else {
            setters.setStandardItems(prev => [...prev, nextParent])
        }
        return remaining
    }

    return parents.map(p => (p.id === parentId ? nextParent : p))
}

export const runUpdateSubtask = (
    parentId: string,
    subtaskId: string,
    patch: SubtaskPatch,
    premiumParentIds: Set<string>,
    setters: AssignmentStoreSetters
): void => {
    if (!hasSubtaskPatch(patch)) return

    const isInPremiumDoc = premiumParentIds.has(parentId)
    const setActive = isInPremiumDoc ? setters.setPremiumItems : setters.setStandardItems

    setActive(prev => {
        const parent = prev.find(p => p.id === parentId)
        if (!parent) return prev

        const nextParent = applySubtaskPatch(parent, subtaskId, patch)
        if (!nextParent) return prev

        return commitParentUpdate({
            parents: prev,
            parentId,
            nextParent,
            isInPremiumDoc,
            setters,
        })
    })
}

export const runUpdateParent = (
    parentId: string,
    updates: Partial<Assignment>,
    premiumParentIds: Set<string>,
    setters: AssignmentStoreSetters
): void => {
    const isInPremiumDoc = premiumParentIds.has(parentId)
    const setActive = isInPremiumDoc ? setters.setPremiumItems : setters.setStandardItems

    setActive(prev => {
        const parent = prev.find(p => p.id === parentId)
        if (!parent) return prev

        const nextParent = buildUpdatedParent(parent, updates)

        return commitParentUpdate({
            parents: prev,
            parentId,
            nextParent,
            isInPremiumDoc,
            setters,
        })
    })
}

export const routeAssignmentUpdate = (id: string): {
    kind: "subtask"; parentId: string; subtaskId: string
} | {
    kind: "parent"; parentId: string
} => {
    const parsed = parseSubtaskDisplayId(id)
    if (parsed) return { kind: "subtask", parentId: parsed.parentId, subtaskId: parsed.subtaskId }
    return { kind: "parent", parentId: id }
}


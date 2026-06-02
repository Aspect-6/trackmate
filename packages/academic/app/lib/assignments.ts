import type { Assignment, RenderableAssignment, Subtask } from "@/app/types"
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

export const flattenAssignmentsForDisplay = (parents: Assignment[]): RenderableAssignment[] => {
    const flat: RenderableAssignment[] = []

    for (const parent of parents) {
        flat.push({ ...parent, kind: "parent" })

        for (const st of normalizeSubtasks(parent)) {
            flat.push({
                kind: "subtask",
                id: makeSubtaskDisplayId(parent.id, st.id),
                title: st.title,
                dueDate: st.dueDate,
                dueTime: st.dueTime,
                status: st.status,
                classId: parent.classId,
                parentId: parent.id,
                parentTitle: parent.title,
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

    return {
        ...parent,
        subtasks,
    }
}

export const buildUpdatedParent = (parent: Assignment, updates: Partial<Assignment>): Assignment => {
    const resolvedSubtasks = updates.subtasks ?? normalizeSubtasks(parent)

    return {
        ...parent,
        ...updates,
        subtasks: resolvedSubtasks,
    }
}

interface CommitParentParams {
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


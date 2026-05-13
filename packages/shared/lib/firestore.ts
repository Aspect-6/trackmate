import {
    doc,
    getDoc,
    setDoc,
    updateDoc,
    onSnapshot,
    DocumentReference,
    Unsubscribe,
    DocumentData,
} from "firebase/firestore"
import { httpsCallable } from "firebase/functions"
import { db, functions } from "./firebase"

export type AppName = "academic"

const SINGLE_OBJECT_DOCS = new Set(["settings", "schedules"])

export const isSingleObjectDoc = (key: string): boolean =>
    SINGLE_OBJECT_DOCS.has(key)

const writeItemsDocFn = httpsCallable<
    { docName: string; payload: { items: unknown[] } },
    { success: boolean }
>(functions, "writeItemsDocument")

/**
 * Get the base path for a user's app data.
 * Example: users/abc123/academic
 */
export const getAppPath = (userId: string, app: AppName): string => {
    return `users/${userId}/${app}`
}

/**
 * Get a document reference for a user's app document.
 * Example: users/abc123/academic/settings (4 segments = document)
 */
export const getAppDocRef = <T = DocumentData>(
    userId: string,
    app: AppName,
    docName: string
): DocumentReference<T> => {
    return doc(db, getAppPath(userId, app), docName) as DocumentReference<T>
}

/**
 * Get a single document from Firestore.
 * Returns null if the document doesn't exist.
 */
export const getDocument = async <T>(
    userId: string,
    app: AppName,
    docName: string
): Promise<T | null> => {
    const docRef = getAppDocRef<T>(userId, app, docName)
    const snapshot = await getDoc(docRef)
    return snapshot.exists() ? (snapshot.data() as T) : null
}

/**
 * Set a document in Firestore (creates or overwrites).
 * Only used for single-object documents (settings, schedules).
 */
export const setDocument = async <T extends DocumentData>(
    userId: string,
    app: AppName,
    docName: string,
    data: T
): Promise<void> => {
    const docRef = getAppDocRef(userId, app, docName)
    await setDoc(docRef, data)
}

/**
 * Write an items document through the Cloud Function validation gate.
 * The function validates every item against its schema before writing.
 */
export const writeItemsDocument = async (
    docName: string,
    payload: { items: unknown[] }
): Promise<void> => {
    await writeItemsDocFn({ docName, payload })
}

/**
 * Route a document write to the correct path:
 * single-object docs go directly to Firestore, items docs go through the Cloud Function.
 */
export const writeDocument = async <T extends DocumentData>(
    userId: string,
    app: AppName,
    docName: string,
    data: T
): Promise<void> => {
    if (isSingleObjectDoc(docName)) {
        await setDocument(userId, app, docName, data)
    } else {
        await writeItemsDocument(docName, data as unknown as { items: unknown[] })
    }
}

/**
 * Update specific fields in a document.
 */
export const updateDocument = async <T extends DocumentData>(
    userId: string,
    app: AppName,
    docName: string,
    data: Partial<T>
): Promise<void> => {
    const docRef = getAppDocRef(userId, app, docName)
    await updateDoc(docRef, data as DocumentData)
}

/**
 * Subscribe to real-time updates for a document.
 * Returns an unsubscribe function.
 */
export const subscribeToDocument = <T>(
    userId: string,
    app: AppName,
    docName: string,
    onData: (data: T | null) => void,
    onError?: (error: Error) => void
): Unsubscribe => {
    const docRef = getAppDocRef<T>(userId, app, docName)
    return onSnapshot(docRef,
        (snapshot) => {
            if (snapshot.exists()) {
                onData(snapshot.data() as T)
            } else if (!snapshot.metadata.fromCache) {
                onData(null)
            }
        },
        (error) => {
            console.error(`Firestore subscription error for ${docName}:`, error)
            onError?.(error)
        }
    )
}

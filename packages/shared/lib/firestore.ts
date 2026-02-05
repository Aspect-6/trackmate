import {
    doc,
    getDoc,
    setDoc,
    updateDoc,
    deleteDoc,
    onSnapshot,
    DocumentReference,
    Unsubscribe,
    DocumentData,
} from "firebase/firestore"
import { db } from "./firebase"

/**
 * Firestore path helpers for the TrackMate data structure.
 * 
 * Structure:
 * - Documents (settings, schedules): users/{userId}/{app}/{docName}
 * - Collections (assignments, classes): users/{userId}/{app}/data/{collectionName}/{docId}
 * 
 * The "data" document acts as a container for subcollections, required because
 * Firestore paths must have odd segments for collections, even for documents.
 */

export type AppName = "academic"



// ============================================================================
// Path Builders
// ============================================================================

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
    return onSnapshot(
        docRef,
        (snapshot) => {
            onData(snapshot.exists() ? (snapshot.data() as T) : null)
        },
        (error) => {
            console.error(`Firestore subscription error for ${docName}:`, error)
            onError?.(error)
        }
    )
}

/**
 * Delete a document at the app level.
 * Used for documents like settings, schedules.
 */
export const deleteDocument = async (
    userId: string,
    app: AppName,
    docName: string
): Promise<void> => {
    const docRef = getAppDocRef(userId, app, docName)
    await deleteDoc(docRef)
}

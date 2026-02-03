import {
    doc,
    getDoc,
    setDoc,
    updateDoc,
    deleteDoc,
    collection,
    getDocs,
    onSnapshot,
    query,
    DocumentReference,
    CollectionReference,
    Unsubscribe,
    DocumentData,
    QueryConstraint,
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

export type AppName = "academic" | "projects" | "fitness"

// Container document name for subcollections
const DATA_CONTAINER = "data"

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
 * Get a collection reference for a user's app subcollection.
 * Example: users/abc123/academic/data/assignments (5 segments = collection)
 */
export const getAppCollectionRef = <T = DocumentData>(
    userId: string,
    app: AppName,
    collectionName: string
): CollectionReference<T> => {
    return collection(db, getAppPath(userId, app), DATA_CONTAINER, collectionName) as CollectionReference<T>
}

/**
 * Get a document reference within a user's app subcollection.
 * Example: users/abc123/academic/data/assignments/xyz789 (6 segments = document)
 */
export const getAppCollectionDocRef = <T = DocumentData>(
    userId: string,
    app: AppName,
    collectionName: string,
    docId: string
): DocumentReference<T> => {
    return doc(db, getAppPath(userId, app), DATA_CONTAINER, collectionName, docId) as DocumentReference<T>
}

// ============================================================================
// Document Operations
// ============================================================================

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

// ============================================================================
// Collection Operations
// ============================================================================

/**
 * Get all documents from a collection.
 */
export const getCollection = async <T>(
    userId: string,
    app: AppName,
    collectionName: string,
    ...queryConstraints: QueryConstraint[]
): Promise<T[]> => {
    const collectionRef = getAppCollectionRef<T>(userId, app, collectionName)
    const q = queryConstraints.length > 0
        ? query(collectionRef, ...queryConstraints)
        : collectionRef
    const snapshot = await getDocs(q)
    return snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id } as T))
}

/**
 * Subscribe to real-time updates for a collection.
 * Returns an unsubscribe function.
 */
export const subscribeToCollection = <T>(
    userId: string,
    app: AppName,
    collectionName: string,
    onData: (data: T[]) => void,
    onError?: (error: Error) => void,
    ...queryConstraints: QueryConstraint[]
): Unsubscribe => {
    const collectionRef = getAppCollectionRef<T>(userId, app, collectionName)
    const q = queryConstraints.length > 0
        ? query(collectionRef, ...queryConstraints)
        : collectionRef
    return onSnapshot(
        q,
        (snapshot) => {
            const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id } as T))
            onData(data)
        },
        (error) => {
            console.error(`Firestore subscription error for ${collectionName}:`, error)
            onError?.(error)
        }
    )
}

/**
 * Get a single document from a collection by ID.
 */
export const getCollectionDoc = async <T>(
    userId: string,
    app: AppName,
    collectionName: string,
    docId: string
): Promise<T | null> => {
    const docRef = getAppCollectionDocRef<T>(userId, app, collectionName, docId)
    const snapshot = await getDoc(docRef)
    return snapshot.exists() ? ({ ...snapshot.data(), id: snapshot.id } as T) : null
}

/**
 * Add or update a document in a collection.
 * Uses the document's `id` field as the Firestore document ID.
 */
export const setCollectionDoc = async <T extends { id: string }>(
    userId: string,
    app: AppName,
    collectionName: string,
    data: T
): Promise<void> => {
    const { id, ...rest } = data
    const docRef = getAppCollectionDocRef(userId, app, collectionName, id)
    await setDoc(docRef, rest as DocumentData)
}

/**
 * Update specific fields in a collection document.
 */
export const updateCollectionDoc = async <T extends { id: string }>(
    userId: string,
    app: AppName,
    collectionName: string,
    docId: string,
    data: Partial<Omit<T, "id">>
): Promise<void> => {
    const docRef = getAppCollectionDocRef(userId, app, collectionName, docId)
    await updateDoc(docRef, data as DocumentData)
}

/**
 * Delete a document from a collection.
 */
export const deleteCollectionDoc = async (
    userId: string,
    app: AppName,
    collectionName: string,
    docId: string
): Promise<void> => {
    const docRef = getAppCollectionDocRef(userId, app, collectionName, docId)
    await deleteDoc(docRef)
}

/**
 * Delete all documents in a collection.
 * WARNING: This is a destructive operation. Use with caution.
 */
export const clearCollection = async (
    userId: string,
    app: AppName,
    collectionName: string
): Promise<void> => {
    const collectionRef = getAppCollectionRef(userId, app, collectionName)
    const snapshot = await getDocs(collectionRef)
    const promises = snapshot.docs.map((doc) => deleteDoc(doc.ref))
    await Promise.all(promises)
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

/**
 * Batch set multiple documents in a collection.
 * Useful for initial data migration or bulk operations.
 */
export const setCollectionDocs = async <T extends { id: string }>(
    userId: string,
    app: AppName,
    collectionName: string,
    docs: T[]
): Promise<void> => {
    const promises = docs.map((doc) => setCollectionDoc(userId, app, collectionName, doc))
    await Promise.all(promises)
}

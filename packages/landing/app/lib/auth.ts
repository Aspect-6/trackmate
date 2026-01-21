import { auth, googleAuthProvider } from "@shared/lib/firebase"
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updatePassword,
    updateEmail,
    deleteUser,
    User
} from "firebase/auth"

// Sign Up Functions
export const signUpEmailAndPassword = async (email: string, password: string): Promise<User | null> => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    return userCredential.user
}

export const signUpGoogle = async (): Promise<User | null> => {
    const userCredential = await signInWithPopup(auth, googleAuthProvider)
    return userCredential.user
}

// Sign In Functions
export const signInEmailAndPassword = async (email: string, password: string): Promise<User | null> => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return userCredential.user
}

export const signInGoogle = async (): Promise<User | null> => signUpGoogle()

// Sign Out Function
export const signOutUser = async (): Promise<void> => {
    await signOut(auth)
}

// Account Management Functions
export const updateUserPassword = async (newPassword: string): Promise<void> => {
    if (!auth.currentUser) throw new Error("No user signed in")
    await updatePassword(auth.currentUser, newPassword)
}

export const updateUserEmail = async (newEmail: string): Promise<void> => {
    if (!auth.currentUser) throw new Error("No user signed in")
    await updateEmail(auth.currentUser, newEmail)
}

export const deleteUserAccount = async (): Promise<void> => {
    if (!auth.currentUser) throw new Error("No user signed in")
    await deleteUser(auth.currentUser)
}


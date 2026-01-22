import { auth, googleAuthProvider } from "@shared/lib/firebase"
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updatePassword,
    updateEmail,
    updateProfile,
    deleteUser,
    linkWithPopup,
    unlink,
    getAdditionalUserInfo,
    sendEmailVerification,
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

export const signInGoogle = async (): Promise<User | null> => {
    const userCredential = await signInWithPopup(auth, googleAuthProvider)
    const additionalInfo = getAdditionalUserInfo(userCredential)

    // If this is a new user, delete the account and throw an error
    if (additionalInfo?.isNewUser) {
        await deleteUser(userCredential.user)
        const error = new Error("No account exists with this Google account. Please sign up first.") as any
        error.code = "auth/account-not-found"
        throw error
    }

    return userCredential.user
}

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

export const updateUserDisplayName = async (displayName: string): Promise<void> => {
    if (!auth.currentUser) throw new Error("No user signed in")
    await updateProfile(auth.currentUser, { displayName })
}

export const deleteUserAccount = async (): Promise<void> => {
    if (!auth.currentUser) throw new Error("No user signed in")
    await deleteUser(auth.currentUser)
}

// Linked Account Functions
export const linkGoogleAccount = async (): Promise<void> => {
    if (!auth.currentUser) throw new Error("No user signed in")
    await linkWithPopup(auth.currentUser, googleAuthProvider)
}

export const unlinkGoogleAccount = async (): Promise<void> => {
    if (!auth.currentUser) throw new Error("No user signed in")
    await unlink(auth.currentUser, "google.com")
}

// Email Verification
export const sendUserEmailVerification = async (): Promise<void> => {
    if (!auth.currentUser) throw new Error("No user signed in")
    await sendEmailVerification(auth.currentUser)
}

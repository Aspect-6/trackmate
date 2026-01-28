import { auth, googleAuthProvider, facebookAuthProvider } from "@shared/lib"
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updatePassword,
    verifyBeforeUpdateEmail,
    updateProfile,
    deleteUser,
    linkWithPopup,
    unlink,
    getAdditionalUserInfo,
    sendEmailVerification,
    reauthenticateWithCredential,
    EmailAuthProvider,
    GoogleAuthProvider,
    FacebookAuthProvider,
    User
} from "firebase/auth"

// Sign-Up Functions
export const signUpEmailAndPassword = async (email: string, password: string): Promise<User | null> => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    return userCredential.user
}

export const signUpGoogle = async (): Promise<User | null> => {
    const userCredential = await signInWithPopup(auth, googleAuthProvider)
    const additionalInfo = getAdditionalUserInfo(userCredential)

    if (!additionalInfo?.isNewUser) {
        if (userCredential.user.providerData.length > 1) {
            try {
                await unlink(userCredential.user, GoogleAuthProvider.PROVIDER_ID)
            } catch (unlinkError) {
                if (import.meta.env.DEV) {
                    console.error("Failed to unlink provider during rollback", unlinkError)
                }
            }
        }

        await signOut(auth)
        throw {
            code: "auth/email-already-in-use",
            message: "Account already exists. Please sign in."
        }
    }

    return userCredential.user
}

export const signUpFacebook = async (): Promise<User | null> => {
    const userCredential = await signInWithPopup(auth, facebookAuthProvider)
    const additionalInfo = getAdditionalUserInfo(userCredential)

    if (!additionalInfo?.isNewUser) {
        if (userCredential.user.providerData.length > 1) {
            try {
                await unlink(userCredential.user, FacebookAuthProvider.PROVIDER_ID)
            } catch (unlinkError) {
                if (import.meta.env.DEV) {
                    console.error("Failed to unlink provider during rollback", unlinkError)
                }
            }
        }

        await signOut(auth)
        throw {
            code: "auth/email-already-in-use",
            message: "Account already exists. Please sign in."
        }
    }

    return userCredential.user
}

// Sign-In Functions
export const signInEmailAndPassword = async (email: string, password: string): Promise<User | null> => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return userCredential.user
}

export const signInGoogle = async (): Promise<User | null> => {
    const userCredential = await signInWithPopup(auth, googleAuthProvider)
    const additionalInfo = getAdditionalUserInfo(userCredential)

    if (additionalInfo?.isNewUser) {
        await deleteUser(userCredential.user)
        throw {
            code: "auth/account-not-found",
            message: "No account exists with this Google account. Please sign up first."
        }
    } else {
        const user = userCredential.user
        const hasEmailPassword = user.providerData.some(p => p.providerId === EmailAuthProvider.PROVIDER_ID)
        const googleProvider = user.providerData.find(p => p.providerId === GoogleAuthProvider.PROVIDER_ID)

        if (hasEmailPassword && googleProvider && user.photoURL === googleProvider.photoURL) {
            try {
                await updateProfile(user, { photoURL: null })
            } catch (error) {
                if (import.meta.env.DEV) {
                    console.error("Failed to revert profile picture", error)
                }
            }
        }
    }

    return userCredential.user
}

export const signInFacebook = async (): Promise<User | null> => {
    const userCredential = await signInWithPopup(auth, facebookAuthProvider)
    const additionalInfo = getAdditionalUserInfo(userCredential)

    if (additionalInfo?.isNewUser) {
        await deleteUser(userCredential.user)
        throw {
            code: "auth/account-not-found",
            message: "No account exists with this Facebook account. Please sign up first."
        }
    } else {
        const user = userCredential.user
        const hasEmailPassword = user.providerData.some(p => p.providerId === EmailAuthProvider.PROVIDER_ID)
        const facebookProvider = user.providerData.find(p => p.providerId === FacebookAuthProvider.PROVIDER_ID)

        if (hasEmailPassword && facebookProvider && user.photoURL === facebookProvider.photoURL) {
            try {
                await updateProfile(user, { photoURL: null })
            } catch (error) {
                if (import.meta.env.DEV) {
                    console.error("Failed to revert profile picture", error)
                }
            }
        }
    }

    return userCredential.user
}

export const signOutUser = async (): Promise<void> => {
    await signOut(auth)
}

// Account Management Functions
export const reauthenticateUser = async (currentPassword: string): Promise<void> => {
    if (!auth.currentUser) throw new Error("No user signed in")
    if (!auth.currentUser.email) throw new Error("No email associated with account")
    const credential = EmailAuthProvider.credential(auth.currentUser.email, currentPassword)
    await reauthenticateWithCredential(auth.currentUser, credential)
}

export const updateUserPassword = async (currentPassword: string, newPassword: string): Promise<void> => {
    if (!auth.currentUser) throw new Error("No user signed in")
    await reauthenticateUser(currentPassword)
    await updatePassword(auth.currentUser, newPassword)
}

export const updateUserEmail = async (newEmail: string): Promise<void> => {
    if (!auth.currentUser) throw new Error("No user signed in")
    await verifyBeforeUpdateEmail(auth.currentUser, newEmail)
}

export const updateUserDisplayName = async (displayName: string): Promise<void> => {
    if (!auth.currentUser) throw new Error("No user signed in")
    await updateProfile(auth.currentUser, { displayName })
}

export const deleteUserAccount = async (): Promise<void> => {
    if (!auth.currentUser) throw new Error("No user signed in")
    await deleteUser(auth.currentUser)
}

// Account-Linking Functions
export const linkGoogleAccount = async (): Promise<void> => {
    if (!auth.currentUser) throw new Error("No user signed in")
    await linkWithPopup(auth.currentUser, googleAuthProvider)
}

export const unlinkGoogleAccount = async (): Promise<void> => {
    if (!auth.currentUser) throw new Error("No user signed in")
    await unlink(auth.currentUser, "google.com")
}

export const linkFacebookAccount = async (): Promise<void> => {
    if (!auth.currentUser) throw new Error("No user signed in")
    await linkWithPopup(auth.currentUser, facebookAuthProvider)
}

export const unlinkFacebookAccount = async (): Promise<void> => {
    if (!auth.currentUser) throw new Error("No user signed in")
    await unlink(auth.currentUser, "facebook.com")
}

// Email Verification
export const sendUserEmailVerification = async (): Promise<void> => {
    if (!auth.currentUser) throw new Error("No user signed in")
    await sendEmailVerification(auth.currentUser)
}

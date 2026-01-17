import { auth, googleAuthProvider } from "@shared/lib/firebase"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, User } from "firebase/auth"

export const signUpEmailAndPassword = async (email: string, password: string): Promise<User | null> => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    return userCredential.user
}

export const signUpGoogle = async (): Promise<User | null> => {
    const userCredential = await signInWithPopup(auth, googleAuthProvider)
    return userCredential.user
}

export const signInEmailAndPassword = async (email: string, password: string): Promise<User | null> => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return userCredential.user
}

export const signInGoogle = async (): Promise<User | null> => signUpGoogle()

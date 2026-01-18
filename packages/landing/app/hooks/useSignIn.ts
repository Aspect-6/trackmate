import { signInEmailAndPassword, signInGoogle } from "@/app/lib/auth"
import { useAuthLoader } from "./useAuthLoader"

export const useSignIn = () => {
    const { loading, attempt } = useAuthLoader()

    const signInWithEmailAndPassword = (email: string, password: string) =>
        attempt(() => signInEmailAndPassword(email, password))

    const signInWithGoogle = () =>
        attempt(() => signInGoogle())

    return { signInWithEmailAndPassword, signInWithGoogle, loading }
}

import { signUpEmailAndPassword, signUpGoogle } from "@/app/lib/auth"
import { useAuthLoader } from "./useAuthLoader"

export const useSignUp = () => {
    const { loading, attempt } = useAuthLoader()

    const signUpWithEmailAndPassword = (email: string, password: string) =>
        attempt(() => signUpEmailAndPassword(email, password))

    const signUpWithGoogle = () =>
        attempt(() => signUpGoogle())

    return { signUpWithEmailAndPassword, signUpWithGoogle, loading }
}

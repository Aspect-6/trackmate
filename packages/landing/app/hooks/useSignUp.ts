import { signUpEmailAndPassword, signUpGoogle, signUpFacebook, sendUserEmailVerification } from "@/app/lib/auth"
import { useAuthLoader } from "./useAuthLoader"

export const useSignUp = () => {
    const { loading, attempt } = useAuthLoader()

    const signUpWithEmailAndPassword = (email: string, password: string) =>
        attempt(() => signUpEmailAndPassword(email, password))

    const signUpWithGoogle = () =>
        attempt(() => signUpGoogle())

    const signUpWithFacebook = () =>
        attempt(() => signUpFacebook())

    const sendVerificationEmail = async () => {
        try {
            await sendUserEmailVerification()
            return { error: null }
        } catch (error: any) {
            return { error }
        }
    }

    return { signUpWithEmailAndPassword, signUpWithGoogle, signUpWithFacebook, sendVerificationEmail, loading }
}

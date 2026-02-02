export namespace ActionHandler {
    export interface Props { }
    // ======================

    export interface VerifyEmailActionProps {
        oobCode: string
    }

    export interface VerifyAndChangeEmailActionProps {
        oobCode: string
    }

    export interface RecoverEmailActionProps {
        oobCode: string
    }

    export namespace ResetPasswordAction {
        export interface Props {
            oobCode: string
        }
        // ======================
        
        export interface FormData {
            password: string
            confirmPassword: string
        }
    }
}

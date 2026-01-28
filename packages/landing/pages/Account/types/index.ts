import { User } from 'firebase/auth'

export type ActiveSection = 'profile' | 'linked' | 'security' | 'data'

// AccountSidebar namespace
export namespace AccountSidebar {
    export interface Props {
        activeSection: ActiveSection
        onSectionChange: (section: ActiveSection) => void
        onSignOut: () => void
    }
}

// ProfileSection props
export namespace ProfileSection {
    export namespace Content {
        export interface AvatarDisplayProps {
            user: User
        }

        export interface EmailRowProps {
            user: User
        }

        export interface AccountIdRowProps {
            userId: string
        }
    }
}

// LinkedAccountsSection props
export namespace LinkedAccountsSection {
    export namespace Content {
        export interface ProviderRowProps {
            title: string
            description: React.ReactNode
            icon: React.ReactNode
            iconBackgroundColor?: string
            action: React.ReactNode
        }

        export interface ComingSoonRowProps {
            providerName: string
            Icon: React.FC<React.SVGProps<SVGSVGElement>>
        }
    }
}

// SecuritySection props
export namespace SecuritySection {
    export namespace Content {
        export interface EmailVerificationRowProps {
            isVerified: boolean
            verificationSent: boolean
            verificationError: string
            onResend: () => void
        }

        export interface PasswordRowProps {
            hasPassword: boolean
            isEditing: boolean
            currentPassword: string
            newPassword: string
            confirmPassword: string
            error: string
            success: string
            loading: boolean
            onEditStart: () => void
            onEditCancel: () => void
            onCurrentPasswordChange: (value: string) => void
            onNewPasswordChange: (value: string) => void
            onConfirmPasswordChange: (value: string) => void
            onSave: () => void
        }
    }
}

// DataSection props
export namespace DataSection {
    export namespace Content {
        export interface DeleteAccountCardProps {
            showConfirm: boolean
            error: string
            loading: boolean
            onInitiateDelete: () => void
            onConfirmDelete: () => void
            onCancelDelete: () => void
        }
    }
}

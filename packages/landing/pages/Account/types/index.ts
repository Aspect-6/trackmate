import { User } from "firebase/auth"

export type ActiveSection = "profile" | "linked" | "security" | "data"

export namespace Account {
    export interface Props { }
}

export namespace AccountSidebar {
    export interface Props {
        activeSection: ActiveSection
        onSectionChange: (section: ActiveSection) => void
        onSignOut: () => void
        isMobile?: boolean
        isOpen?: boolean
        onClose?: () => void
    }
    // ======================

    export interface SidebarNavProps {
        activeSection: ActiveSection
        onSectionChange: (section: ActiveSection) => void
        onSignOut: () => void
        onLinkClick?: () => void
        className?: string
    }
}

export namespace ProfileSection {
    export interface Props { }
    // ======================

    export namespace Content {
        export interface Props { }
        // ======================
        export interface AvatarDisplayProps {
            user: User
        }
        export namespace EmailRow {
            export interface Props {
                user: User
            }
            // ======================
            export interface DisplayProps {
                user: User
                hasPassword: boolean
                onEditStart: () => void
            }
            export interface FormProps {
                newEmail: string
                hasPassword: boolean
                error: string
                onEmailChange: (value: string) => void
                onSave: () => void
                onCancel: () => void
            }
            export interface InputProps {
                value: string
                onChange: (value: string) => void
            }
            export interface ActionsProps {
                onSave: () => void
                onCancel: () => void
            }
        }
        export interface AccountIdRowProps {
            userId: string
        }
    }
}

export namespace LinkedAccountsSection {
    export interface Props { }
    // ======================

    export namespace Content {
        export interface Props { }
        // ======================
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

export namespace SecuritySection {
    export interface Props { }
    // ======================

    export namespace Content {
        export interface Props { }
        // ======================
        export interface EmailVerificationRowProps {
            isVerified: boolean
            verificationSent: boolean
            verificationError: string
            onResend: () => void
        }
        export namespace PasswordRow {
            export interface Props {
                user: User
            }
            // ======================
            export interface DisplayProps {
                hasPassword: boolean
                onEditStart: () => void
            }
            export interface FormProps {
                currentPassword: string
                newPassword: string
                confirmPassword: string
                error: string
                success: string
                loading: boolean
                onCurrentPasswordChange: (value: string) => void
                onNewPasswordChange: (value: string) => void
                onConfirmPasswordChange: (value: string) => void
                onSave: () => void
                onCancel: () => void
            }
            export interface InputProps {
                children: React.ReactNode
            }
            export interface ActionsProps {
                onSave: () => void
                onCancel: () => void
                loading: boolean
            }
        }
    }
}

export namespace DataSection {
    export interface Props { }
    // ======================

    export namespace Content {
        export interface Props { }
        // ======================

        export namespace DeleteAccountCard {
            export interface Props { }
            // ======================
            export interface HeaderProps { }
            export interface ContainerProps {
                children: React.ReactNode
            }
            export interface InitialViewProps {
                onInitiateDelete: () => void
            }
            export interface ConfirmationViewProps {
                error?: string
                loading: boolean
                onConfirmDelete: () => void
                onCancelDelete: () => void
            }
        }
    }
}

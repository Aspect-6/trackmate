import { User } from 'firebase/auth'

export type ActiveSection = 'profile' | 'linked' | 'security' | 'data'

export namespace Account {
    export interface Props { }
    // ======================

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

        export namespace SidebarNav {
            export interface Props {
                activeSection: ActiveSection
                onSectionChange: (section: ActiveSection) => void
                onSignOut: () => void
                onLinkClick?: () => void
                className?: string
            }
        }
    }

    export namespace ProfileSection {
        export interface Props { }
        // ======================

        export namespace Content {
            export interface Props { }
            // ======================

            export namespace AvatarDisplay {
                export interface Props {
                    user: User
                }
            }

            export namespace EmailRow {
                export interface Props {
                    user: User
                }
            }

            export namespace AccountIdRow {
                export interface Props {
                    userId: string
                }
            }
        }
    }

    export namespace LinkedAccountsSection {
        export interface Props { }
        // ======================

        export namespace Content {
            export interface Props { }
            // ======================

            export namespace ProviderRow {
                export interface Props {
                    title: string
                    description: React.ReactNode
                    icon: React.ReactNode
                    iconBackgroundColor?: string
                    action: React.ReactNode
                }
            }

            export namespace ComingSoonRow {
                export interface Props {
                    providerName: string
                    Icon: React.FC<React.SVGProps<SVGSVGElement>>
                }
            }
        }
    }

    export namespace SecuritySection {
        export interface Props { }
        // ======================

        export namespace Content {
            export interface Props { }
            // ======================

            export namespace EmailVerificationRow {
                export interface Props {
                    isVerified: boolean
                    verificationSent: boolean
                    verificationError: string
                    onResend: () => void
                }
            }

            export namespace PasswordRow {
                export interface Props {
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

                export namespace Header {
                    export interface Props { }
                }

                export namespace Container {
                    export interface Props {
                        children: React.ReactNode
                    }
                }

                export namespace InitialView {
                    export interface Props {
                        onInitiateDelete: () => void
                    }
                }

                export namespace ConfirmationView {
                    export interface Props {
                        error?: string
                        loading: boolean
                        onConfirmDelete: () => void
                        onCancelDelete: () => void
                    }
                }
            }
        }
    }
}

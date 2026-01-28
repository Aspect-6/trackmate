import { User } from 'firebase/auth'

export namespace Landing {
    export interface Props { }
    // ======================

    export namespace Header {
        export interface Props {
            children: React.ReactNode
        }
    }

    export namespace Footer {
        export interface Props {
            children: React.ReactNode
        }
    }

    export namespace Button {
        export interface Props {
            onClick: () => void
            children: React.ReactNode
            variant?: 'primary' | 'secondary'
            className?: string
        }
    }

    export namespace ProfileAvatar {
        export interface Props {
            user: User
            onClick?: () => void
            className?: string
        }
    }

    export namespace Hero {
        export interface Props { }
        // ======================

        export namespace HeroTitle {
            export interface Props {
                children: React.ReactNode
            }
        }

        export namespace HeroMessage {
            export interface Props {
                children: React.ReactNode
            }
        }
    }

    export namespace ProductCard {
        export interface Props {
            title: string
            description: string
            icon: React.ReactNode
            href: string
            accentColor: string
            comingSoon?: boolean
        }
        // ======================

        export namespace ComingSoonBadge {
            export interface Props { }
        }

        export namespace ProductCardIcon {
            export interface Props {
                icon: React.ReactNode
                accentColor: string
            }
        }

        export namespace ProductCardTitle {
            export interface Props {
                children: React.ReactNode
            }
        }

        export namespace ProductCardDescription {
            export interface Props {
                children: React.ReactNode
            }
        }

        export namespace ProductCardLaunchButton {
            export interface Props {
                href: string
            }
        }
    }
}

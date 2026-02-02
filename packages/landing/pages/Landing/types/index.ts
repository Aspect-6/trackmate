import { User } from "firebase/auth"

export namespace Landing {
    export interface Props { }
    // ======================
    export interface HeaderProps {
        children: React.ReactNode
    }
    export interface FooterProps {
        children: React.ReactNode
    }
    export interface ButtonProps {
        onClick: () => void
        children: React.ReactNode
        variant?: "primary" | "secondary"
        className?: string
    }
    export interface ProfileAvatarProps {
        user: User
        onClick?: () => void
        className?: string
    }

    export namespace Hero {
        export interface Props { }
        // ======================
        export interface HeroTitleProps {
            children: React.ReactNode
        }
        export interface HeroMessageProps {
            children: React.ReactNode
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
        export interface ComingSoonBadgeProps { }
        export interface ProductCardIconProps {
            icon: React.ReactNode
            accentColor: string
        }
        export interface ProductCardTitleProps {
            children: React.ReactNode
        }
        export interface ProductCardDescriptionProps {
            children: React.ReactNode
        }
        export interface ProductCardLaunchButtonProps {
            href: string
        }
    }
}

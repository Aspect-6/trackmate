import React from "react"
import GoogleIcon from "@/app/assets/google-icon.svg?react"
import MicrosoftIcon from "@/app/assets/microsoft-icon.svg?react"
import FacebookIcon from "@/app/assets/facebook-icon.svg?react"
import ProviderButton from "./ProviderButton"

interface ProviderButtonsProps {
    onGoogleClick: () => void
    onMicrosoftClick?: () => void
    onFacebookClick?: () => void
}

const ProviderButtons: React.FC<ProviderButtonsProps> = ({ onGoogleClick, onMicrosoftClick, onFacebookClick }) => {
    return (
        <div className="flex gap-3">
            <ProviderButton onClick={onGoogleClick}>
                <GoogleIcon className="w-5 h-5" />
            </ProviderButton>
            <ProviderButton onClick={onMicrosoftClick || (() => { })} disabled={!onMicrosoftClick}>
                <MicrosoftIcon className="w-5 h-5" />
            </ProviderButton>
            <ProviderButton onClick={onFacebookClick || (() => { })} disabled={true}>
                <FacebookIcon className="w-5 h-5" />
            </ProviderButton>
        </div>
    )
}

export default ProviderButtons

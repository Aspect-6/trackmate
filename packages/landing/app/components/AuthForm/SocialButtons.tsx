import React from 'react'
import GoogleIcon from '@/app/assets/google-icon.svg?react'
import MicrosoftIcon from '@/app/assets/microsoft-icon.svg?react'
import FacebookIcon from '@/app/assets/facebook-icon.svg?react'
import SocialButton from './SocialButton'

interface SocialButtonsProps {
    onGoogleClick: () => void
    onMicrosoftClick?: () => void
    onFacebookClick?: () => void
}

const SocialButtons: React.FC<SocialButtonsProps> = ({ onGoogleClick, onMicrosoftClick, onFacebookClick }) => {
    return (
        <div className="flex gap-3">
            <SocialButton onClick={onGoogleClick}>
                <GoogleIcon className="w-5 h-5" />
            </SocialButton>
            <SocialButton onClick={onMicrosoftClick || (() => { })} disabled={!onMicrosoftClick}>
                <MicrosoftIcon className="w-5 h-5" />
            </SocialButton>
            <SocialButton onClick={onFacebookClick || (() => { })} disabled={!onFacebookClick}>
                <FacebookIcon className="w-5 h-5" />
            </SocialButton>
        </div>
    )
}

export default SocialButtons

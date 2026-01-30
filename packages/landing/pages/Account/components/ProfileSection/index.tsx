import React from 'react'
import { useAuth } from '@shared/contexts/AuthContext'
import { AUTH } from '@/app/styles/colors'
import AvatarDisplay from './Content/AvatarDisplay'
import EmailRow from './Content/EmailRow'
import AccountIdRow from './Content/AccountIdRow'

const ProfileSection: React.FC = () => {
    const { user } = useAuth()

    if (!user) return null

    return (
        <div>
            <div className="mb-8 pb-4" style={{ borderBottom: `1px solid ${AUTH.BORDER_PRIMARY}` }}>
                <h2 className="text-2xl font-bold mb-1" style={{ color: AUTH.TEXT_PRIMARY }}>
                    Profile
                </h2>
                <p style={{ color: AUTH.TEXT_SECONDARY }}>
                    Your personal information
                </p>
            </div>
            <AvatarDisplay user={user} />
            <EmailRow user={user} />
            <AccountIdRow userId={user.uid} />
        </div>
    )
}

export default ProfileSection

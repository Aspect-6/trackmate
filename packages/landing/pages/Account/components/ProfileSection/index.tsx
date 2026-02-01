import React from 'react'
import { useAuth } from '@shared/contexts/AuthContext'
import AvatarDisplay from './Content/AvatarDisplay'
import EmailRow from './Content/EmailRow'
import AccountIdRow from './Content/AccountIdRow'
import { ACCOUNT } from '@/app/styles/colors'

const ProfileSection: React.FC = () => {
    const { user } = useAuth()

    if (!user) return null

    return (
        <div>
            <div className="mb-8 pb-4" style={{ borderBottom: `1px solid ${ACCOUNT.BORDER_PRIMARY}` }}>
                <h2 className="text-2xl font-bold mb-1" style={{ color: ACCOUNT.TEXT_PRIMARY }}>
                    Profile
                </h2>
                <p style={{ color: ACCOUNT.TEXT_SECONDARY }}>
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

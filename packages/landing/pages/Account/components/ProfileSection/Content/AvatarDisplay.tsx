import React, { useState } from 'react'
import { useAccount } from '@/app/hooks/useAccount'
import type { ProfileSection } from '@/pages/Account/types'
import { Pencil, Check, X } from 'lucide-react'
import { ACCOUNT } from '@/app/styles/colors'

const AvatarDisplay: React.FC<ProfileSection.Content.AvatarDisplayProps> = ({ user }) => {
    const { changeDisplayName } = useAccount()
    const [isEditing, setIsEditing] = useState(false)
    const [newDisplayName, setNewDisplayName] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const handleSave = async () => {
        setError('')
        setSuccess('')
        if (!newDisplayName.trim()) {
            setError('Display name cannot be empty')
            return
        }
        if (newDisplayName.length > 50) {
            setError('Display name must be 50 characters or less')
            return
        }
        const result = await changeDisplayName(newDisplayName.trim())
        if (result.success) {
            setIsEditing(false)
            setNewDisplayName('')
        } else {
            setError(result.error.message || 'Failed to update display name')
        }
    }

    const handleEditStart = () => {
        setSuccess('')
        setError('')
        setNewDisplayName(user.displayName || '')
        setIsEditing(true)
    }

    const handleEditCancel = () => {
        setIsEditing(false)
        setNewDisplayName('')
        setError('')
    }

    return (
        <div className="flex items-center gap-6 mb-10">
            {user.photoURL ? (
                <img
                    src={user.photoURL}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover flex-shrink-0"
                    referrerPolicy="no-referrer"
                />
            ) : (
                <div
                    className="w-24 h-24 rounded-full flex items-center justify-center text-3xl font-bold flex-shrink-0"
                    style={{
                        backgroundColor: ACCOUNT.GLOBAL_ACCENT,
                        color: ACCOUNT.TEXT_PRIMARY,
                    }}
                >
                    {user.email?.charAt(0).toUpperCase()}
                </div>
            )}
            <div>
                {!isEditing ? (
                    <div className="flex items-center gap-2">
                        <p className="text-lg font-semibold" style={{ color: ACCOUNT.TEXT_PRIMARY }}>
                            {user.displayName || user.email?.split('@')[0]}
                        </p>
                        <button
                            onClick={handleEditStart}
                            className="p-1.5 rounded-md hover:opacity-70 transition-opacity"
                            style={{ color: ACCOUNT.TEXT_SECONDARY, willChange: 'opacity' }}
                            title="Edit display name"
                        >
                            <Pencil size={14} />
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col gap-2">
                        <div className="relative w-full max-w-[200px]">
                            <input
                                type="text"
                                value={newDisplayName}
                                onChange={(e) => setNewDisplayName(e.target.value)}
                                placeholder="Enter display name"
                                className="pl-3 pr-16 py-1.5 rounded-lg text-sm outline-none w-full"
                                style={{
                                    backgroundColor: ACCOUNT.BACKGROUND_TERTIARY,
                                    border: `1px solid ${ACCOUNT.BORDER_PRIMARY}`,
                                    color: ACCOUNT.TEXT_PRIMARY,
                                }}
                                autoFocus
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') handleSave()
                                    if (e.key === 'Escape') handleEditCancel()
                                }}
                            />
                            <div className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center gap-1">
                                <button
                                    onClick={handleSave}
                                    className="p-1 rounded hover:bg-white/10 transition-colors"
                                    style={{ color: ACCOUNT.TEXT_SUCCESS }}
                                    title="Save"
                                >
                                    <Check size={14} />
                                </button>
                                <button
                                    onClick={handleEditCancel}
                                    className="p-1 rounded hover:bg-white/10 transition-colors"
                                    style={{ color: ACCOUNT.TEXT_SECONDARY }}
                                    title="Cancel"
                                >
                                    <X size={14} />
                                </button>
                            </div>
                        </div>
                        {error && <p className="text-xs" style={{ color: ACCOUNT.TEXT_DANGER }}>{error}</p>}
                        {success && <p className="text-xs" style={{ color: ACCOUNT.TEXT_SUCCESS }}>{success}</p>}
                    </div>
                )}
                <p className="text-sm" style={{ color: ACCOUNT.TEXT_SECONDARY }}>
                    Member since {user.metadata.creationTime
                        ? new Date(user.metadata.creationTime).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
                        : 'N/A'}
                </p>
            </div>
        </div>
    )
}

export default AvatarDisplay

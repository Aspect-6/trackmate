import React from 'react'
import { Pencil, Check, X } from 'lucide-react'
import { AUTH } from '@/app/styles/colors'
import type { ProfileSection } from '@/pages/Account/types'

const AvatarDisplay: React.FC<ProfileSection.Content.AvatarDisplayProps> = ({
    user,
    isEditingDisplayName,
    newDisplayName,
    displayNameError,
    displayNameSuccess,
    onEditStart,
    onEditCancel,
    onDisplayNameChange,
    onDisplayNameSave,
}) => {
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
                        backgroundColor: AUTH.GLOBAL_ACCENT,
                        color: '#fff',
                    }}
                >
                    {user.email?.charAt(0).toUpperCase()}
                </div>
            )}
            <div>
                {!isEditingDisplayName ? (
                    <div className="flex items-center gap-2">
                        <p className="text-lg font-semibold" style={{ color: AUTH.TEXT_PRIMARY }}>
                            {user.displayName || user.email?.split('@')[0]}
                        </p>
                        <button
                            onClick={onEditStart}
                            className="p-1.5 rounded-md hover:opacity-70 transition-opacity"
                            style={{ color: AUTH.TEXT_SECONDARY, willChange: 'opacity' }}
                            title="Edit display name"
                        >
                            <Pencil size={14} />
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                value={newDisplayName}
                                onChange={(e) => onDisplayNameChange(e.target.value)}
                                placeholder="Enter display name"
                                className="px-3 py-1.5 rounded-lg text-sm outline-none"
                                style={{
                                    backgroundColor: AUTH.BACKGROUND_TERTIARY,
                                    border: `1px solid ${AUTH.BORDER_PRIMARY}`,
                                    color: AUTH.TEXT_PRIMARY,
                                }}
                                autoFocus
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') onDisplayNameSave()
                                    if (e.key === 'Escape') onEditCancel()
                                }}
                            />
                            <button
                                onClick={onDisplayNameSave}
                                className="p-1.5 rounded-md transition-opacity hover:opacity-80"
                                style={{ backgroundColor: '#22c55e', color: '#fff' }}
                                title="Save"
                            >
                                <Check size={14} />
                            </button>
                            <button
                                onClick={onEditCancel}
                                className="p-1.5 rounded-md transition-opacity hover:opacity-80"
                                style={{ backgroundColor: AUTH.BACKGROUND_TERTIARY, color: AUTH.TEXT_PRIMARY }}
                                title="Cancel"
                            >
                                <X size={14} />
                            </button>
                        </div>
                        {displayNameError && <p className="text-xs" style={{ color: AUTH.TEXT_DANGER }}>{displayNameError}</p>}
                        {displayNameSuccess && <p className="text-xs" style={{ color: '#22c55e' }}>{displayNameSuccess}</p>}
                    </div>
                )}
                <p className="text-sm" style={{ color: AUTH.TEXT_SECONDARY }}>
                    Member since {user.metadata.creationTime
                        ? new Date(user.metadata.creationTime).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
                        : 'N/A'}
                </p>
            </div>
        </div>
    )
}

export default AvatarDisplay

import React from 'react'
import { Mail, Pencil } from 'lucide-react'
import { AUTH } from '@/app/styles/colors'
import type { ProfileSection } from '@/pages/Account/types'

export const EmailRowDisplay: React.FC<ProfileSection.Content.EmailRow.DisplayProps> = ({
    user,
    hasPassword,
    onEditStart,
}) => {
    return (
        <div className="flex flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 flex-1 min-w-0">
                <div
                    className="w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center"
                    style={{ backgroundColor: AUTH.BACKGROUND_QUATERNARY }}
                >
                    <Mail size={20} style={{ color: AUTH.GLOBAL_ACCENT }} />
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-sm pb-1" style={{ color: AUTH.TEXT_SECONDARY }}>Email</p>
                    <p className="break-all sm:break-normal" style={{ color: AUTH.TEXT_PRIMARY }}>{user.email}</p>
                </div>
            </div>

            {hasPassword && (
                <button
                    onClick={onEditStart}
                    className="p-2 rounded-lg hover:opacity-80 transition-opacity"
                    style={{ color: AUTH.TEXT_PRIMARY }}
                    title="Edit email"
                >
                    <Pencil size={18} />
                </button>
            )}

            {!hasPassword && (
                <span
                    className="px-2.5 py-1 text-[10px] sm:text-xs rounded-full"
                    style={{
                        backgroundColor: AUTH.GLOBAL_ACCENT_15,
                        color: AUTH.GLOBAL_ACCENT,
                    }}
                >
                    Managed by Google
                </span>
            )}
        </div>
    )
}

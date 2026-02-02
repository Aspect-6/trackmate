import React from 'react'
import type { ProfileSection } from '@/pages/Account/types'
import { Mail, Pencil } from 'lucide-react'
import { ACCOUNT } from '@/app/styles/colors'

export const EmailRowDisplay: React.FC<ProfileSection.Content.EmailRow.DisplayProps> = ({
    user,
    hasPassword,
    onEditStart,
}) => {
    return (
        <div className="flex flex-row items-center justify-between gap-4">
            <div className="flex items-start gap-4 flex-1 min-w-0">
                <div
                    className="w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center"
                    style={{ backgroundColor: ACCOUNT.BACKGROUND_QUATERNARY }}
                >
                    <Mail size={20} style={{ color: ACCOUNT.GLOBAL_ACCENT }} />
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-sm pb-1" style={{ color: ACCOUNT.TEXT_SECONDARY }}>Email</p>
                    <p className="break-all sm:break-normal" style={{ color: ACCOUNT.TEXT_PRIMARY }}>{user.email}</p>
                </div>
            </div>

            {hasPassword && (
                <button
                    onClick={onEditStart}
                    className="p-2 rounded-lg hover:opacity-80 transition-opacity"
                    style={{ color: ACCOUNT.TEXT_PRIMARY }}
                    title="Edit email"
                >
                    <Pencil size={18} />
                </button>
            )}

            {!hasPassword && (
                <span
                    className="px-2.5 py-1 text-[10px] sm:text-xs rounded-full"
                    style={{
                        backgroundColor: ACCOUNT.GLOBAL_ACCENT_15,
                        color: ACCOUNT.GLOBAL_ACCENT,
                    }}
                >
                    Managed by Google
                </span>
            )}
        </div>
    )
}

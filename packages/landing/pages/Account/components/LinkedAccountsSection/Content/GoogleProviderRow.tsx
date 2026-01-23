import React from 'react'
import { AUTH } from '@/app/styles/colors'
import GoogleIconColored from '@/app/assets/google-icon.svg?react'
import GoogleIconMono from '@/app/assets/google-icon-mono.svg?react'
import type { LinkedAccountsSection } from '@/pages/Account/types'

const GoogleProviderRow: React.FC<LinkedAccountsSection.Content.GoogleProviderRowProps> = ({
    isLinked,
    canUnlink,
    loading,
    onLink,
    onUnlink,
}) => {
    return (
        <div
            className="p-5 rounded-xl mb-4"
            style={{
                backgroundColor: AUTH.BACKGROUND_TERTIARY,
                border: `1px solid ${AUTH.BORDER_PRIMARY}`,
            }}
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: isLinked ? 'rgba(66, 133, 244, 0.15)' : AUTH.BACKGROUND_QUATERNARY }}
                    >
                        {isLinked ? (
                            <GoogleIconColored className="w-5 h-5" />
                        ) : (
                            <GoogleIconMono className="w-5 h-5" style={{ color: AUTH.TEXT_SECONDARY }} />
                        )}
                    </div>
                    <div>
                        <p className="font-medium" style={{ color: AUTH.TEXT_PRIMARY }}>Google</p>
                        <p className="text-sm" style={{ color: AUTH.TEXT_SECONDARY }}>
                            {isLinked ? 'Connected' : 'Not connected'}
                        </p>
                    </div>
                </div>
                {isLinked ? (
                    <button
                        onClick={onUnlink}
                        disabled={loading || !canUnlink}
                        className="px-4 py-2 rounded-lg text-sm font-medium transition-opacity hover:opacity-80 disabled:opacity-50"
                        style={{
                            backgroundColor: 'transparent',
                            border: `1px solid ${AUTH.BORDER_PRIMARY}`,
                            color: AUTH.TEXT_PRIMARY,
                        }}
                        title={!canUnlink ? 'You need at least one sign-in method' : undefined}
                    >
                        Disconnect
                    </button>
                ) : (
                    <button
                        onClick={onLink}
                        disabled={loading}
                        className="px-4 py-2 rounded-lg text-sm font-medium transition-opacity hover:opacity-80"
                        style={{
                            backgroundColor: AUTH.GLOBAL_ACCENT,
                            color: '#fff',
                        }}
                    >
                        Connect
                    </button>
                )}
            </div>
        </div>
    )
}

export default GoogleProviderRow

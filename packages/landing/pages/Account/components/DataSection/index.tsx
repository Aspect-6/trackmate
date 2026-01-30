import React from 'react'
import { AUTH } from '@/app/styles/colors'
import DeleteAccountCard from './Content/DeleteAccountCard'

const DataSection: React.FC = () => {
    return (
        <div>
            <div className="mb-8 pb-4" style={{ borderBottom: `1px solid ${AUTH.BORDER_PRIMARY}` }}>
                <h2 className="text-2xl font-bold mb-1" style={{ color: AUTH.TEXT_PRIMARY }}>
                    Your Data
                </h2>
                <p style={{ color: AUTH.TEXT_SECONDARY }}>
                    Manage your account data
                </p>
            </div>
            <DeleteAccountCard />
        </div>
    )
}

export default DataSection

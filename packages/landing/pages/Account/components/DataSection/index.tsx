import React from 'react'
import DeleteAccountCard from './Content/DeleteAccountCard'
import { ACCOUNT } from '@/app/styles/colors'

const DataSection: React.FC = () => {
    return (
        <div>
            <div className="mb-8 pb-4" style={{ borderBottom: `1px solid ${ACCOUNT.BORDER_PRIMARY}` }}>
                <h2 className="text-2xl font-bold mb-1" style={{ color: ACCOUNT.TEXT_PRIMARY }}>
                    Your Data
                </h2>
                <p style={{ color: ACCOUNT.TEXT_SECONDARY }}>
                    Manage your account data
                </p>
            </div>
            <DeleteAccountCard />
        </div>
    )
}

export default DataSection

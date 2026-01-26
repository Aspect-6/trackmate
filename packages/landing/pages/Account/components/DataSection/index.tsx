import React from 'react'
import { AUTH } from '@/app/styles/colors'
import DeleteAccountCard from './Content/DeleteAccountCard'

const DataSection: React.FC = () => {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-2" style={{ color: AUTH.TEXT_PRIMARY }}>
                Your Data
            </h2>
            <p className="mb-8" style={{ color: AUTH.TEXT_SECONDARY }}>
                Manage your account data
            </p>
            <DeleteAccountCard />
        </div>
    )
}

export default DataSection

import React from "react"
import { useFirestoreItems } from "@/app/hooks/data/useFirestore"
import type { AcademicTerm } from "@/app/types"
import type { CanvasIntegrationSettings } from "@/pages/Settings/types"
import { FIRESTORE_KEYS } from "@/app/config/firestoreKeys"
import { SETTINGS } from "@/app/styles/colors"

const ConnectionDropdown: React.FC<CanvasIntegrationSettings.Content.ConnectionForm.DropdownProps> = ({ value, onChange }) => {
    const [terms] = useFirestoreItems<AcademicTerm>(FIRESTORE_KEYS.TERMS)

    return (
        <div>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="app-select-dropdown w-full p-2.5"
            >
                <option value="" disabled>Select a term...</option>
                {terms.map(t => (
                    <option key={t.id} value={t.id}>{t.name}</option>
                ))}
            </select>
            <p className="text-xs mt-2 ml-2" style={{ color: SETTINGS.TEXT_SECONDARY }}>
                Syncing will automatically stop when this term ends.
            </p>
        </div>
    )
}

export default ConnectionDropdown

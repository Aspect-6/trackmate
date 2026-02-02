import React from "react"
import type { TermSettings } from "@/pages/Settings/types"
import { SETTINGS } from "@/app/styles/colors"

const TermSettingsComponent: React.FC<TermSettings.Props> = ({ children }) => {
    return (
        <div
            className="settings-card p-5 sm:p-6 rounded-xl shadow-md mb-6 space-y-4"
            style={{
                backgroundColor: SETTINGS.BACKGROUND_PRIMARY,
                border: `1px solid ${SETTINGS.BORDER_PRIMARY}`,
            }}
        >
            {children}
        </div>
    )
}

export default TermSettingsComponent

export { default as TermSettingsContent } from "./Content"
export { default as TermList } from "./Content/TermList"
export { default as TermItem } from "./Content/TermList/TermItem"
export { default as TermItemHeader } from "./Content/TermList/TermItem/Header"
export { default as TermItemHeaderName } from "./Content/TermList/TermItem/Header/Name"
export { default as TermItemHeaderDates } from "./Content/TermList/TermItem/Header/Dates"
export { default as TermItemHeaderEditButton } from "./Content/TermList/TermItem/Header/EditButton"
export { default as TermItemHeaderDeleteButton } from "./Content/TermList/TermItem/Header/DeleteButton"
export { default as TermItemBody } from "./Content/TermList/TermItem/Body"
export { default as TermItemBodySemester } from "./Content/TermList/TermItem/Body/Semester"
export { default as AddTermButton } from "./Content/AddTermButton"
export { default as NoTermsYetButton } from "./Content/NoTermsYetButton"
export { default as TermModeDropdown } from "./Content/TermModeDropdown"
export { default as TermModeDropdownOption } from "./Content/TermModeDropdown/TermModeDropdownOption"
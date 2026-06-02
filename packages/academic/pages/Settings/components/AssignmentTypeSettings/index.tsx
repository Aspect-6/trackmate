import React from "react"
import { useAssignmentTypeSettings } from "@/pages/Settings/hooks/useAssignmentTypeSettings"
import { BaseModuleHeader, BaseModuleDescription } from "@/pages/Settings/components/BaseModule"
import AssignmentTypeList from "./AssignmentTypeList"
import AssignmentTypeListRow from "./AssignmentTypeListRow"
import AddTypeInput from "./AddTypeInput"
import AddTypeButton from "./AddTypeButton"
import { SETTINGS } from "@/app/styles/colors"

const AssignmentTypeSettingsComponent: React.FC = () => {
    const {
        assignmentTypes,
        newType,
        sensors,
        setNewType,
        handleAdd,
        handleRemove,
        handleDragEnd,
        moveType,
    } = useAssignmentTypeSettings()

    return (
        <div
            className="settings-card p-5 sm:p-6 rounded-xl shadow-md mb-6 space-y-4"
            style={{
                backgroundColor: SETTINGS.BACKGROUND_PRIMARY,
                border: `1px solid ${SETTINGS.BORDER_PRIMARY}`,
            }}
        >
            <BaseModuleHeader title="Assignment Types" className="mb-4" />
            <BaseModuleDescription>
                Reorder, add, or remove the items that show up in assignment type dropdowns.
            </BaseModuleDescription>

            <div className="space-y-4">
                <AssignmentTypeList sensors={sensors} onDragEnd={handleDragEnd} items={assignmentTypes}>
                    {assignmentTypes.map((type, index) => (
                        <AssignmentTypeListRow
                            key={type}
                            type={type}
                            isFirst={index === 0}
                            isLast={index === assignmentTypes.length - 1}
                            isOnly={assignmentTypes.length === 1}
                            onMoveUp={() => moveType(type, "up")}
                            onMoveDown={() => moveType(type, "down")}
                            onRemove={() => handleRemove(type)}
                        />
                    ))}
                </AssignmentTypeList>

                <div className="flex flex-col sm:flex-row gap-3">
                    <AddTypeInput value={newType} onChange={setNewType} />
                    <AddTypeButton onClick={handleAdd}>Add Type</AddTypeButton>
                </div>
            </div>
        </div>
    )
}

export default AssignmentTypeSettingsComponent

import React from "react"
import type { TodaysClasses } from "@/pages/Dashboard/types"
import ClassItem from "./ClassItem"

const ClassList: React.FC<TodaysClasses.Body.ClassList.Props> = ({ classIds, getClassById, openModal }) => {
    return (
        <>
            {classIds.map((classId, index) => {
                if (!classId) return null
                const classInfo = getClassById(classId)
                if (!classInfo) return null
                return (
                    <ClassItem
                        key={index}
                        classInfo={classInfo}
                        period={index + 1}
                        openModal={openModal}
                    />
                )
            })}
        </>
    )
}

export default ClassList

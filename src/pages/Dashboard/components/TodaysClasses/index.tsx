import React from 'react'
import type { TodaysClasses } from '@/pages/Dashboard/types'
import { DASHBOARD } from '@/app/styles/colors'
import TodaysClassesHeader from './TodaysClassesHeader'
import TodaysClassesBody, { ClassList, NoClassesScheduled, NoSchool } from './Body'

const TodaysClasses: React.FC<TodaysClasses.Props> = ({
    classIds,
    noSchool,
    getClassById,
    openModal,
    isMobile,
    isCollapsed,
    onToggleCollapse
}) => {
    const hasClasses = classIds.length > 0 && classIds.some(id => id !== null)
    const showEmptyState = noSchool || !hasClasses

    return (
        <div
            className="p-6 rounded-xl shadow-sm sm:shadow-md"
            style={{
                backgroundColor: DASHBOARD.BACKGROUND_PRIMARY,
                border: `1px solid ${DASHBOARD.BORDER_PRIMARY}`,
                paddingBottom: isMobile && isCollapsed ? '0' : undefined
            }}
        >
            <TodaysClassesHeader
                isMobile={isMobile}
                isCollapsed={isCollapsed}
                onToggleCollapse={onToggleCollapse}
            />

            <TodaysClassesBody isMobile={isMobile} isCollapsed={isCollapsed}>
                {showEmptyState ? (
                    noSchool ? (
                        <NoSchool noSchool={noSchool} />
                    ) : (
                        <NoClassesScheduled />
                    )
                ) : (
                    <ClassList
                        classIds={classIds}
                        getClassById={getClassById}
                        openModal={openModal}
                    />
                )}
            </TodaysClassesBody>
        </div>
    )
}

export default TodaysClasses

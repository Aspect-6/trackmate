import React from 'react';
import { TodaysClassesProps } from '@/pages/Dashboard/types';
import ClassItem from '@/pages/Dashboard/components/ClassItem';
import { GLOBAL, DASHBOARD } from '@/app/styles/colors';

const TodaysClasses: React.FC<TodaysClassesProps> = ({ classIds, noSchool, getClassById, openModal }) => {
    return (
        <div 
            className="high-contrast-card p-6 rounded-xl"
            style={{ backgroundColor: '#161b22', borderColor: '#30363d' }}
        >
            <h2 className="text-xl font-bold mb-4" style={{ color: GLOBAL.ASSIGNMENT_HEADING_TEXT }}>Today's Classes</h2>
            <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
                {noSchool ? (
                    <div className="text-center py-8">
                        <p className="font-semibold text-lg mb-1" style={{ color: DASHBOARD.NO_SCHOOL_TEXT }}>No School</p>
                        <p style={{ color: DASHBOARD.TEXT_GRAY_400 }}>{noSchool.name}</p>
                    </div>
                ) : classIds.length === 0 || classIds.every(id => !id) ? (
                    <p className="text-center py-4" style={{ color: DASHBOARD.TEXT_GRAY_500 }}>No classes scheduled for today.</p>
                ) : (
                    classIds.map((classId, index) => {
                        if (!classId) return null;
                        const classInfo = getClassById(classId);
                        if (!classInfo) return null;
                        return (
                            <ClassItem
                                key={index}
                                classInfo={classInfo}
                                period={index + 1}
                                openModal={openModal}
                            />
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default TodaysClasses;

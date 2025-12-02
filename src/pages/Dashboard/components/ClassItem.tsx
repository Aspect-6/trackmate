import React, { useState } from 'react';
import { ClassItemProps } from '@/pages/Dashboard/types';
import { DASHBOARD } from '@/app/styles/colors';

const ClassItem: React.FC<ClassItemProps> = ({ classInfo, period, openModal }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="flex items-center justify-between p-3 class-card rounded-lg transition-colors cursor-pointer"
            style={{
                borderLeft: `4px solid ${classInfo.color}`,
                backgroundColor: isHovered ? DASHBOARD.CLASS_ITEM_HOVER_BG : DASHBOARD.CLASS_ITEM_BG
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => openModal('edit-class', classInfo.id)}
        >
            <div className="flex-1">
                <p className="font-semibold" style={{ color: DASHBOARD.TEXT_WHITE }}>{classInfo.name}</p>
                <p className="text-xs" style={{ color: DASHBOARD.TEXT_GRAY_400 }}>Period {period} • {classInfo.teacherName || 'N/A'}</p>
            </div>
            <div className="text-right">
                <p className="text-xs" style={{ color: DASHBOARD.TEXT_GRAY_400 }}>Room: {classInfo.roomNumber || 'N/A'}</p>
            </div>
        </div>
    );
};

export default ClassItem;

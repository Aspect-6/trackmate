import React from 'react';
import AssignmentItem from './AssignmentItem';
import { AssignmentListProps } from '@/pages/Calendar/types';

const AssignmentList: React.FC<AssignmentListProps> = ({ assignments, getClassColor, onAssignmentClick }) => (
    <>
        {assignments.map(a => (
            <AssignmentItem key={a.id} assignment={a} color={getClassColor(a.classId)} onClick={onAssignmentClick} />
        ))}
    </>
);

export default React.memo(AssignmentList);

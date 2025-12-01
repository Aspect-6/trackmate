import React from 'react';
import { useApp } from '@/app/context/AppContext';
import { todayString } from '@/app/lib/utils';
import AssignmentCard from '@/pages/Dashboard/components/AssignmentCard';
import TodaysEvents from '@/pages/Dashboard/components/TodaysEvents';
import TodaysClasses from '@/pages/Dashboard/components/TodaysClasses';
import { GLOBAL, DASHBOARD } from '@/app/styles/colors';
import '@/pages/Dashboard/index.css';

const Dashboard: React.FC = () => {
    const { assignments, events, getClassesForDate, getClassById, openModal, noSchool } = useApp();

    const today = todayString();

    // Check for No School
    const currentNoSchool = noSchool.find(ns => today >= ns.startDate && today <= ns.endDate);

    // Filter Assignments
    const activeAssignments = assignments
        .filter(a => a.status === 'To Do' || a.status === 'In Progress')
        .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());

    // Filter Events
    const todaysEvents = events.filter(event => event.date === today).sort((a, b) => {
        if (a.startTime && b.startTime) return a.startTime.localeCompare(b.startTime);
        if (a.startTime) return -1;
        if (b.startTime) return 1;
        return 0;
    });

    // Get Classes
    const todaysClasses = getClassesForDate(today);

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <TodaysEvents
                    events={todaysEvents}
                    onEventClick={(id) => openModal('edit-event', id)}
                />

                <TodaysClasses
                    classIds={todaysClasses}
                    noSchool={currentNoSchool}
                    getClassById={getClassById}
                    openModal={openModal}
                />
            </div>

            {/* Assignment List */}
            <div 
                className="high-contrast-card p-6 rounded-xl"
                style={{ backgroundColor: '#161b22', borderColor: '#30363d' }}
            >
                <h2 className="text-xl font-bold mb-4" style={{ color: GLOBAL.ASSIGNMENT_HEADING_TEXT }}>Upcoming Assignments</h2>
                <div className="space-y-3">
                    {activeAssignments.length === 0 ? (
                        <div className="text-center py-8">
                            <p style={{ color: DASHBOARD.TEXT_GRAY_500 }}>All tracked assignments are marked as done! Great job.</p>
                        </div>
                    ) : (
                        activeAssignments.map(assignment => (
                            <AssignmentCard key={assignment.id} assignment={assignment} />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

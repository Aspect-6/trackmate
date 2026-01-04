import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import ModalManager from '@/app/components/ModalManager'
import Layout from '@/app/layouts/Layout'
import Dashboard from '@/pages/Dashboard'
import MyAssignments from '@/pages/My Assignments'
import MyClasses from '@/pages/My Classes'
import MySchedule from '@/pages/My Schedule'
import Calendar from '@/pages/Calendar'
import Settings from '@/pages/Settings'

const App: React.FC = () => {
    return (
        <>
            <ModalManager />
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Navigate to="/dashboard" replace />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="calendar" element={<Calendar />} />
                    <Route path="assignments" element={<MyAssignments />} />
                    <Route path="classes" element={<MyClasses />} />
                    <Route path="schedule" element={<MySchedule />} />
                    <Route path="settings" element={<Settings />} />
                </Route>
            </Routes>
        </>
    )
}

export default App

import React from "react"
import { Routes, Route, Navigate, Outlet } from "react-router-dom"
import RequireAuth from "@shared/components/Auth/RequireAuth"
import NotFound from "@shared/pages/NotFound"
import ModalManager from "@/app/components/ModalManager"
import DataLoader from "@/app/components/DataLoader"
import Layout from "@/app/layouts/Layout"
import Dashboard from "@/pages/Dashboard"
import MyAssignments from "@/pages/My Assignments"
import MyClasses from "@/pages/My Classes"
import MySchedule from "@/pages/My Schedule"
import Calendar from "@/pages/Calendar"
import Settings from "@/pages/Settings"
import { ROUTES, DEFAULT_ROUTE, BASE_PATH } from "@/app/config/paths"
import { GLOBAL } from "@/app/styles/colors"

/**
 * Wrapper that combines RequireAuth with DataLoader.
 * Ensures user is authenticated AND data is loaded before rendering pages.
 */
const AuthenticatedDataLoader: React.FC = () => (
    <DataLoader>
        <Outlet />
    </DataLoader>
)

const App: React.FC = () => {
    return (
        <>
            <ModalManager />
            <Routes>
                <Route path={BASE_PATH} element={<Layout />}>
                    <Route element={<RequireAuth redirectTo="/auth/sign-in" requireEmailVerification={true} />}>
                        <Route element={<AuthenticatedDataLoader />}>
                            <Route index element={<Navigate to={DEFAULT_ROUTE.fullPath} replace />} />
                            <Route path={ROUTES["dashboard"].path} element={<Dashboard />} />
                            <Route path={ROUTES["calendar"].path} element={<Calendar />} />
                            <Route path={ROUTES["my-assignments"].path} element={<MyAssignments />} />
                            <Route path={ROUTES["my-classes"].path} element={<MyClasses />} />
                            <Route path={ROUTES["my-schedule"].path} element={<MySchedule />} />
                            <Route path={ROUTES["settings"].path} element={<Settings />} />
                        </Route>
                    </Route>
                </Route>
                <Route path="*" element={
                    <NotFound
                        text="Go To Dashboard"
                        path={ROUTES["dashboard"].fullPath}
                        buttonBg={GLOBAL.ADDITEM_BUTTON_BG}
                        buttonBgHover={GLOBAL.ADDITEM_BUTTON_BG_HOVER}
                    />
                } />
            </Routes>
        </>
    )
}

export default App

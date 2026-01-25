import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";
import Landing from "@/pages/Landing";
import Account from "@/pages/Account";
import VerifyEmail from "@/pages/VerifyEmail";
import ForgotPassword from "@/pages/ForgotPassword";
import ActionHandler from "@/pages/ActionHandler";
import NotFound from "@shared/pages/NotFound";
import { GLOBAL } from "@/app/styles/colors";
import "./index.css";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/account" element={<Account />} />
                <Route path="/verify-email" element={<VerifyEmail />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/auth-action" element={<ActionHandler />} />
                <Route path="/landing" element={<Landing />} />
                <Route path="/" element={<Navigate to="/landing" replace />} />
                <Route path="*" element={
                    <NotFound
                        text="Go Home"
                        path="/landing"
                        buttonBg={GLOBAL.PRIMARY_BUTTON_BG}
                        buttonBgHover={GLOBAL.PRIMARY_BUTTON_BG_HOVER}
                    />
                } />
            </Routes>
        </BrowserRouter>
    )
}

export default App
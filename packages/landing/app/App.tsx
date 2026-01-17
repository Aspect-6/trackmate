import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";
import Landing from "@/pages/Landing";

import "./index.css";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/landing" element={<Landing />} />
                {/* Temporary redirect so build doesn't 404 */}
                <Route path="/" element={<Navigate to="/landing" replace />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
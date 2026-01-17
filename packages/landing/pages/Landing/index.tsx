import React from 'react'

const Landing: React.FC = () => {
    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#0f172a", // dark hub-style background
                color: "#e5e7eb",
            }}
        >
            <h1 style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>
                TrackMate
            </h1>
            <p style={{ opacity: 0.8, marginBottom: "2rem" }}>
                Unified planners.
            </p>

            <button
                style={{
                    padding: "0.75rem 1.5rem",
                    margin: "0.5rem",
                    borderRadius: "8px",
                    border: "none",
                    cursor: "pointer",
                    backgroundColor: "hsl(206, 63%, 44%)", // system-wide accent
                    color: "white",
                    fontSize: "1rem",
                }}
                onClick={() => {
                    window.location.pathname = "/academic";
                }}
            >
                Enter Hub
            </button>
            <button
                style={{
                    padding: "0.75rem 1.5rem",
                    margin: "0.5rem",
                    borderRadius: "8px",
                    border: "none",
                    cursor: "pointer",
                    backgroundColor: "hsl(206, 63%, 44%)", // system-wide accent
                    color: "white",
                    fontSize: "1rem",
                }}
                onClick={() => {
                    window.location.pathname = "/sign-in";
                }}
            >
                Sign In
            </button>
            <button
                style={{
                    padding: "0.75rem 1.5rem",
                    margin: "0.5rem",
                    borderRadius: "8px",
                    border: "none",
                    cursor: "pointer",
                    backgroundColor: "hsl(206, 63%, 44%)", // system-wide accent
                    color: "white",
                    fontSize: "1rem",
                }}
                onClick={() => {
                    window.location.pathname = "/sign-up";
                }}
            >
                Sign Up
            </button>
        </div>
    )
}

export default Landing
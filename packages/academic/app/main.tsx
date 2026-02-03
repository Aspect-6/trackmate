import React from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { ModalProvider } from "@/app/contexts/ModalContext"
import { ScheduleComponentsProvider } from "@/app/contexts/ScheduleComponentsContext"
import { ToastProvider } from "@shared/contexts/ToastContext"
import { AuthProvider } from "@shared/contexts/AuthContext"
import { FirestoreCacheProvider } from "@shared/contexts/FirestoreCacheContext"
import App from "@/app/App"
import { APP_FULL_NAME } from "@/app/config/brand"

import "./index.css"

const rootElement = document.getElementById("root")

if (!rootElement) {
	throw new Error("Root element not found")
}

// Apply document title
document.title = APP_FULL_NAME

// Apply the saved theme before React hydrates
const savedTheme = localStorage.getItem("trackmateTheme")
const initialTheme = savedTheme === "dark" ? "dark" : "light"
document.documentElement.classList.remove("light", "dark")
document.documentElement.classList.add(initialTheme)

createRoot(rootElement).render(
	<React.StrictMode>
		<BrowserRouter>
			<ToastProvider>
				<AuthProvider>
					<FirestoreCacheProvider>
						<ModalProvider>
							<ScheduleComponentsProvider>
								<App />
							</ScheduleComponentsProvider>
						</ModalProvider>
					</FirestoreCacheProvider>
				</AuthProvider>
			</ToastProvider>
		</BrowserRouter>
	</React.StrictMode>
)


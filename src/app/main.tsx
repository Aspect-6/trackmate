import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AppProvider } from '@/app/contexts/AppContext'
import { ToastProvider } from '@/app/contexts/ToastContext'
import App from '@/app/App'
import { APP_FULL_NAME } from '@/app/config/brand'

import './index.css'

const rootElement = document.getElementById('root')

if (!rootElement) {
	throw new Error('Root element not found')
}

// Apply document title
document.title = APP_FULL_NAME

// Apply the saved theme before React hydrates
const savedTheme = localStorage.getItem('trackmateTheme')
const initialTheme = savedTheme === 'dark' ? 'dark' : 'light'
document.documentElement.classList.remove('light', 'dark')
document.documentElement.classList.add(initialTheme)

createRoot(rootElement).render(
	<StrictMode>
		<BrowserRouter>
			<ToastProvider>
				<AppProvider>
					<App />
				</AppProvider>
			</ToastProvider>
		</BrowserRouter>
	</StrictMode>
)

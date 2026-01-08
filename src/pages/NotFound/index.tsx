import React from 'react'
import { Link } from 'react-router-dom'
import { Home } from 'lucide-react'
import { APP_NAME } from '@/app/config/brand'
import './index.css'

const NotFound: React.FC = () => {
    return (
        <div className="not-found-page">
            <div className="not-found-brand">{APP_NAME}</div>
            <div className="not-found-container">
                <h1 className="not-found-title">404</h1>
                <h2 className="not-found-subtitle">Page Not Found</h2>
                <p className="not-found-message">
                    The page you're looking for doesn't exist or has been moved.
                </p>
                <Link to="/dashboard" className="not-found-button">
                    <Home className="w-5 h-5" />
                    <span>Back to Dashboard</span>
                </Link>
            </div>
        </div>
    )
}

export default NotFound


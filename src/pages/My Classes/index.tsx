import React from 'react'
import { useApp } from '@/app/context/AppContext'
import ClassBoard from './components/ClassBoard'
import './index.css'

const Classes: React.FC = () => {
    const { classes, openModal, reorderClasses } = useApp()

    return (
        <div className="space-y-6">
            <ClassBoard
                classes={classes}
                onReorder={reorderClasses}
                onAddClass={() => openModal('add-class')}
                openModal={openModal}
            />
        </div>
    )
}

export default Classes

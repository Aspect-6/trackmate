import React from 'react'
import { useClasses } from '@/app/hooks/useClasses'
import ClassBoard from './components/ClassBoard'
import './index.css'

const MyClasses: React.FC = () => {
    const { classes, reorderClasses, openAddClass, openEditClass } = useClasses()

    return (
        <div className="space-y-6">
            <ClassBoard
                classes={classes}
                onReorder={reorderClasses}
                onAddClass={openAddClass}
                openEditClass={openEditClass}
            />
        </div>
    )
}

export default MyClasses

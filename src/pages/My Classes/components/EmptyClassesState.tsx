import React from 'react';
import { EmptyClassesStateProps } from '@/pages/My Classes/types';
import { MY_CLASSES } from '@/app/styles/colors';

const EmptyClassesState: React.FC<EmptyClassesStateProps> = ({ onAddClass }) => {
    return (
        <div className="col-span-full text-center py-12">
            <p className="text-gray-500 text-lg">No classes added yet.</p>
            <button
                onClick={onAddClass}
                className="mt-4 font-medium"
                style={{ color: MY_CLASSES.CLASS_TEXT_THEME }}
                onMouseEnter={(e) => e.currentTarget.style.color = MY_CLASSES.CLASS_TEXT_THEME_HOVER} // Slightly darker for hover
                onMouseLeave={(e) => e.currentTarget.style.color = MY_CLASSES.CLASS_TEXT_THEME}
            >
                Add your first class
            </button>
        </div>
    );
};

export default EmptyClassesState;

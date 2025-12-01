import React, { useEffect, useState } from 'react';
import { useApp } from '@/app/context/AppContext';
import { todayString } from '@/app/lib/utils';
import { NoSchoolPeriod } from '@/app/types';
import {
    GLOBAL
} from '@/app/styles/colors';

interface ModalProps {
    onClose: () => void;
}

interface NoSchoolModalProps extends ModalProps {
    noSchoolId: string;
}

export const AddNoSchoolModal: React.FC<ModalProps> = ({ onClose }) => {
    const { addNoSchool } = useApp();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);

        let startDate = formData.get('startDate') as string;
        if (!startDate || isNaN(new Date(startDate).getTime())) {
            startDate = todayString();
        }

        let endDate = formData.get('endDate') as string;
        if (!endDate || isNaN(new Date(endDate).getTime())) {
            endDate = todayString();
        }

        const newNoSchool = {
            name: formData.get('name') as string,
            startDate: startDate,
            endDate: endDate
        };
        addNoSchool(newNoSchool);
        onClose();
    };

    return (
        <div className="w-full max-w-md p-6 rounded-xl" style={{ backgroundColor: GLOBAL.MODAL_BG }}>
            <h2 className="text-xl font-bold mb-4" style={{ color: GLOBAL.NOSCHOOL_HEADING_TEXT }}>Add No School Period</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Reason / Name</label>
                    <input type="text" name="name" required
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[var(--focus-color)]"
                        placeholder="e.g. Winter Break"
                        style={{ '--focus-color': GLOBAL.NOSCHOOL_BUTTON_BG } as React.CSSProperties}
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Start Date</label>
                        <input type="date" name="startDate" required defaultValue={todayString()}
                            className="w-full max-w-full min-w-0 box-border mt-1 p-2 rounded bg-gray-700 border border-gray-600 focus:ring-[var(--focus-color)] focus:border-[var(--focus-color)] text-white appearance-none"
                            style={{ '--focus-color': GLOBAL.NOSCHOOL_BUTTON_BG } as React.CSSProperties}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">End Date</label>
                        <input type="date" name="endDate" required defaultValue={todayString()}
                            className="w-full max-w-full min-w-0 box-border mt-1 p-2 rounded bg-gray-700 border border-gray-600 focus:ring-[var(--focus-color)] focus:border-[var(--focus-color)] text-white appearance-none"
                            style={{ '--focus-color': GLOBAL.NOSCHOOL_BUTTON_BG } as React.CSSProperties}
                        />
                    </div>
                </div>
                <div className="flex justify-end space-x-3 mt-6">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 rounded-lg text-sm font-medium"
                        style={{ backgroundColor: GLOBAL.CANCEL_BUTTON_BG, color: GLOBAL.CANCEL_BUTTON_TEXT }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = GLOBAL.CANCEL_BUTTON_BG_HOVER}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = GLOBAL.CANCEL_BUTTON_BG}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 rounded-lg text-sm font-medium text-white transition-colors duration-150"
                        style={{ backgroundColor: GLOBAL.NOSCHOOL_BUTTON_BG }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = GLOBAL.NOSCHOOL_BUTTON_BG_HOVER}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = GLOBAL.NOSCHOOL_BUTTON_BG}
                    >
                        Add Period
                    </button>
                </div>
            </form>
        </div>
    );
};

export const EditNoSchoolModal: React.FC<NoSchoolModalProps> = ({ onClose, noSchoolId }) => {
    const { noSchool, updateNoSchool, openModal } = useApp();
    const [formData, setFormData] = useState<NoSchoolPeriod | null>(null);

    useEffect(() => {
        const period = noSchool.find(ns => ns.id === noSchoolId);
        if (period) setFormData(period);
    }, [noSchoolId, noSchool]);

    if (!formData) return null;

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const safeData = { ...formData };
        if (!safeData.startDate || isNaN(new Date(safeData.startDate).getTime())) {
            safeData.startDate = todayString();
        }
        if (!safeData.endDate || isNaN(new Date(safeData.endDate).getTime())) {
            safeData.endDate = todayString();
        }

        updateNoSchool(noSchoolId, safeData);
        onClose();
    };

    return (
        <div className="w-full max-w-md p-6 rounded-xl" style={{ backgroundColor: GLOBAL.MODAL_BG }}>
            <h2 className="text-xl font-bold mb-4" style={{ color: GLOBAL.NOSCHOOL_HEADING_TEXT }}>Edit No School Period</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Reason / Name</label>
                    <input
                        type="text"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[var(--focus-color)]"
                        style={{ '--focus-color': GLOBAL.NOSCHOOL_BUTTON_BG } as React.CSSProperties}
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Start Date</label>
                        <input
                            type="date"
                            value={formData.startDate}
                            onChange={e => setFormData({ ...formData, startDate: e.target.value })}
                            required
                            className="w-full max-w-full min-w-0 box-border mt-1 p-2 rounded bg-gray-700 border border-gray-600 focus:ring-[var(--focus-color)] focus:border-[var(--focus-color)] text-white appearance-none"
                            style={{ '--focus-color': GLOBAL.NOSCHOOL_BUTTON_BG } as React.CSSProperties}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">End Date</label>
                        <input
                            type="date"
                            value={formData.endDate}
                            onChange={e => setFormData({ ...formData, endDate: e.target.value })}
                            required
                            className="w-full max-w-full min-w-0 box-border mt-1 p-2 rounded bg-gray-700 border border-gray-600 focus:ring-[var(--focus-color)] focus:border-[var(--focus-color)] text-white appearance-none"
                            style={{ '--focus-color': GLOBAL.NOSCHOOL_BUTTON_BG } as React.CSSProperties}
                        />
                    </div>
                </div>
                <div className="flex justify-between mt-6">
                    <button type="button" onClick={() => { onClose(); openModal('delete-no-school', noSchoolId); }} className="px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150" style={{ backgroundColor: GLOBAL.DELETE_BUTTON_BG, color: GLOBAL.DELETE_BUTTON_TEXT }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = GLOBAL.DELETE_BUTTON_BG_HOVER} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = GLOBAL.DELETE_BUTTON_BG}>Delete</button>
                    <div className="flex space-x-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded-lg text-sm font-medium"
                            style={{ backgroundColor: GLOBAL.CANCEL_BUTTON_BG, color: GLOBAL.CANCEL_BUTTON_TEXT }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = GLOBAL.CANCEL_BUTTON_BG_HOVER}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = GLOBAL.CANCEL_BUTTON_BG}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 rounded-lg text-sm font-medium text-white transition-colors duration-150"
                            style={{ backgroundColor: GLOBAL.NOSCHOOL_BUTTON_BG }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = GLOBAL.NOSCHOOL_BUTTON_BG_HOVER}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = GLOBAL.NOSCHOOL_BUTTON_BG}
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export const DeleteNoSchoolModal: React.FC<NoSchoolModalProps> = ({ onClose, noSchoolId }) => {
    const { noSchool, deleteNoSchool } = useApp();
    const periodToDelete = noSchool.find(ns => ns.id === noSchoolId);

    if (!periodToDelete) return null;

    const handleDelete = () => {
        deleteNoSchool(noSchoolId);
        onClose();
    };

    return (
        <div className="w-full max-w-md p-6 rounded-xl" style={{ backgroundColor: GLOBAL.MODAL_BG }}>
            <h2 className="text-xl font-bold mb-4 text-red-400">Delete No School Period?</h2>
            <p className="text-gray-300 mb-4">
                Are you sure you want to delete <strong>{periodToDelete.name}</strong>?
            </p>
            <div className="flex justify-end space-x-3">
                <button
                    onClick={onClose}
                    className="px-4 py-2 rounded-lg text-sm font-medium"
                    style={{ backgroundColor: GLOBAL.CANCEL_BUTTON_BG, color: GLOBAL.CANCEL_BUTTON_TEXT }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = GLOBAL.CANCEL_BUTTON_BG_HOVER}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = GLOBAL.CANCEL_BUTTON_BG}
                >
                    Cancel
                </button>
                <button onClick={handleDelete} className="px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150" style={{ backgroundColor: GLOBAL.DELETE_BUTTON_BG, color: GLOBAL.DELETE_BUTTON_TEXT }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = GLOBAL.DELETE_BUTTON_BG_HOVER} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = GLOBAL.DELETE_BUTTON_BG}>Delete Period</button>
            </div>
        </div>
    );
};

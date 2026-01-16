import React, { useEffect, useState } from 'react'
import { useModal } from '@/app/contexts/ModalContext'
import { useClasses, useAcademicTerms } from '@/app/hooks/entities'
import { DASHBOARD, MODALS } from '@/app/styles/colors'
import {
    ModalContainer,
    ModalHeader,
    ModalFooter,
    ModalLabel,
    ModalTextInput,
    ModalSelectInput,
    ModalSelectInputOption,
    ModalCancelButton,
    ModalDeleteButton,
    ModalSubmitButton,
    ModalTabSwitcher,
    ModalTab,
    ModalTabPanelsContainer,
    ModalTabPanel,
} from '@shared/components/modal'

interface ClassFormModalProps {
    onClose: () => void
    classId?: string // If provided, modal is in edit mode
}

export const ClassFormModal: React.FC<ClassFormModalProps> = ({ onClose, classId }) => {
    const { classes, addClass, updateClass } = useClasses()
    const { academicTerms } = useAcademicTerms()
    const { openModal } = useModal()
    const [activeTab, setActiveTab] = useState<'details' | 'settings'>('details')
    const [formData, setFormData] = useState({
        name: '',
        color: MODALS.CLASS.COLORS[0]!,
        teacherName: '',
        roomNumber: '',
        termId: '',
        semesterId: ''
    })

    const isEditMode = !!classId
    const focusColor = MODALS.CLASS.PRIMARY_BG
    const selectedTerm = academicTerms.find(t => t.id === formData.termId)

    // Populate form with existing class data in edit mode (only on mount)
    useEffect(() => {
        if (isEditMode) {
            const classInfo = classes.find(c => c.id === classId)
            if (classInfo) {
                setFormData({
                    name: classInfo.name,
                    color: classInfo.color,
                    teacherName: classInfo.teacherName || '',
                    roomNumber: classInfo.roomNumber || '',
                    termId: classInfo.termId || '',
                    semesterId: classInfo.semesterId || ''
                })
            }
        }
    }, [])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const classData = {
            name: formData.name,
            color: formData.color,
            teacherName: formData.teacherName,
            roomNumber: formData.roomNumber,
            termId: formData.termId || undefined,
            semesterId: formData.semesterId || undefined
        }

        if (isEditMode) {
            updateClass(classId, classData)
        } else {
            const success = addClass(classData)
            if (!success) return
        }
        onClose()
    }

    const handleDelete = () => {
        onClose()
        openModal('delete-class', classId)
    }

    const handleTermChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFormData({
            ...formData,
            termId: e.target.value,
            semesterId: '' // Reset semester when term changes
        })
    }

    return (
        <ModalContainer>
            <ModalHeader color={MODALS.CLASS.HEADING}>
                {isEditMode ? 'Edit Class' : 'Add New Class'}
            </ModalHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
                <ModalTabSwitcher ariaLabel="Class form tabs">
                    <ModalTab value="details" isActive={activeTab === 'details'} onClick={() => setActiveTab('details')}>
                        Details
                    </ModalTab>
                    <ModalTab value="settings" isActive={activeTab === 'settings'} onClick={() => setActiveTab('settings')}>
                        Settings
                    </ModalTab>
                </ModalTabSwitcher>

                <ModalTabPanelsContainer>
                    <ModalTabPanel isActive={activeTab === 'details'}>
                        <div>
                            <ModalLabel>Class Name</ModalLabel>
                            <ModalTextInput
                                name="name"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                placeholder="World History"
                                required
                                focusColor={focusColor}
                            />
                        </div>
                        <div className="flex space-x-4">
                            <div className="flex-1">
                                <ModalLabel>Instructor Name (Optional)</ModalLabel>
                                <ModalTextInput
                                    name="teacherName"
                                    value={formData.teacherName}
                                    onChange={e => setFormData({ ...formData, teacherName: e.target.value })}
                                    placeholder="Ms. Johnson"
                                    focusColor={focusColor}
                                />
                            </div>
                            <div className="flex-1">
                                <ModalLabel>Room Number (Optional)</ModalLabel>
                                <ModalTextInput
                                    name="roomNumber"
                                    value={formData.roomNumber}
                                    onChange={e => setFormData({ ...formData, roomNumber: e.target.value })}
                                    placeholder="101"
                                    focusColor={focusColor}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Color Code</label>
                            <div className="color-tile-grid custom-scrollbar-horizontal">
                                {MODALS.CLASS.COLORS.map(color => (
                                    <div
                                        key={color}
                                        onClick={() => setFormData({ ...formData, color })}
                                        className={`color-tile ${formData.color === color ? 'selected' : ''}`}
                                        style={{ backgroundColor: color }}
                                    />
                                ))}
                            </div>
                        </div>
                    </ModalTabPanel>
                    <ModalTabPanel isActive={activeTab === 'settings'}>
                        <div>
                            <ModalLabel>Academic Term (Optional)</ModalLabel>
                            <ModalSelectInput
                                value={formData.termId}
                                onChange={handleTermChange}
                                focusColor={focusColor}
                            >
                                <ModalSelectInputOption value="">No Term Assigned</ModalSelectInputOption>
                                {academicTerms.map(term => (
                                    <ModalSelectInputOption key={term.id} value={term.id}>
                                        {term.name}
                                    </ModalSelectInputOption>
                                ))}
                            </ModalSelectInput>
                        </div>
                        {selectedTerm && selectedTerm.semesters.length > 0 && (
                            <div>
                                <ModalLabel>Semester (Optional)</ModalLabel>
                                <ModalSelectInput
                                    value={formData.semesterId}
                                    onChange={e => setFormData({ ...formData, semesterId: e.target.value })}
                                    focusColor={focusColor}
                                >
                                    <ModalSelectInputOption value="">Year-long (Both Semesters)</ModalSelectInputOption>
                                    {selectedTerm.semesters.map(sem => (
                                        <ModalSelectInputOption key={sem.id} value={sem.id}>
                                            {sem.name}
                                        </ModalSelectInputOption>
                                    ))}
                                </ModalSelectInput>
                            </div>
                        )}
                        <p className="text-xs" style={{ color: DASHBOARD.TEXT_TERTIARY }}>
                            Classes added to a year-long term will occur every other day, while classes marked for a semester will occur every day for that semester.
                        </p>
                    </ModalTabPanel>
                </ModalTabPanelsContainer>

                <ModalFooter>
                    {isEditMode && <ModalDeleteButton className="mr-auto" onClick={handleDelete} />}
                    <ModalCancelButton onClick={onClose} />
                    <ModalSubmitButton
                        type="submit"
                        bgColor={MODALS.CLASS.PRIMARY_BG}
                        bgColorHover={MODALS.CLASS.PRIMARY_BG_HOVER}
                        textColor={MODALS.CLASS.PRIMARY_TEXT}
                    >
                        {isEditMode ? 'Save Changes' : 'Create Class'}
                    </ModalSubmitButton>
                </ModalFooter>
            </form>
        </ModalContainer>
    )
}

import React from 'react'
import { MODALS } from '@/app/styles/colors'
import {
    ModalContainer,
    ModalHeader,
    ModalFooter,
    ModalBodyText,
    ModalCancelButton,
    ModalDeleteButton,
} from '@shared/components/modal'

interface DeleteConfirmationModalProps {
    onClose: () => void
    title: string
    entityName?: string
    description?: string
    message?: string
    buttonText?: string
    onDelete: () => void
}

export const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
    onClose,
    title,
    entityName,
    description,
    message,
    buttonText = 'Delete',
    onDelete
}) => {
    const handleDelete = () => {
        onDelete()
        onClose()
    }

    return (
        <ModalContainer>
            <ModalHeader color={MODALS.BASE.DELETE_HEADING}>{title}</ModalHeader>
            <ModalBodyText>
                {message ? (
                    message
                ) : (
                    <>
                        Are you sure you want to delete <strong>{entityName}</strong>?
                        {description && <> {description}</>}
                    </>
                )}
            </ModalBodyText>
            <ModalFooter>
                <ModalCancelButton onClick={onClose} />
                <ModalDeleteButton onClick={handleDelete}>{buttonText}</ModalDeleteButton>
            </ModalFooter>
        </ModalContainer>
    )
}

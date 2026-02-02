import React from 'react'
import type { SecuritySection } from '@/pages/Account/types'
import { Check, X } from 'lucide-react'
import { Button } from '@/app/components/Button'

export const PasswordRowActions: React.FC<SecuritySection.Content.PasswordRow.ActionsProps> = ({
    onSave,
    onCancel,
    loading
}) => {
    return (
        <div className="flex gap-2 mt-3 w-full max-w-sm">
            <Button
                variant="primary"
                onClick={onSave}
                disabled={loading}
                isLoading={loading}
                fullWidth
                className="px-4 py-2"
            >
                <Check size={16} />
                <span>Save</span>
            </Button>
            <Button
                variant="secondary"
                onClick={onCancel}
                fullWidth
                className="px-4 py-2"
            >
                <X size={16} />
                <span>Cancel</span>
            </Button>
        </div>
    )
}

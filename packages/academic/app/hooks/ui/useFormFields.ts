import { useState } from "react"

type FormElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
type FormFieldValue = string | number | readonly string[] | undefined

/**
 * Typed helper for object-based form state.
 */
export const useFormFields = <T extends Record<string, FormFieldValue>>(initialState: T) => {
    const [formData, setFormData] = useState<T>(initialState)

    const setField = <K extends keyof T>(name: K, value: T[K]) => {
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const field = <K extends keyof T>(name: K) => ({
        value: formData[name],
        onChange: (e: React.ChangeEvent<FormElement>) => {
            setField(name, e.target.value as T[K])
        }
    })

    const fieldWithTransform = <K extends keyof T>(
        name: K,
        transform: (value: string) => T[K]
    ) => ({
        value: formData[name],
        onChange: (e: React.ChangeEvent<FormElement>) => {
            setField(name, transform(e.target.value))
        }
    })

    return {
        formData,
        setFormData,
        setField,
        field,
        fieldWithTransform
    }
}

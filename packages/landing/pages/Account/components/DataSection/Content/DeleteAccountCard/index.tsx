import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAccount } from "@/app/hooks/useAccount"
import { Header } from "./Header"
import { Container } from "./Container"
import { InitialView } from "./InitialView"
import { ConfirmationView } from "./ConfirmationView"

const DeleteAccountCard: React.FC = () => {
    const navigate = useNavigate()
    const { deleteAccount, loading } = useAccount()

    const [showConfirm, setShowConfirm] = useState(false)
    const [error, setError] = useState("")

    const handleConfirmDelete = async () => {
        setError("")
        const result = await deleteAccount()
        if (result.success) {
            navigate("/landing")
        } else {
            setError(result.error.message || "Failed to delete account")
        }
    }

    return (
        <div className="w-full max-w-2xl">
            <Header />
            <Container>
                {!showConfirm ? (
                    <InitialView onInitiateDelete={() => setShowConfirm(true)} />
                ) : (
                    <ConfirmationView
                        error={error}
                        loading={loading}
                        onConfirmDelete={handleConfirmDelete}
                        onCancelDelete={() => setShowConfirm(false)}
                    />
                )}
            </Container>
        </div>
    )
}

export default DeleteAccountCard

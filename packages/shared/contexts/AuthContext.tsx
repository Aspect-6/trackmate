import React, { createContext, useContext, useEffect, useState } from "react"
import { User, onIdTokenChanged } from "firebase/auth"
import { auth } from "@shared/lib"
import type { AuthContextType, AuthProviderProps } from "@shared/types/AuthContext"

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    const [isPremium, setIsPremium] = useState(false)

    useEffect(() => {
        const unsubscribe = onIdTokenChanged(auth, async (user) => {
            setUser(user)

            if (user) {
                const tokenResult = await user.getIdTokenResult()
                const premium = tokenResult.claims.premium as { academic?: boolean; all?: boolean } | undefined
                setIsPremium(premium?.academic === true || premium?.all === true)
            } else {
                setIsPremium(false)
            }

            setLoading(false)
        })

        return unsubscribe
    }, [])

    return (
        <AuthContext.Provider value={{ user, loading, isPremium }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}

import React, { useState, useEffect, useCallback } from "react"
import { useAuth } from "@shared/contexts/AuthContext"
import { getFunctions, httpsCallable } from "firebase/functions"
import { app } from "@shared/lib/firebase"
import { Shield, Loader2 } from "lucide-react"
import { ACCOUNT } from "@/app/styles/colors"

const functions = getFunctions(app)
const setPremiumClaimFn = httpsCallable(functions, "setPremiumClaim")

type Product = "academic"

const PRODUCTS: Product[] = ["academic"]

interface PremiumClaims {
    all?: boolean
    [product: string]: boolean | undefined
}

const PremiumClaimRow: React.FC = () => {
    const { user } = useAuth()
    const [claims, setClaims] = useState<PremiumClaims | null>(null)
    const [loading, setLoading] = useState<string | null>(null)

    const fetchClaims = useCallback(async () => {
        if (!user) return
        const tokenResult = await user.getIdTokenResult()
        console.log("Custom claims:", tokenResult.claims.premium)
        const premium = tokenResult.claims.premium as PremiumClaims | undefined
        setClaims(premium ?? null)
    }, [user])

    useEffect(() => {
        fetchClaims()
    }, [fetchClaims])

    const handleToggleAll = async () => {
        if (!user) return
        const newValue = !claims?.all
        setLoading("all")
        try {
            await setPremiumClaimFn({ all: newValue })
            await user.getIdToken(true)
            await fetchClaims()
        } catch (error) {
            console.error("Failed to update premium claim:", error)
        } finally {
            setLoading(null)
        }
    }

    const handleToggleProduct = async (product: Product) => {
        if (!user) return
        const isCurrentlyEnabled = claims?.[product] === true
        setLoading(product)
        try {
            const currentProducts = PRODUCTS.filter((p) =>
                p === product ? !isCurrentlyEnabled : claims?.[p] === true
            )
            await setPremiumClaimFn({
                all: false,
                products: currentProducts.length > 0 ? currentProducts : undefined,
            })
            await user.getIdToken(true)
            await fetchClaims()
        } catch (error) {
            console.error("Failed to update premium claim:", error)
        } finally {
            setLoading(null)
        }
    }

    if (!user) return null

    const isAllEnabled = claims?.all === true

    return (
        <div
            className="p-5 rounded-xl mt-4"
            style={{
                backgroundColor: ACCOUNT.BACKGROUND_TERTIARY,
                border: `1px solid ${ACCOUNT.BORDER_PRIMARY}`,
            }}
        >
            <div className="flex items-center gap-4 mb-4">
                <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: ACCOUNT.BACKGROUND_QUATERNARY }}
                >
                    <Shield size={20} style={{ color: ACCOUNT.GLOBAL_ACCENT }} />
                </div>
                <div>
                    <p className="text-sm font-semibold" style={{ color: ACCOUNT.TEXT_PRIMARY }}>
                        Premium Claims
                    </p>
                    <p className="text-xs" style={{ color: ACCOUNT.TEXT_SECONDARY }}>
                        Temporary — manage custom claims for testing
                    </p>
                </div>
            </div>

            <div className="flex flex-col gap-2">
                {/* All toggle */}
                <ToggleRow
                    label="All Products"
                    sublabel="Grants premium to everything"
                    enabled={isAllEnabled}
                    loading={loading === "all"}
                    onToggle={handleToggleAll}
                />

                {/* Per-product toggles */}
                {PRODUCTS.map((product) => (
                    <ToggleRow
                        key={product}
                        label={product.charAt(0).toUpperCase() + product.slice(1)}
                        enabled={isAllEnabled || claims?.[product] === true}
                        loading={loading === product}
                        disabled={isAllEnabled}
                        onToggle={() => handleToggleProduct(product)}
                    />
                ))}
            </div>

            <pre
                className="mt-3 p-3 rounded-lg text-xs overflow-auto"
                style={{
                    backgroundColor: ACCOUNT.BACKGROUND_QUATERNARY,
                    color: ACCOUNT.TEXT_SECONDARY,
                    fontFamily: "monospace",
                }}
            >
                {JSON.stringify(claims, null, 2) ?? "null"}
            </pre>
        </div>
    )
}

interface ToggleRowProps {
    label: string
    sublabel?: string
    enabled: boolean
    loading: boolean
    disabled?: boolean
    onToggle: () => void
}

const ToggleRow: React.FC<ToggleRowProps> = ({ label, sublabel, enabled, loading, disabled, onToggle }) => (
    <div
        className="flex items-center justify-between p-3 rounded-lg"
        style={{
            backgroundColor: ACCOUNT.BACKGROUND_QUATERNARY,
            opacity: disabled ? 0.6 : 1,
        }}
    >
        <div>
            <p className="text-sm font-medium" style={{ color: ACCOUNT.TEXT_PRIMARY }}>{label}</p>
            {sublabel && (
                <p className="text-xs" style={{ color: ACCOUNT.TEXT_SECONDARY }}>{sublabel}</p>
            )}
        </div>
        <button
            onClick={onToggle}
            disabled={loading || disabled}
            style={{
                width: 44,
                height: 24,
                borderRadius: 12,
                border: "none",
                cursor: disabled ? "default" : "pointer",
                backgroundColor: enabled ? ACCOUNT.GLOBAL_ACCENT : ACCOUNT.BORDER_PRIMARY,
                position: "relative",
                transition: "background-color 0.2s ease",
            }}
        >
            {loading ? (
                <Loader2
                    size={14}
                    className="animate-spin"
                    style={{
                        position: "absolute",
                        top: 5,
                        left: "50%",
                        transform: "translateX(-50%)",
                        color: "#fff",
                    }}
                />
            ) : (
                <span
                    style={{
                        display: "block",
                        width: 18,
                        height: 18,
                        borderRadius: "50%",
                        backgroundColor: "#fff",
                        position: "absolute",
                        top: 3,
                        left: enabled ? 23 : 3,
                        transition: "left 0.2s ease",
                    }}
                />
            )}
        </button>
    </div>
)

export default PremiumClaimRow

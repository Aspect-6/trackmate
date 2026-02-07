import React from "react"
import { useNavigate } from "react-router-dom"
import TrackMateLogo from "@shared/components/TrackMateLogo"
import Header from "@/pages/Landing/components/Header"
import Footer from "@/pages/Landing/components/Footer"
import ProfileAvatar from "@/pages/Landing/components/ProfileAvatar"
import HeroTitle from "@/pages/Landing/components/Hero/HeroTitle"
import HeroMessage from "@/pages/Landing/components/Hero/HeroMessage"
import ProductCard from "@/pages/Landing/components/ProductCard"
import Button from "@/pages/Landing/components/Button"
import { useAuth } from "@shared/contexts/AuthContext"
import { BRAND_NAME } from "@shared/config/brand"
import { LANDING } from "@/app/styles/colors"
import { PRODUCTS } from "@/pages/Landing/data/products"

const Landing: React.FC = () => {
    const navigate = useNavigate()
    const { user, loading } = useAuth()

    return (
        <div id="landing-container" className="min-h-dvh flex flex-col items-center p-8">
            <Header>
                <TrackMateLogo size={50} showBackground={false} crop className="lg:ml-8" />
                {!loading && (
                    user ? (
                        <div className="flex items-center gap-2">
                            <ProfileAvatar
                                user={user}
                                onClick={() => navigate("/account")}
                                className="lg:mr-8 ml-2"
                            />
                        </div>
                    ) : (
                        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                            <Button variant="secondary" onClick={() => navigate("/auth/sign-in")}>
                                Sign In
                            </Button>
                            <Button variant="primary" onClick={() => navigate("/auth/sign-up")} className="lg:mr-8">
                                Sign Up
                            </Button>
                        </div>
                    )
                )}
            </Header>

            <main className="flex-1 flex flex-col items-center justify-center text-center max-w-6xl">
                <HeroTitle>{BRAND_NAME}</HeroTitle>
                <HeroMessage>
                    Unified tracking for every aspect of your life.
                    <br />
                    Built to keep you efficient.
                </HeroMessage>

                <div className="flex flex-wrap gap-6 justify-center mb-12">
                    {PRODUCTS.map((product) => (
                        <ProductCard key={product.title} {...product} />
                    ))}
                </div>

                <p className="text-sm" style={{ color: LANDING.TEXT_TERTIARY }}>
                    More products coming soon
                </p>
            </main>

            <Footer>
                © {new Date().getFullYear()} {BRAND_NAME}. All rights reserved.
            </Footer>
        </div>
    )
}

export default Landing
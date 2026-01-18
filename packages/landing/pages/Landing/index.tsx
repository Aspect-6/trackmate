import React from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '@/pages/Landing/components/Header'
import Footer from '@/pages/Landing/components/Footer'
import HeroTitle from '@/pages/Landing/components/Hero/HeroTitle'
import HeroMessage from '@/pages/Landing/components/Hero/HeroMessage'
import ProductCard from '@/pages/Landing/components/ProductCard'
import Button from '@/pages/Landing/components/Button'
import { BRAND_NAME } from '@shared/config/brand'
import { LANDING } from '@/app/styles/colors'
import { PRODUCTS } from '@/pages/Landing/data/products'

const Landing: React.FC = () => {
    const navigate = useNavigate()

    return (
        <div className="landing min-h-dvh flex flex-col items-center p-8">
            <Header>
                <Button variant="secondary" onClick={() => navigate('/sign-in')}>
                    Sign In
                </Button>
                <Button variant="primary" onClick={() => navigate('/sign-up')}>
                    Sign Up
                </Button>
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
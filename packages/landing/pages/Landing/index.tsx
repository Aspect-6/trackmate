import React from 'react'
import { LANDING } from '@/app/styles/colors'
import { BRAND_NAME } from '@shared/config/brand'
import Header from '@/pages/Landing/components/Header'
import Footer from '@/pages/Landing/components/Footer'
import HeroTitle from '@/pages/Landing/components/Hero/HeroTitle'
import HeroMessage from '@/pages/Landing/components/Hero/HeroMessage'
import ProductCard from '@/pages/Landing/components/ProductCard'
import Button from '@/pages/Landing/components/Button'
import { PRODUCTS } from '@/pages/Landing/data/products'

const Landing: React.FC = () => {
    return (
        <div
            className="min-h-dvh flex flex-col items-center p-8"
            style={{
                background: `radial-gradient(ellipse at top, 
                    hsl(215, 30%, 16%) 0%, 
                    hsl(215, 28%, 14%) 15%, 
                    hsl(215, 25%, 12%) 30%, 
                    hsl(215, 22%, 10%) 45%, 
                    ${LANDING.WEBPAGE_BACKGROUND} 70%)`,
            }}
        >
            <Header>
                <Button variant="secondary" onClick={() => window.location.pathname = '/sign-in'}>
                    Sign In
                </Button>
                <Button variant="primary" onClick={() => window.location.pathname = '/sign-up'}>
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
import { Link } from 'react-router-dom'

import './Hero.css'

function Hero() {


    return (
        <section className="hero">
            <div className="hero-background">
                <div className="hero-glow"></div>
                <div className="hero-particles">
                    {[...Array(20)].map((_, i) => (
                        <span key={i} className="particle" style={{
                            '--delay': `${i * 0.5}s`,
                            '--x': `${Math.random() * 100}%`,
                            '--duration': `${15 + Math.random() * 10}s`
                        }}></span>
                    ))}
                </div>
            </div>

            <div className="container hero-content">
                <div className="hero-badge">
                    <span>🌍</span> Project by Inov8ors
                </div>

                <h1 className="hero-title">
                    <span className="title-line">Waste to</span>
                    <span className="title-line text-gradient">Worth</span>
                </h1>

                <p className="hero-subtitle">
                    We aren't cleaning cities.<br />
                    <strong>We're unlocking their hidden value.</strong>
                </p>

                <p className="hero-description">
                    Transform urban waste into reusable resources using AI-powered scanning,
                    community innovation, and circular economy partnerships.
                </p>

                <div className="hero-actions">
                    <Link to="/scanner" className="btn btn-primary btn-lg">
                        <span>📷</span> Scan Waste Now
                    </Link>
                    <Link to="/dashboard" className="btn btn-secondary btn-lg">
                        View Impact
                    </Link>
                </div>


            </div>


        </section >
    )
}

export default Hero

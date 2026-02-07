import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import StatCard from '../components/StatCard'
import { useApp } from '../context/AppContext'
import './Home.css'

function Home() {
    const { getStats } = useApp()
    const stats = getStats()

    const features = [
        {
            icon: '📷',
            title: 'Waste Scanner',
            description: 'Upload images of waste and our AI identifies the type, suggesting the best recycling or reuse options.',
            link: '/scanner',
            color: 'var(--primary-leaf)'
        },
        {
            icon: '💡',
            title: 'Crowd Reuse Ideas',
            description: 'Discover creative ways to repurpose waste. Share your ideas and vote for the best community solutions.',
            link: '/ideas',
            color: 'var(--accent-gold)'
        },
        {
            icon: '🏙️',
            title: 'FixMyCity',
            description: 'Report urban problems like garbage, potholes, and water leaks. Help make your city cleaner and safer.',
            link: '/fixmycity',
            color: 'var(--accent-coral)'
        },
        {
            icon: '📊',
            title: 'Impact Dashboard',
            description: 'Track our collective impact. See waste scanned, CO₂ saved, and items reused in real-time.',
            link: '/dashboard',
            color: '#42A5F5'
        }
    ]

    return (
        <div className="home-page">
            <Hero />

            {/* Features Section */}
            <section className="section features-section">
                <div className="container">
                    <div className="section-header text-center">
                        <span className="section-badge">🌟 Platform Features</span>
                        <h2>Everything You Need to Build a <span className="text-gradient">Circular City</span></h2>
                        <p>Powerful tools that connect citizens, businesses, and governments in the sustainability mission.</p>
                    </div>

                    <div className="features-grid grid grid-2">
                        {features.map((feature, index) => (
                            <Link
                                to={feature.link}
                                key={index}
                                className="feature-card glass-card"
                                style={{ '--feature-color': feature.color, '--delay': `${index * 0.1}s` }}
                            >
                                <div className="feature-icon">{feature.icon}</div>
                                <div className="feature-content">
                                    <h3>{feature.title}</h3>
                                    <p>{feature.description}</p>
                                </div>
                                <span className="feature-arrow">→</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Live Stats Section */}
            <section className="section stats-section">
                <div className="container">
                    <div className="section-header text-center">
                        <span className="section-badge">📈 Live Impact</span>
                        <h2>Our <span className="text-gradient">Collective</span> Progress</h2>
                    </div>

                    <div className="stats-grid grid grid-4">
                        <StatCard
                            icon="📷"
                            value={stats.scans.toLocaleString()}
                            label="Items Scanned"
                            color="var(--primary-leaf)"
                            delay={0}
                        />
                        <StatCard
                            icon="💡"
                            value={stats.ideas.toLocaleString()}
                            label="Reuse Ideas"
                            color="var(--accent-gold)"
                            delay={0.1}
                        />
                        <StatCard
                            icon="🌍"
                            value={`${stats.co2Saved.toFixed(1)} kg`}
                            label="CO₂ Saved"
                            color="#42A5F5"
                            delay={0.2}
                        />
                        <StatCard
                            icon="♻️"
                            value={stats.itemsReused.toLocaleString()}
                            label="Items Reused"
                            color="var(--accent-coral)"
                            delay={0.3}
                        />
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="section how-section">
                <div className="container">
                    <div className="section-header text-center">
                        <span className="section-badge">🔄 How It Works</span>
                        <h2>Three Steps to <span className="text-gradient">Transform</span> Waste</h2>
                    </div>

                    <div className="steps-container">
                        <div className="step-card">
                            <div className="step-number">01</div>
                            <div className="step-content">
                                <h3>Scan</h3>
                                <p>Upload a photo of any waste item. Our AI instantly identifies it and categorizes it.</p>
                            </div>
                        </div>
                        <div className="step-connector"></div>
                        <div className="step-card">
                            <div className="step-number">02</div>
                            <div className="step-content">
                                <h3>Discover</h3>
                                <p>Get personalized reuse suggestions and browse community ideas for creative upcycling.</p>
                            </div>
                        </div>
                        <div className="step-connector"></div>
                        <div className="step-card">
                            <div className="step-number">03</div>
                            <div className="step-content">
                                <h3>Act</h3>
                                <p>Repurpose, recycle, or connect with circular economy partners to give waste new life.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section cta-section">
                <div className="container">
                    <div className="cta-card glass-card">
                        <div className="cta-content">
                            <h2>Ready to Unlock Your City's Hidden Value?</h2>
                            <p>Join thousands of citizens already making a difference. Start scanning waste today.</p>
                            <div className="cta-actions">
                                <Link to="/scanner" className="btn btn-primary btn-lg">
                                    <span>📷</span> Start Scanning
                                </Link>
                                <Link to="/ideas" className="btn btn-secondary btn-lg">
                                    Browse Ideas
                                </Link>
                            </div>
                        </div>
                        <div className="cta-decoration">
                            <div className="cta-circle"></div>
                            <div className="cta-circle"></div>
                            <div className="cta-circle"></div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home

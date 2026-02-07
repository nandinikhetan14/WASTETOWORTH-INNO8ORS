import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'

function Footer() {
    const [activeModal, setActiveModal] = useState(null)

    const modalContent = {
        mission: {
            title: "Our Mission 🌍",
            content: (
                <>
                    <p>At <strong>Waste to Worth</strong>, we believe there is no such thing as "waste"—only resources in the wrong place.</p>
                    <p>Our goal is to revolutionize urban waste management by using AI to identify value in discarded items, connecting citizens with circular economy opportunities, and reducing landfill usage by 50% by 2030.</p>
                </>
            )
        },
        partners: {
            title: "Our Partners 🤝",
            content: (
                <div style={{ textAlign: 'center' }}>
                    <p style={{ marginBottom: '20px', fontSize: '1.05rem' }}>
                        Open for collaboration with recyclers, NGOs, startups, and city authorities to build smarter, sustainable communities.
                    </p>
                    <button className="btn btn-primary" onClick={() => setActiveModal('contact')}>
                        Let's Collaborate 🚀
                    </button>
                </div>
            )
        },
        contact: {
            title: "Contact Us 📞",
            content: (
                <>
                    <p>Have questions or feedback? We'd love to hear from you.</p>
                    <div style={{ marginTop: '15px' }}>
                        <p><strong>📧 Email:</strong> wastetoworth@gmail.com</p>
                        <p><strong>📱 Phone:</strong> XXXXXXXXXX</p>
                    </div>
                </>
            )
        }
    }

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-brand">
                        <div className="footer-logo">
                            <span className="brand-icon">🌱</span>
                            <span className="brand-name">Waste to Worth</span>
                        </div>
                        <p className="footer-tagline">
                            "We aren't cleaning cities.<br />
                            <strong>We're unlocking their hidden value.</strong>"
                        </p>
                    </div>

                    <div className="footer-links">
                        <div className="footer-column">
                            <h4>Platform</h4>
                            <ul>
                                <li><Link to="/scanner">Waste Scanner</Link></li>
                                <li><Link to="/ideas">Reuse Ideas</Link></li>
                                <li><Link to="/fixmycity">FixMyCity</Link></li>
                                <li><Link to="/dashboard">Dashboard</Link></li>
                            </ul>
                        </div>
                        <div className="footer-column">
                            <h4>About</h4>
                            <ul>
                                <li><button className="footer-link-btn" onClick={() => setActiveModal('mission')}>Our Mission</button></li>
                                <li><button className="footer-link-btn" onClick={() => setActiveModal('partners')}>Partners</button></li>
                                <li><Link to="/dashboard">Impact Report</Link></li>
                                <li><button className="footer-link-btn" onClick={() => setActiveModal('contact')}>Contact</button></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>© 2026 Waste to Worth. Built for a sustainable future.</p>
                    <div className="footer-badges">
                        <span className="eco-badge">🌍 Carbon Neutral</span>
                        <span className="eco-badge">♻️ Circular Economy</span>
                    </div>
                </div>
            </div>

            {/* Simple Modal Overlay */}
            {activeModal && (
                <div className="modal-overlay" onClick={() => setActiveModal(null)} style={{
                    position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, backdropFilter: 'blur(5px)'
                }}>
                    <div className="modal-content glass-card" onClick={e => e.stopPropagation()} style={{
                        maxWidth: '500px', width: '90%', padding: '2rem', position: 'relative'
                    }}>
                        <button onClick={() => setActiveModal(null)} style={{
                            position: 'absolute', top: '15px', right: '15px', background: 'none', border: 'none', color: 'white', fontSize: '1.5rem', cursor: 'pointer'
                        }}>×</button>

                        <h2 style={{ marginBottom: '1rem', color: 'var(--primary-leaf)' }}>{modalContent[activeModal].title}</h2>
                        <div style={{ lineHeight: '1.6', color: 'var(--neutral-100)' }}>
                            {modalContent[activeModal].content}
                        </div>
                    </div>
                </div>
            )}
        </footer>
    )
}

export default Footer

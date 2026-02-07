import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
    const [isOpen, setIsOpen] = useState(false)

    const navLinks = [
        { path: '/', label: 'Home' },
        { path: '/scanner', label: 'Waste Scanner' },
        { path: '/ideas', label: 'Reuse Ideas' },
        { path: '/fixmycity', label: 'FixMyCity' },
        { path: '/dashboard', label: 'Dashboard' },
        { path: '/admin', label: 'Admin' },
    ]

    return (
        <nav className="navbar">
            <div className="container navbar-container">
                <Link to="/" className="navbar-brand">
                    <span className="brand-icon">🌱</span>
                    <span className="brand-text">
                        <span className="brand-name">Waste to Worth</span>
                        <span className="brand-tagline">Sustainable City OS</span>
                    </span>
                </Link>

                <button
                    className={`navbar-toggle ${isOpen ? 'open' : ''}`}
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle navigation"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                <ul className={`navbar-nav ${isOpen ? 'open' : ''}`}>
                    {navLinks.map(link => (
                        <li key={link.path} className="nav-item">
                            <NavLink
                                to={link.path}
                                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                                onClick={() => setIsOpen(false)}
                            >
                                {link.label}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    )
}

export default Navbar

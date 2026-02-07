
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Map, List, PlusCircle, User, BarChart } from 'lucide-react';

const TopBar = ({ activeView, setActiveView, onReportClick }) => {
    const navigate = useNavigate();

    return (
        <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="top-bar glass-card"
            style={{
                position: 'absolute',
                top: '1rem',
                left: '1rem',
                right: '1rem',
                zIndex: 1000,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1rem 2rem',
                borderRadius: 'var(--radius-full)'
            }}
        >
            <div className="brand" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <h1 style={{
                    fontSize: '1.5rem',
                    margin: 0,
                    background: 'var(--gradient-primary)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontWeight: 800,
                    letterSpacing: '-0.02em'
                }}>
                    Report. Vote. Fix.
                </h1>
            </div>

            <div className="nav-actions" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <button
                    className={`btn ${activeView === 'map' ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => setActiveView('map')}
                >
                    <Map size={18} />
                    View Map
                </button>

                <button
                    className={`btn ${activeView === 'list' ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => setActiveView('list')}
                >
                    <List size={18} />
                    My Reports
                </button>

                <button
                    className={`btn ${activeView === 'stats' ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => setActiveView('stats')}
                >
                    <BarChart size={18} />
                    Impact
                </button>
            </div>

            <div className="user-actions">
                <button
                    className="btn btn-accent"
                    onClick={onReportClick}
                    style={{ paddingLeft: '1.5rem', paddingRight: '1.5rem' }}
                >
                    <PlusCircle size={20} />
                    Report Issue
                </button>
            </div>
        </motion.div>
    );
};

export default TopBar;


import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, Users, Check } from 'lucide-react';

const solutions = [
    { id: 1, author: "GreenTeam", text: "Organize a cleanup drive this Saturday.", votes: 45, volunteers: 12, progress: 0 },
    { id: 2, author: "CityCouncil", text: "Dispatched maintenance team for repair.", votes: 89, volunteers: 2, progress: 60 },
];

const SolutionBoard = ({ issue, onClose }) => {
    if (!issue) return null;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="glass-card"
            style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '90%',
                maxWidth: '600px',
                zIndex: 2000,
                background: 'rgba(26, 26, 46, 0.95)',
                border: '1px solid rgba(255,255,255,0.1)'
            }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{ margin: 0 }}>Community Solutions</h2>
                <button onClick={onClose} className="btn btn-sm btn-secondary" style={{ borderRadius: '50%', width: '32px', height: '32px', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
            </div>

            <div style={{ marginBottom: '2rem' }}>
                <div className="badge badge-warning" style={{ marginBottom: '0.5rem' }}>{issue.status}</div>
                <h3>{issue.title}</h3>
                <p style={{ color: 'var(--neutral-400)' }}>{issue.location}</p>
            </div>

            <div>
                <h4 style={{ marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>Proposed Fixes</h4>
                {solutions.map((sol) => (
                    <div key={sol.id} style={{
                        background: 'rgba(255,255,255,0.03)',
                        padding: '1rem',
                        borderRadius: '12px',
                        marginBottom: '1rem',
                        border: sol.progress > 0 ? '1px solid rgba(76, 175, 80, 0.3)' : '1px solid transparent'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                            <span style={{ fontWeight: 600, color: 'var(--primary-mint)' }}>@{sol.author}</span>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <span className="badge badge-info" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <ArrowUp size={12} /> {sol.votes}
                                </span>
                                <span className="badge badge-success" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <Users size={12} /> {sol.volunteers}
                                </span>
                            </div>
                        </div>
                        <p style={{ marginBottom: '1rem' }}>{sol.text}</p>

                        {sol.progress > 0 && (
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '4px', color: 'var(--neutral-400)' }}>
                                    <span>Progress</span>
                                    <span>{sol.progress}%</span>
                                </div>
                                <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                                    <div style={{ width: `${sol.progress}%`, height: '100%', background: 'var(--primary-leaf)' }}></div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <button className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                Propose a Fix
            </button>
        </motion.div>
    );
};

export default SolutionBoard;

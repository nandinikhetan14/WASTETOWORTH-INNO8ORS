
import React from 'react';
import { motion } from 'framer-motion';
import { ThumbsUp, MessageSquare, ArrowRight } from 'lucide-react';

const issues = [
    {
        id: 1,
        title: "Overflowing Bin",
        location: "Market St, 150m away",
        votes: 42,
        comments: 5,
        status: "urgent",
        imageUrl: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=500&q=60"
    },
    {
        id: 2,
        title: "Broken Streetlight",
        location: "Park Ave, 300m away",
        votes: 28,
        comments: 2,
        status: "pending",
        imageUrl: "https://images.unsplash.com/photo-1576615278693-3ea761d6745f?auto=format&fit=crop&w=500&q=60"
    },
    {
        id: 3,
        title: "Cleaned Park",
        location: "Central Park, 1.2km away",
        votes: 156,
        comments: 12,
        status: "fixed",
        imageUrl: "https://images.unsplash.com/photo-1584467023307-e85df64917a1?auto=format&fit=crop&w=500&q=60"
    },
];

const SidePanel = ({ onIssueSelect }) => {
    return (
        <motion.div
            initial={{ x: -350, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="side-panel custom-scrollbar"
            style={{
                position: 'absolute',
                top: '90px',
                left: '20px',
                width: '380px',
                bottom: '20px',
                zIndex: 900,
                overflowY: 'auto',
                paddingRight: '10px'
            }}
        >
            {issues.map((issue) => (
                <div
                    key={issue.id}
                    className="glass-card"
                    style={{ marginBottom: '1.5rem', padding: '0', overflow: 'hidden', cursor: 'pointer' }}
                    onClick={() => onIssueSelect(issue)}
                >
                    <div style={{ height: '160px', overflow: 'hidden', position: 'relative' }}>
                        <img
                            src={issue.imageUrl}
                            alt={issue.title}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                        <div style={{
                            position: 'absolute',
                            top: '10px',
                            right: '10px',
                            background: 'rgba(0,0,0,0.6)',
                            backdropFilter: 'blur(4px)',
                            padding: '4px 8px',
                            borderRadius: '12px',
                            fontSize: '0.75rem',
                            fontWeight: 'bold',
                            textTransform: 'uppercase',
                            color: issue.status === 'urgent' ? '#ff6b6b' : issue.status === 'pending' ? '#ffa000' : '#4caf50'
                        }}>
                            {issue.status}
                        </div>
                    </div>

                    <div style={{ padding: '1.5rem' }}>
                        <h3 style={{ marginBottom: '0.5rem', fontSize: '1.25rem' }}>{issue.title}</h3>
                        <p style={{ color: 'var(--neutral-400)', fontSize: '0.875rem', marginBottom: '1rem' }}>
                            {issue.location}
                        </p>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--neutral-300)' }}>
                                    <ThumbsUp size={16} />
                                    <span>{issue.votes}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--neutral-300)' }}>
                                    <MessageSquare size={16} />
                                    <span>{issue.comments}</span>
                                </div>
                            </div>

                            <button className="btn btn-sm btn-secondary" style={{ borderRadius: '8px', padding: '8px 12px' }}>
                                Support <ArrowRight size={14} style={{ marginLeft: '4px' }} />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </motion.div>
    );
};

export default SidePanel;

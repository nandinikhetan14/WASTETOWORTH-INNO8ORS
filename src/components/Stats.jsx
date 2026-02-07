
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Users, AlertCircle, Activity } from 'lucide-react';

const statsData = [
    { title: "Issues Reported", value: 1240, icon: AlertCircle, color: "#ff6b6b" },
    { title: "Fixed This Month", value: 856, icon: CheckCircle, color: "#4caf50" },
    { title: "Active Volunteers", value: 342, icon: Users, color: "#42A5F5" },
    { title: "City Score", value: "88/100", icon: Activity, color: "#FFA000" },
];

const Stats = () => {
    return (
        <div style={{ padding: '80px 2rem 2rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ marginBottom: '2rem', textAlign: 'center' }}
            >
                Our Impact
            </motion.h2>

            <div className="grid grid-4">
                {statsData.map((stat, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="glass-card"
                        style={{ textAlign: 'center', padding: '2rem' }}
                    >
                        <div style={{
                            width: '60px',
                            height: '60px',
                            borderRadius: '50%',
                            background: `${stat.color}20`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 1rem auto',
                            color: stat.color
                        }}>
                            <stat.icon size={32} />
                        </div>
                        <h3 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: '#fff' }}>
                            {stat.value}
                        </h3>
                        <p style={{ color: 'var(--neutral-400)', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.875rem' }}>
                            {stat.title}
                        </p>
                    </motion.div>
                ))}
            </div>

            {/* Placeholder for charts or more detailed stats */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="glass-card"
                style={{ marginTop: '2rem', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
                <p style={{ color: 'var(--neutral-400)' }}>Detailed Activity Chart Container (Place holder)</p>
            </motion.div>
        </div>
    );
};

export default Stats;

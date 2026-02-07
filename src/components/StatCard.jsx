import './StatCard.css'

function StatCard({ icon, value, label, color, delay = 0 }) {
    return (
        <div
            className="stat-card glass-card"
            style={{ '--accent-color': color, '--delay': `${delay}s` }}
        >
            <div className="stat-icon">{icon}</div>
            <div className="stat-content">
                <span className="stat-value">{value}</span>
                <span className="stat-label">{label}</span>
            </div>
        </div>
    )
}

export default StatCard

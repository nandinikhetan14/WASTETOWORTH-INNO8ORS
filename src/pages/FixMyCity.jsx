import { useState } from 'react'
import { useApp } from '../context/AppContext'
import './FixMyCity.css'

const REPORT_TYPES = [
    { id: 'garbage', label: 'Garbage/Litter', icon: '🗑️' },
    { id: 'pothole', label: 'Pothole', icon: '🕳️' },
    { id: 'water-leak', label: 'Water Leak', icon: '💧' },
    { id: 'streetlight', label: 'Broken Streetlight', icon: '💡' },
    { id: 'graffiti', label: 'Graffiti', icon: '🎨' },
    { id: 'other', label: 'Other', icon: '📝' }
]

function FixMyCity() {
    const { data, addReport } = useApp()
    const [showForm, setShowForm] = useState(false)
    const [filter, setFilter] = useState('all')
    const [formData, setFormData] = useState({
        type: 'garbage',
        title: '',
        description: '',
        location: ''
    })

    const reports = data?.reports || []

    const filteredReports = filter === 'all'
        ? reports
        : reports.filter(r => r.status === filter)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!formData.title || !formData.description || !formData.location) return

        addReport(formData)
        setFormData({ type: 'garbage', title: '', description: '', location: '' })
        setShowForm(false)
    }

    const getStatusBadge = (status) => {
        const styles = {
            pending: 'badge-warning',
            'in-progress': 'badge-info',
            resolved: 'badge-success'
        }
        const labels = {
            pending: 'Pending',
            'in-progress': 'In Progress',
            resolved: 'Resolved'
        }
        return <span className={`badge ${styles[status]}`}>{labels[status]}</span>
    }

    const getTypeInfo = (typeId) => {
        return REPORT_TYPES.find(t => t.id === typeId) || REPORT_TYPES[5]
    }

    const formatDate = (timestamp) => {
        return new Date(timestamp).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    const stats = {
        total: reports.length,
        pending: reports.filter(r => r.status === 'pending').length,
        inProgress: reports.filter(r => r.status === 'in-progress').length,
        resolved: reports.filter(r => r.status === 'resolved').length
    }

    return (
        <div className="page fixmycity-page">
            <div className="container">
                <div className="page-header text-center">
                    <span className="page-badge">🏙️ Civic Engagement</span>
                    <h1>Fix<span className="text-gradient">My</span>City</h1>
                    <p>Report urban problems in your neighborhood. Help make your city cleaner and safer for everyone.</p>
                </div>

                {/* Stats Bar */}
                <div className="report-stats glass-card">
                    <div className="stat-item">
                        <span className="stat-num">{stats.total}</span>
                        <span className="stat-label">Total Reports</span>
                    </div>
                    <div className="stat-divider"></div>
                    <div className="stat-item">
                        <span className="stat-num pending">{stats.pending}</span>
                        <span className="stat-label">Pending</span>
                    </div>
                    <div className="stat-divider"></div>
                    <div className="stat-item">
                        <span className="stat-num in-progress">{stats.inProgress}</span>
                        <span className="stat-label">In Progress</span>
                    </div>
                    <div className="stat-divider"></div>
                    <div className="stat-item">
                        <span className="stat-num resolved">{stats.resolved}</span>
                        <span className="stat-label">Resolved</span>
                    </div>
                </div>

                {/* Controls */}
                <div className="report-controls">
                    <div className="filter-tabs">
                        {['all', 'pending', 'in-progress', 'resolved'].map(status => (
                            <button
                                key={status}
                                className={`filter-tab ${filter === status ? 'active' : ''}`}
                                onClick={() => setFilter(status)}
                            >
                                {status === 'all' ? 'All' : status.replace('-', ' ')}
                            </button>
                        ))}
                    </div>
                    <button className="btn btn-primary" onClick={() => setShowForm(true)}>
                        <span>📍</span> Report Issue
                    </button>
                </div>

                {/* Submit Form Modal */}
                {showForm && (
                    <div className="modal-overlay" onClick={() => setShowForm(false)}>
                        <div className="modal-content glass-card" onClick={e => e.stopPropagation()}>
                            <div className="modal-header">
                                <h2>Report an Issue</h2>
                                <button className="modal-close" onClick={() => setShowForm(false)}>×</button>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label className="form-label">Issue Type</label>
                                    <div className="type-selector">
                                        {REPORT_TYPES.map(type => (
                                            <button
                                                key={type.id}
                                                type="button"
                                                className={`type-btn ${formData.type === type.id ? 'active' : ''}`}
                                                onClick={() => setFormData({ ...formData, type: type.id })}
                                            >
                                                <span className="type-icon">{type.icon}</span>
                                                <span className="type-label">{type.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Title</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        placeholder="Brief description of the issue"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Location</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        placeholder="Street address or landmark"
                                        value={formData.location}
                                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Description</label>
                                    <textarea
                                        className="form-textarea"
                                        placeholder="Provide more details about the issue..."
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="form-actions">
                                    <button type="button" className="btn btn-secondary" onClick={() => setShowForm(false)}>
                                        Cancel
                                    </button>
                                    <button type="submit" className="btn btn-primary">
                                        Submit Report
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Reports List */}
                <div className="reports-list">
                    {filteredReports.length === 0 ? (
                        <div className="empty-state glass-card">
                            <div className="empty-state-icon">🏙️</div>
                            <h3>No reports found</h3>
                            <p>Be the first to report an issue in your area!</p>
                            <button className="btn btn-primary" onClick={() => setShowForm(true)}>
                                Report Issue
                            </button>
                        </div>
                    ) : (
                        filteredReports.map((report, index) => {
                            const typeInfo = getTypeInfo(report.type)
                            return (
                                <div
                                    key={report.id}
                                    className="report-card glass-card"
                                    style={{ '--delay': `${index * 0.05}s` }}
                                >
                                    <div className="report-icon">{typeInfo.icon}</div>
                                    <div className="report-content">
                                        <div className="report-header">
                                            <h3>{report.title}</h3>
                                            {getStatusBadge(report.status)}
                                        </div>
                                        <p className="report-description">{report.description}</p>
                                        <div className="report-meta">
                                            <span className="report-location">📍 {report.location}</span>
                                            <span className="report-date">{formatDate(report.timestamp)}</span>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    )}
                </div>
            </div>
        </div>
    )
}

export default FixMyCity

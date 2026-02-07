import { useState } from 'react'
import { useApp } from '../context/AppContext'
import './Admin.css'

function Admin() {
    const { data, deleteScan, deleteIdea, deleteReport, updateReportStatus } = useApp()
    const [activeTab, setActiveTab] = useState('scans')

    const tabs = [
        { id: 'scans', label: 'Waste Scans', icon: '📷', count: data?.scans?.length || 0 },
        { id: 'ideas', label: 'Reuse Ideas', icon: '💡', count: data?.ideas?.length || 0 },
        { id: 'reports', label: 'City Reports', icon: '🏙️', count: data?.reports?.length || 0 }
    ]

    const formatDate = (timestamp) => {
        return new Date(timestamp).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    const getStatusBadge = (status) => {
        const styles = {
            pending: 'badge-warning',
            'in-progress': 'badge-info',
            resolved: 'badge-success'
        }
        return styles[status] || 'badge-info'
    }

    return (
        <div className="page admin-page">
            <div className="container">
                <div className="page-header text-center">
                    <span className="page-badge">⚙️ Administration</span>
                    <h1>Admin <span className="text-gradient">Panel</span></h1>
                    <p>Manage all waste scans, reuse ideas, and city reports from one place.</p>
                </div>

                {/* Tabs */}
                <div className="admin-tabs">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            className={`admin-tab ${activeTab === tab.id ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            <span className="tab-icon">{tab.icon}</span>
                            <span className="tab-label">{tab.label}</span>
                            <span className="tab-count">{tab.count}</span>
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="admin-content glass-card">
                    {/* Scans Tab */}
                    {activeTab === 'scans' && (
                        <div className="admin-table-container">
                            {data?.scans?.length === 0 ? (
                                <div className="empty-state">
                                    <div className="empty-state-icon">📷</div>
                                    <p>No waste scans yet</p>
                                </div>
                            ) : (
                                <table className="data-table">
                                    <thead>
                                        <tr>
                                            <th>Item</th>
                                            <th>Category</th>
                                            <th>Confidence</th>
                                            <th>Date</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data?.scans?.map(scan => (
                                            <tr key={scan.id}>
                                                <td><strong>{scan.item}</strong></td>
                                                <td><span className="badge badge-success">{scan.category}</span></td>
                                                <td>{scan.confidence}%</td>
                                                <td>{formatDate(scan.timestamp)}</td>
                                                <td>
                                                    <button
                                                        className="action-btn delete"
                                                        onClick={() => deleteScan(scan.id)}
                                                    >
                                                        🗑️
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    )}

                    {/* Ideas Tab */}
                    {activeTab === 'ideas' && (
                        <div className="admin-table-container">
                            {data?.ideas?.length === 0 ? (
                                <div className="empty-state">
                                    <div className="empty-state-icon">💡</div>
                                    <p>No reuse ideas yet</p>
                                </div>
                            ) : (
                                <table className="data-table">
                                    <thead>
                                        <tr>
                                            <th>Title</th>
                                            <th>Category</th>
                                            <th>Author</th>
                                            <th>Votes</th>
                                            <th>Date</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data?.ideas?.map(idea => (
                                            <tr key={idea.id}>
                                                <td><strong>{idea.title}</strong></td>
                                                <td><span className="badge badge-success">{idea.category}</span></td>
                                                <td>{idea.author}</td>
                                                <td><span className="vote-badge">👍 {idea.votes}</span></td>
                                                <td>{formatDate(idea.timestamp)}</td>
                                                <td>
                                                    <button
                                                        className="action-btn delete"
                                                        onClick={() => deleteIdea(idea.id)}
                                                    >
                                                        🗑️
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    )}

                    {/* Reports Tab */}
                    {activeTab === 'reports' && (
                        <div className="admin-table-container">
                            {data?.reports?.length === 0 ? (
                                <div className="empty-state">
                                    <div className="empty-state-icon">🏙️</div>
                                    <p>No city reports yet</p>
                                </div>
                            ) : (
                                <table className="data-table">
                                    <thead>
                                        <tr>
                                            <th>Title</th>
                                            <th>Type</th>
                                            <th>Location</th>
                                            <th>Status</th>
                                            <th>Date</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data?.reports?.map(report => (
                                            <tr key={report.id}>
                                                <td><strong>{report.title}</strong></td>
                                                <td className="capitalize">{report.type.replace('-', ' ')}</td>
                                                <td className="location-cell">{report.location}</td>
                                                <td>
                                                    <select
                                                        className="status-select"
                                                        value={report.status}
                                                        onChange={(e) => updateReportStatus(report.id, e.target.value)}
                                                    >
                                                        <option value="pending">Pending</option>
                                                        <option value="in-progress">In Progress</option>
                                                        <option value="resolved">Resolved</option>
                                                    </select>
                                                </td>
                                                <td>{formatDate(report.timestamp)}</td>
                                                <td>
                                                    <button
                                                        className="action-btn delete"
                                                        onClick={() => deleteReport(report.id)}
                                                    >
                                                        🗑️
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Admin

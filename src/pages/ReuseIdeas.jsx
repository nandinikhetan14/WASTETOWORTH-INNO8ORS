import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { getAllCategories } from '../services/aiClassifier'
import './ReuseIdeas.css'

function ReuseIdeas() {
    const { data, addIdea, voteIdea } = useApp()
    const [showForm, setShowForm] = useState(false)
    const [filter, setFilter] = useState('all')
    const [sortBy, setSortBy] = useState('votes')
    const [formData, setFormData] = useState({
        title: '',
        category: 'Plastic',
        description: '',
        author: ''
    })

    const categories = getAllCategories()

    const ideas = data?.ideas || []

    const filteredIdeas = ideas
        .filter(idea => filter === 'all' || idea.category === filter)
        .sort((a, b) => {
            if (sortBy === 'votes') return b.votes - a.votes
            return new Date(b.timestamp) - new Date(a.timestamp)
        })

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!formData.title || !formData.description || !formData.author) return

        addIdea(formData)
        setFormData({ title: '', category: 'Plastic', description: '', author: '' })
        setShowForm(false)
    }

    const formatDate = (timestamp) => {
        return new Date(timestamp).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
        })
    }

    return (
        <div className="page reuse-ideas-page">
            <div className="container">
                <div className="page-header text-center">
                    <span className="page-badge">💡 Community Ideas</span>
                    <h1>Crowd <span className="text-gradient">Reuse</span> Ideas</h1>
                    <p>Discover creative ways to repurpose waste. Share your ideas and vote for the best solutions!</p>
                </div>

                <div className="ideas-controls">
                    <div className="controls-left">
                        <div className="filter-group">
                            <label>Filter:</label>
                            <select
                                className="form-select"
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                            >
                                <option value="all">All Categories</option>
                                {categories.map(cat => (
                                    <option key={cat.name} value={cat.name}>{cat.icon} {cat.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="filter-group">
                            <label>Sort by:</label>
                            <select
                                className="form-select"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                            >
                                <option value="votes">Most Voted</option>
                                <option value="recent">Most Recent</option>
                            </select>
                        </div>
                    </div>
                    <button className="btn btn-primary" onClick={() => setShowForm(true)}>
                        <span>✨</span> Share Your Idea
                    </button>
                </div>

                {/* Submit Form Modal */}
                {showForm && (
                    <div className="modal-overlay" onClick={() => setShowForm(false)}>
                        <div className="modal-content glass-card" onClick={e => e.stopPropagation()}>
                            <div className="modal-header">
                                <h2>Share Your Reuse Idea</h2>
                                <button className="modal-close" onClick={() => setShowForm(false)}>×</button>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label className="form-label">Your Name</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        placeholder="Enter your name"
                                        value={formData.author}
                                        onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Idea Title</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        placeholder="Give your idea a catchy title"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Waste Category</label>
                                    <select
                                        className="form-select"
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    >
                                        {categories.map(cat => (
                                            <option key={cat.name} value={cat.name}>{cat.icon} {cat.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Description</label>
                                    <textarea
                                        className="form-textarea"
                                        placeholder="Describe how to reuse this type of waste..."
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
                                        Submit Idea
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Ideas Grid */}
                <div className="ideas-grid">
                    {filteredIdeas.length === 0 ? (
                        <div className="empty-state glass-card">
                            <div className="empty-state-icon">💡</div>
                            <h3>No ideas yet</h3>
                            <p>Be the first to share a creative reuse idea!</p>
                            <button className="btn btn-primary" onClick={() => setShowForm(true)}>
                                Share Your Idea
                            </button>
                        </div>
                    ) : (
                        filteredIdeas.map((idea, index) => (
                            <div
                                key={idea.id}
                                className="idea-card glass-card"
                                style={{ '--delay': `${index * 0.05}s` }}
                            >
                                <div className="idea-header">
                                    <span className="idea-category badge badge-success">{idea.category}</span>
                                    <span className="idea-date">{formatDate(idea.timestamp)}</span>
                                </div>
                                <h3 className="idea-title">{idea.title}</h3>
                                <p className="idea-description">{idea.description}</p>
                                <div className="idea-footer">
                                    <span className="idea-author">by {idea.author}</span>
                                    <button
                                        className="vote-btn"
                                        onClick={() => voteIdea(idea.id)}
                                    >
                                        <span className="vote-icon">👍</span>
                                        <span className="vote-count">{idea.votes}</span>
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}

export default ReuseIdeas

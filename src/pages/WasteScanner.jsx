import { useState } from 'react'
import ImageUploader from '../components/ImageUploader'
import { useApp } from '../context/AppContext'
import { classifyWaste, getAllCategories } from '../services/aiClassifier'
import { incrementStats } from '../services/database'
import './WasteScanner.css'

function WasteScanner() {
    const { addScan } = useApp()
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState(null)
    const categories = getAllCategories()

    const handleUpload = async (file, preview) => {
        setLoading(true)
        setResult(null)

        try {
            const classification = await classifyWaste(file, preview)
            setResult(classification)

            // Save to database
            addScan({
                category: classification.category,
                item: classification.item,
                confidence: classification.confidence,
                image: preview
            })

            // Increment global stats
            // +1 Scan, +5 Ideas (approx), +0.5kg CO2 (approx)
            incrementStats(1, result.reuseIdeas?.length || 5, 0.5)

        } catch (error) {
            console.error('Classification failed:', error)
        } finally {
            setLoading(false)
        }
    }

    const resetScanner = () => {
        setResult(null)
    }

    return (
        <div className="page waste-scanner-page">
            <div className="container">
                <div className="page-header text-center">

                    <h1>Waste <span className="text-gradient">Scanner</span></h1>
                    <p>Upload an image of waste and our AI will identify it, categorize it, and suggest the best reuse options.</p>
                </div>

                <div className="scanner-content">
                    <div className="scanner-main">
                        {!result ? (
                            <ImageUploader onUpload={handleUpload} loading={loading} />
                        ) : (
                            <div className="result-card glass-card animate-fade-in">
                                <div className="result-header">
                                    <div className="result-icon" style={{ background: result.color }}>
                                        {result.icon}
                                    </div>
                                    <div className="result-info">
                                        <span className="result-category">{result.category}</span>
                                        <h2 className="result-item">{result.item}</h2>
                                        <div className="result-confidence">
                                            <div className="confidence-bar">
                                                <div
                                                    className="confidence-fill"
                                                    style={{ width: `${result.confidence}%`, background: result.color }}
                                                ></div>
                                            </div>
                                            <span>{result.confidence}% confidence</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="result-section">
                                    <h3>♻️ Recycling Tips</h3>
                                    <ul className="tips-list">
                                        {result.tips.map((tip, i) => (
                                            <li key={i}>{tip}</li>
                                        ))}
                                    </ul>
                                </div>

                                {result.reuseIdeas && result.reuseIdeas.length > 0 && (
                                    <div className="result-section" style={{ background: 'rgba(255, 215, 0, 0.1)', border: '1px solid rgba(255, 215, 0, 0.3)' }}>
                                        <h3 style={{ color: 'var(--accent-gold)' }}>💡 Creative Reuse Ideas</h3>
                                        <ul className="tips-list">
                                            {result.reuseIdeas.map((idea, i) => (
                                                <li key={i} style={{ borderLeftColor: 'var(--accent-gold)' }}>{idea}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                <div className="result-section">
                                    <h3>💡 Similar Items</h3>
                                    <div className="similar-items">
                                        {result.alternatives.map((alt, i) => (
                                            <span key={i} className="similar-tag">{alt}</span>
                                        ))}
                                    </div>
                                </div>

                                <div className="result-actions">
                                    <button className="btn btn-primary" onClick={resetScanner}>
                                        Scan Another Item
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="scanner-sidebar">
                        <div className="sidebar-card glass-card">
                            <h3>📊 Waste Categories</h3>
                            <p>Our AI can identify these waste types:</p>
                            <div className="category-list">
                                {categories.map((cat, i) => (
                                    <div key={i} className="category-item">
                                        <span className="cat-icon">{cat.icon}</span>
                                        <span className="cat-name">{cat.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="sidebar-card glass-card">
                            <h3>🌱 Why Scan?</h3>
                            <ul className="benefit-list">
                                <li>Learn proper disposal methods</li>
                                <li>Discover reuse opportunities</li>
                                <li>Track your environmental impact</li>
                                <li>Connect with recycling partners</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WasteScanner

import { createContext, useContext, useState, useEffect } from 'react'
import { loadDatabase, saveDatabase, getDefaultData } from '../services/database'

const AppContext = createContext()

export function useApp() {
    return useContext(AppContext)
}

export function AppProvider({ children }) {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)

    // Load data from localStorage on mount
    useEffect(() => {
        const stored = loadDatabase()
        if (stored) {
            setData(stored)
        } else {
            setData(getDefaultData())
        }
        setLoading(false)
    }, [])

    // Save to localStorage whenever data changes
    useEffect(() => {
        if (data) {
            saveDatabase(data)
        }
    }, [data])

    // Waste Scans
    const addScan = (scan) => {
        setData(prev => ({
            ...prev,
            scans: [{ ...scan, id: Date.now(), timestamp: new Date().toISOString() }, ...prev.scans]
        }))
    }

    const deleteScan = (id) => {
        setData(prev => ({
            ...prev,
            scans: prev.scans.filter(s => s.id !== id)
        }))
    }

    // Reuse Ideas
    const addIdea = (idea) => {
        setData(prev => ({
            ...prev,
            ideas: [{ ...idea, id: Date.now(), votes: 0, timestamp: new Date().toISOString() }, ...prev.ideas]
        }))
    }

    const voteIdea = (id) => {
        setData(prev => ({
            ...prev,
            ideas: prev.ideas.map(i => i.id === id ? { ...i, votes: i.votes + 1 } : i)
        }))
    }

    const deleteIdea = (id) => {
        setData(prev => ({
            ...prev,
            ideas: prev.ideas.filter(i => i.id !== id)
        }))
    }

    // City Reports
    const addReport = (report) => {
        setData(prev => ({
            ...prev,
            reports: [{ ...report, id: Date.now(), status: 'pending', timestamp: new Date().toISOString() }, ...prev.reports]
        }))
    }

    const updateReportStatus = (id, status) => {
        setData(prev => ({
            ...prev,
            reports: prev.reports.map(r => r.id === id ? { ...r, status } : r)
        }))
    }

    const deleteReport = (id) => {
        setData(prev => ({
            ...prev,
            reports: prev.reports.filter(r => r.id !== id)
        }))
    }

    // Stats
    const getStats = () => {
        if (!data) return { scans: 0, ideas: 0, reports: 0, co2Saved: 0, itemsReused: 0 }

        const scans = data.scans.length
        const ideas = data.ideas.length
        const reports = data.reports.length
        const resolvedReports = data.reports.filter(r => r.status === 'resolved').length

        // Mock calculations
        const co2Saved = scans * 2.5 + resolvedReports * 5
        const itemsReused = Math.floor(scans * 0.7)

        return { scans, ideas, reports, co2Saved, itemsReused, resolvedReports }
    }

    const value = {
        data,
        loading,
        addScan,
        deleteScan,
        addIdea,
        voteIdea,
        deleteIdea,
        addReport,
        updateReportStatus,
        deleteReport,
        getStats
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

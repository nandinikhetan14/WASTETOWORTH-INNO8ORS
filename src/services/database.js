const STORAGE_KEY = 'waste-to-worth-db'

// Default mock data for demo
export function getDefaultData() {
    return {
        scans: [
            { id: 1, category: 'Plastic', item: 'Water Bottle', confidence: 94, timestamp: '2026-02-06T10:30:00Z', image: null },
            { id: 2, category: 'Metal', item: 'Aluminum Can', confidence: 97, timestamp: '2026-02-06T09:15:00Z', image: null },
            { id: 3, category: 'Organic', item: 'Banana Peel', confidence: 89, timestamp: '2026-02-05T16:45:00Z', image: null },
            { id: 4, category: 'E-Waste', item: 'Old Phone', confidence: 92, timestamp: '2026-02-05T14:20:00Z', image: null },
            { id: 5, category: 'Glass', item: 'Wine Bottle', confidence: 96, timestamp: '2026-02-04T11:00:00Z', image: null },
        ],
        ideas: [
            { id: 1, title: 'Plastic Bottle Planters', category: 'Plastic', description: 'Cut bottles in half to create mini planters for herbs and small plants.', author: 'EcoWarrior', votes: 45, timestamp: '2026-02-06T08:00:00Z' },
            { id: 2, title: 'Can Wind Chimes', category: 'Metal', description: 'Create beautiful wind chimes from aluminum cans painted in vibrant colors.', author: 'GreenThumb', votes: 32, timestamp: '2026-02-05T15:30:00Z' },
            { id: 3, title: 'Compost Gold', category: 'Organic', description: 'Start a community composting initiative to turn food waste into garden fertilizer.', author: 'NatureLover', votes: 67, timestamp: '2026-02-05T10:00:00Z' },
            { id: 4, title: 'Tech Art Installation', category: 'E-Waste', description: 'Create public art from old electronics to raise awareness about e-waste.', author: 'DigitalNomad', votes: 28, timestamp: '2026-02-04T09:00:00Z' },
        ],
        reports: [
            { id: 1, type: 'garbage', title: 'Overflowing bin at Central Park', description: 'The garbage bin near the fountain has been overflowing for 3 days.', location: 'Central Park, Main Entrance', status: 'in-progress', timestamp: '2026-02-06T07:30:00Z', image: null },
            { id: 2, type: 'pothole', title: 'Large pothole on Oak Street', description: 'Dangerous pothole approximately 2 feet wide, causing traffic issues.', location: 'Oak Street, near #45', status: 'pending', timestamp: '2026-02-05T14:00:00Z', image: null },
            { id: 3, type: 'water-leak', title: 'Water main leak', description: 'Water spraying from crack in sidewalk, wasting significant water.', location: 'Maple Avenue & 5th', status: 'resolved', timestamp: '2026-02-04T11:30:00Z', image: null },
            { id: 4, type: 'garbage', title: 'Illegal dumping site', description: 'Someone has been dumping construction debris in the empty lot.', location: 'Industrial Zone, Lot 7', status: 'pending', timestamp: '2026-02-03T16:00:00Z', image: null },
        ],
        stats: {
            itemsScanned: 0,
            reuseIdeas: 0,
            co2Saved: 0
        }
    }
}

export function loadDatabase() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY)
        if (!stored) return getDefaultData() // Return defaults if nothing stored

        const data = JSON.parse(stored)
        // Merge with defaults to ensure new fields (like stats) exist if loading old data
        return { ...getDefaultData(), ...data }
    } catch (e) {
        console.error('Failed to load database:', e)
        return getDefaultData()
    }
}

export function saveDatabase(data) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    } catch (e) {
        console.error('Failed to save database:', e)
    }
}

export function clearDatabase() {
    localStorage.removeItem(STORAGE_KEY)
}

// Increment global stats
export function incrementStats(scannedCount = 1, ideasCount = 0, co2Amount = 0) {
    const data = loadDatabase()

    if (!data.stats) {
        data.stats = getDefaultData().stats
    }

    data.stats.itemsScanned += scannedCount
    data.stats.reuseIdeas += ideasCount
    data.stats.co2Saved += co2Amount

    saveDatabase(data)
    return data.stats
}

export function getStats() {
    const data = loadDatabase()
    return data.stats || getDefaultData().stats
}

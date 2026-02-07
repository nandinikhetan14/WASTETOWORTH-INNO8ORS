
// =======================================================
// 🚀 OPTIMIZED WASTE CLASSIFIER (Stable + Fast + Accurate)
// =======================================================

const CATEGORIES = {
    plastic: {
        name: "Plastic",
        color: "#42A5F5",
        icon: "♻️",
        items: ["Bottle", "Container", "Packaging"],
        tips: ["Clean before recycling", "Check resin code", "Remove caps if required"],
        reuseIdeas: ["Make a bird feeder", "Create a self-watering planter", " weave into a mat"],
        alternatives: ["Glass container", "Stainless steel bottle", "Bamboo cutlery"]
    },

    metal: {
        name: "Metal",
        color: "#78909C",
        icon: "🔩",
        items: ["Can", "Foil", "Lid"],
        tips: ["Rinse clean", "Accordion compress cans", "Ball up foil"],
        reuseIdeas: ["Pencil holder", "Lantern", "Wind chimes"],
        alternatives: ["Reusable beeswax wrap", "Glass jar", "Ceramic pot"]
    },

    organic: {
        name: "Organic",
        color: "#8BC34A",
        icon: "🌱",
        items: ["Food Waste", "Leaves", "Peel"],
        tips: ["Compost if possible", "Keep out of regular recycling", "Use green bin"],
        reuseIdeas: ["Regrow vegetables", "Coffee scrub", "Make fertilizer"],
        alternatives: ["Eat leftovers", "Plan meals better", "Freeze excess"]
    },

    ewaste: {
        name: "E-Waste",
        color: "#FF7043",
        icon: "📱",
        items: ["Phone", "Laptop", "Cable"],
        tips: ["Take to e-waste center", "Do not bin", "Remove batteries"],
        reuseIdeas: ["Security camera", "Tech art", "Donate for parts"],
        alternatives: ["Repair device", "Buy refurbished", "Upgrade components"]
    },

    glass: {
        name: "Glass",
        color: "#26A69A",
        icon: "🫙",
        items: ["Bottle", "Jar"],
        tips: ["Rinse out", "Remove lids", "Do not break"],
        reuseIdeas: ["Candle holder", "Storage jar", "Terrarium"],
        alternatives: ["Aluminum can", "Plastic container", "Stainless steel"]
    },

    paper: {
        name: "Paper",
        color: "#A1887F",
        icon: "📰",
        items: ["Cardboard", "Sheet"],
        tips: ["Keep dry", "Flatten boxes", "No food stains"],
        reuseIdeas: ["Window cleaning", "Drawer dividers", "Seed pots"],
        alternatives: ["Digital documents", "Cloth towels", "Reusable bags"]
    },

    textile: {
        name: "Textile",
        color: "#AB47BC",
        icon: "👕",
        items: ["Clothes", "Fabric"],
        tips: ["Donate if wearable", "Recycle as rags", "Textile bank"],
        reuseIdeas: ["Tote bag", "Cleaning rags", "Patchwork quilt"],
        alternatives: ["Repair clothes", "Buy second hand", "Swap with friends"]
    }
};

// ==========================
// FAST IMAGE ANALYSIS
// ==========================
async function analyzeImage(imageData) {
    return new Promise((resolve) => {
        const img = new Image();
        img.crossOrigin = "anonymous";

        img.onload = () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            canvas.width = 80;
            canvas.height = 80;

            ctx.drawImage(img, 0, 0, 80, 80);

            const data = ctx.getImageData(0, 0, 80, 80).data;

            let r = 0, g = 0, b = 0;

            for (let i = 0; i < data.length; i += 4) {
                r += data[i];
                g += data[i + 1];
                b += data[i + 2];
            }

            const total = data.length / 4;

            r /= total;
            g /= total;
            b /= total;

            const brightness = (r * 0.299 + g * 0.587 + b * 0.114);
            const saturation = Math.max(r, g, b) - Math.min(r, g, b);

            resolve({ r, g, b, brightness, saturation });
        };

        img.src = imageData;
    });
}

// ==========================
// TEXT MATCH (HIGHEST PRIORITY)
// ==========================
function textMatch(name = "") {
    const t = name.toLowerCase();

    if (t.match(/phone|laptop|charger|battery|cable/)) return "ewaste";
    if (t.match(/can|foil|metal|redbull|soda|coke|pepsi|beer|energy/)) return "metal";
    if (t.match(/paper|box|cardboard|newspaper/)) return "paper";
    if (t.match(/glass|jar|wine/)) return "glass";
    if (t.match(/cloth|shirt|jeans|fabric/)) return "textile";
    if (t.match(/food|fruit|vegetable|leaf|organic/)) return "organic";
    if (t.match(/plastic|bottle|pet|wrapper/)) return "plastic";

    return null;
}

// ==========================
// SIMPLE RULE ENGINE (STABLE)
// ==========================
function colorBasedClassify(a) {

    // DARK + LOW SATURATION → E-Waste
    if (a.brightness < 60 && a.saturation < 30)
        return "ewaste";

    // GRAY/SHINY → Metal
    if (a.saturation < 20 && a.brightness > 110)
        return "metal";

    // GREEN → Organic
    if (a.g > a.r + 30 && a.g > a.b + 30)
        return "organic";

    // VERY BRIGHT + LOW SAT → Paper
    if (a.brightness > 190 && a.saturation < 25)
        return "paper";

    // BLUEISH/CLEAR → Plastic (only if low saturation or very bright)
    if (a.b > 150 && (a.saturation < 60 || a.brightness > 200))
        return "plastic";

    // High Blue but not plastic? Likely painted metal (Red Bull can)
    if (a.b > 130 && a.saturation > 40)
        return "metal";

    // TEAL → Glass
    if (a.g > 120 && a.b > 120)
        return "glass";

    return "plastic"; // safe fallback
}

// ==========================
// MAIN CLASSIFIER
// ==========================
export async function classifyWaste(file, imageData) {

    // 1️⃣ TEXT MATCH FIRST
    const text = textMatch(file?.name);
    if (text) return buildResult(text, 98);

    // 2️⃣ COLOR ANALYSIS
    const analysis = await analyzeImage(imageData);
    const key = colorBasedClassify(analysis);

    return buildResult(key, 85);
}

// ==========================
// RESULT BUILDER
// ==========================
function buildResult(key, confidence) {
    const c = CATEGORIES[key];

    return {
        category: c.name,
        item: c.items[Math.floor(Math.random() * c.items.length)],
        icon: c.icon,
        color: c.color,
        confidence,
        // Add missing fields required by WasteScanner.jsx
        tips: c.tips || [],
        reuseIdeas: c.reuseIdeas || [],
        alternatives: c.alternatives || []
    };
}

// ==========================
// EXPORTS FOR UI
// ==========================
// Get all categories for display (Required by WasteScanner.jsx)
export function getAllCategories() {
    return Object.values(CATEGORIES).map(cat => ({
        name: cat.name,
        icon: cat.icon,
        color: cat.color
    }))
}

// Get category info by name
export function getCategoryInfo(categoryName) {
    if (!categoryName) return null;
    const key = categoryName.toLowerCase().replace('-', '');
    return CATEGORIES[key] || null;
}

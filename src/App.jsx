import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import WasteScanner from './pages/WasteScanner'
import ReuseIdeas from './pages/ReuseIdeas'
import FixMyCity from './pages/FixMyCity'
import Dashboard from './pages/Dashboard'
import Admin from './pages/Admin'

function App() {
    return (
        <div className="app">
            <Navbar />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/scanner" element={<WasteScanner />} />
                    <Route path="/ideas" element={<ReuseIdeas />} />
                    <Route path="/fixmycity" element={<FixMyCity />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/admin" element={<Admin />} />
                </Routes>
            </main>
            <Footer />
        </div>
    )
}

export default App

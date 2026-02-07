
import React, { useState } from 'react';
import TopBar from './TopBar';
import { motion, AnimatePresence } from 'framer-motion';
import MapComponent from './MapViews/MapComponent';
import SidePanel from './SidePanel';
import Stats from './Stats';
import SolutionBoard from './SolutionBoard';

const MapView = () => (
    <div style={{ width: '100%', height: '100vh', position: 'absolute', top: 0, left: 0 }}>
        <MapComponent />
    </div>
);

const DashboardLayout = () => {
    const [activeView, setActiveView] = useState('map');
    const [selectedIssue, setSelectedIssue] = useState(null);

    const handleReportClick = () => {
        alert("Report Issue Modal would open here");
    };

    const handleIssueSelect = (issue) => {
        setSelectedIssue(issue);
    };

    const closeSolutionBoard = () => {
        setSelectedIssue(null);
    };

    return (
        <div className="dashboard-layout" style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden', background: 'var(--neutral-900)' }}>
            <TopBar
                activeView={activeView}
                setActiveView={setActiveView}
                onReportClick={handleReportClick}
            />

            <main style={{ width: '100%', height: '100%', position: 'relative' }}>
                {activeView === 'map' && (
                    <>
                        <MapView />
                        <AnimatePresence>
                            {!selectedIssue && (
                                <SidePanel onIssueSelect={handleIssueSelect} />
                            )}
                        </AnimatePresence>
                    </>
                )}

                {activeView === 'list' && (
                    <div style={{ paddingTop: '100px', maxWidth: '800px', margin: '0 auto' }}>
                        <SidePanel onIssueSelect={handleIssueSelect} />
                    </div>
                )}

                {activeView === 'stats' && <Stats />}

                <AnimatePresence>
                    {selectedIssue && (
                        <SolutionBoard issue={selectedIssue} onClose={closeSolutionBoard} />
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
};

export default DashboardLayout;

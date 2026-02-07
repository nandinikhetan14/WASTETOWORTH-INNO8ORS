
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon issues in React-Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const issues = [
    { id: 1, position: [51.505, -0.09], title: "Overflowing Bin", status: "urgent", color: "red" },
    { id: 2, position: [51.51, -0.1], title: "Broken Streetlight", status: "pending", color: "orange" },
    { id: 3, position: [51.515, -0.09], title: "Cleaned Park", status: "fixed", color: "green" },
];

const MapComponent = () => {
    return (
        <MapContainer
            center={[51.505, -0.09]}
            zoom={13}
            scrollWheelZoom={true}
            style={{ height: "100%", width: "100%", zIndex: 0 }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {issues.map((issue) => (
                <Marker key={issue.id} position={issue.position}>
                    <Popup>
                        <div style={{ textAlign: 'center' }}>
                            <h3 style={{ margin: '0 0 5px 0', color: '#333' }}>{issue.title}</h3>
                            <span className={`badge badge-${issue.status === 'urgent' ? 'danger' : issue.status === 'pending' ? 'warning' : 'success'}`}>
                                {issue.status.toUpperCase()}
                            </span>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default MapComponent;

import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { LocationType, Beach, Shop, Repair, Location } from '../types';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

interface MapComponentProps {
  locations: Location[];
  visibleTypes: {
    beaches: boolean;
    repairs: boolean;
    shops: boolean;
  };
  onBeachSelect: (beach: Beach) => void;
  onShopSelect: (shop: Shop | Repair, markerPosition: [number, number]) => void;
}

const createIcon = (type: LocationType) => {
  const iconUrl =
    type === LocationType.BEACH
      ? '/icons/beach-marker.svg'
      : type === LocationType.REPAIR
      ? '/icons/repair-marker.svg'
      : '/icons/shop-marker.svg';

  return L.icon({
    iconUrl,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
};

const SetMapView: React.FC<{ center: [number, number] }> = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
};

const tileLayersData = {
  light: {
    url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
  },
  dark: {
    url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
  },
};

const MapComponent: React.FC<MapComponentProps> = ({
  locations,
  visibleTypes,
  onBeachSelect,
  onShopSelect,
}) => {
  const [mapCenter] = useState<[number, number]>([-3.7319, -38.5267]);
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('light');

  const filteredLocations = locations.filter(location => {
    if (location.type === LocationType.BEACH) return visibleTypes.beaches;
    if (location.type === LocationType.REPAIR) return visibleTypes.repairs;
    if (location.type === LocationType.SHOP) return visibleTypes.shops;
    return false;
  });

  const handleMarkerClick = (location: Location, e: L.LeafletMouseEvent) => {
    if (location.type === LocationType.BEACH) {
      onBeachSelect(location as Beach);
    } else {
      onShopSelect(
        location as (Shop | Repair),
        [e.latlng.lat, e.latlng.lng]
      );
    }
  };

  const toggleTheme = () => {
    setCurrentTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const selectedTileLayer = tileLayersData[currentTheme];

  return (
    <div style={{ position: 'relative', height: '100vh', width: '100%' }}>
      <MapContainer
        center={mapCenter}
        zoom={13}
        style={{ height: '100%', width: '100%', zIndex: 0 }}
        zoomControl={false}
      >
        <TileLayer
          key={currentTheme}
          attribution={selectedTileLayer.attribution}
          url={selectedTileLayer.url}
          subdomains={['a', 'b', 'c', 'd']}
        />

        <SetMapView center={mapCenter} />

        {filteredLocations.map(location => (
          <Marker
            key={location.id}
            position={location.coordinates}
            icon={createIcon(location.type)}
            eventHandlers={{
              click: (e) => handleMarkerClick(location, e as L.LeafletMouseEvent)
            }}
          >
            <Popup>
              <div>
                <strong>{location.name}</strong>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      <button
        onClick={toggleTheme}
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          zIndex: 1000,
          padding: '10px 15px',
          backgroundColor: currentTheme === 'light' ? '#333' : '#fff',
          color: currentTheme === 'light' ? '#fff' : '#333',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '14px',
          boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
        }}
      >
        Mudar para Modo {currentTheme === 'light' ? 'Escuro' : 'Claro '}
      </button>
    </div>
  );
};

export default MapComponent;
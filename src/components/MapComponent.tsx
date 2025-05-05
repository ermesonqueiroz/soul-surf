import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { LocationType, Beach, Shop, Repair, Location } from '../types';

// Fix icon paths for Leaflet
// This is needed because Leaflet's default marker icons have issues with bundlers
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

// Custom marker icons
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

// Component to set the map view
const SetMapView: React.FC<{ center: [number, number] }> = ({ center }) => {
  const map = useMap();

  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);

  return null;
};

const MapComponent: React.FC<MapComponentProps> = ({
  locations,
  visibleTypes,
  onBeachSelect,
  onShopSelect,
}) => {
  const [mapCenter] = useState<[number, number]>([-3.7319, -38.5267]); // Fortaleza center

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
      // For shops and repairs, we need the marker position for the popup
      onShopSelect(
        location as (Shop | Repair),
        [e.latlng.lat, e.latlng.lng]
      );
    }
  };


  return (
    <MapContainer
      center={mapCenter}
      zoom={13}
      style={{ height: '100vh', width: '100%', zIndex: 0 }}
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
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
  );
};

export default MapComponent;
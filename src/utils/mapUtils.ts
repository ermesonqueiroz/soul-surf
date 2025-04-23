import L from 'leaflet';
import { LocationType } from '../types';

// Create custom icons for different location types
export const createCustomIcon = (type: LocationType): L.Icon => {
  const iconUrl = getIconUrlForType(type);
  
  return L.icon({
    iconUrl,
    iconSize: [32, 32], // size of the icon
    iconAnchor: [16, 32], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -32] // point from which the popup should open relative to the iconAnchor
  });
};

// Get the icon URL based on location type
const getIconUrlForType = (type: LocationType): string => {
  switch (type) {
    case LocationType.BEACH:
      return '/icons/beach-marker.svg';
    case LocationType.REPAIR:
      return '/icons/repair-marker.svg';
    case LocationType.SHOP:
      return '/icons/shop-marker.svg';
    default:
      return '/icons/default-marker.svg';
  }
};

// Function to get color based on location type
export const getColorForType = (type: LocationType): string => {
  switch (type) {
    case LocationType.BEACH:
      return '#3B82F6'; // blue
    case LocationType.REPAIR:
      return '#F59E0B'; // amber
    case LocationType.SHOP:
      return '#10B981'; // emerald
    default:
      return '#6B7280'; // gray
  }
};

// Create SVG icon strings for use in react components
export const getIconSvg = (type: LocationType): string => {
  switch (type) {
    case LocationType.BEACH:
      return `
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M17 17H2a10 10 0 0 1 10-10h2a8 8 0 0 1 8 8z"/>
          <path d="M10.3 21H4a2 2 0 0 1-2-2v-4.3a9 9 0 0 0 9.6 2.3"/>
          <path d="M21.4 17a9 9 0 0 0-9.6-2.3"/>
        </svg>
      `;
    case LocationType.REPAIR:
      return `
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
        </svg>
      `;
    case LocationType.SHOP:
      return `
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M2 3h19.5"/>
          <path d="M5.5 3a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"/>
          <path d="M14 3a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"/>
          <path d="M9.5 3V0"/>
        </svg>
      `;
    default:
      return `
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#6B7280" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="m21 10-7-7M9.5 3V1"/>
          <path d="M9.5 3a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"/>
        </svg>
      `;
  }
};
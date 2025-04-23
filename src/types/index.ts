export interface Location {
  id: string;
  name: string;
  type: LocationType;
  coordinates: [number, number];
  description?: string;
}

export enum LocationType {
  BEACH = 'beach',
  REPAIR = 'repair',
  SHOP = 'shop'
}

export interface Beach extends Location {
  type: LocationType.BEACH;
  waveQuality: number; // 1-5
  difficulty: number; // 1-5
  bestTide: string;
  bestWind: string;
}

export interface Shop extends Location {
  type: LocationType.SHOP;
  instagram?: string;
  phone?: string;
  whatsapp?: string;
  rating: number; // 1-5
  hours?: string;
}

export interface Repair extends Location {
  type: LocationType.REPAIR;
  instagram?: string;
  phone?: string;
  whatsapp?: string;
  rating: number; // 1-5
  specialty?: string;
  hours?: string;
}

export interface Post {
  id: string;
  locationId: string;
  author: string;
  date: string;
  imageUrl: string;
  content: string;
  likes: number;
}

export interface Comment {
  id: string;
  locationId: string;
  postId?: string;
  author: string;
  date: string;
  content: string;
  likes: number;
}

export interface WeatherForecast {
  date: string;
  time: string;
  temperature: number;
  windSpeed: number;
  windDirection: number;
  waveHeight?: number;
  wavePeriod?: number;
  precipitation: number;
}

export interface SessionLogData {
  date: string;
  time: string;
  locationId: string;
  notes: string;
  rating: number;
  imageFile?: File;
}

export interface FilterState {
  beaches: boolean;
  repairs: boolean;
  shops: boolean;
}
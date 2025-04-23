import React from 'react';
import { Star, Instagram, Phone, MessageSquare, Clock } from 'lucide-react';
import { Repair, Shop } from '../types';

interface ShopInfoCardProps {
  location: Shop | Repair;
  onClose: () => void;
}

const ShopInfoCard: React.FC<ShopInfoCardProps> = ({ location, onClose }) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        size={16}
        className={index < Math.round(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
      />
    ));
  };

  return (
    <div className="absolute z-20 bg-white rounded-lg shadow-lg p-4 w-64 transform -translate-x-1/2 animate-fade-in">
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        aria-label="Close info card"
      >
        ×
      </button>
      
      <h3 className="font-bold text-lg mb-2">{location.name}</h3>
      
      <div className="flex items-center mb-2">
        {renderStars(location.rating)}
        <span className="ml-1 text-sm text-gray-600">{location.rating.toFixed(1)}</span>
      </div>
      
      {location.instagram && (
        <a
          href={`https://instagram.com/${location.instagram.replace('@', '')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-sm text-gray-700 mb-2 hover:text-blue-500"
        >
          <Instagram size={16} className="mr-2" />
          {location.instagram}
        </a>
      )}
      
      {location.phone && (
        <a
          href={`tel:${location.phone}`}
          className="flex items-center text-sm text-gray-700 mb-2 hover:text-blue-500"
        >
          <Phone size={16} className="mr-2" />
          {location.phone}
        </a>
      )}
      
      {location.whatsapp && (
        <a
          href={`https://wa.me/${location.whatsapp.replace(/\D/g, '')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-sm text-gray-700 mb-2 hover:text-green-500"
        >
          <MessageSquare size={16} className="mr-2" />
          WhatsApp
        </a>
      )}
      
      {location.hours && (
        <div className="flex items-center text-sm text-gray-700">
          <Clock size={16} className="mr-2" />
          {location.hours}
        </div>
      )}
    </div>
  );
};

export default ShopInfoCard;
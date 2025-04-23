import React from 'react';
import { Wind, Droplets, Thermometer, ArrowUp } from 'lucide-react';
import { WeatherForecast } from '../types';
import { format } from 'date-fns';

interface WeatherTabProps {
  forecasts: WeatherForecast[];
  isLoading: boolean;
}

const WeatherTab: React.FC<WeatherTabProps> = ({ forecasts, isLoading }) => {
  if (isLoading) {
    return (
      <div className="p-4 flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!forecasts || forecasts.length === 0) {
    return (
      <div className="p-4 text-gray-500 text-center">
        No forecast data available. Check back later.
      </div>
    );
  }

  return (
    <div className="p-4">
      <h3 className="font-bold text-lg mb-4">Surf Forecast</h3>
      
      <div className="grid grid-cols-1 gap-4">
        {forecasts.map((forecast, index) => (
          <div key={index} className="bg-blue-50 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">
                {format(new Date(`${forecast.date}T${forecast.time}`), 'E, MMM d - h:mm a')}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center">
                <Thermometer size={18} className="text-red-500 mr-2" />
                <span>{forecast.temperature}°C</span>
              </div>
              
              <div className="flex items-center">
                <Wind size={18} className="text-blue-500 mr-2" />
                <span>{forecast.windSpeed} km/h</span>
                <ArrowUp
                  size={16}
                  className="ml-2 transform"
                  style={{ rotate: `${forecast.windDirection}deg` }}
                />
              </div>
              
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  className="text-blue-500 mr-2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
                </svg>
                <span>{forecast.waveHeight}m / {forecast.wavePeriod}s</span>
              </div>
              
              <div className="flex items-center">
                <Droplets size={18} className="text-blue-500 mr-2" />
                <span>{forecast.precipitation}mm</span>
              </div>
            </div>
            
            <div className="mt-3 text-sm">
              <div className="font-medium text-blue-700">Surf conditions:</div>
              <div className="mt-1">
                {getSurfConditionText(forecast)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Helper function to generate surf condition text based on weather data
const getSurfConditionText = (forecast: WeatherForecast): string => {
  if (!forecast.waveHeight) return 'No wave data available';
  
  let conditions = [];
  
  // Wave size
  if (forecast.waveHeight < 0.5) {
    conditions.push('Very small waves');
  } else if (forecast.waveHeight < 1) {
    conditions.push('Small waves, good for beginners');
  } else if (forecast.waveHeight < 1.5) {
    conditions.push('Medium waves, good for most levels');
  } else if (forecast.waveHeight < 2) {
    conditions.push('Medium to large waves, good for intermediates');
  } else {
    conditions.push('Large waves, for experienced surfers only');
  }
  
  // Wind conditions
  const windDirection = forecast.windDirection;
  if ((windDirection > 180 && windDirection < 360) || windDirection === 0) {
    conditions.push('offshore winds (good conditions)');
  } else {
    conditions.push('onshore winds (choppy conditions)');
  }
  
  // Precipitation
  if (forecast.precipitation > 1) {
    conditions.push('rain may affect visibility');
  }
  
  return conditions.join(', ');
};

export default WeatherTab;
import { WeatherForecast } from '../types';

const API_BASE_URL = 'https://api.open-meteo.com/v1/forecast';

export async function fetchWeatherForecast(
  latitude: number,
  longitude: number
): Promise<WeatherForecast[]> {
  try {
    const response = await fetch(
      `${API_BASE_URL}?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,precipitation,windspeed_10m,winddirection_10m&forecast_days=3`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }

    const data = await response.json();
    
    // Process the data to match our WeatherForecast type
    const forecasts: WeatherForecast[] = [];
    
    for (let i = 0; i < 24; i++) {
      // Only include data points for 6 AM, 12 PM, 6 PM
      if ([6, 12, 18].includes(new Date(data.hourly.time[i]).getHours())) {
        forecasts.push({
          date: new Date(data.hourly.time[i]).toISOString().split('T')[0],
          time: new Date(data.hourly.time[i]).toTimeString().slice(0, 5),
          temperature: data.hourly.temperature_2m[i],
          windSpeed: data.hourly.windspeed_10m[i],
          windDirection: data.hourly.winddirection_10m[i],
          precipitation: data.hourly.precipitation[i],
          // Wave data would need a specialized marine API
          waveHeight: Math.random() * 2 + 0.5, // Mock data
          wavePeriod: Math.floor(Math.random() * 6) + 6, // Mock data
        });
      }
    }
    
    return forecasts;
  } catch (error) {
    console.error('Error fetching weather forecast:', error);
    return [];
  }
}
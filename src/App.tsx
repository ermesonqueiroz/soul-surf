import { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import FilterBar from './components/FilterBar';
import MapComponent from './components/MapComponent';
import BeachPanel from './components/BeachPanel';
import ShopInfoCard from './components/ShopInfoCard';
import { allLocations, beaches, getTopPostForBeach, getTopCommentForBeach, getRecentCommentsForBeach, getWeatherForecastForBeach } from './data/mockData';
import { Beach, FilterState, Repair, Shop, WeatherForecast } from './types';
import { fetchWeatherForecast } from './api/weatherApi';

function App() {
  const [filters, setFilters] = useState<FilterState>({
    beaches: true,
    repairs: true,
    shops: true
  });

  const [selectedBeach, setSelectedBeach] = useState<Beach | null>(null);
  const [selectedShop, setSelectedShop] = useState<Shop | Repair | null>(null);
  const [shopMarkerPosition, setShopMarkerPosition] = useState<[number, number] | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [weatherData, setWeatherData] = useState<Record<string, WeatherForecast[]>>({});
  const [, setIsLoading] = useState(false);

  useEffect(() => {
    // Load initial weather data for all beaches
    const loadWeatherData = async () => {
      setIsLoading(true);

      const weatherPromises = beaches.map(async (beach) => {
        try {
          const forecasts = await fetchWeatherForecast(beach.coordinates[0], beach.coordinates[1]);
          return { beachId: beach.id, forecasts };
        } catch (error) {
          console.error(`Failed to fetch weather for ${beach.name}:`, error);
          return { beachId: beach.id, forecasts: getWeatherForecastForBeach(beach.id) };
        }
      });

      const results = await Promise.all(weatherPromises);

      const weatherMap: Record<string, WeatherForecast[]> = {};
      results.forEach(({ beachId, forecasts }) => {
        weatherMap[beachId] = forecasts;
      });

      setWeatherData(weatherMap);
      setIsLoading(false);
    };

    loadWeatherData();
  }, []);

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  const handleBeachSelect = (beach: Beach) => {
    setSelectedBeach(beach);
    setSelectedShop(null);
    setShopMarkerPosition(null);
  };

  const handleShopSelect = (shop: Shop | Repair, position: [number, number]) => {
    setSelectedShop(shop);
    setShopMarkerPosition(position);
    setSelectedBeach(null);
  };

  const closeBeachPanel = () => {
    setSelectedBeach(null);
  };

  const closeShopInfoCard = () => {
    setSelectedShop(null);
    setShopMarkerPosition(null);
  };

  return (
    <div className="h-screen w-full relative overflow-hidden">
      {/* Mobile Header */}
      <div className="sm:hidden bg-gradient-to-r from-blue-600 to-cyan-500 text-white p-4 flex justify-between items-center">
        <h1 className="font-bold text-xl">Soul Surf</h1>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-full hover:bg-blue-600 transition-colors"
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden absolute top-16 left-0 right-0 bg-white z-40 shadow-lg">
          <div className="p-4 space-y-2">
            <button
              onClick={() => {
                setFilters({...filters, beaches: !filters.beaches});
                setIsMobileMenuOpen(false);
              }}
              className={`block w-full text-left p-3 rounded-lg ${
                filters.beaches ? 'bg-blue-500 text-white' : 'bg-gray-100'
              }`}
            >
              Surf Beaches
            </button>

            <button
              onClick={() => {
                setFilters({...filters, repairs: !filters.repairs});
                setIsMobileMenuOpen(false);
              }}
              className={`block w-full text-left p-3 rounded-lg ${
                filters.repairs ? 'bg-amber-500 text-white' : 'bg-gray-100'
              }`}
            >
              Surfboard Repair
            </button>

            <button
              onClick={() => {
                setFilters({...filters, shops: !filters.shops});
                setIsMobileMenuOpen(false);
              }}
              className={`block w-full text-left p-3 rounded-lg ${
                filters.shops ? 'bg-emerald-500 text-white' : 'bg-gray-100'
              }`}
            >
              Surf Shops
            </button>
          </div>
        </div>
      )}

      {/* Desktop Filters */}
      <div className="hidden sm:block">
        <FilterBar
          filters={filters}
          onFilterChange={handleFilterChange}
        />
      </div>

      {/* Map */}
      <MapComponent
        locations={allLocations}
        visibleTypes={filters}
        onBeachSelect={handleBeachSelect}
        onShopSelect={handleShopSelect}
      />

      {/* Beach Info Panel */}
      {selectedBeach && (
        <BeachPanel
          beach={selectedBeach}
          topPost={getTopPostForBeach(selectedBeach.id)}
          topComment={getTopCommentForBeach(selectedBeach.id)}
          recentComments={getRecentCommentsForBeach(selectedBeach.id)}
          weatherForecasts={weatherData[selectedBeach.id] || getWeatherForecastForBeach(selectedBeach.id)}
          onClose={closeBeachPanel}
        />
      )}

      {/* Shop/Repair Info Card */}
      {selectedShop && shopMarkerPosition && (
        <div
          className="absolute z-20"
          style={{
            left: `${window.innerWidth / 2}px`,
            top: `${window.innerHeight / 2 - 160}px`
          }}
        >
          <ShopInfoCard location={selectedShop} onClose={closeShopInfoCard} />
        </div>
      )}
    </div>
  );
}

export default App;
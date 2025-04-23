import React from 'react';
import { Waves as Wave, Wrench, Keyboard as Surfboard, Search } from 'lucide-react';
import { FilterState } from '../types';

interface FilterBarProps {
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ filters, onFilterChange }) => {
  const handleToggle = (filterType: keyof FilterState) => {
    onFilterChange({
      ...filters,
      [filterType]: !filters[filterType]
    });
  };

  return (
    <div className="absolute top-4 px-4 z-10  h-12 flex gap-3">
      <form className="rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 flex items-center cursor-text min-w-[400px] justify-between">
        <input
          type="text"
          className="outline-none px-4 bg-transparent"
          placeholder="Praia do Futuro"
        />
        <Search className="mr-4" />
      </form>

      <button
        onClick={() => handleToggle('beaches')}
        className={`flex items-center space-x-2 px-6 py-2 rounded-full transition-colors ${
          filters.beaches
            ? 'bg-blue-500 text-white'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
        aria-label="Toggle beach markers"
      >
        <Wave size={20} />
        <span className="hidden sm:inline">Beaches</span>
      </button>
      
      <button
        onClick={() => handleToggle('repairs')}
        className={`flex items-center space-x-2 px-6 py-2 rounded-full transition-colors ${
          filters.repairs
            ? 'bg-amber-500 text-white'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
        aria-label="Toggle repair shop markers"
      >
        <Wrench size={20} />
        <span className="hidden sm:inline">Repairs</span>
      </button>
      
      <button
        onClick={() => handleToggle('shops')}
        className={`flex items-center space-x-2 px-6 py-2 rounded-full transition-colors ${
          filters.shops
            ? 'bg-emerald-500 text-white'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
        aria-label="Toggle surf shop markers"
      >
        <Surfboard size={20} />
        <span className="hidden sm:inline">Shops</span>
      </button>
    </div>
  );
};

export default FilterBar;
import { SlidersHorizontal } from 'lucide-react';

interface CarFiltersProps {
  filters: {
    type: string;
    transmission: string;
    priceRange: [number, number];
    availableOnly: boolean;
  };
  setFilters: (filters: any) => void;
}

export function CarFilters({ filters, setFilters }: CarFiltersProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-2 mb-6">
        <SlidersHorizontal className="w-5 h-5 text-gray-700" />
        <h2>Filters</h2>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block mb-2 text-gray-700">Car Type</label>
          <select
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          >
            <option value="all">All Types</option>
            <option value="Sedan">Sedan</option>
            <option value="SUV">SUV</option>
            <option value="Sports">Sports</option>
            <option value="Electric">Electric</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 text-gray-700">Transmission</label>
          <select
            value={filters.transmission}
            onChange={(e) =>
              setFilters({ ...filters, transmission: e.target.value })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          >
            <option value="all">All</option>
            <option value="Automatic">Automatic</option>
            <option value="Manual">Manual</option>
          </select>
        </div>

        <div>
          <label className="block mb-3 text-gray-700">
            Price Range: ${filters.priceRange[0]} - ${filters.priceRange[1]}/day
          </label>
          <input
            type="range"
            min="0"
            max="300"
            value={filters.priceRange[1]}
            onChange={(e) =>
              setFilters({
                ...filters,
                priceRange: [0, parseInt(e.target.value)],
              })
            }
            className="w-full accent-blue-600"
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="available"
            checked={filters.availableOnly}
            onChange={(e) =>
              setFilters({ ...filters, availableOnly: e.target.checked })
            }
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="available" className="ml-2 text-gray-700">
            Available only
          </label>
        </div>

        <button
          onClick={() =>
            setFilters({
              type: 'all',
              transmission: 'all',
              priceRange: [0, 300],
              availableOnly: false,
            })
          }
          className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
}

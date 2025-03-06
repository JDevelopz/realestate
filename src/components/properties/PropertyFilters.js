import { useState } from "react";

export default function PropertyFilters({ onFilter, initialFilters = {} }) {
  const [filters, setFilters] = useState({
    query: "",
    type: "",
    minPrice: "",
    maxPrice: "",
    bedrooms: "",
    bathrooms: "",
    ...initialFilters,
  });

  const propertyTypes = [
    { value: "residential", label: "Residential" },
    { value: "commercial", label: "Commercial" },
    { value: "development", label: "Development" },
    { value: "land", label: "Land" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter(filters);
  };

  const handleReset = () => {
    const resetFilters = {
      query: "",
      type: "",
      minPrice: "",
      maxPrice: "",
      bedrooms: "",
      bathrooms: "",
    };
    setFilters(resetFilters);
    onFilter(resetFilters);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-6 rounded-lg shadow-md"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Search Query */}
        <div>
          <label
            htmlFor="query"
            className="block text-sm font-medium text-text-secondary"
          >
            Search
          </label>
          <input
            type="text"
            name="query"
            id="query"
            value={filters.query}
            onChange={handleChange}
            placeholder="Search properties..."
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary sm:text-sm"
          />
        </div>

        {/* Property Type */}
        <div>
          <label
            htmlFor="type"
            className="block text-sm font-medium text-text-secondary"
          >
            Property Type
          </label>
          <select
            name="type"
            id="type"
            value={filters.type}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary sm:text-sm"
          >
            <option value="">All Types</option>
            {propertyTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        {/* Price Range */}
        <div className="sm:col-span-2 lg:col-span-1">
          <label className="block text-sm font-medium text-text-secondary">
            Price Range
          </label>
          <div className="mt-1 grid grid-cols-2 gap-2">
            <input
              type="number"
              name="minPrice"
              value={filters.minPrice}
              onChange={handleChange}
              placeholder="Min Price"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary sm:text-sm"
            />
            <input
              type="number"
              name="maxPrice"
              value={filters.maxPrice}
              onChange={handleChange}
              placeholder="Max Price"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary sm:text-sm"
            />
          </div>
        </div>

        {/* Bedrooms */}
        <div>
          <label
            htmlFor="bedrooms"
            className="block text-sm font-medium text-text-secondary"
          >
            Bedrooms
          </label>
          <select
            name="bedrooms"
            id="bedrooms"
            value={filters.bedrooms}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary sm:text-sm"
          >
            <option value="">Any</option>
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num}+
              </option>
            ))}
          </select>
        </div>

        {/* Bathrooms */}
        <div>
          <label
            htmlFor="bathrooms"
            className="block text-sm font-medium text-text-secondary"
          >
            Bathrooms
          </label>
          <select
            name="bathrooms"
            id="bathrooms"
            value={filters.bathrooms}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary sm:text-sm"
          >
            <option value="">Any</option>
            {[1, 1.5, 2, 2.5, 3, 3.5, 4].map((num) => (
              <option key={num} value={num}>
                {num}+
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
        <button
          type="button"
          onClick={handleReset}
          className="px-4 py-2 text-sm font-medium text-text-secondary hover:text-primary focus:outline-none focus:ring-2 focus:ring-secondary"
        >
          Reset
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary-light rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
        >
          Apply Filters
        </button>
      </div>
    </form>
  );
}

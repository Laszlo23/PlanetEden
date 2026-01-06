"use client";

import { useState } from "react";

interface FilterBarProps {
  onFilterChange?: (filters: FilterState) => void;
}

interface FilterState {
  search: string;
  sortBy: "newest" | "rating" | "price";
  priceRange: "all" | "low" | "medium" | "high";
}

export function FilterBar({ onFilterChange }: FilterBarProps) {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    sortBy: "newest",
    priceRange: "all",
  });

  const updateFilter = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  return (
    <div className="card space-y-4">
      <div>
        <label className="block text-sm font-medium text-dark-text mb-2">
          Search
        </label>
        <input
          type="text"
          placeholder="Search providers..."
          value={filters.search}
          onChange={(e) => updateFilter("search", e.target.value)}
          className="input w-full"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-dark-text mb-2">
            Sort By
          </label>
          <select
            value={filters.sortBy}
            onChange={(e) => updateFilter("sortBy", e.target.value)}
            className="input w-full"
          >
            <option value="newest">Newest</option>
            <option value="rating">Rating</option>
            <option value="price">Price</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-dark-text mb-2">
            Price Range
          </label>
          <select
            value={filters.priceRange}
            onChange={(e) => updateFilter("priceRange", e.target.value)}
            className="input w-full"
          >
            <option value="all">All Prices</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>
    </div>
  );
}

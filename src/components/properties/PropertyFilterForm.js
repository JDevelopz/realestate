"use client";

import { useRouter, useSearchParams } from "next/navigation";
import PropertyFilters from "./PropertyFilters";

export default function PropertyFilterForm({ initialFilters }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleFilter = (filters) => {
    // Build the query string from filters
    const queryParams = new URLSearchParams();

    // Only add non-empty values to the query string
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        queryParams.set(key, value);
      }
    });

    // Preserve the page parameter if it exists
    const page = searchParams.get("page");
    if (page && page !== "1") {
      queryParams.set("page", page);
    }

    // Update the URL with the new filters
    const queryString = queryParams.toString();
    router.push(`/properties${queryString ? `?${queryString}` : ""}`);
  };

  return (
    <PropertyFilters onFilter={handleFilter} initialFilters={initialFilters} />
  );
}

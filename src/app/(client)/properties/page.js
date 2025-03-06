import { Suspense } from "react";
import Navbar from "@/components/layout/Navbar";
import PropertyFilters from "@/components/properties/PropertyFilters";
import PropertyCard from "@/components/properties/PropertyCard";
import { propertyQueries } from "@/lib/supabaseClient";

// Number of properties per page
const PROPERTIES_PER_PAGE = 9;

// Server action for filtering properties
async function filterProperties(searchParams) {
  "use server";

  const page = Number(searchParams?.page) || 1;
  const filters = {
    type: searchParams?.type || "",
    minPrice: searchParams?.minPrice ? Number(searchParams.minPrice) : "",
    maxPrice: searchParams?.maxPrice ? Number(searchParams.maxPrice) : "",
    bedrooms: searchParams?.bedrooms ? Number(searchParams.bedrooms) : "",
    bathrooms: searchParams?.bathrooms ? Number(searchParams.bathrooms) : "",
    query: searchParams?.query || "",
  };

  try {
    const properties = await propertyQueries.searchProperties(filters);
    const totalProperties = properties.length;
    const totalPages = Math.ceil(totalProperties / PROPERTIES_PER_PAGE);

    // Calculate pagination slice
    const start = (page - 1) * PROPERTIES_PER_PAGE;
    const end = start + PROPERTIES_PER_PAGE;
    const paginatedProperties = properties.slice(start, end);

    return {
      properties: paginatedProperties,
      pagination: {
        currentPage: page,
        totalPages,
        totalProperties,
      },
    };
  } catch (error) {
    console.error("Error fetching properties:", error);
    return {
      properties: [],
      pagination: {
        currentPage: 1,
        totalPages: 0,
        totalProperties: 0,
      },
    };
  }
}

export default async function PropertiesPage({ searchParams }) {
  const { properties, pagination } = await filterProperties(searchParams);

  return (
    <div className="min-h-screen bg-background-light">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-primary">Properties</h1>
            <p className="mt-2 text-lg text-text-secondary">
              Discover our exclusive selection of premium properties
            </p>
          </div>

          <Suspense fallback={<div>Loading filters...</div>}>
            <PropertyFilters
              initialFilters={{
                query: searchParams?.query || "",
                type: searchParams?.type || "",
                minPrice: searchParams?.minPrice || "",
                maxPrice: searchParams?.maxPrice || "",
                bedrooms: searchParams?.bedrooms || "",
                bathrooms: searchParams?.bathrooms || "",
              }}
            />
          </Suspense>

          {/* Results count */}
          <div className="flex justify-between items-center">
            <p className="text-text-secondary">
              Showing {properties.length} of {pagination.totalProperties}{" "}
              properties
            </p>

            {/* Sort options could be added here */}
          </div>

          {/* Properties grid */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {properties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                showSaveButton={true}
              />
            ))}
          </div>

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="flex justify-center mt-8">
              <nav
                className="flex items-center space-x-2"
                aria-label="Pagination"
              >
                {Array.from(
                  { length: pagination.totalPages },
                  (_, i) => i + 1
                ).map((pageNum) => (
                  <a
                    key={pageNum}
                    href={`/properties?page=${pageNum}${
                      searchParams?.query ? `&query=${searchParams.query}` : ""
                    }${searchParams?.type ? `&type=${searchParams.type}` : ""}${
                      searchParams?.minPrice
                        ? `&minPrice=${searchParams.minPrice}`
                        : ""
                    }${
                      searchParams?.maxPrice
                        ? `&maxPrice=${searchParams.maxPrice}`
                        : ""
                    }${
                      searchParams?.bedrooms
                        ? `&bedrooms=${searchParams.bedrooms}`
                        : ""
                    }${
                      searchParams?.bathrooms
                        ? `&bathrooms=${searchParams.bathrooms}`
                        : ""
                    }`}
                    className={`px-4 py-2 text-sm font-medium rounded-md ${
                      pageNum === pagination.currentPage
                        ? "bg-primary text-white"
                        : "text-text-secondary hover:bg-gray-50"
                    }`}
                    aria-current={
                      pageNum === pagination.currentPage ? "page" : undefined
                    }
                  >
                    {pageNum}
                  </a>
                ))}
              </nav>
            </div>
          )}

          {/* No results */}
          {properties.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-text-primary">
                No properties found
              </h3>
              <p className="mt-2 text-text-secondary">
                Try adjusting your search filters or browse all properties
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

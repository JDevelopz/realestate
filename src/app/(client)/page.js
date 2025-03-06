import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import PropertyCard from "@/components/properties/PropertyCard";
import { propertyQueries } from "@/lib/supabaseClient";
import { handleError } from "@/utils/error";

async function getFeaturedProperties() {
  try {
    return await propertyQueries.getFeaturedProperties(3);
  } catch (error) {
    const handledError = handleError(error);
    console.error("Error fetching featured properties:", handledError);
    return [];
  }
}

export default async function Home() {
  const featuredProperties = await getFeaturedProperties();

  return (
    <main className="min-h-screen bg-background-light">
      <Navbar />

      {/* Hero Section */}
      <div className="relative bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 lg:mt-16 lg:px-8 xl:mt-20">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-bold text-primary sm:text-5xl md:text-6xl">
                  <span className="block">Invest in Premium</span>
                  <span className="block text-secondary">Real Estate</span>
                </h1>
                <p className="mt-3 text-base text-text-secondary sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Discover exclusive properties and development opportunities in
                  prime locations. Our expert team helps you make informed
                  investment decisions.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <Link
                      href="/properties"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary-light md:py-4 md:text-lg md:px-10"
                    >
                      View Properties
                    </Link>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <Link
                      href="/contact"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-secondary hover:bg-secondary-light md:py-4 md:text-lg md:px-10"
                    >
                      Contact Us
                    </Link>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <div className="h-56 w-full bg-gray-300 sm:h-72 md:h-96 lg:w-full lg:h-full">
            {/* Add hero image here */}
          </div>
        </div>
      </div>

      {/* Featured Properties Section */}
      <div className="bg-background-dark py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-3xl font-semibold text-primary">
              Featured Properties
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-text-secondary lg:mx-auto">
              Explore our handpicked selection of premium properties and
              investment opportunities.
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {featuredProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  showSaveButton={false}
                />
              ))}
            </div>
            {featuredProperties.length > 0 && (
              <div className="mt-12 text-center">
                <Link
                  href="/properties"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary-light"
                >
                  View All Properties
                  <svg
                    className="ml-2 -mr-1 w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

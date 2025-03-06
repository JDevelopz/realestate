import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { userQueries } from "@/lib/supabaseClient";

export default function PropertyCard({
  property,
  onSave,
  isSaved = false,
  showSaveButton = true,
}) {
  const [saved, setSaved] = useState(isSaved);
  const [isLoading, setIsLoading] = useState(false);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);
    try {
      const result = await userQueries.toggleSavedProperty(property.id);
      setSaved(result);
      if (onSave) onSave(result);
    } catch (error) {
      console.error("Error toggling property save:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Link
      href={`/properties/${property.id}`}
      className="group relative bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-secondary"
    >
      <div className="relative h-48 w-full bg-gray-200">
        {property.property_images?.[0]?.url ? (
          <Image
            src={property.property_images[0].url}
            alt={property.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <span className="text-gray-400">No image available</span>
          </div>
        )}
        {showSaveButton && (
          <button
            onClick={handleSave}
            className={`absolute top-4 right-4 p-2 rounded-full ${
              saved ? "bg-secondary" : "bg-white"
            } shadow-md transition-colors hover:bg-secondary-light focus:outline-none focus:ring-2 focus:ring-secondary`}
            disabled={isLoading}
          >
            <svg
              className={`w-5 h-5 ${saved ? "text-white" : "text-gray-600"}`}
              fill={saved ? "currentColor" : "none"}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-primary truncate">
          {property.title}
        </h3>
        <p className="mt-1 text-sm text-text-secondary">
          {property.city}, {property.state}
        </p>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-lg font-bold text-primary">
            {formatPrice(property.price)}
          </span>
          <div className="flex items-center space-x-4 text-sm text-text-secondary">
            {property.bedrooms && (
              <span className="flex items-center">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                {property.bedrooms}
              </span>
            )}
            {property.bathrooms && (
              <span className="flex items-center">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3v18h18"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 3h6v6"
                  />
                </svg>
                {property.bathrooms}
              </span>
            )}
          </div>
        </div>
        <div className="mt-2">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              property.status === "available"
                ? "bg-green-100 text-green-800"
                : property.status === "under_contract"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {property.status.replace("_", " ").toUpperCase()}
          </span>
        </div>
      </div>
    </Link>
  );
}

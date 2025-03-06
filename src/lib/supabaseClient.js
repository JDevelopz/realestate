import { createClient } from "@supabase/supabase-js";
import {
  AppError,
  createAuthenticationError,
  createNotFoundError,
} from "@/utils/error";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new AppError("Missing Supabase environment variables", 500);
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper function to handle Supabase errors
export const handleSupabaseError = (error) => {
  if (!error) return;

  // Map Supabase error codes to our custom errors
  switch (error.code) {
    case "PGRST116":
      throw createNotFoundError(error.message);
    case "PGRST301":
      throw createAuthenticationError(error.message);
    default:
      throw new AppError(
        error.message || "Database error occurred",
        500,
        error
      );
  }
};

// Property-related queries
export const propertyQueries = {
  async getFeaturedProperties(limit = 6) {
    try {
      const { data, error } = await supabase
        .from("properties")
        .select(
          `
          *,
          property_images!inner(url, is_primary)
        `
        )
        .eq("property_images.is_primary", true)
        .eq("status", "available")
        .order("created_at", { ascending: false })
        .limit(limit);

      if (error) handleSupabaseError(error);
      return data;
    } catch (error) {
      throw new AppError("Failed to fetch featured properties", 500, error);
    }
  },

  async getPropertyById(id) {
    try {
      const { data, error } = await supabase
        .from("properties")
        .select(
          `
          *,
          property_images(url, is_primary)
        `
        )
        .eq("id", id)
        .single();

      if (error) {
        if (error.code === "PGRST116") {
          throw createNotFoundError("Property not found");
        }
        handleSupabaseError(error);
      }
      return data;
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError("Failed to fetch property", 500, error);
    }
  },

  async searchProperties({
    type,
    minPrice,
    maxPrice,
    bedrooms,
    bathrooms,
    query,
  }) {
    try {
      let queryBuilder = supabase
        .from("properties")
        .select(
          `
          *,
          property_images!inner(url, is_primary)
        `
        )
        .eq("property_images.is_primary", true)
        .eq("status", "available");

      if (type) queryBuilder = queryBuilder.eq("property_type", type);
      if (minPrice) queryBuilder = queryBuilder.gte("price", minPrice);
      if (maxPrice) queryBuilder = queryBuilder.lte("price", maxPrice);
      if (bedrooms) queryBuilder = queryBuilder.eq("bedrooms", bedrooms);
      if (bathrooms) queryBuilder = queryBuilder.eq("bathrooms", bathrooms);
      if (query) {
        queryBuilder = queryBuilder.or(
          `title.ilike.%${query}%, description.ilike.%${query}%`
        );
      }

      const { data, error } = await queryBuilder.order("created_at", {
        ascending: false,
      });

      if (error) handleSupabaseError(error);
      return data;
    } catch (error) {
      throw new AppError("Failed to search properties", 500, error);
    }
  },
};

// User-related queries
export const userQueries = {
  async getUserProfile(userId) {
    try {
      const { data, error } = await supabase
        .from("user_profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        if (error.code === "PGRST116") {
          throw createNotFoundError("User profile not found");
        }
        handleSupabaseError(error);
      }
      return data;
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError("Failed to fetch user profile", 500, error);
    }
  },

  async updateUserProfile(userId, updates) {
    try {
      const { data, error } = await supabase
        .from("user_profiles")
        .update(updates)
        .eq("id", userId)
        .select()
        .single();

      if (error) handleSupabaseError(error);
      return data;
    } catch (error) {
      throw new AppError("Failed to update user profile", 500, error);
    }
  },

  async getSavedProperties(userId) {
    try {
      const { data, error } = await supabase
        .from("saved_properties")
        .select(
          `
          property_id,
          properties(
            *,
            property_images!inner(url, is_primary)
          )
        `
        )
        .eq("user_id", userId)
        .eq("property_images.is_primary", true);

      if (error) handleSupabaseError(error);
      return data?.map((item) => item.properties) || [];
    } catch (error) {
      throw new AppError("Failed to fetch saved properties", 500, error);
    }
  },

  async toggleSavedProperty(userId, propertyId) {
    try {
      const { data: existing } = await supabase
        .from("saved_properties")
        .select("id")
        .eq("user_id", userId)
        .eq("property_id", propertyId)
        .single();

      if (existing) {
        const { error } = await supabase
          .from("saved_properties")
          .delete()
          .eq("id", existing.id);

        if (error) handleSupabaseError(error);
        return false;
      } else {
        const { error } = await supabase
          .from("saved_properties")
          .insert({ user_id: userId, property_id: propertyId });

        if (error) handleSupabaseError(error);
        return true;
      }
    } catch (error) {
      throw new AppError("Failed to toggle saved property", 500, error);
    }
  },
};

// Inquiry-related queries
export const inquiryQueries = {
  async createInquiry(inquiryData) {
    try {
      const { data, error } = await supabase
        .from("property_inquiries")
        .insert(inquiryData)
        .select()
        .single();

      if (error) handleSupabaseError(error);
      return data;
    } catch (error) {
      throw new AppError("Failed to create inquiry", 500, error);
    }
  },

  async getUserInquiries(userId) {
    try {
      const { data, error } = await supabase
        .from("property_inquiries")
        .select(
          `
          *,
          properties(title, price)
        `
        )
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) handleSupabaseError(error);
      return data;
    } catch (error) {
      throw new AppError("Failed to fetch user inquiries", 500, error);
    }
  },
};

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum types
CREATE TYPE property_status AS ENUM ('available', 'under_contract', 'sold');
CREATE TYPE property_type AS ENUM ('residential', 'commercial', 'development', 'land');

-- Create properties table
CREATE TABLE properties (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(12,2) NOT NULL,
    property_type property_type NOT NULL,
    status property_status DEFAULT 'available',
    bedrooms INT,
    bathrooms DECIMAL(3,1),
    area_sqft DECIMAL(10,2),
    address TEXT NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    zip_code VARCHAR(20) NOT NULL,
    latitude DECIMAL(10,8),
    longitude DECIMAL(11,8),
    features JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create property_images table
CREATE TABLE property_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
    url TEXT NOT NULL,
    is_primary BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create user_profiles table (extends Supabase auth.users)
CREATE TABLE user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
    full_name VARCHAR(255),
    phone VARCHAR(50),
    is_admin BOOLEAN DEFAULT false,
    preferences JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create saved_properties table (for favorites)
CREATE TABLE saved_properties (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
    property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, property_id)
);

-- Create property_inquiries table
CREATE TABLE property_inquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_id UUID REFERENCES properties(id) ON DELETE SET NULL,
    user_id UUID REFERENCES user_profiles(id) ON DELETE SET NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    message TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX idx_properties_status ON properties(status);
CREATE INDEX idx_properties_type ON properties(property_type);
CREATE INDEX idx_properties_price ON properties(price);
CREATE INDEX idx_property_images_property_id ON property_images(property_id);
CREATE INDEX idx_saved_properties_user_id ON saved_properties(user_id);
CREATE INDEX idx_property_inquiries_property_id ON property_inquiries(property_id);
CREATE INDEX idx_property_inquiries_user_id ON property_inquiries(user_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_properties_updated_at
    BEFORE UPDATE ON properties
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_profiles_updated_at
    BEFORE UPDATE ON user_profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_property_inquiries_updated_at
    BEFORE UPDATE ON property_inquiries
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create RLS policies
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_inquiries ENABLE ROW LEVEL SECURITY;

-- Properties policies
CREATE POLICY "Properties are viewable by everyone"
    ON properties FOR SELECT
    USING (true);

CREATE POLICY "Properties are insertable by admins only"
    ON properties FOR INSERT
    TO authenticated
    USING (EXISTS (
        SELECT 1 FROM user_profiles
        WHERE id = auth.uid() AND is_admin = true
    ));

CREATE POLICY "Properties are updatable by admins only"
    ON properties FOR UPDATE
    TO authenticated
    USING (EXISTS (
        SELECT 1 FROM user_profiles
        WHERE id = auth.uid() AND is_admin = true
    ));

-- Property images policies
CREATE POLICY "Property images are viewable by everyone"
    ON property_images FOR SELECT
    USING (true);

CREATE POLICY "Property images are insertable by admins only"
    ON property_images FOR INSERT
    TO authenticated
    USING (EXISTS (
        SELECT 1 FROM user_profiles
        WHERE id = auth.uid() AND is_admin = true
    ));

-- User profiles policies
CREATE POLICY "Users can view their own profile"
    ON user_profiles FOR SELECT
    TO authenticated
    USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
    ON user_profiles FOR UPDATE
    TO authenticated
    USING (auth.uid() = id);

-- Saved properties policies
CREATE POLICY "Users can view their own saved properties"
    ON saved_properties FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "Users can save properties"
    ON saved_properties FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove their saved properties"
    ON saved_properties FOR DELETE
    TO authenticated
    USING (auth.uid() = user_id);

-- Property inquiries policies
CREATE POLICY "Admins can view all inquiries"
    ON property_inquiries FOR SELECT
    TO authenticated
    USING (EXISTS (
        SELECT 1 FROM user_profiles
        WHERE id = auth.uid() AND is_admin = true
    ));

CREATE POLICY "Users can view their own inquiries"
    ON property_inquiries FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "Users can create inquiries"
    ON property_inquiries FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id); 
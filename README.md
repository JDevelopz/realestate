# Real Estate Investment Platform

A modern web application for a real estate brokerage agency focused on investment properties. Built with Next.js 13+, React, Tailwind CSS, and Supabase.

## Features

- Clean, professional design inspired by BlackRock's website
- Property and development listings with detailed information
- Advanced search and filtering capabilities
- User accounts with saved properties
- Admin dashboard for property management
- Responsive design for all devices
- SEO optimized

## Tech Stack

- **Frontend**: Next.js 13+ with React
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Hosting**: Vercel
- **Image Storage**: Supabase Storage

## Prerequisites

- Node.js 18+ and npm
- Supabase account
- Vercel account (for deployment)

## Getting Started

1. Clone the repository:

   ```bash
   git clone [repository-url]
   cd real-estate-platform
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a Supabase project and get your credentials:

   - Go to [Supabase](https://supabase.com)
   - Create a new project
   - Get your project URL and anon key
   - Copy the SQL from `src/lib/schema.sql` and run it in your Supabase SQL editor

4. Set up environment variables:

   ```bash
   cp .env.local.example .env.local
   ```

   Then fill in your Supabase credentials in `.env.local`

5. Run the development server:

   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── app/                    # Next.js 13 app directory
│   ├── (admin)/           # Admin routes
│   ├── (auth)/            # Authentication routes
│   └── (client)/          # Client-facing routes
├── components/            # React components
│   ├── admin/            # Admin-specific components
│   ├── layout/           # Layout components
│   ├── properties/       # Property-related components
│   └── ui/              # Reusable UI components
├── lib/                  # Utilities and configurations
└── utils/               # Helper functions
```

## Database Schema

The application uses the following main tables:

- `properties`: Property listings
- `property_images`: Images associated with properties
- `user_profiles`: Extended user information
- `saved_properties`: User's saved properties
- `property_inquiries`: User inquiries about properties

See `src/lib/schema.sql` for the complete database schema.

## Deployment

1. Push your code to GitHub

2. Connect your repository to Vercel:
   - Go to [Vercel](https://vercel.com)
   - Import your repository
   - Set up your environment variables
   - Deploy

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details

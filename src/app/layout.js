import { Inter } from "next/font/google";
import "./globals.css";
import { AppProvider } from "./providers";
import SeoWrapper from "@/components/layout/SeoWrapper";
import ClientWrapper from "@/components/layout/ClientWrapper";

const inter = Inter({ subsets: ["latin"] });

// Ensure environment variables are available
const siteName =
  process.env.NEXT_PUBLIC_SITE_NAME || "Real Estate Investment Platform";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata = {
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description:
    "Professional real estate investment platform for modern investors",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full bg-white">
      <body className={`${inter.className} h-full antialiased`}>
        <AppProvider>
          <ClientWrapper>
            <SeoWrapper siteName={siteName} siteUrl={siteUrl} />
            {children}
          </ClientWrapper>
        </AppProvider>
      </body>
    </html>
  );
}

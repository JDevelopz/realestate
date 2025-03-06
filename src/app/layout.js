import { Inter } from "next/font/google";
import "./globals.css";
import { DefaultSeo } from "next-seo";

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
      <head>
        <DefaultSeo
          openGraph={{
            type: "website",
            locale: "en_US",
            url: siteUrl,
            siteName: siteName,
          }}
          twitter={{
            handle: "@handle",
            site: "@site",
            cardType: "summary_large_image",
          }}
        />
      </head>
      <body className={`${inter.className} h-full antialiased`}>
        <div id="app-root">{children}</div>
      </body>
    </html>
  );
}

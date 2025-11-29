import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientLoader from "@/components/ClientLoader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Smartscrews - Professional Building & Maintenance Services",
    template: "%s | Smartscrews",
  },
  description: "Trusted craftsmanship for your home and business. From carpentry to HVAC, we deliver quality solutions with attention to detail and professional service.",
  keywords: ["building services", "maintenance", "carpentry", "plumbing", "HVAC", "tiling", "painting"],
  authors: [{ name: "Smartscrews" }],
  icons: {
    icon: [
      { url: "/NEWNEWLOGO.svg", sizes: "any" },
      { url: "/icon.svg", sizes: "512x512", type: "image/svg+xml" },
    ],
    shortcut: "/NEWNEWLOGO.svg",
    apple: [
      { url: "/NEWNEWLOGO.svg", sizes: "180x180" },
    ],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://smartscrews.com",
    siteName: "Smartscrews",
    title: "Smartscrews - Professional Building & Maintenance Services",
    description: "Trusted craftsmanship for your home and business.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Smartscrews",
              "description": "Professional building and maintenance services",
              "url": "https://smartscrews.com",
              "telephone": "+1-234-567-8900",
              "email": "info@smartscrews.com",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "123 Main Street",
                "addressLocality": "City",
                "addressRegion": "State",
                "postalCode": "12345",
                "addressCountry": "US"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "40.7128",
                "longitude": "-74.0060"
              },
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday"
                ],
                "opens": "08:00",
                "closes": "18:00"
              },
              "priceRange": "$$",
              "serviceArea": {
                "@type": "GeoCircle",
                "geoMidpoint": {
                  "@type": "GeoCoordinates",
                  "latitude": "40.7128",
                  "longitude": "-74.0060"
                }
              },
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Building and Maintenance Services",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Carpentry and Wood Flooring Works"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Building Cleaning Services"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Floor and Wall Tiling Works"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "False Ceiling and Light Partitions Installation"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Wallpaper Fixing Works"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Plaster Works"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Electromechanical Equipment Installation and Maintenance"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Plumbing and Sanitary Installation"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Air Conditioning, Ventilation and Air Filtration Systems Installation and Maintenance"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Painting and Finishing Works"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Kitchen Renovation Works"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Architectural Drawing and Design Services"
                    }
                  }
                ]
              }
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <ClientLoader>{children}</ClientLoader>
      </body>
    </html>
  );
}

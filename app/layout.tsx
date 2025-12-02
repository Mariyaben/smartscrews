import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientLoader from "@/components/ClientLoader";
import { LanguageProvider } from "@/contexts/LanguageContext";

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
    default: "Smart Screws - Residential and Commercial Maintenance Services | SmartScrews",
    template: "%s | Smart Screws - SmartScrews",
  },
  description: "Smart Screws - Residential and commercial maintenance services in UAE and Dubai. The best maintenance, electrical, carpentry, plumbing, HVAC, tiling, painting, and construction services. Top-rated professional building and maintenance company offering expert carpentry, plumbing, air conditioning, kitchen renovation, and architectural design. Quality craftsmanship for your home and business. Smart Screws delivers smart solutions for all your construction and maintenance needs.",
  keywords: [
    // Primary service description
    "residential and commercial maintenance services", "residential maintenance services", "commercial maintenance services",
    "residential maintenance services uae", "residential maintenance services dubai",
    "commercial maintenance services uae", "commercial maintenance services dubai",
    "residential and commercial maintenance uae", "residential and commercial maintenance dubai",
    "residential building maintenance uae", "commercial building maintenance uae",
    "residential building maintenance dubai", "commercial building maintenance dubai",
    
    // Brand keywords - All permutations and variations
    "smart screws", "smart screw", "screws smart", "screw smart",
    "smartscrews", "smartscrew", "screwssmart", "screwsmar",
    "intelligent screws", "intelligent screw", "screws intelligent", "screw intelligent",
    "smart fasteners", "intelligent fasteners", "fasteners smart", "fasteners intelligent",
    "smart fixings", "intelligent fixings", "fixings smart", "fixings intelligent",
    "smart bolts", "intelligent bolts", "bolts smart", "bolts intelligent",
    "smart hardware", "intelligent hardware", "hardware smart", "hardware intelligent",
    "smart screws company", "smart screw company", "screws smart company", "screw smart company",
    "intelligent screws company", "intelligent screw company", "screws intelligent company",
    "smart screws services", "smart screw services", "screws smart services", "screw smart services",
    "intelligent screws services", "intelligent screw services", "screws intelligent services",
    "smart screws dubai", "smart screw dubai", "screws smart dubai", "screw smart dubai",
    "intelligent screws dubai", "intelligent screw dubai", "screws intelligent dubai",
    "smart screws uae", "smart screw uae", "screws smart uae", "screw smart uae",
    "intelligent screws uae", "intelligent screw uae", "screws intelligent uae",
    "smart screws technical services", "smart screw technical services", "screws smart technical services",
    "intelligent screws technical services", "intelligent screw technical services",
    "smart screws llc", "smart screw llc", "screws smart llc", "screw smart llc",
    "intelligent screws llc", "intelligent screw llc", "screws intelligent llc",
    "smart screws technical services llc", "smart screw technical services llc",
    "intelligent screws technical services llc", "intelligent screw technical services llc",
    // Common misspellings and typos
    "smart screwws", "smart screww", "smar screws", "smar screw", "smart scre", "smart screwws",
    "smartscrew", "smartscrews", "smarstcrews", "smarstcrew", "smartscres", "smartscres",
    "inteligent screws", "inteligent screw", "intellegent screws", "intellegent screw",
    "inteligent screwws", "inteligent screww",
    // Alternative spellings
    "smart screwws", "smart screww", "screwws smart", "screww smart",
    "intelligent screwws", "intelligent screww", "screwws intelligent", "screww intelligent",
    // With location variations
    "smart screws company dubai", "smart screw company dubai", "screws smart company dubai",
    "intelligent screws company dubai", "intelligent screw company dubai",
    "smart screws company uae", "smart screw company uae", "screws smart company uae",
    "intelligent screws company uae", "intelligent screw company uae",
    "smart screws dubai uae", "smart screw dubai uae", "screws smart dubai uae",
    "intelligent screws dubai uae", "intelligent screw dubai uae",
    // Combined with service keywords
    "smart screws maintenance", "smart screw maintenance", "screws smart maintenance",
    "intelligent screws maintenance", "intelligent screw maintenance",
    "smart screws electrical", "smart screw electrical", "screws smart electrical",
    "intelligent screws electrical", "intelligent screw electrical",
    "smart screws construction", "smart screw construction", "screws smart construction",
    "intelligent screws construction", "intelligent screw construction",
    "smart screws building services", "smart screw building services", "screws smart building services",
    "intelligent screws building services", "intelligent screw building services",
    
    // Best Maintenance variations
    "best maintenance uae", "best maintenance dubai", "best maintenance company uae",
    "best maintenance company dubai", "best maintenance services uae", "best maintenance services dubai",
    "top maintenance uae", "top maintenance dubai", "leading maintenance uae", "leading maintenance dubai",
    "premium maintenance uae", "premium maintenance dubai", "expert maintenance uae", "expert maintenance dubai",
    "professional maintenance uae", "professional maintenance dubai", "quality maintenance uae", "quality maintenance dubai",
    "reliable maintenance uae", "reliable maintenance dubai", "trusted maintenance uae", "trusted maintenance dubai",
    "affordable maintenance uae", "affordable maintenance dubai", "licensed maintenance uae", "licensed maintenance dubai",
    
    // Best Electrical variations
    "best electrical uae", "best electrical dubai", "best electrical services uae", "best electrical services dubai",
    "best electrical contractor uae", "best electrical contractor dubai", "best electrician uae", "best electrician dubai",
    "top electrical uae", "top electrical dubai", "leading electrical uae", "leading electrical dubai",
    "premium electrical uae", "premium electrical dubai", "expert electrical uae", "expert electrical dubai",
    "professional electrical uae", "professional electrical dubai", "quality electrical uae", "quality electrical dubai",
    "reliable electrical uae", "reliable electrical dubai", "trusted electrical uae", "trusted electrical dubai",
    "licensed electrical uae", "licensed electrical dubai", "certified electrical uae", "certified electrical dubai",
    
    // Best Carpentry variations
    "best carpentry uae", "best carpentry dubai", "best carpentry services uae", "best carpentry services dubai",
    "best carpenter uae", "best carpenter dubai", "best woodwork uae", "best woodwork dubai",
    "top carpentry uae", "top carpentry dubai", "leading carpentry uae", "leading carpentry dubai",
    "expert carpentry uae", "expert carpentry dubai", "professional carpentry uae", "professional carpentry dubai",
    "quality carpentry uae", "quality carpentry dubai", "best wood flooring uae", "best wood flooring dubai",
    
    // Best Plumbing variations
    "best plumbing uae", "best plumbing dubai", "best plumbing services uae", "best plumbing services dubai",
    "best plumber uae", "best plumber dubai", "best plumbing contractor uae", "best plumbing contractor dubai",
    "top plumbing uae", "top plumbing dubai", "leading plumbing uae", "leading plumbing dubai",
    "expert plumbing uae", "expert plumbing dubai", "professional plumbing uae", "professional plumbing dubai",
    "quality plumbing uae", "quality plumbing dubai", "reliable plumbing uae", "reliable plumbing dubai",
    "best sanitary installation uae", "best sanitary installation dubai",
    
    // Best HVAC variations
    "best hvac uae", "best hvac dubai", "best hvac services uae", "best hvac services dubai",
    "best air conditioning uae", "best air conditioning dubai", "best ac uae", "best ac dubai",
    "best ac services uae", "best ac services dubai", "best ac repair uae", "best ac repair dubai",
    "best ac installation uae", "best ac installation dubai", "best ac maintenance uae", "best ac maintenance dubai",
    "top hvac uae", "top hvac dubai", "leading hvac uae", "leading hvac dubai",
    "expert hvac uae", "expert hvac dubai", "professional hvac uae", "professional hvac dubai",
    "quality hvac uae", "quality hvac dubai", "best ventilation uae", "best ventilation dubai",
    "best air filtration uae", "best air filtration dubai",
    
    // Best Tiling variations
    "best tiling uae", "best tiling dubai", "best tiling services uae", "best tiling services dubai",
    "best tile installation uae", "best tile installation dubai", "best floor tiling uae", "best floor tiling dubai",
    "best wall tiling uae", "best wall tiling dubai", "top tiling uae", "top tiling dubai",
    "leading tiling uae", "leading tiling dubai", "expert tiling uae", "expert tiling dubai",
    "professional tiling uae", "professional tiling dubai", "quality tiling uae", "quality tiling dubai",
    
    // Best Painting variations
    "best painting uae", "best painting dubai", "best painting services uae", "best painting services dubai",
    "best painter uae", "best painter dubai", "best interior painting uae", "best interior painting dubai",
    "best exterior painting uae", "best exterior painting dubai", "top painting uae", "top painting dubai",
    "leading painting uae", "leading painting dubai", "expert painting uae", "expert painting dubai",
    "professional painting uae", "professional painting dubai", "quality painting uae", "quality painting dubai",
    
    // Best Kitchen Renovation variations
    "best kitchen renovation uae", "best kitchen renovation dubai", "best kitchen remodeling uae", "best kitchen remodeling dubai",
    "best kitchen renovation services uae", "best kitchen renovation services dubai", "top kitchen renovation uae", "top kitchen renovation dubai",
    "leading kitchen renovation uae", "leading kitchen renovation dubai", "expert kitchen renovation uae", "expert kitchen renovation dubai",
    "professional kitchen renovation uae", "professional kitchen renovation dubai",
    
    // Best Construction variations
    "best construction uae", "best construction dubai", "best construction company uae", "best construction company dubai",
    "best construction services uae", "best construction services dubai", "top construction uae", "top construction dubai",
    "leading construction uae", "leading construction dubai", "expert construction uae", "expert construction dubai",
    "professional construction uae", "professional construction dubai", "quality construction uae", "quality construction dubai",
    
    // Best Building Services variations
    "best building services uae", "best building services dubai", "best building maintenance uae", "best building maintenance dubai",
    "top building services uae", "top building services dubai", "leading building services uae", "leading building services dubai",
    "expert building services uae", "expert building services dubai", "professional building services uae", "professional building services dubai",
    
    // Best Cleaning variations
    "best cleaning uae", "best cleaning dubai", "best cleaning services uae", "best cleaning services dubai",
    "best building cleaning uae", "best building cleaning dubai", "top cleaning uae", "top cleaning dubai",
    "leading cleaning uae", "leading cleaning dubai", "professional cleaning uae", "professional cleaning dubai",
    
    // Best Design variations
    "best architectural design uae", "best architectural design dubai", "best design services uae", "best design services dubai",
    "best 3d design uae", "best 3d design dubai", "best 2d design uae", "best 2d design dubai",
    "top architectural design uae", "top architectural design dubai", "leading design uae", "leading design dubai",
    
    // Best Electromechanical variations
    "best electromechanical uae", "best electromechanical dubai", "best electromechanical services uae", "best electromechanical services dubai",
    "top electromechanical uae", "top electromechanical dubai", "expert electromechanical uae", "expert electromechanical dubai",
    
    // Best False Ceiling variations
    "best false ceiling uae", "best false ceiling dubai", "best false ceiling installation uae", "best false ceiling installation dubai",
    "top false ceiling uae", "top false ceiling dubai", "leading false ceiling uae", "leading false ceiling dubai",
    
    // Best Wallpaper variations
    "best wallpaper uae", "best wallpaper dubai", "best wallpaper installation uae", "best wallpaper installation dubai",
    "top wallpaper uae", "top wallpaper dubai", "professional wallpaper uae", "professional wallpaper dubai",
    
    // Best Plaster variations
    "best plaster uae", "best plaster dubai", "best plastering uae", "best plastering dubai",
    "best plaster works uae", "best plaster works dubai", "top plaster uae", "top plaster dubai",
    
    // Best Contractor variations
    "best contractor uae", "best contractor dubai", "best contractors uae", "best contractors dubai",
    "best general contractor uae", "best general contractor dubai", "best building contractor uae", "best building contractor dubai",
    "best construction contractor uae", "best construction contractor dubai", "top contractor uae", "top contractor dubai",
    "leading contractor uae", "leading contractor dubai", "licensed contractor uae", "licensed contractor dubai",
    "certified contractor uae", "certified contractor dubai", "professional contractor uae", "professional contractor dubai",
    
    // Best Handyman variations
    "best handyman uae", "best handyman dubai", "best handyman services uae", "best handyman services dubai",
    "top handyman uae", "top handyman dubai", "leading handyman uae", "leading handyman dubai",
    
    // Best Renovation variations
    "best renovation uae", "best renovation dubai", "best renovation services uae", "best renovation services dubai",
    "best home renovation uae", "best home renovation dubai", "best property renovation uae", "best property renovation dubai",
    "top renovation uae", "top renovation dubai", "leading renovation uae", "leading renovation dubai",
    
    // Best Remodeling variations
    "best remodeling uae", "best remodeling dubai", "best remodeling services uae", "best remodeling services dubai",
    "top remodeling uae", "top remodeling dubai", "leading remodeling uae", "leading remodeling dubai",
    
    // Service category keywords
    "building services dubai", "maintenance services dubai", "construction services dubai",
    "building services uae", "maintenance services uae", "construction services uae",
    "home improvement dubai", "home improvement uae", "property maintenance dubai",
    "carpentry", "wood flooring", "plumbing", "sanitary installation", "HVAC", "air conditioning",
    "ventilation", "tiling", "floor tiling", "wall tiling", "painting", "interior painting",
    "exterior painting", "kitchen renovation", "kitchen remodeling", "architectural design",
    "3D design", "2D design", "false ceiling", "partitions", "wallpaper", "plaster works",
    "electromechanical", "building cleaning", "professional contractors", "licensed contractors",
    "home repair", "commercial maintenance", "residential services", "property maintenance",
    "construction company dubai", "maintenance company dubai", "renovation services dubai",
    "remodeling services dubai", "handyman services dubai", "general contractor dubai",
    "building contractor dubai", "construction contractor dubai", "licensed contractor dubai",
    "dubai building services", "dubai maintenance", "dubai construction", "uae building services",
    
    // Additional service-specific keywords
    "emergency maintenance uae", "emergency maintenance dubai", "24/7 maintenance uae", "24/7 maintenance dubai",
    "commercial building maintenance uae", "commercial building maintenance dubai",
    "residential building maintenance uae", "residential building maintenance dubai",
    "facility management uae", "facility management dubai", "property management services uae", "property management services dubai",
    "ac duct cleaning uae", "ac duct cleaning dubai", "ac service uae", "ac service dubai",
    "chiller maintenance uae", "chiller maintenance dubai", "fcu maintenance uae", "fcu maintenance dubai",
    "electrical installation uae", "electrical installation dubai", "electrical repair uae", "electrical repair dubai",
    "electrical maintenance uae", "electrical maintenance dubai", "electrical contractor uae", "electrical contractor dubai",
    "plumbing repair uae", "plumbing repair dubai", "plumbing installation uae", "plumbing installation dubai",
    "leak detection uae", "leak detection dubai", "drain cleaning uae", "drain cleaning dubai",
    "carpentry work uae", "carpentry work dubai", "custom woodwork uae", "custom woodwork dubai",
    "cabinet installation uae", "cabinet installation dubai", "furniture installation uae", "furniture installation dubai",
    "tile repair uae", "tile repair dubai", "grout repair uae", "grout repair dubai",
    "wall repair uae", "wall repair dubai", "ceiling repair uae", "ceiling repair dubai",
    "waterproofing uae", "waterproofing dubai", "roofing services uae", "roofing services dubai",
    "interior design uae", "interior design dubai", "space planning uae", "space planning dubai"
  ],
  authors: [{ name: "SmartScrews" }],
  creator: "SmartScrews",
  publisher: "SmartScrews",
  metadataBase: new URL("https://www.smartscrews.ae"),
  alternates: {
    canonical: "/",
    languages: {
      "en": "/",
      "ar": "/ar",
    },
  },
  icons: {
    icon: [
      { url: "/NEWNEWLOGO.svg", sizes: "any" },
      { url: "/NEWNEWLOGO.svg", sizes: "512x512", type: "image/svg+xml" },
    ],
    shortcut: "/NEWNEWLOGO.svg",
    apple: [
      { url: "/NEWNEWLOGO.svg", sizes: "180x180" },
    ],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.smartscrews.ae",
    siteName: "Smart Screws - SmartScrews",
    title: "Smart Screws - Residential and Commercial Maintenance Services | SmartScrews",
    description: "Smart Screws - Residential and commercial maintenance services in UAE and Dubai. The best maintenance, electrical, carpentry, plumbing, HVAC, tiling, painting, and construction services. Top-rated professional building and maintenance company. Quality craftsmanship for your home and business.",
    images: [
      {
        url: "https://www.smartscrews.ae/new_hero.png",
        width: 1200,
        height: 630,
        alt: "Smart Screws - Residential and Commercial Maintenance Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Smart Screws - Residential and Commercial Maintenance Services",
    description: "The best maintenance, electrical, carpentry, plumbing, HVAC, tiling, painting, and construction services in UAE and Dubai. Top-rated professional building and maintenance company. Quality craftsmanship for your home and business.",
    images: ["https://www.smartscrews.ae/hero.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
  category: "Building & Maintenance Services",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes" />
        <link rel="alternate" hrefLang="en" href="https://www.smartscrews.ae" />
        <link rel="alternate" hrefLang="ar" href="https://www.smartscrews.ae/ar" />
        <link rel="alternate" hrefLang="x-default" href="https://www.smartscrews.ae" />
        <meta name="theme-color" content="#0e7888" />
        <meta name="msapplication-TileColor" content="#0e7888" />
        <meta name="application-name" content="Smart Screws" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "@id": "https://www.smartscrews.ae/#organization",
              "name": "Smart Screws Technical Services L.L.C.",
              "alternateName": [
                "SmartScrews", "Smart Screws", "Smart Screw", "Screws Smart", "Screw Smart",
                "Intelligent Screws", "Intelligent Screw", "Screws Intelligent", "Screw Intelligent",
                "Smart Fasteners", "Intelligent Fasteners", "Smart Fixings", "Intelligent Fixings",
                "Smart Screws Company", "Smart Screw Company", "Screws Smart Company",
                "Intelligent Screws Company", "Intelligent Screw Company",
                "Smart Screws Technical Services", "Smart Screw Technical Services",
                "Intelligent Screws Technical Services", "Intelligent Screw Technical Services"
              ],
              "legalName": "Smart Screws Technical Services L.L.C.",
              "description": "Smart Screws - Residential and commercial maintenance services in UAE and Dubai. The best maintenance, electrical, carpentry, plumbing, HVAC, tiling, painting, and construction services. Top-rated professional building and maintenance company offering expert services for residential and commercial properties. Licensed and certified contractors delivering quality craftsmanship.",
              "url": "https://www.smartscrews.ae",
              "logo": "https://www.smartscrews.ae/NEWNEWLOGO.svg",
              "image": "https://www.smartscrews.ae/hero.png",
              "telephone": "+971 52 980 4784",
              "email": "hello@smartscrews.ae",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "DUBAI INDUSTRIAL CITY (G 27)",
                "addressLocality": "Dubai",
                "addressRegion": "Dubai",
                "addressCountry": "AE"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "25.2048",
                "longitude": "55.2708"
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
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "reviewCount": "150",
                "bestRating": "5",
                "worstRating": "1"
              },
              "serviceArea": {
                "@type": "GeoCircle",
                "geoMidpoint": {
                  "@type": "GeoCoordinates",
                  "latitude": "25.2048",
                  "longitude": "55.2708"
                },
                "geoRadius": {
                  "@type": "Distance",
                  "value": "100",
                  "unitCode": "KM"
                }
              },
              "areaServed": {
                "@type": "City",
                "name": "Dubai",
                "sameAs": "https://en.wikipedia.org/wiki/Dubai"
              },
              "sameAs": [
                "https://www.facebook.com/smartscrews",
                "https://www.instagram.com/smartscrews",
                "https://www.linkedin.com/company/smartscrews",
                "https://twitter.com/smartscrews"
              ],
              "foundingDate": "2020",
              "numberOfEmployees": {
                "@type": "QuantitativeValue",
                "value": "50-100"
              },
              "paymentAccepted": "Cash, Credit Card, Bank Transfer",
              "currenciesAccepted": "AED, USD",
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Smart Screws Building and Maintenance Services",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Carpentry and Wood Flooring Works",
                      "description": "Expert carpentry and premium wood flooring installation and restoration services by Smart Screws"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Building Cleaning Services",
                      "description": "Comprehensive cleaning solutions for residential and commercial properties by Smart Screws"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Floor and Wall Tiling Works",
                      "description": "Professional tile installation for floors and walls with expert grouting and finishing by Smart Screws"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "False Ceiling and Light Partitions Installation",
                      "description": "Modern false ceiling and partition solutions for enhanced space design by Smart Screws"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Wallpaper Fixing Works",
                      "description": "Professional wallpaper installation with pattern matching and seamless application by Smart Screws"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Plaster Works",
                      "description": "Expert plastering services for smooth, durable wall and ceiling finishes by Smart Screws"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Electromechanical Equipment Installation and Maintenance",
                      "description": "Professional installation and maintenance of electromechanical systems by Smart Screws"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Plumbing and Sanitary Installation",
                      "description": "Complete plumbing and sanitary solutions for residential and commercial properties by Smart Screws"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Air Conditioning, Ventilation and Air Filtration Systems Installation and Maintenance",
                      "description": "Complete HVAC solutions including installation, maintenance, and air quality systems by Smart Screws"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Painting and Finishing Works",
                      "description": "Professional interior and exterior painting services with premium finishes by Smart Screws"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Kitchen Renovation Works",
                      "description": "Complete kitchen renovation and remodeling services for modern, functional spaces by Smart Screws"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Architectural Drawing and Design Services",
                      "description": "Professional 2D and 3D design services for interior and architectural projects by Smart Screws"
                    }
                  }
                ]
              },
              "keywords": "smart screws, smart screw, screws smart, screw smart, smartscrews, smartscrew, intelligent screws, intelligent screw, screws intelligent, screw intelligent, smart fasteners, intelligent fasteners, smart fixings, intelligent fixings, smart screws company, smart screw company, screws smart company, intelligent screws company, smart screws services, smart screw services, screws smart services, intelligent screws services, smart screws dubai, smart screw dubai, screws smart dubai, intelligent screws dubai, smart screws uae, smart screw uae, screws smart uae, intelligent screws uae, best maintenance uae, best maintenance dubai, best electrical uae, best electrical dubai, best carpentry uae, best plumbing uae, best hvac uae, best air conditioning uae, best ac uae, best tiling uae, best painting uae, best kitchen renovation uae, best construction uae, best building services uae, best contractor uae, best handyman uae, top maintenance uae, leading maintenance uae, expert maintenance uae, professional maintenance uae, quality maintenance uae, licensed contractor uae, certified contractor uae, building services, maintenance services, construction services, carpentry, plumbing, HVAC, tiling, painting, kitchen renovation, architectural design, dubai maintenance, uae maintenance, dubai building services, uae building services"
            }),
          }}
        />
        <link rel="preload" href="/about_bg.png" as="image" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <ClientLoader>
          <LanguageProvider>{children}</LanguageProvider>
        </ClientLoader>
      </body>
    </html>
  );
}

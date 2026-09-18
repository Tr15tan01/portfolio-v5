import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { AnimatedBackground } from "@/components/animations/animated-background";
import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";
import { FloatingCta } from "@/components/layout/floating-cta";
import { getSocialLinks, portfolio, siteUrl } from "@/lib/portfolio";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const { site } = portfolio;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: site.title, template: `%s | ${site.name}` },
  description: site.description,
  keywords: site.keywords,
  authors: [{ name: site.name, url: siteUrl }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: site.name,
    title: site.title,
    description: site.description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fcfaff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0514" },
  ],
  width: "device-width",
  initialScale: 1,
};

// Structured data: helps Google understand who you are and what you offer.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: site.name,
      jobTitle: site.role,
      email: `mailto:${site.email}`,
      url: siteUrl,
      address: { "@type": "PostalAddress", addressLocality: "Tbilisi", addressCountry: "GE" },
      sameAs: getSocialLinks().map((l) => l.url),
      knowsAbout: portfolio.about.skills,
    },
    {
      "@type": "ProfessionalService",
      "@id": `${siteUrl}/#service`,
      name: `${site.name}, ${site.role}`,
      url: siteUrl,
      email: site.email,
      areaServed: "Worldwide",
      address: { "@type": "PostalAddress", addressLocality: "Tbilisi", addressCountry: "GE" },
      founder: { "@id": `${siteUrl}/#person` },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Web development services",
        itemListElement: portfolio.services.map((s) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: s.title, description: s.description },
        })),
      },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased min-h-screen flex flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
        >
          Skip to content
        </a>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <AnimatedBackground />
        <Navigation />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <FloatingCta />

        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="lazyOnload"
            />
            <Script id="ga-init" strategy="lazyOnload">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}');`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}

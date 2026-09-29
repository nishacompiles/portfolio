import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";

import Chatbot from "@/components/chatbot/Chatbot";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { site } from "@/data/site";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

// TODO: Replace with the production domain when deployed.
export const metadata: Metadata = {
  metadataBase: new URL("https://manishasahay.dev"),
  title: {
    default: "Manisha Sahay | Software Engineer",
    template: "%s | Manisha Sahay",
  },
  description:
    "Portfolio of Manisha Sahay, a Software Engineer specializing in .NET, Angular, Next.js, Azure and AI/ML.",
  keywords: [
    "Manisha Sahay",
    "Software Engineer",
    "Full Stack Developer",
    ".NET",
    "Angular",
    "Next.js",
    "Azure",
    "AI/ML",
    "Portfolio",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Manisha Sahay",
    title: "Manisha Sahay | Software Engineer",
    description:
      "Portfolio of Manisha Sahay, a Software Engineer specializing in .NET, Angular, Next.js, Azure and AI/ML.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Manisha Sahay | Software Engineer",
    description:
      "Portfolio of Manisha Sahay, a Software Engineer specializing in .NET, Angular, Next.js, Azure and AI/ML.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafaf8" },
    { media: "(prefers-color-scheme: dark)", color: "#14161b" },
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.tagline,
  description: metadata.description,
  email: `mailto:${site.email}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dehradun",
    addressRegion: "Uttarakhand",
    addressCountry: "IN",
  },
  worksFor: {
    "@type": "Organization",
    name: site.company,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${fraunces.variable} font-sans`}
      >
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(t==="dark"||(!t&&window.matchMedia("(prefers-color-scheme: dark)").matches)){document.documentElement.classList.add("dark");}}catch(e){}})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-accent-dark focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <Chatbot />
      </body>
    </html>
  );
}
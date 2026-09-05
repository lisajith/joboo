import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import "./globals.css";

import StructuredData from "@/components/seo/StructuredData";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://joboo.whereismyjob.workers.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Where Is My Job? | Jobs & Internships for Freshers",
    template: "%s | Where Is My Job?",
  },

  description:
    "Where Is My Job? helps freshers, graduates, and early-career professionals discover the latest jobs, internships, companies, and career opportunities.",

  applicationName: "Where Is My Job?",

  keywords: [
    "Where Is My Job",
    "Where Is My Job jobs",
    "Where Is My Job internships",
    "jobs for freshers",
    "fresher jobs",
    "latest jobs",
    "job openings",
    "jobs for graduates",
    "graduate jobs",
    "entry level jobs",
    "internships for freshers",
    "career opportunities",
    "Ajith Malle",
    "Ajith Kumar Malle",
  ],

  authors: [
    {
      name: "Ajith Kumar Malle",
      url: "https://ajithmalleportfolio.vercel.app",
    },
  ],

  creator: "Ajith Kumar Malle",
  publisher: "Where Is My Job?",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "Where Is My Job?",
    title: "Where Is My Job? | Jobs & Internships for Freshers",
    description:
      "Discover jobs, internships, companies, and career opportunities for freshers, graduates, and early-career professionals.",
    images: [
      {
        url: "/Job.png",
        width: 1200,
        height: 630,
        alt: "Where Is My Job? - Jobs and Internships for Freshers",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Where Is My Job? | Jobs & Internships for Freshers",
    description:
      "Discover jobs, internships, companies, and career opportunities for freshers and graduates.",
    images: ["/Job.png"],
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${manrope.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <StructuredData />
        {children}
      </body>
    </html>
  );
}

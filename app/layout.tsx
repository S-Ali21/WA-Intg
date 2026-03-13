import type { Metadata } from "next";
import Script from "next/script";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import {
  ClerkProvider,
} from '@clerk/nextjs'

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "WaChat - Enterprise WhatsApp Business Platform",
  description: "Production-ready WhatsApp Business integration platform built with Next.js 15, Clerk, NeonDB, and WhatsApp Cloud API. Real-time messaging, broadcast groups, template management, and more.",
  keywords: ["WhatsApp", "Business", "Messaging", "Next.js", "NeonDB", "Clerk", "Real-time", "Broadcast", "Templates"],
  authors: [{ name: "WaChat" }],
  openGraph: {
    title: "WaChat - Enterprise WhatsApp Business Platform",
    description: "Production-ready WhatsApp Business integration platform with real-time messaging, broadcast groups, and template management.",
    type: "website",
  },
};

import { Inter, Space_Grotesk } from "next/font/google";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased overflow-x-hidden`}>
          <div className="aurora" aria-hidden="true" />
          {/* Google tag (gtag.js) */}
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-S3QJ35851Y"
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-S3QJ35851Y');
          `}
          </Script>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}

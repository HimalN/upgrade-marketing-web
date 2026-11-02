import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Upgrade Marketing Agency | Unforgettable Brand Experiences",
  description:
    "We don't just market brands. We make them unforgettable. Transforming ideas into powerful brand experiences through creative design, strategic marketing, and innovative digital solutions.",
  keywords: [
    "Upgrade Marketing Agency",
    "Digital Marketing",
    "Branding",
    "Creative Agency",
    "Web Development",
    "Social Media Marketing",
    "Video Production",
  ],
  authors: [{ name: "Upgrade Marketing Agency" }],
  metadataBase: new URL("https://upgrademarketing.agency"),
  openGraph: {
    title: "Upgrade Marketing Agency | Unforgettable Brand Experiences",
    description:
      "Transforming ideas into powerful brand experiences through creative design, strategic marketing, and innovative digital solutions.",
    url: "https://upgrademarketing.agency",
    siteName: "Upgrade Marketing Agency",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "Upgrade Marketing Agency Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/images/logo.png",
    shortcut: "/images/logo.png",
    apple: "/images/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark h-full antialiased scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="min-h-full flex flex-col bg-[#080808] text-[#FFFFFF] selection:bg-[#D6A64B] selection:text-[#080808] font-sans"
        suppressHydrationWarning
      >
        {children}
        <Toaster
          position="top-right"
          theme="dark"
          toastOptions={{
            style: {
              background: "#171717",
              border: "1px solid rgba(214, 166, 75, 0.3)",
              color: "#FFFFFF",
            },
          }}
        />
      </body>
    </html>
  );
}

import Script from "next/script";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "../globals.css"; //
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "../../components/ThemeProvider";
import { FloatingDock } from "../../components/FloatingDock";
import { ModeToggle } from "../../components/DarkModeToggle";
import { SanityLive } from "../../sanity/lib/live";
import { SidebarInset, SidebarProvider } from "../../components/ui/sidebar";
import { Poppins } from "next/font/google";
import LayoutShell from "../../components/LayoutShell";
import { Footer } from "../../components/sections/Footer";

// ✅ Fix TypeScript error for Zapier custom web component
// Add this after all imports
declare namespace JSX {
  interface IntrinsicElements {
    "zapier-interfaces-chatbot-embed": {
      "is-popup"?: string;
      "chatbot-id"?: string;
      [key: string]: unknown;
    };
  }
}

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mahedy Hasan",
  description: "This is the portfolio website of Mahedy Hasan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${poppins.variable} antialiased`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <SidebarProvider>
              <LayoutShell>
                <SidebarInset className="flex flex-col min-h-screen">
                  <main className="flex-1">{children}</main>
                  <Footer />
                </SidebarInset>
              </LayoutShell>
              {/* Floating UI */}
              <FloatingDock />
              <div className="fixed top-4 right-4 z-50">
                {" "}
                {/* ✅ changed from bottom-6 right-6 to top-4 right-4 */}
                <div className="w-10 h-10 md:w-12 md:h-12">
                  <ModeToggle />
                </div>
              </div>
            </SidebarProvider>
            <SanityLive />
          </ThemeProvider>

          {/* Zapier Chatbot */}
          {/* Zapier Chatbot */}
          <Script
            src="https://interfaces.zapier.com/assets/web-components/zapier-interfaces/zapier-interfaces.esm.js"
            strategy="afterInteractive"
            type="module"
          />
          <div className="zapier-chat-wrapper">
            <zapier-interfaces-chatbot-embed
              is-popup="true"
              chatbot-id="cmp9ejtlx000rp9v14h44mfae"
            />
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}

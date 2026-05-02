import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { DesignProvider } from "@/lib/DesignContext";
import { Sidebar } from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "Monicore Design System",
  description: "A professional design system for high-performance digital experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <DesignProvider>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <Sidebar />
        </DesignProvider>
      </body>
    </html>
  );
}

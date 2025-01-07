import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import ArtistNavbar from "@/components/ArtistNavbar";

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ["latin"],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Artist Portal",
  description: "Find and manage your artistic opportunities",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="w-full h-full">
      <body className={`${inter.variable} ${poppins.variable} font-sans w-full h-full`}>
        <ArtistNavbar />
        <main className="w-full h-full">
          {children}
        </main>
      </body>
    </html>
  );
} 
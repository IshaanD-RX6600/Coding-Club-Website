import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navigation } from "@/components/Navigation";
import { AdminProvider } from "@/contexts/AdminContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CHCI Coding Club",
  description: "Welcome to the CHCI Coding Club website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <AdminProvider>
          <ThemeProvider>
            <Navigation />
            <main className="min-h-screen">{children}</main>
          </ThemeProvider>
        </AdminProvider>
      </body>
    </html>
  );
}

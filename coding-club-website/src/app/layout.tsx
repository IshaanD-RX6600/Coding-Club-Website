import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navigation } from "@/components/Navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Programming Club",
  description: "Welcome to the Programming Club website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-white text-gray-900 antialiased dark:bg-gray-950 dark:text-gray-50`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navigation />
          <main className="min-h-screen">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}

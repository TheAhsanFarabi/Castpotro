import "./globals.css";
import type { Metadata } from "next";
import Header from "@/components/Header"; // Update import if needed
import Footer from "@/components/Footer";
import { cookies } from "next/headers"; // <--- Import this

export const metadata: Metadata = {
  title: "Castpotro",
  description: "Youth Empowerment Ecosystem",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Check if session cookie exists
  const session = (await cookies()).get("session");
  const isLoggedIn = !!session; // true if session exists, false otherwise

  return (
    <html lang="en" className="bg-zinc-50">
      <body className="font-sans min-h-screen flex flex-col">
        {/* Pass the prop to Header */}
        <Header isLoggedIn={isLoggedIn} />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
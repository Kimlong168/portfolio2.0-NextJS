import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "./context/ThemeContext";
export const metadata: Metadata = {
  title: "Kimlong Chann, a fullstack web developer",
  description: "Welcome to my portfolio website.",
  // Open Graph and Twitter metadata
  openGraph: {
    title: "Kimlong Chann, a fullstack web developer",
    description: "Welcome to my portfolio website.",

    url: "https://kimlongchann.vercel.app/",
    images: [
      {
        url: "/kimlong.jpg", // Path to logo in the public folder
        width: 1200,
        height: 630,
        alt: "Kimlong Chann logo",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ThemeProvider>
        <body className={`antialiased`}>{children}</body>
      </ThemeProvider>
    </html>
  );
}

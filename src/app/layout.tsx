import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://cockpit-phi.vercel.app";

export const metadata: Metadata = {
  title: "Cockpit — Visual Dashboard for OpenClaw Agents",
  description:
    "Stop guessing what your OpenClaw agents are doing. Cockpit gives you a beautiful visual dashboard — setup wizard, live monitoring, one-click debugging. $79, one-time.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Cockpit — Visual Dashboard for OpenClaw Agents",
    description:
      "Finally — a visual dashboard for OpenClaw. Setup wizard + live agent monitoring + debug panel. $79 once. No subscription.",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: "Cockpit — Visual Dashboard for OpenClaw Agents",
      },
    ],
    siteName: "Cockpit",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cockpit — Visual Dashboard for OpenClaw Agents",
    description:
      "Stop fighting the terminal. Cockpit gives you a beautiful visual dashboard for OpenClaw agents. Setup wizard, live monitoring, one-click debugging. $79 once.",
    images: ["/api/og"],
  },
  keywords: [
    "OpenClaw",
    "AI agents",
    "dashboard",
    "visual interface",
    "agent management",
    "no-code",
    "agent dashboard",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

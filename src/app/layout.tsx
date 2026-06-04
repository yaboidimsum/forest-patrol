import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const vcrOsdMono = localFont({
  src: "../../public/fonts/VCR_OSD_Mono.ttf",
  variable: "--font-vcr",
  display: "swap",
  fallback: ["Courier New", "monospace"],
});

export const metadata: Metadata = {
  title: "Forest Patrol",
  description: "There is something in the forest.",
};

export const viewport: Viewport = {
  themeColor: "#011c16",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${vcrOsdMono.variable} bg-deep text-foreground`}>
      <body className="bg-deep text-foreground font-mono antialiased overflow-hidden">
        {children}
      </body>
    </html>
  );
}

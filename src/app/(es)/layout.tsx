import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.leonsailingtenerife.com"),
  title: { default: "Leon Sailing Tenerife", template: "%s | Leon Sailing Tenerife" },
  keywords: ["chárter privado Tenerife", "velero con patrón Tenerife", "Marina del Sur Las Galletas", "alquiler velero Tenerife"],
  icons: {
    icon: [{ url: "/favicon-leon-original.png", type: "image/png" }],
    shortcut: "/favicon-leon-original.png",
    apple: "/favicon-leon-original.png",
  },
  robots: { index: true, follow: true },
};

export default function SpanishLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

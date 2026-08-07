import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.leonsailingtenerife.com"),
  icons: {
    icon: [{ url: "/favicon-leon-original.png", type: "image/png" }],
    shortcut: "/favicon-leon-original.png",
    apple: "/favicon-leon-original.png",
  },
  robots: { index: false, follow: true },
};

export default function RedirectLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

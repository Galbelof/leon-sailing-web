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

export const metadata: Metadata = {
  title: "León Sailing Tenerife | Chárter Privado y Alquiler de Veleros",
  description: "Descubre la costa de Tenerife desde el mar. Alquiler de velero privado, excursiones exclusivas, avistamiento de cetáceos y atardeceres inolvidables.",
  keywords: ["velero tenerife", "alquiler barco tenerife", "charter privado", "excursiones en barco", "leon sailing", "costa adeje"],
  openGraph: {
    title: "León Sailing Tenerife | Chárter Privado",
    description: "Experiencias únicas en velero por la costa de Tenerife. Reserva tu excursión privada.",
    url: "https://www.leonsailingtenerife.com",
    siteName: "León Sailing Tenerife",
    images: [
      {
        // NOTA: Cuando tengas una foto bonita del barco en tu carpeta public, pon su nombre aquí. 
        // Ejemplo: "/barco-portada.jpg"
        url: "/ruta-a-tu-imagen.jpg", 
        width: 1200,
        height: 630,
      },
    ],
    locale: "es_ES",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es" // ¡Cambiado a español!
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
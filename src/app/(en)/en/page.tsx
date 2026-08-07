import type { Metadata } from "next";
import HomePage from "../../../components/HomePage";

export const metadata: Metadata = {
  title: "Private sailing excursions and yacht rental in Tenerife",
  description: "Private 6-hour excursions, yacht rental from 3 days and a training day aboard Leon from Marina del Sur in Las Galletas.",
  alternates: {
    canonical: "https://www.leonsailingtenerife.com/en",
    languages: {
      "es-ES": "https://www.leonsailingtenerife.com/es",
      "en-GB": "https://www.leonsailingtenerife.com/en",
      "x-default": "https://www.leonsailingtenerife.com/es",
    },
  },
  openGraph: {
    title: "Leon Sailing Tenerife | Private sailing from Marina del Sur",
    description: "A private sailing experience aboard Leon, shaped around your group, the Atlantic and Tenerife’s volcanic coastline.",
    url: "https://www.leonsailingtenerife.com/en",
    siteName: "Leon Sailing Tenerife",
    locale: "en_GB",
    alternateLocale: ["es_ES"],
    type: "website",
    images: [{ url: "/media/leon/leon-sailing-tenerife.jpg", width: 2000, height: 1125, alt: "Leon sailing yacht off the coast of Tenerife" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Leon Sailing Tenerife | Private sailing charter",
    description: "Private 6-hour excursions and yacht rental from 3 days at Marina del Sur in Tenerife.",
    images: ["/media/leon/leon-sailing-tenerife.jpg"],
  },
};

export default function Page() {
  return <HomePage idioma="en" />;
}

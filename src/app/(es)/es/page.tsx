import type { Metadata } from "next";
import HomePage from "../../../components/HomePage";

export const metadata: Metadata = {
  title: "Excursiones privadas y alquiler de velero en Tenerife",
  description: "Excursión privada de 6 horas, alquiler de velero desde 3 días y día de instrucción a bordo de Leon desde Marina del Sur, Las Galletas.",
  alternates: {
    canonical: "https://www.leonsailingtenerife.com/es",
    languages: {
      "es-ES": "https://www.leonsailingtenerife.com/es",
      "en-GB": "https://www.leonsailingtenerife.com/en",
      "x-default": "https://www.leonsailingtenerife.com/es",
    },
  },
  openGraph: {
    title: "Leon Sailing Tenerife | Tenerife se vive desde el mar",
    description: "Una experiencia privada a bordo de Leon: costa volcánica, navegación a vela y el Atlántico a vuestro ritmo.",
    url: "https://www.leonsailingtenerife.com/es",
    siteName: "Leon Sailing Tenerife",
    locale: "es_ES",
    alternateLocale: ["en_GB"],
    type: "website",
    images: [{ url: "/media/leon/leon-sailing-tenerife.jpg", width: 2000, height: 1125, alt: "Velero Leon navegando frente a la costa de Tenerife" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Leon Sailing Tenerife | Chárter privado en Tenerife",
    description: "Excursiones privadas de 6 horas y alquiler de velero desde 3 días en Marina del Sur, Tenerife.",
    images: ["/media/leon/leon-sailing-tenerife.jpg"],
  },
};

export default function Page() {
  return <HomePage idioma="es" />;
}

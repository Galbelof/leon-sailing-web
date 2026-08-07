import type { Metadata } from "next";
import LegalPage from "../../../../components/LegalPage";

export const metadata: Metadata = {
  title: "Política de privacidad",
  alternates: {
    canonical: "https://www.leonsailingtenerife.com/es/privacidad",
    languages: {
      "es-ES": "https://www.leonsailingtenerife.com/es/privacidad",
      "en-GB": "https://www.leonsailingtenerife.com/en/privacidad",
    },
  },
};

export default function Page() {
  return <LegalPage idioma="es" kind="privacidad" />;
}

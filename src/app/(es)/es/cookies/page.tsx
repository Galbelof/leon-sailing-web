import type { Metadata } from "next";
import LegalPage from "../../../../components/LegalPage";

export const metadata: Metadata = {
  title: "Política de cookies",
  alternates: {
    canonical: "https://www.leonsailingtenerife.com/es/cookies",
    languages: {
      "es-ES": "https://www.leonsailingtenerife.com/es/cookies",
      "en-GB": "https://www.leonsailingtenerife.com/en/cookies",
    },
  },
};

export default function Page() {
  return <LegalPage idioma="es" kind="cookies" />;
}

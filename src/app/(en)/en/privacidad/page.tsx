import type { Metadata } from "next";
import LegalPage from "../../../../components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy policy",
  alternates: {
    canonical: "https://www.leonsailingtenerife.com/en/privacidad",
    languages: {
      "es-ES": "https://www.leonsailingtenerife.com/es/privacidad",
      "en-GB": "https://www.leonsailingtenerife.com/en/privacidad",
    },
  },
};

export default function Page() {
  return <LegalPage idioma="en" kind="privacidad" />;
}

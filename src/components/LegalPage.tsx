import Link from "next/link";
import type { Idioma } from "../data";

type LegalKind = "aviso" | "privacidad" | "cookies";

type LegalPageProps = {
  idioma: Idioma;
  kind: LegalKind;
};

const content = {
  es: {
    back: "Volver a Leon Sailing",
    updated: "Última actualización: agosto de 2026",
    aviso: {
      title: "Aviso legal",
      intro: "Información general sobre el responsable y las condiciones de uso de este sitio web.",
      sections: [
        {
          title: "1. Identificación y contacto",
          body: (
            <>
              <p>Este sitio corresponde al proyecto náutico <strong>Leon Sailing Tenerife</strong>.</p>
              <ul>
                <li><strong>Titular:</strong> Francesco Gestri</li>
                <li><strong>NIF:</strong> Y2339202R</li>
                <li><strong>Domicilio:</strong> Calle Ofiuco, 18, Las Rosas, Arona, 38631, Santa Cruz de Tenerife, España</li>
                <li><strong>Web:</strong> leonsailingtenerife.com</li>
                <li><strong>Email:</strong> leonsailingtenerife@gmail.com</li>
                <li><strong>Teléfono:</strong> +34 631 59 63 09</li>
              </ul>
            </>
          ),
        },
        {
          title: "2. Condiciones de uso",
          body: <p>El acceso a la web implica la aceptación de estas condiciones. El usuario se compromete a utilizar los contenidos, el calendario y los canales de contacto de forma lícita, diligente y respetuosa.</p>,
        },
        {
          title: "3. Información sobre disponibilidad y reservas",
          body: <p>La selección de una fecha y el envío de una consulta no formalizan una reserva. La disponibilidad, el itinerario, el precio y las condiciones se confirman personalmente antes de contratar el servicio.</p>,
        },
        {
          title: "4. Propiedad intelectual",
          body: <p>Salvo indicación contraria, los textos, fotografías, vídeos, identidad visual, diseño y código de esta web están protegidos por la normativa aplicable. No pueden reutilizarse con fines comerciales sin autorización.</p>,
        },
        {
          title: "5. Enlaces externos",
          body: <p>La web puede enlazar a WhatsApp, mapas, correo electrónico, servicios inmobiliarios u otras páginas de terceros. Sus contenidos y políticas dependen de sus respectivos responsables.</p>,
        },
      ],
    },
    privacidad: {
      title: "Política de privacidad",
      intro: "Cómo tratamos los datos que compartes al solicitar información sobre una experiencia a bordo.",
      sections: [
        {
          title: "1. Responsable",
          body: (
            <>
              <p><strong>Francesco Gestri</strong>, titular de Leon Sailing Tenerife.</p>
              <ul>
                <li><strong>NIF:</strong> Y2339202R</li>
                <li><strong>Domicilio:</strong> Calle Ofiuco, 18, Las Rosas, Arona, 38631, Santa Cruz de Tenerife, España</li>
                <li><strong>Contacto:</strong> leonsailingtenerife@gmail.com</li>
              </ul>
            </>
          ),
        },
        {
          title: "2. Datos y finalidad",
          body: <p>Los datos que introduces en el formulario se utilizan únicamente para preparar el mensaje que decides enviar por WhatsApp o email. Cuando eliges uno de esos canales podemos recibir tu nombre, teléfono, correo, fecha preferida, número de personas y detalles de la experiencia para responder, preparar una propuesta y gestionar una eventual reserva.</p>,
        },
        {
          title: "3. Base jurídica y conservación",
          body: <p>El tratamiento se basa en tu solicitud y, cuando corresponda, en la ejecución de medidas precontractuales o contractuales. Conservamos la información durante el tiempo necesario para atender la consulta, gestionar la relación y cumplir obligaciones legales.</p>,
        },
        {
          title: "4. Destinatarios y servicios externos",
          body: <p>Al elegir WhatsApp o tu aplicación de correo se aplican las condiciones de esos servicios. El fotograma de Marina del Sur se obtiene a través del servidor de Leon Sailing Tenerife, por lo que el navegador no se conecta directamente con SkylineWebcams. Esa conexión externa solo se produce si decides abrir la cámara en directo. No vendemos información personal a terceros.</p>,
        },
        {
          title: "5. Tus derechos",
          body: <p>Puedes solicitar acceso, rectificación, supresión, oposición, limitación o portabilidad escribiendo a leonsailingtenerife@gmail.com. También puedes presentar una reclamación ante la autoridad de protección de datos competente.</p>,
        },
      ],
    },
    cookies: {
      title: "Política de cookies",
      intro: "La web está diseñada para funcionar sin cookies publicitarias ni perfiles de seguimiento.",
      sections: [
        {
          title: "1. Responsable del sitio web",
          body: (
            <>
              <p>El responsable de este sitio web es <strong>Francesco Gestri</strong>, titular de Leon Sailing Tenerife.</p>
              <ul>
                <li><strong>NIF:</strong> Y2339202R</li>
                <li><strong>Domicilio:</strong> Calle Ofiuco, 18, Las Rosas, Arona, 38631, Santa Cruz de Tenerife, España</li>
                <li><strong>Contacto:</strong> leonsailingtenerife@gmail.com</li>
              </ul>
            </>
          ),
        },
        {
          title: "2. Uso de cookies",
          body: <p>Leon Sailing Tenerife no utiliza cookies publicitarias ni crea perfiles comerciales de navegación. La preferencia de idioma queda reflejada directamente en la dirección de la página —por ejemplo, /es o /en— y no necesita almacenarse en una cookie.</p>,
        },
        {
          title: "3. Analítica y seguimiento",
          body: <p>Actualmente, este sitio web no utiliza servicios de analítica, cookies analíticas, cookies publicitarias ni herramientas para seguir el comportamiento de sus visitantes.</p>,
        },
        {
          title: "4. Servicios externos",
          body: <p>La sección de Marina del Sur muestra un fotograma que nuestro servidor obtiene y actualiza periódicamente. La retransmisión en directo no se inserta en esta web: el navegador solo se conecta con SkylineWebcams si pulsas el enlace correspondiente. WhatsApp, Google Maps, SkylineWebcams, el correo electrónico y otras páginas externas pueden aplicar sus propias tecnologías y políticas cuando decides abrirlas.</p>,
        },
        {
          title: "5. Cambios futuros",
          body: <p>Si en el futuro se incorporan tecnologías que requieran consentimiento, esta política se actualizará y se mostrará el mecanismo necesario antes de activarlas.</p>,
        },
      ],
    },
  },
  en: {
    back: "Back to Leon Sailing",
    updated: "Last updated: August 2026",
    aviso: {
      title: "Legal notice",
      intro: "General information about the website operator and the conditions governing its use.",
      sections: [
        {
          title: "1. Identification and contact",
          body: (
            <>
              <p>This website belongs to the sailing project <strong>Leon Sailing Tenerife</strong>.</p>
              <ul>
                <li><strong>Owner:</strong> Francesco Gestri</li>
                <li><strong>Tax ID:</strong> Y2339202R</li>
                <li><strong>Address:</strong> Calle Ofiuco 18, Las Rosas, Arona, 38631, Santa Cruz de Tenerife, Spain</li>
                <li><strong>Website:</strong> leonsailingtenerife.com</li>
                <li><strong>Email:</strong> leonsailingtenerife@gmail.com</li>
                <li><strong>Telephone:</strong> +34 631 59 63 09</li>
              </ul>
            </>
          ),
        },
        {
          title: "2. Conditions of use",
          body: <p>Accessing this website implies acceptance of these conditions. Visitors must use the content, calendar and contact channels lawfully, diligently and respectfully.</p>,
        },
        {
          title: "3. Availability and bookings",
          body: <p>Selecting a date and sending an enquiry does not create a confirmed booking. Availability, itinerary, price and conditions are personally confirmed before the service is contracted.</p>,
        },
        {
          title: "4. Intellectual property",
          body: <p>Unless stated otherwise, the text, photographs, videos, visual identity, design and code are protected by applicable law and may not be reused commercially without permission.</p>,
        },
        {
          title: "5. External links",
          body: <p>The website may link to WhatsApp, maps, email, real-estate services and other third-party websites. Their content and privacy practices remain the responsibility of their respective operators.</p>,
        },
      ],
    },
    privacidad: {
      title: "Privacy policy",
      intro: "How we handle the information you share when enquiring about an experience aboard Leon.",
      sections: [
        {
          title: "1. Controller",
          body: (
            <>
              <p><strong>Francesco Gestri</strong>, owner of Leon Sailing Tenerife.</p>
              <ul>
                <li><strong>Tax ID:</strong> Y2339202R</li>
                <li><strong>Address:</strong> Calle Ofiuco 18, Las Rosas, Arona, 38631, Santa Cruz de Tenerife, Spain</li>
                <li><strong>Contact:</strong> leonsailingtenerife@gmail.com</li>
              </ul>
            </>
          ),
        },
        {
          title: "2. Information and purpose",
          body: <p>The details entered in the form are used only to prepare the message you choose to send by WhatsApp or email. When you select one of those channels, we may receive your name, telephone number, email, preferred date, group size and experience details to reply, prepare a proposal and manage a potential booking.</p>,
        },
        {
          title: "3. Legal basis and retention",
          body: <p>Processing is based on your request and, where relevant, on steps taken before entering into a contract or performing that contract. Information is retained only as long as needed to manage the enquiry, the relationship and applicable legal duties.</p>,
        },
        {
          title: "4. Recipients and external services",
          body: <p>When you choose WhatsApp or your email application, the terms of those services apply. The Marina del Sur snapshot is retrieved through the Leon Sailing Tenerife server, so your browser does not connect directly to SkylineWebcams. That external connection only occurs if you choose to open the live webcam. We do not sell personal information to third parties.</p>,
        },
        {
          title: "5. Your rights",
          body: <p>You may request access, correction, deletion, objection, restriction or portability by writing to leonsailingtenerife@gmail.com. You may also contact the competent data-protection authority.</p>,
        },
      ],
    },
    cookies: {
      title: "Cookie policy",
      intro: "The website is designed to operate without advertising cookies or behavioural profiles.",
      sections: [
        {
          title: "1. Website operator",
          body: (
            <>
              <p>This website is operated by <strong>Francesco Gestri</strong>, owner of Leon Sailing Tenerife.</p>
              <ul>
                <li><strong>Tax ID:</strong> Y2339202R</li>
                <li><strong>Address:</strong> Calle Ofiuco 18, Las Rosas, Arona, 38631, Santa Cruz de Tenerife, Spain</li>
                <li><strong>Contact:</strong> leonsailingtenerife@gmail.com</li>
              </ul>
            </>
          ),
        },
        {
          title: "2. Cookie use",
          body: <p>Leon Sailing Tenerife does not use advertising cookies or create commercial browsing profiles. Language preference is represented directly in the page address —for example, /es or /en— so no language cookie is required.</p>,
        },
        {
          title: "3. Analytics and tracking",
          body: <p>This website currently does not use analytics services, analytics cookies, advertising cookies or tools that track visitor behaviour.</p>,
        },
        {
          title: "4. External services",
          body: <p>The Marina del Sur section displays a snapshot retrieved and refreshed periodically by our server. The live stream is not embedded in this website: your browser connects to SkylineWebcams only if you follow the corresponding link. WhatsApp, Google Maps, SkylineWebcams, email and other external websites may apply their own technologies and policies when you choose to open them.</p>,
        },
        {
          title: "5. Future changes",
          body: <p>If technologies requiring consent are introduced in the future, this policy will be updated and the appropriate consent mechanism will be displayed before activation.</p>,
        },
      ],
    },
  },
} as const;

export default function LegalPage({ idioma, kind }: LegalPageProps) {
  const locale = content[idioma];
  const page = locale[kind];

  return (
    <main className="legal-shell">
      <div className="legal-orb" aria-hidden="true" />
      <div className="legal-container">
        <Link href={`/${idioma}`} className="legal-back">← {locale.back}</Link>
        <header className="legal-header">
          <p className="legal-kicker">Leon Sailing Tenerife</p>
          <h1>{page.title}</h1>
          <p>{page.intro}</p>
          <span>{locale.updated}</span>
        </header>
        <div className="legal-content">
          {page.sections.map((section) => (
            <section key={section.title}>
              <h2>{section.title}</h2>
              <div>{section.body}</div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}

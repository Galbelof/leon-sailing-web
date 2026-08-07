"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Anchor,
  ArrowRight,
  BadgeCheck,
  Bath,
  BedDouble,
  CalendarDays,
  Check,
  Compass,
  Mail,
  MapPin,
  MessageCircle,
  MoveHorizontal,
  Phone,
  Route,
  Ruler,
  ShieldCheck,
  Sparkles,
  Waves,
} from "lucide-react";
import CalendarioReservas from "./CalendarioReservas";
import AnimatedMetric from "./AnimatedMetric";
import BookingBanner from "./BookingBanner";
import BoatSpecs from "./BoatSpecs";
import Galeria from "./Galeria";
import Header from "./Header";
import MotionController from "./MotionController";
import PreciosShowcase from "./PreciosShowcase";
import RutasShowcase from "./RutasShowcase";
import SectionLead from "./SectionLead";
import VideoShowcase from "./VideoShowcase";
import {
  emailContactobarco,
  Idioma,
  telefonoFormateado,
  telefonoWhatsApp,
  textos,
  webContactoalquiler,
} from "../data";

export default function HomePage({ idioma }: { idioma: Idioma }) {
  const t = textos[idioma];
  const [heroVideoEnabled, setHeroVideoEnabled] = useState(false);
  const [storyBeforeMaureen, storyAfterMaureen] = t.histSub.split("Maureen Lacchini");
  const whatsapp = `https://wa.me/${telefonoWhatsApp}?text=${encodeURIComponent(t.mensajeWa)}`;
  const email = `mailto:${emailContactobarco}?subject=${t.asuntoEmail}`;

  useEffect(() => {
    document.documentElement.lang = idioma;
  }, [idioma]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 768px)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    const updateVideoPreference = () => {
      setHeroVideoEnabled(desktop.matches && !reducedMotion.matches && !connection?.saveData);
    };

    updateVideoPreference();
    desktop.addEventListener("change", updateVideoPreference);
    reducedMotion.addEventListener("change", updateVideoPreference);

    return () => {
      desktop.removeEventListener("change", updateVideoPreference);
      reducedMotion.removeEventListener("change", updateVideoPreference);
    };
  }, []);

  const datosRapidos = [
    { icon: ShieldCheck, value: t.factPrivateValue, label: t.factPrivateLabel },
    { icon: Ruler, value: t.factLengthValue, label: t.factLengthLabel },
    { icon: MapPin, value: t.factLocationValue, label: t.factLocationLabel },
    { icon: MessageCircle, value: t.factDirectValue, label: t.factDirectLabel },
    { icon: Ruler, value: t.factOverallLengthValue, label: t.factOverallLengthLabel, animate: true },
    { icon: MoveHorizontal, value: t.factBeamValue, label: t.factBeamLabel, animate: true },
    { icon: BedDouble, value: t.factCabinsValue, label: t.factCabinsLabel, animate: true },
    { icon: Bath, value: t.factBathroomValue, label: t.factBathroomLabel, animate: true },
  ];

  const pilares = [
    { icon: Anchor, title: t.expPrivateTitle, description: t.expPrivateDesc },
    { icon: Route, title: t.expRouteTitle, description: t.expRouteDesc },
    { icon: Waves, title: t.expWildlifeTitle, description: t.expWildlifeDesc },
  ];

  const modalidadesNavegacion = [
    { icon: Compass, title: t.helmCaptainTitle, description: t.helmCaptainDesc },
    { icon: Anchor, title: t.helmGuestTitle, description: t.helmGuestDesc },
    { icon: ShieldCheck, title: t.helmSafetyTitle, description: t.helmSafetyDesc },
  ];

  const guiaAntesDeZarpar = [
    { title: t.guideOneTitle, description: t.guideOneDesc },
    { title: t.guideTwoTitle, description: t.guideTwoDesc },
    { title: t.guideThreeTitle, description: t.guideThreeDesc },
    { title: t.guideFourTitle, description: t.guideFourDesc },
    { title: t.guideFiveTitle, description: t.guideFiveDesc },
    { title: t.guideSixTitle, description: t.guideSixDesc },
  ];

  const preguntas = [
    { question: t.faqQ1, answer: t.faqA1 },
    { question: t.faqQ2, answer: t.faqA2 },
    { question: t.faqQ3, answer: t.faqA3 },
    { question: t.faqQ4, answer: t.faqA4 },
    { question: t.faqQ5, answer: t.faqA5 },
    { question: t.faqQ6, answer: t.faqA6 },
    { question: t.faqQ7, answer: t.faqA7 },
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: idioma === "es"
      ? "Leon Sailing Tenerife · Excursiones privadas y alquiler de velero"
      : "Leon Sailing Tenerife · Private sailing excursions and yacht rental",
    description: idioma === "es"
      ? "Excursiones privadas de 6 horas, alquiler desde 3 días y formación a bordo de Leon desde Marina del Sur, Tenerife."
      : "Private 6-hour excursions, yacht rental from 3 days and training aboard Leon from Marina del Sur in Tenerife.",
    serviceType: idioma === "es" ? "Excursiones privadas y alquiler de velero" : "Private sailing excursions and yacht rental",
    inLanguage: idioma,
    areaServed: { "@type": "Place", name: "Tenerife" },
    provider: {
      "@type": "Organization",
      name: "Leon Sailing Tenerife",
      url: `https://www.leonsailingtenerife.com/${idioma}`,
      telephone: telefonoFormateado,
      email: emailContactobarco,
    },
  };

  const businessId = "https://www.leonsailingtenerife.com/#business";
  const localStructuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": businessId,
        name: "Leon Sailing Tenerife",
        legalName: "Francesco Gestri",
        taxID: "Y2339202R",
        url: `https://www.leonsailingtenerife.com/${idioma}`,
        image: "https://www.leonsailingtenerife.com/media/leon/leon-sailing-tenerife.jpg",
        description: idioma === "es"
          ? "Excursiones privadas, formación náutica y alquiler de velero desde Marina del Sur, Tenerife."
          : "Private sailing excursions, sailing instruction and yacht rental from Marina del Sur, Tenerife.",
        telephone: telefonoFormateado,
        email: emailContactobarco,
        priceRange: "€€",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Puerto Deportivo Pesquero Las Galletas, Torre de Control, 2ª planta",
          addressLocality: "Las Galletas",
          addressRegion: "Santa Cruz de Tenerife",
          postalCode: "38631",
          addressCountry: "ES",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 28.006944,
          longitude: -16.661111,
        },
        areaServed: [
          { "@type": "Island", name: "Tenerife" },
          { "@type": "AdministrativeArea", name: "Canary Islands" },
        ],
        founder: { "@id": "https://www.leonsailingtenerife.com/#francesco-gestri" },
        knowsLanguage: ["es", "en", "it"],
      },
      {
        "@type": "Person",
        "@id": "https://www.leonsailingtenerife.com/#francesco-gestri",
        name: "Francesco Gestri",
        jobTitle: idioma === "es" ? "Capitán y patrón profesional" : "Captain and professional skipper",
        worksFor: { "@id": businessId },
      },
      {
        ...structuredData,
        "@context": undefined,
        "@id": "https://www.leonsailingtenerife.com/#sailing-service",
        provider: { "@id": businessId },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: idioma === "es" ? "Experiencias de navegación" : "Sailing experiences",
          itemListElement: [
            { "@type": "Offer", price: "600", priceCurrency: "EUR", itemOffered: { "@type": "Service", name: idioma === "es" ? "Excursión privada de 6 horas" : "6-hour private excursion" } },
            { "@type": "Offer", price: "200", priceCurrency: "EUR", itemOffered: { "@type": "Service", name: idioma === "es" ? "Formación náutica" : "Sailing instruction" } },
            { "@type": "Offer", price: "270", priceCurrency: "EUR", itemOffered: { "@type": "Service", name: idioma === "es" ? "Alquiler de velero por día" : "Yacht rental per day" } },
          ],
        },
      },
    ],
  };

  return (
    <main id="contenido" className="ambient-surface overflow-hidden bg-[#fbfcfa] text-[#102a43]">
      <MotionController />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localStructuredData) }} />
      <a href="#precios" className="skip-link">{t.skipContent}</a>
      <Header idioma={idioma} />

      <section id="inicio" className="hero-cinematic relative min-h-[100svh] overflow-hidden bg-[#071a2f] text-white">
        <Image
          src="/media/leon/leon-sailing-tenerife.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="hero-media object-cover"
          aria-hidden="true"
        />
        {heroVideoEnabled && (
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster="/media/leon/leon-sailing-tenerife.jpg"
            aria-hidden="true"
            tabIndex={-1}
            className="hero-media absolute inset-0 h-full w-full object-cover"
          >
            <source src="/video_barco.mp4" type="video/mp4" />
          </video>
        )}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,16,30,0.94)_0%,rgba(3,16,30,0.76)_48%,rgba(3,16,30,0.24)_100%)]" aria-hidden="true" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(3,16,30,0.95)_0%,transparent_48%)]" aria-hidden="true" />
        <div className="ambient-orb absolute -right-32 top-12 h-[32rem] w-[32rem] rounded-full bg-[#0d6575]/20 blur-[110px]" aria-hidden="true" />

        <div className="site-container relative z-10 flex min-h-[100svh] flex-col justify-between pb-8 pt-24 sm:pb-10 sm:pt-36 lg:pt-40">
          <div className="hero-copy max-w-4xl">
            <span className="hero-reveal inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/10 px-3 py-2 text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[#e7bd74] backdrop-blur-md sm:text-xs" style={{ "--hero-index": 0 } as React.CSSProperties}>
              <span className="h-px w-8 bg-current" aria-hidden="true" />
              {t.slogan}
            </span>
            <h1 className="hero-reveal mt-6 max-w-4xl text-[clamp(2.75rem,8vw,7.25rem)] font-semibold leading-[0.93] tracking-[-0.055em] sm:mt-7" style={{ "--hero-index": 1 } as React.CSSProperties}>
              {t.titulo1}
              <span className="mt-2 block font-serif text-[0.82em] font-normal italic tracking-[-0.035em] text-[#a8d7d8]">
                {t.titulo2}
              </span>
            </h1>
            <p className="hero-reveal mt-7 max-w-2xl text-base leading-7 text-white/75 sm:text-xl sm:leading-8" style={{ "--hero-index": 2 } as React.CSSProperties}>
              {t.descripcion}
            </p>

            <div className="hero-reveal mt-7 flex flex-col gap-3 sm:mt-9 sm:flex-row" style={{ "--hero-index": 3 } as React.CSSProperties}>
              <a href="#reservas" className="button-primary" data-magnetic>
                <CalendarDays aria-hidden="true" size={19} />
                {t.heroPrimary}
                <ArrowRight aria-hidden="true" size={18} />
              </a>
              <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="button-ghost-light" data-magnetic>
                <MessageCircle aria-hidden="true" size={19} />
                {t.btnWhatsapp}
              </a>
            </div>
            <p className="hero-reveal mt-4 flex items-center gap-2 text-sm text-white/55" style={{ "--hero-index": 4 } as React.CSSProperties}>
              <BadgeCheck aria-hidden="true" size={16} className="text-[#e7bd74]" />
              {t.heroNote}
            </p>

            <a
              href="#precios"
              className="hero-reveal focus-ring mt-5 flex max-w-2xl items-center gap-4 rounded-[1.25rem] border border-[#e7bd74]/30 bg-[#e7bd74]/[0.1] p-4 text-left backdrop-blur-md transition-colors hover:bg-[#e7bd74]/[0.16] sm:p-5"
              style={{ "--hero-index": 5 } as React.CSSProperties}
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#e7bd74] text-[#071a2f]">
                <Compass aria-hidden="true" size={20} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[0.64rem] font-extrabold uppercase tracking-[0.17em] text-[#e7bd74]">{t.instructionPre}</span>
                <strong className="mt-1 block text-base text-white sm:text-lg">{t.instructionPriceLabel}</strong>
                <span className="mt-1 block text-xs leading-5 text-white/60 sm:text-sm">
                  {t.instructionSchedule} · {t.instructionPrice} · {t.instructionTax}
                </span>
              </span>
              <ArrowRight aria-hidden="true" size={20} className="shrink-0 text-[#e7bd74]" />
            </a>
          </div>

          <dl className="hero-stats mt-8 grid grid-cols-2 overflow-hidden rounded-[1.35rem] border border-white/15 bg-white/[0.07] shadow-[0_20px_60px_rgba(2,12,24,0.18)] backdrop-blur-xl sm:mt-14 sm:grid-cols-4">
            {datosRapidos.map(({ icon: Icon, value, label, animate }, index) => (
              <div
                key={label}
                className={`flex gap-3 p-4 sm:px-5 sm:py-5 ${index >= 2 ? "border-t border-white/10" : ""} ${index % 2 === 1 ? "border-l border-white/10" : ""} ${index >= 4 ? "sm:border-t sm:border-white/10" : "sm:border-t-0"} ${index % 4 !== 0 ? "sm:border-l sm:border-white/10" : "sm:border-l-0"}`}
              >
                <span className="card-icon flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-[#a8d7d8]">
                  <Icon aria-hidden="true" size={17} />
                </span>
                <div>
                  <dt className="text-xs leading-5 text-white/55 sm:text-sm">{label}</dt>
                  <dd className="font-numeric font-bold text-white sm:mt-1"><AnimatedMetric value={value} animate={animate} /></dd>
                </div>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <PreciosShowcase idioma={idioma} />

      <section id="reservas" className="section-wake section-shell relative scroll-mt-20 overflow-hidden bg-[#071a2f] text-white">
        <Image src="/media/leon/leon-sailing-tenerife.jpg" alt="" fill sizes="100vw" className="object-cover opacity-[0.08]" aria-hidden="true" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,26,47,0.88),#071a2f_42%,#061725)]" aria-hidden="true" />
        <div className="absolute -left-40 top-24 h-96 w-96 rounded-full bg-[#0d6575]/20 blur-[100px]" aria-hidden="true" />
        <div className="absolute -right-48 bottom-0 h-[30rem] w-[30rem] rounded-full bg-[#a8d7d8]/10 blur-[120px]" aria-hidden="true" />
        <div className="site-container relative z-10">
          <div data-motion="slide-left" className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-20">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#e7bd74]/25 bg-[#e7bd74]/[0.08] px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#e7bd74]">
                <Sparkles aria-hidden="true" size={15} /> {t.calPre}
              </span>
              <h2 className="mt-6 max-w-3xl text-5xl font-semibold leading-[1.02] tracking-[-0.05em] sm:text-6xl lg:text-7xl">{t.calTitulo}</h2>
            </div>
            <div>
              <p className="max-w-2xl text-base leading-7 text-white/70 sm:text-lg sm:leading-8">{t.calDesc}</p>
              <p className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#a8d7d8]">
                <BadgeCheck aria-hidden="true" size={17} className="text-[#e7bd74]" /> {t.reserveResponse}
              </p>
            </div>
          </div>

          <ol data-motion="cascade" className="mt-10 grid gap-3 md:grid-cols-3">
            {[t.processOne, t.processTwo, t.processThree].map((step, index) => (
              <li key={step} className={`relative overflow-hidden rounded-[1.4rem] border p-5 sm:p-6 ${index === 0 ? "border-[#e7bd74]/35 bg-[#e7bd74]/[0.09]" : "border-white/10 bg-white/[0.05]"}`}>
                <span className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-black ${index === 0 ? "bg-[#e7bd74] text-[#071a2f]" : "bg-white/10 text-white"}`}>0{index + 1}</span>
                <p className="mt-5 text-sm font-semibold leading-6 text-white/80">{step}</p>
              </li>
            ))}
          </ol>

          <div className="mt-12 grid gap-6 lg:grid-cols-[0.72fr_1.28fr] lg:items-start lg:gap-8">
            <aside data-motion="slide-left" className="rounded-[1.75rem] border border-white/12 bg-[#192d42] p-6 shadow-[0_24px_70px_rgba(2,12,24,0.2)] sm:p-8 lg:sticky lg:top-28">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#e7bd74] text-[#071a2f]">
                <BadgeCheck aria-hidden="true" size={22} />
              </span>
              <h3 className="mt-6 text-2xl font-bold tracking-[-0.03em] sm:text-3xl">{t.bookingPromiseTitle}</h3>
              <p className="mt-4 text-sm leading-7 text-white/65">{t.bookingPromiseDesc}</p>

              <ul className="mt-7 grid gap-3 text-sm font-semibold text-white/85">
                {[t.bookingPrivate, t.bookingDirect, t.bookingPersonal].map((item) => (
                  <li key={item} className="flex items-start gap-3 rounded-xl bg-white/[0.05] px-4 py-3">
                    <Check aria-hidden="true" size={17} strokeWidth={3} className="mt-0.5 shrink-0 text-[#e7bd74]" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-7 border-t border-white/12 pt-7">
                <h4 className="font-bold">{t.reserveHelpTitle}</h4>
                <p className="mt-2 text-sm leading-6 text-white/55">{t.reserveHelpDesc}</p>
                <div className="mt-5 grid gap-2">
                  <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#e7bd74] px-4 text-sm font-extrabold text-[#071a2f] transition-transform hover:-translate-y-0.5">
                    <MessageCircle aria-hidden="true" size={18} /> {t.btnWhatsapp}
                  </a>
                  <div className="grid grid-cols-2 gap-2">
                    <a href={`tel:+${telefonoWhatsApp}`} className="focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/12 bg-white/[0.05] px-3 text-xs font-bold text-white hover:bg-white/[0.1]">
                      <Phone aria-hidden="true" size={15} /> {t.reserveBandCall}
                    </a>
                    <a href={email} className="focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/12 bg-white/[0.05] px-3 text-xs font-bold text-white hover:bg-white/[0.1]">
                      <Mail aria-hidden="true" size={15} /> Email
                    </a>
                  </div>
                </div>
              </div>
            </aside>

            <CalendarioReservas idioma={idioma} />
          </div>
        </div>
      </section>

      <Galeria idioma={idioma} />

      <BoatSpecs idioma={idioma} />

      <VideoShowcase idioma={idioma} />

      <BookingBanner idioma={idioma} />

      <RutasShowcase idioma={idioma} />

      <section
        id="experiencia"
        className="visual-grid section-wake section-shell relative scroll-mt-20 bg-[#fbfcfa]"
        style={{ "--wave-previous": "#f7faf8" } as React.CSSProperties}
      >
        <div className="site-container">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <span className="eyebrow">{t.expPre}</span>
              <h2 className="section-title mt-4 max-w-xl">{t.expTitle}</h2>
            </div>
            <SectionLead className="lg:justify-self-end">{t.expDesc}</SectionLead>
          </div>

          <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {pilares.map(({ icon: Icon, title, description }, index) => (
              <article key={title} data-motion="card" data-spotlight className={`premium-card interactive-card group rounded-[1.75rem] border border-[#dfe7e5] bg-white p-7 sm:p-8 ${index === 2 ? "md:col-span-2 lg:col-span-1" : ""}`}>
                <div className="flex items-start justify-between gap-4">
                  <span className="card-icon flex h-12 w-12 items-center justify-center rounded-full bg-[linear-gradient(145deg,#edf7f3,#dcece8)] text-[#0d6575] ring-1 ring-[#d2e5e0] transition-transform duration-300 group-hover:scale-105">
                    <Icon aria-hidden="true" size={22} />
                  </span>
                  <span className="text-xs font-bold tracking-[0.16em] text-[#9aa9ae]">0{index + 1}</span>
                </div>
                <h3 className="mt-9 text-xl font-bold tracking-[-0.02em] text-[#102a43]">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#61727b] sm:text-base sm:leading-7">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="patron"
        className="section-wake section-shell relative overflow-hidden bg-[#eef4f2]"
        style={{ "--wave-previous": "#fbfcfa" } as React.CSSProperties}
      >
        <div className="absolute -left-40 top-20 h-80 w-80 rounded-full bg-[#a8d7d8]/20 blur-[100px]" aria-hidden="true" />
        <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-[#e7bd74]/10 blur-[110px]" aria-hidden="true" />

        <div className="site-container relative z-10">
          <div data-motion="slide-left" className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
            <div>
              <span className="eyebrow">{t.helmPre}</span>
              <h2 className="section-title mt-4 max-w-3xl">{t.helmTitle}</h2>
            </div>
            <SectionLead className="lg:justify-self-end">{t.helmDesc}</SectionLead>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-[1.08fr_0.92fr] lg:items-stretch">
            <article
              data-motion="slide-left"
              className="relative min-h-[31rem] overflow-hidden rounded-[2rem] bg-[linear-gradient(145deg,#071a2f_0%,#0b3548_62%,#0d6575_100%)] p-7 text-white shadow-[0_30px_80px_rgba(7,26,47,0.2)] sm:p-10"
            >
              <Compass
                aria-hidden="true"
                strokeWidth={0.8}
                className="absolute -bottom-20 -right-16 h-72 w-72 text-white/[0.06] sm:h-96 sm:w-96"
              />
              <div className="relative flex h-full flex-col">
                <div className="flex items-start justify-between gap-5">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#e7bd74] text-[#071a2f] shadow-[0_10px_30px_rgba(231,189,116,0.18)]">
                    <Compass aria-hidden="true" size={25} />
                  </span>
                  <span className="rounded-full border border-white/15 bg-white/[0.07] px-4 py-2 text-[0.65rem] font-extrabold uppercase tracking-[0.18em] text-[#a8d7d8] backdrop-blur-sm">
                    {idioma === "es" ? "Armador · Patrón" : "Owner · Skipper"}
                  </span>
                </div>

                <div className="mt-12 flex items-end gap-4 border-b border-white/12 pb-8">
                  <strong className="font-numeric text-[6.5rem] font-semibold leading-[0.72] tracking-[-0.09em] text-[#e7bd74] sm:text-[8rem]">20</strong>
                  <span className="max-w-32 pb-1 text-sm font-bold uppercase leading-5 tracking-[0.14em] text-white/70">
                    {idioma === "es" ? "años de experiencia navegando" : "years of sailing experience"}
                  </span>
                </div>

                <h3 className="mt-8 text-2xl font-bold tracking-[-0.03em] sm:text-3xl">{modalidadesNavegacion[0].title}</h3>
                <p className="mt-4 max-w-xl text-sm leading-7 text-white/70 sm:text-base">{modalidadesNavegacion[0].description}</p>

                <div className="mt-auto flex flex-wrap gap-2 pt-8">
                  {(idioma === "es" ? ["Español", "Italiano", "Inglés"] : ["Spanish", "Italian", "English"]).map((language) => (
                    <span key={language} className="rounded-full border border-white/12 bg-white/[0.08] px-4 py-2 text-xs font-bold text-white/80 backdrop-blur-sm">
                      {language}
                    </span>
                  ))}
                </div>
              </div>
            </article>

            <div data-motion="cascade" className="grid gap-5">
              {modalidadesNavegacion.slice(1).map(({ icon: Icon, title, description }, index) => (
                <article
                  key={title}
                  data-motion="card"
                  data-spotlight
                  className={`premium-card interactive-card relative overflow-hidden rounded-[2rem] border p-7 sm:p-9 ${
                    index === 0
                      ? "border-[#d8e5e2] bg-white"
                      : "border-[#b9d7d4] bg-[linear-gradient(135deg,#e1f0ec,#f8fbfa)]"
                  }`}
                >
                  <div className="flex items-start gap-5">
                    <span className={`card-icon flex h-14 w-14 shrink-0 items-center justify-center rounded-full ${
                      index === 0 ? "bg-[#e8f2ef] text-[#0d6575] ring-1 ring-[#d2e5e0]" : "bg-[#0d6575] text-white"
                    }`}>
                      <Icon aria-hidden="true" size={23} />
                    </span>
                    <div>
                      <span className="text-[0.65rem] font-extrabold uppercase tracking-[0.18em] text-[#71868d]">
                        {index === 0
                          ? (idioma === "es" ? "Credenciales profesionales" : "Professional credentials")
                          : (idioma === "es" ? "Navegación autónoma" : "Independent sailing")}
                      </span>
                      <h3 className="mt-2 text-xl font-bold tracking-[-0.025em] text-[#102a43] sm:text-2xl">{title}</h3>
                    </div>
                  </div>
                  <p className="mt-6 text-sm leading-7 text-[#5c717a] sm:text-base">{description}</p>

                  <div className="mt-7 flex flex-wrap gap-2 border-t border-[#cfdfdb] pt-6">
                    {(index === 0
                      ? (idioma === "es" ? ["Marina Mercante", "Yacht Master Offshore"] : ["Merchant Navy", "Yacht Master Offshore"])
                      : (idioma === "es" ? ["Mínimo 3 días", "6 plazas", "Titulación acreditada"] : ["Minimum 3 days", "6 berths", "Verified qualification"])
                    ).map((detail) => (
                      <span key={detail} className="inline-flex items-center gap-2 rounded-full bg-[#071a2f]/[0.055] px-3 py-2 text-xs font-bold text-[#0d6575]">
                        <BadgeCheck aria-hidden="true" size={14} />
                        {detail}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div data-motion="fade" className="mt-6 grid overflow-hidden rounded-[1.5rem] border border-[#c9ddd8] bg-white shadow-[0_16px_45px_rgba(7,26,47,0.06)] md:grid-cols-[auto_1fr_1fr]">
            <div className="flex items-center justify-center bg-[#e7bd74] p-5 text-[#071a2f] md:px-7">
              <ShieldCheck aria-hidden="true" size={27} />
            </div>
            <div className="border-b border-[#dce7e4] p-5 md:border-b-0 md:border-r md:p-6">
              <strong className="block text-sm text-[#102a43]">{idioma === "es" ? "Excursión y formación" : "Excursion and training"}</strong>
              <span className="mt-1 block text-sm leading-6 text-[#61727b]">
                {idioma === "es" ? "Siempre con capitán o instructor a bordo." : "Always with a captain or instructor aboard."}
              </span>
            </div>
            <div className="p-5 md:p-6">
              <strong className="block text-sm text-[#102a43]">{idioma === "es" ? "Alquiler sin patrón" : "Bareboat rental"}</strong>
              <span className="mt-1 block text-sm leading-6 text-[#61727b]">
                {idioma === "es" ? "Desde 3 días y sujeto a verificación de experiencia y titulación." : "From 3 days, subject to verified experience and qualifications."}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section id="nosotros" className="section-wake section-shell relative scroll-mt-20 bg-[#fbfcfa]">
        <div className="site-container grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch">
          <div data-motion="image" className="relative min-h-[440px] overflow-hidden rounded-[2rem] shadow-[0_30px_80px_rgba(7,26,47,0.14)] sm:min-h-[560px]">
            <Image
              src="/media/leon/leon-sailing-tenerife.jpg"
              alt={t.storyVisualAlt}
              fill
              sizes="(min-width: 1024px) 52vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#071a2f]/65 via-transparent to-transparent" aria-hidden="true" />
            <p className="absolute bottom-7 left-7 right-7 max-w-md font-serif text-3xl italic leading-tight text-white sm:bottom-10 sm:left-10 sm:text-4xl">
              “{t.storySignature}”
            </p>
          </div>

          <div className="flex flex-col justify-center rounded-[2rem] border border-[#dfe7e5] bg-white p-7 shadow-[0_24px_70px_rgba(7,26,47,0.06)] sm:p-12 lg:p-14">
            <span className="eyebrow">{t.secHistoria}</span>
            <h2 className="font-display mt-5 text-4xl font-semibold leading-tight tracking-[-0.04em] sm:text-5xl">
              {storyBeforeMaureen}
              <a
                href="https://www.mlteneriferealestate.com/agents/maureen-lacchini/"
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring rounded-sm underline decoration-[#0d6575]/30 underline-offset-4 transition-colors hover:text-[#0d6575]"
              >
                Maureen Lacchini
              </a>
              {storyAfterMaureen}
            </h2>
            <p className="mt-7 leading-7 text-[#526b75]">{t.histP1}</p>
            <p className="mt-4 leading-7 text-[#526b75]">{t.histP2}</p>
            <div className="mt-9 flex items-center gap-3 border-t border-[#e2e9e7] pt-7 text-sm font-bold text-[#0d6575]">
              <Sparkles aria-hidden="true" size={18} /> Leon Sailing Tenerife
            </div>
          </div>
        </div>
      </section>

      <section id="antes-de-zarpar" className="section-wake section-shell relative bg-[#0b3548] text-white">
        <div className="site-container">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#e7bd74]">{t.guidePre}</span>
              <h2 className="font-display mt-5 max-w-2xl text-4xl font-semibold leading-tight tracking-[-0.045em] sm:text-6xl">{t.guideTitle}</h2>
            </div>
            <SectionLead tone="dark" className="lg:justify-self-end">{t.guideDesc}</SectionLead>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {guiaAntesDeZarpar.map((item, index) => (
              <article key={item.title} data-motion="card" data-spotlight className="interactive-card rounded-[1.5rem] border border-white/10 bg-white/[0.06] p-6 backdrop-blur-sm sm:p-7">
                <div className="flex items-center justify-between gap-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e7bd74] text-sm font-extrabold text-[#071a2f]">{String(index + 1).padStart(2, "0")}</span>
                  <Check aria-hidden="true" size={18} className="text-[#a8d7d8]" />
                </div>
                <h3 className="mt-6 text-lg font-bold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/65">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="preguntas" className="section-wake section-shell relative scroll-mt-20 bg-[#f5f8f7]">
        <div className="site-container grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
          <div>
            <span className="eyebrow">{t.faqPre}</span>
            <h2 className="section-title mt-4">{t.faqTitle}</h2>
          </div>
          <div className="divide-y divide-[#dfe7e5] border-y border-[#dfe7e5]">
            {preguntas.map(({ question, answer }, index) => (
              <details key={question} className="faq-item group" open={index === 0}>
                <summary className="focus-ring flex cursor-pointer list-none items-center justify-between gap-5 py-6 text-left font-bold text-[#102a43] marker:hidden sm:text-lg">
                  {question}
                  <span className="faq-plus flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#edf4f2] text-xl font-normal text-[#0d6575]" aria-hidden="true">+</span>
                </summary>
                <p className="max-w-2xl pb-7 pr-10 leading-7 text-[#60727b]">{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="contacto-final" className="section-wake relative overflow-hidden bg-[#0b3548] py-24 text-white sm:py-32">
        <Image src="/media/tenerife/tenerife-sunset.jpg" alt="" fill sizes="100vw" className="object-cover opacity-45" aria-hidden="true" />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(7,26,47,0.91),rgba(11,53,72,0.58))]" aria-hidden="true" />
        <div data-motion="fade" className="site-container relative z-10 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#e7bd74]">{t.ctaEyebrow}</span>
          <h2 className="font-display mx-auto mt-5 max-w-4xl text-5xl font-semibold leading-[1.04] tracking-[-0.05em] sm:text-7xl">{t.ctaFinal}</h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/70 sm:text-lg">{t.ctaDesc}</p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <a href="#reservas" className="button-primary" data-magnetic>
              <CalendarDays aria-hidden="true" size={19} /> {t.reserveBandCalendar}
            </a>
            <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="button-ghost-light" data-magnetic>
              <MessageCircle aria-hidden="true" size={19} /> {t.btnWhatsapp}
            </a>
            <a href={email} className="button-ghost-light" data-magnetic>
              <Mail aria-hidden="true" size={19} /> {t.btnEmail}
            </a>
          </div>
        </div>
      </section>

      <footer className="bg-[#04111f] px-5 pb-28 pt-14 text-white/55 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-10 border-b border-white/10 pb-10 md:grid-cols-[1fr_auto_auto]">
            <div>
              <Image src="/logo-oscuro.png" alt="Leon Sailing Tenerife" width={120} height={68} className="brightness-0 invert" />
              <p className="mt-5 max-w-sm text-sm leading-6">{t.footerTagline}</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/50">{t.footerContact}</p>
              <div className="mt-4 grid gap-2 text-sm">
                <a href={`tel:+${telefonoWhatsApp}`} className="focus-ring rounded-sm hover:text-white">{telefonoFormateado}</a>
                <a href={`mailto:${emailContactobarco}`} className="focus-ring rounded-sm hover:text-white">{emailContactobarco}</a>
              </div>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/50">Tenerife</p>
              <a href={`https://${webContactoalquiler}`} target="_blank" rel="noopener noreferrer" className="focus-ring mt-4 block max-w-[210px] rounded-sm text-sm leading-6 hover:text-white">
                {t.secInmo}
              </a>
            </div>
          </div>
          <div className="flex flex-col gap-5 pt-7 text-xs sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} Leon Sailing Tenerife. {t.derechos}</p>
            <nav className="flex flex-wrap gap-5" aria-label="Legal">
              <a href={`/${idioma}/aviso-legal`} className="focus-ring rounded-sm hover:text-white">{t.avisoLegal}</a>
              <a href={`/${idioma}/privacidad`} className="focus-ring rounded-sm hover:text-white">{t.privacidad}</a>
              <a href={`/${idioma}/cookies`} className="focus-ring rounded-sm hover:text-white">{t.cookies}</a>
            </nav>
          </div>
        </div>
      </footer>

      <div className="fixed bottom-6 right-6 z-40 hidden md:block">
        <a
          href={whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="focus-ring group flex items-center gap-3 rounded-full border border-white/70 bg-white/95 py-2.5 pl-3 pr-5 text-[#102a43] shadow-[0_18px_55px_rgba(7,26,47,0.24)] backdrop-blur-xl transition-transform hover:-translate-y-1"
          aria-label={t.whatsappFloatLabel}
        >
          <span className="relative flex h-11 w-11 items-center justify-center rounded-full bg-[#e7bd74] text-[#071a2f]">
            <span className="absolute inset-0 animate-ping rounded-full bg-[#e7bd74]/35" aria-hidden="true" />
            <MessageCircle aria-hidden="true" size={20} className="relative" />
          </span>
          <span className="grid text-left">
            <span className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-[#71828a]">{t.whatsappFloatEyebrow}</span>
            <span className="mt-0.5 text-sm font-extrabold">{t.whatsappFloatLabel}</span>
          </span>
        </a>
      </div>

      <div className="mobile-dock fixed inset-x-3 z-40 flex gap-2 md:hidden">
        <a href="#reservas" className="focus-ring flex min-h-14 flex-1 items-center justify-center gap-2 rounded-full border border-white/70 bg-[#e7bd74]/95 px-4 text-sm font-bold text-[#071a2f] shadow-[0_14px_45px_rgba(7,26,47,0.28)] backdrop-blur-xl">
          <CalendarDays aria-hidden="true" size={19} />
          {t.mobileCta}
          <ArrowRight aria-hidden="true" size={17} />
        </a>
        <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="focus-ring flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-white/70 bg-white/95 text-[#0d6575] shadow-[0_14px_45px_rgba(7,26,47,0.24)] backdrop-blur-xl" aria-label={t.whatsappFloatLabel}>
          <MessageCircle aria-hidden="true" size={21} />
        </a>
      </div>
    </main>
  );
}

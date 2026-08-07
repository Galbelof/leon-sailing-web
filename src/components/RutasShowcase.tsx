import Image from "next/image";
import { Anchor, ArrowRight, MapPin, Plane, UtensilsCrossed } from "lucide-react";
import { Idioma, textos } from "../data";
import ClimaWidget from "./ClimaWidget";
import LiveWebcamCard from "./LiveWebcamCard";

export default function RutasShowcase({ idioma }: { idioma: Idioma }) {
  const t = textos[idioma];
  const criterios = [
    { icon: Plane, title: t.routeDepartureTitle, description: t.routeDepartureDesc },
    { icon: UtensilsCrossed, title: t.routeDurationTitle, description: t.routeDurationDesc },
    { icon: Anchor, title: t.routeConditionsTitle, description: t.routeConditionsDesc },
  ];

  return (
    <section id="ruta" className="route-grid-bg section-wake section-shell relative scroll-mt-20 overflow-hidden bg-[#f7faf8]">
      <div className="absolute -left-28 top-24 h-80 w-80 rounded-full bg-[#a8d7d8]/20 blur-[90px]" aria-hidden="true" />
      <div className="absolute -right-24 bottom-20 h-72 w-72 rounded-full bg-[#e7bd74]/10 blur-[100px]" aria-hidden="true" />

      <div className="site-container relative">
        <div data-motion="slide-left" className="grid gap-7 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-16">
          <div>
            <span className="eyebrow">{t.secUbicacion}</span>
            <h2 className="section-title mt-4 max-w-3xl">{t.ubiPuertoTitulo}</h2>
          </div>
          <div className="lg:justify-self-end">
            <p className="max-w-2xl text-base leading-7 text-[#52606d] sm:text-lg sm:leading-8">{t.ubiPuertoDesc}</p>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Marina+del+Sur+Las+Galletas"
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring mt-6 inline-flex items-center gap-2 rounded-full border border-[#cfe0dc] bg-white px-4 py-2.5 text-sm font-extrabold text-[#0d6575] shadow-[0_10px_30px_rgba(7,26,47,0.06)] transition-transform hover:-translate-y-0.5"
              data-magnetic
            >
              <MapPin aria-hidden="true" size={17} /> {t.routeMapCta} <ArrowRight aria-hidden="true" size={16} />
            </a>
          </div>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-12 lg:items-stretch">
          <figure data-motion="image" className="route-hero relative min-h-[540px] overflow-hidden rounded-[2rem] bg-[#071a2f] shadow-[0_30px_90px_rgba(7,26,47,0.2)] lg:col-span-7 lg:row-span-2 lg:min-h-[820px]">
            <Image
              src="/media/tenerife/marina-del-sur-las-galletas.webp"
              alt={t.routeVisualAlt}
              fill
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="object-cover transition-transform duration-[1600ms] ease-out"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,26,47,0.08)_0%,rgba(7,26,47,0.18)_46%,rgba(7,26,47,0.88)_100%)]" aria-hidden="true" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_22%,transparent_0%,rgba(3,15,28,0.08)_52%,rgba(3,15,28,0.34)_100%)]" aria-hidden="true" />

            <span className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-[#071a2f]/55 px-3 py-2 text-[0.65rem] font-extrabold uppercase tracking-[0.17em] text-white backdrop-blur-md sm:left-7 sm:top-7">
              <Anchor aria-hidden="true" size={15} className="text-[#e7bd74]" /> {t.routeFlexibleLabel}
            </span>

            <figcaption className="absolute bottom-5 left-5 right-5 rounded-[1.35rem] border border-white/15 bg-[#061725]/78 p-5 text-white shadow-2xl backdrop-blur-xl sm:bottom-7 sm:left-7 sm:right-7 sm:p-7">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#e7bd74] px-3 py-2 text-[0.64rem] font-extrabold uppercase tracking-[0.14em] text-[#071a2f]">
                <MapPin aria-hidden="true" size={14} /> {t.routeDepartureBadge}
              </span>
              <span className="mt-4 block max-w-xl text-2xl font-semibold leading-tight tracking-[-0.03em] sm:text-3xl">{t.routeHeroTitle}</span>
              <span className="mt-3 block max-w-2xl text-sm leading-6 text-white/70 sm:text-base sm:leading-7">{t.routeHeroDesc}</span>
            </figcaption>
          </figure>

          <article data-motion="card" data-spotlight className="route-plan-card interactive-card relative overflow-hidden rounded-[2rem] border border-[#163f50] bg-[#071a2f] p-6 text-white shadow-[0_26px_75px_rgba(7,26,47,0.16)] sm:p-8 lg:col-span-5">
            <span className="absolute -right-8 -top-12 font-serif text-[9rem] italic leading-none text-white/[0.035]" aria-hidden="true">N</span>
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#e7bd74] text-[#071a2f]">
              <MapPin aria-hidden="true" size={22} />
            </span>
            <p className="mt-7 text-xs font-extrabold uppercase tracking-[0.2em] text-[#a8d7d8]">{t.routeDesignPre}</p>
            <h3 className="mt-3 text-3xl font-semibold leading-tight tracking-[-0.035em]">{t.ubiRutasTitulo}</h3>
            <p className="mt-4 text-sm leading-7 text-white/65">{t.ubiRutasDesc}</p>

            <div className="mt-7 grid gap-2.5">
              {criterios.map(({ icon: Icon, title, description }, index) => (
                <div key={title} className="group flex gap-3 rounded-[1.1rem] border border-white/[0.08] bg-white/[0.05] p-4 transition-colors hover:bg-white/[0.08]">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/[0.08] text-[#e7bd74]">
                    <Icon aria-hidden="true" size={17} />
                  </span>
                  <div>
                    <p className="text-sm font-bold"><span className="mr-2 text-[0.62rem] tracking-[0.12em] text-white/35">0{index + 1}</span>{title}</p>
                    <p className="mt-1 text-xs leading-5 text-white/48">{description}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-6 border-l-2 border-[#e7bd74] pl-4 text-xs italic leading-6 text-white/55">{t.routeNote}</p>
          </article>

          <div className="lg:col-span-5">
            <ClimaWidget idioma={idioma} />
          </div>
        </div>

        <LiveWebcamCard idioma={idioma} />
      </div>
    </section>
  );
}

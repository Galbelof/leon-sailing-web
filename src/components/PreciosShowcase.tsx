import { Anchor, BadgeCheck, CalendarDays, Check, Clock3, ShieldCheck, Sparkles, Users } from "lucide-react";
import type { Idioma } from "../data";
import SectionLead from "./SectionLead";

export default function PreciosShowcase({ idioma }: { idioma: Idioma }) {
  const t = idioma === "es"
    ? {
        eyebrow: "Precios publicados · IGIC incluido",
        title: "Elegid cómo queréis vivir Leon",
        intro: "Tres propuestas claras, siempre con el velero completo para vuestro grupo. En los alquileres podéis añadir patrón y personalizar la estancia con servicios opcionales.",
        plans: [
          {
            icon: Anchor,
            label: "Excursión privada",
            price: "600 €",
            suffix: "por excursión",
            badge: "6 horas",
            featured: true,
            tone: "sand",
            points: ["Capitán incluido", "Almuerzo y fondeo incluidos", "Equipo de snorkel incluido", "Seguro y canon incluidos", "Hasta 8 pasajeros más el patrón"],
          },
          {
            icon: CalendarDays,
            label: "Alquiler del velero",
            price: "270 €",
            suffix: "por día",
            badge: "Mínimo 3 días",
            featured: false,
            tone: "blue",
            points: ["Precio base sin patrón", "6 plazas para dormir", "Patrón opcional: 160 €/día", "Seguro incluido"],
          },
          {
            icon: Sparkles,
            label: "Día de instrucción",
            price: "200 €",
            suffix: "por jornada",
            badge: "9:00–17:00",
            featured: false,
            tone: "aqua",
            points: ["Instructor a bordo", "Español, inglés e italiano", "Formación en navegación real"],
          },
        ],
        rentalTitle: "Condiciones y gastos",
        rentalItems: [
          "Pago obligatorio único de 150 € solo en alquileres de varios días: limpieza final, ropa de cama, toallas y tasas del puerto base. No se aplica a la excursión.",
          "Fianza reembolsable de 2.500 €; no forma parte del precio calculado de la reserva.",
          "En los alquileres, el combustible no está incluido: el depósito se entrega lleno y debe devolverse lleno.",
          "En los alquileres de varios días, la comida y las bebidas no están incluidas.",
          "El canon de pasajeros está incluido en los precios publicados y lo asume el armador.",
          "Horario de entrada: 17:00. Horario de salida: 9:00.",
        ],
        extrasTitle: "Servicios y extras opcionales",
        extrasIntro: "Estos importes se añaden únicamente cuando solicitáis el servicio correspondiente.",
        extras: [
          ["Patrón", "160 €/día"],
          ["Tender y motor fueraborda", "150 €/semana"],
          ["Toallas de playa", "5 €/persona/semana"],
          ["SUP", "100 €/semana"],
          ["Equipo de pesca", "150 €/semana"],
          ["Equipo de snorkel", "20 €/semana"],
          ["Aprovisionamiento", "25 €/alquiler"],
          ["Entrada anticipada", "150 €"],
          ["Limpieza adicional por mascota", "100 €/alquiler"],
          ["Gennaker", "300 €/semana · fianza adicional de 500 €"],
          ["Wi-Fi ilimitado", "100 €/semana"],
        ],
        calculatorNote: "El formulario de disponibilidad calcula automáticamente el importe según el servicio, los días y la opción de patrón.",
        cta: "Calcular mi reserva",
      }
    : {
        eyebrow: "Published prices · IGIC included",
        title: "Choose how you would like to experience Leon",
        intro: "Three clear options, always with the entire yacht for your group. Rentals can include a skipper and optional services to tailor your stay.",
        plans: [
          {
            icon: Anchor,
            label: "Private excursion",
            price: "€600",
            suffix: "per excursion",
            badge: "6 hours",
            featured: true,
            tone: "sand",
            points: ["Captain included", "Lunch and anchoring included", "Snorkelling equipment included", "Insurance and passenger charge included", "Up to 8 passengers plus the captain"],
          },
          {
            icon: CalendarDays,
            label: "Yacht rental",
            price: "€270",
            suffix: "per day",
            badge: "Minimum 3 days",
            featured: false,
            tone: "blue",
            points: ["Base price without a skipper", "6 sleeping berths", "Optional skipper: €160/day", "Insurance included"],
          },
          {
            icon: Sparkles,
            label: "Training day",
            price: "€200",
            suffix: "per day",
            badge: "9:00–17:00",
            featured: false,
            tone: "aqua",
            points: ["Instructor aboard", "Spanish, English and Italian", "Training in a real sailing environment"],
          },
        ],
        rentalTitle: "Conditions and additional costs",
        rentalItems: [
          "One mandatory €150 payment applies only to multi-day rentals: final cleaning, bed linen, towels and home-marina fees. It does not apply to the excursion.",
          "Refundable €2,500 security deposit; this is not part of the calculated booking price.",
          "Fuel is not included in rentals: the tank is supplied full and must be returned full.",
          "Food and drinks are not included in multi-day rentals.",
          "The passenger charge is included in the published prices and paid by the owner.",
          "Check-in time: 17:00. Check-out time: 9:00.",
        ],
        extrasTitle: "Optional services and extras",
        extrasIntro: "These amounts are added only when you request the corresponding service.",
        extras: [
          ["Skipper", "€160/day"],
          ["Tender and outboard engine", "€150/week"],
          ["Beach towels", "€5/person/week"],
          ["SUP", "€100/week"],
          ["Fishing equipment", "€150/week"],
          ["Snorkelling equipment", "€20/week"],
          ["Provisioning service", "€25/rental"],
          ["Early check-in", "€150"],
          ["Additional pet cleaning", "€100/rental"],
          ["Gennaker", "€300/week · additional €500 deposit"],
          ["Unlimited Wi-Fi", "€100/week"],
        ],
        calculatorNote: "The availability form automatically calculates the amount according to the service, number of days and skipper option.",
        cta: "Calculate my booking",
      };

  const planStyles = {
    sand: {
      card: "border-[#d8bd78] bg-[#f5e9c7] text-[#071a2f]",
      icon: "bg-[#071a2f] text-[#f5e9c7]",
      badge: "bg-white/55 text-[#071a2f]",
      suffix: "text-[#5f665f]",
      divider: "border-[#9d7b36]/25",
    },
    blue: {
      card: "border-[#b8d0dc] bg-[#e8f1f6] text-[#102a43]",
      icon: "bg-[#174d70] text-white",
      badge: "bg-white/65 text-[#174d70]",
      suffix: "text-[#5c7480]",
      divider: "border-[#174d70]/15",
    },
    aqua: {
      card: "border-[#b5d4d8] bg-[#e5f2f3] text-[#102a43]",
      icon: "bg-[#0d6575] text-white",
      badge: "bg-white/65 text-[#0d6575]",
      suffix: "text-[#5c7480]",
      divider: "border-[#0d6575]/15",
    },
  } as const;

  return (
    <section id="precios" className="section-wake section-shell relative scroll-mt-20 overflow-hidden bg-[#f5f8f7]">
      <div className="site-container">
        <div data-motion="slide-left" className="grid gap-7 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
          <div>
            <span className="eyebrow">{t.eyebrow}</span>
            <h2 className="section-title mt-4 max-w-3xl">{t.title}</h2>
          </div>
          <SectionLead className="lg:justify-self-end">{t.intro}</SectionLead>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {t.plans.map(({ icon: Icon, label, price, suffix, badge, points, featured, tone }) => {
            const styles = planStyles[tone as keyof typeof planStyles];

            return (
              <article
                key={label}
                data-motion="card"
                data-spotlight
                className={`premium-card interactive-card relative overflow-hidden rounded-[1.75rem] border p-7 shadow-[0_20px_60px_rgba(7,26,47,0.08)] sm:p-8 ${styles.card} ${featured ? "featured-price-card" : ""}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <span className={`card-icon flex h-12 w-12 items-center justify-center rounded-full ${styles.icon}`}>
                    <Icon aria-hidden="true" size={22} />
                  </span>
                  <span className={`rounded-full px-3 py-2 text-[0.64rem] font-extrabold uppercase tracking-[0.14em] ${styles.badge}`}>
                    {badge}
                  </span>
                </div>
                <h3 className="mt-7 text-xl font-bold">{label}</h3>
                <p className="mt-4 flex flex-wrap items-end gap-x-2">
                  <strong className="font-numeric text-5xl font-semibold tracking-[-0.055em]">{price}</strong>
                  <span className={`pb-1 text-sm font-semibold ${styles.suffix}`}>{suffix}</span>
                </p>
                <ul className={`mt-7 grid gap-3 border-t pt-6 text-sm font-semibold ${styles.divider}`}>
                  {points.map((point) => (
                    <li key={point} className="flex items-start gap-2.5">
                      <Check aria-hidden="true" size={17} strokeWidth={3} className="mt-0.5 shrink-0 text-[#0d6575]" />
                      {point}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <article data-motion="slide-left" className="rounded-[1.75rem] border border-[#d6e3e0] bg-[#071a2f] p-7 text-white sm:p-8">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#e7bd74] text-[#071a2f]">
              <ShieldCheck aria-hidden="true" size={21} />
            </span>
            <h3 className="mt-6 text-2xl font-bold">{t.rentalTitle}</h3>
            <ul className="mt-6 grid gap-3 text-sm leading-6 text-white/72">
              {t.rentalItems.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <BadgeCheck aria-hidden="true" size={17} className="mt-1 shrink-0 text-[#e7bd74]" />
                  {item}
                </li>
              ))}
            </ul>
          </article>

          <article data-motion="slide-right" className="rounded-[1.75rem] border border-[#b9d3d8] bg-[#edf5f6] p-7 sm:p-8">
            <div className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#e8f2ef] text-[#0d6575]">
                <Clock3 aria-hidden="true" size={21} />
              </span>
              <div>
                <h3 className="text-2xl font-bold text-[#102a43]">{t.extrasTitle}</h3>
                <p className="mt-2 text-sm leading-6 text-[#667982]">{t.extrasIntro}</p>
              </div>
            </div>
            <dl className="mt-7 grid gap-x-7 gap-y-0 sm:grid-cols-2">
              {t.extras.map(([name, price]) => (
                <div key={name} className="flex items-start justify-between gap-4 border-b border-[#cfdee1] py-3.5">
                  <dt className="text-sm font-semibold text-[#34515d]">{name}</dt>
                  <dd className="max-w-[55%] text-right text-sm font-extrabold text-[#0d6575]">{price}</dd>
                </div>
              ))}
            </dl>
          </article>
        </div>

        <div data-motion className="mt-6 flex flex-col items-start justify-between gap-5 rounded-[1.5rem] border border-[#cfe0dc] bg-white px-6 py-6 shadow-[0_16px_50px_rgba(7,26,47,0.06)] sm:flex-row sm:items-center sm:px-8">
          <p className="max-w-3xl text-sm font-semibold leading-6 text-[#526b75]">{t.calculatorNote}</p>
          <a href="#reservas" className="button-primary shrink-0" data-magnetic>
            <Users aria-hidden="true" size={18} /> {t.cta}
          </a>
        </div>
      </div>
    </section>
  );
}

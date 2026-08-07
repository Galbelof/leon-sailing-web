import { Anchor, BadgeCheck, ChevronDown, Compass, LifeBuoy, Ruler, ShieldCheck, Waves } from "lucide-react";
import type { Idioma } from "../data";
import AnimatedMetric from "./AnimatedMetric";
import SectionLead from "./SectionLead";

export default function BoatSpecs({ idioma }: { idioma: Idioma }) {
  const t = idioma === "es"
    ? {
        eyebrow: "Ficha técnica de Leon",
        title: "Un velero preparado para navegar y vivir a bordo",
        intro: "Leon es un Harmony 38 de 2007, con casi 12 metros de eslora, seis plazas para dormir en alquileres sin patrón y capacidad para ocho pasajeros más el patrón en excursiones.",
        highlights: [
          ["Harmony 38", "Modelo"],
          ["11,67 m", "Eslora total"],
          ["3,82 m", "Manga"],
          ["3", "Camarotes"],
          ["1", "Baño"],
          ["6 personas", "Plazas para dormir"],
        ],
        detailsEyebrow: "Información organizada por áreas",
        detailsTitle: "Consulta solo lo que necesitas",
        detailsHint: "Abre cada apartado para descubrir el equipamiento y las características de Leon sin perderte entre datos técnicos.",
        detailsCount: "Áreas de la ficha",
        itemLabel: "datos",
        groups: [
          {
            icon: Anchor,
            title: "Construcción",
            items: [
              "Constructor: Harmony Yachts · Groupe Poncin Yachts, Francia",
              "Diseño: Mortain & Mavrikios",
              "Casco de GRP con aleta, bulbo y timón de pala",
              "Aparejo sloop fraccionado y lastre de plomo",
              "Buenas prestaciones: un velero rápido, pero fácil de maniobrar",
              "Bandera croata de la Unión Europea",
            ],
          },
          {
            icon: Ruler,
            title: "Dimensiones",
            items: [
              "Eslora total: 11,67 m · casco: 11,23 m",
              "Eslora de flotación: 10,05 m",
              "Manga: 3,82 m · calado: 1,95 m",
              "Desplazamiento: 7.470 kg",
              "Lastre: 2.340 kg",
            ],
          },
          {
            icon: Waves,
            title: "Motor y autonomía",
            items: [
              "Motor diésel Volvo Penta D2-40",
              "Potencia: 39 CV · aproximadamente 6.000 horas",
              "Depósito de combustible: 200 litros",
              "Depósito de agua potable: 500 litros",
              "Depósito de aguas negras",
            ],
          },
          {
            icon: Compass,
            title: "Alojamiento y cocina",
            items: [
              "Tres camarotes, seis plazas principales y dos literas convertibles; el alquiler sin patrón se comercializa para un máximo de 6 personas, que son las plazas principales para dormir",
              "Salón en U con mesa convertible en dos literas",
              "Camarotes dobles con armarios y ventilación",
              "Cocina de gas con dos fuegos y horno",
              "Nevera, fregadero, agua caliente y espacio de almacenaje",
            ],
          },
          {
            icon: Compass,
            title: "Navegación y electricidad",
            items: [
              "Plotters Garmin y Furuno, piloto automático y brújula",
              "Instrumentos Nexus NX2 de velocidad, viento y navegación",
              "Radio VHF Cobra Marine DSC",
              "Molinete eléctrico, bombas de achique eléctrica y manual",
              "Baterías, cargador, conexión a puerto y sistema de audio",
            ],
          },
          {
            icon: ShieldCheck,
            title: "Cubierta, velas y comodidad",
            items: [
              "Asientos de teca, mesa y rueda de timón plegables",
              "Ducha exterior de agua caliente y fría, dos anclas y winches Harken",
              "Vela mayor tipo full batten (con sables) de 2020 y génova enrollable de 2022",
              "Bimini, capota y escalera de baño",
              "Embarcación auxiliar y motor fueraborda disponibles como extra por 150 €/semana",
              "Pasarela y defensas",
            ],
          },
          {
            icon: LifeBuoy,
            title: "Seguridad a bordo",
            items: [
              "Equipamiento conforme a la normativa aplicable",
              "Chalecos salvavidas suficientes para todos los ocupantes",
              "Seis chalecos autoinflables para alquileres largos",
              "Balsa salvavidas y radiobaliza automática",
              "Bengalas, botiquín, extintores, aro salvavidas y líneas de vida",
            ],
          },
        ],
        note: "En los alquileres sin patrón se comprobarán previamente la experiencia y la titulación náutica necesarias.",
      }
    : {
        eyebrow: "Leon technical specifications",
        title: "A yacht prepared for sailing and living aboard",
        intro: "Leon is a 2007 Harmony 38, almost 12 metres long, with six sleeping berths for bareboat rentals and capacity for eight passengers plus the captain on excursions.",
        highlights: [
          ["Harmony 38", "Model"],
          ["11.67 m", "Length overall"],
          ["3.82 m", "Beam"],
          ["3", "Cabins"],
          ["1", "Bathroom"],
          ["6 guests", "Sleeping berths"],
        ],
        detailsEyebrow: "Information organised by area",
        detailsTitle: "See only what you need",
        detailsHint: "Open each section to explore Leon's equipment and features without getting lost in technical data.",
        detailsCount: "Specification areas",
        itemLabel: "details",
        groups: [
          {
            icon: Anchor,
            title: "Construction",
            items: [
              "Builder: Harmony Yachts · Groupe Poncin Yachts, France",
              "Design: Mortain & Mavrikios",
              "GRP hull with fin, bulb and spade rudder",
              "Fractional sloop rig with lead ballast",
              "Performance-oriented, yet easy to handle",
              "Croatian European Union flag",
            ],
          },
          {
            icon: Ruler,
            title: "Dimensions",
            items: [
              "Length overall: 11.67 m · hull length: 11.23 m",
              "Waterline length: 10.05 m",
              "Beam: 3.82 m · draught: 1.95 m",
              "Displacement: 7,470 kg",
              "Ballast: 2,340 kg",
            ],
          },
          {
            icon: Waves,
            title: "Engine and autonomy",
            items: [
              "Volvo Penta D2-40 diesel engine",
              "Power: 39 hp · approximately 6,000 hours",
              "Fuel tank: 200 litres",
              "Fresh-water tank: 500 litres",
              "Black-water holding tank",
            ],
          },
          {
            icon: Compass,
            title: "Accommodation and galley",
            items: [
              "Three cabins, six main berths and two convertible berths; bareboat rental is offered for a maximum of 6 guests, corresponding to the main sleeping berths",
              "U-shaped saloon with table converting into two berths",
              "Double cabins with wardrobes and ventilation",
              "Two-burner gas cooker with oven",
              "Fridge, sink, hot water and generous storage",
            ],
          },
          {
            icon: Compass,
            title: "Navigation and electrical systems",
            items: [
              "Garmin and Furuno plotters, autopilot and compass",
              "Nexus NX2 speed, wind and navigation instruments",
              "Cobra Marine DSC VHF radio",
              "Electric windlass plus electric and manual bilge pumps",
              "Batteries, charger, shore power and audio system",
            ],
          },
          {
            icon: ShieldCheck,
            title: "Deck, sails and comfort",
            items: [
              "Teak seating, folding cockpit table and steering wheel",
              "Hot-and-cold deck shower, two anchors and Harken winches",
              "2020 full-batten mainsail and 2022 furling genoa",
              "Bimini, sprayhood and bathing ladder",
              "Tender and outboard engine available as an optional extra for €150/week",
              "Gangway and fenders",
            ],
          },
          {
            icon: LifeBuoy,
            title: "Safety aboard",
            items: [
              "Equipment compliant with the applicable regulations",
              "Enough lifejackets for everyone aboard",
              "Six self-inflating lifejackets for longer rentals",
              "Liferaft and automatic EPIRB",
              "Flares, first-aid kit, fire extinguishers, lifebuoy and lifelines",
            ],
          },
        ],
        note: "For bareboat rentals, the required sailing qualifications and experience will be checked before confirmation.",
      };

  return (
    <section id="ficha-tecnica" className="section-wake section-shell relative bg-[#fbfcfa]">
      <div className="site-container">
        <div data-motion="slide-left" className="grid gap-7 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
          <div>
            <span className="eyebrow">{t.eyebrow}</span>
            <h2 className="section-title mt-4 max-w-3xl">{t.title}</h2>
          </div>
          <SectionLead className="lg:justify-self-end">{t.intro}</SectionLead>
        </div>

        <dl data-motion="cascade" className="mt-12 grid grid-cols-2 overflow-hidden rounded-[1.75rem] bg-[#071a2f] text-white shadow-[0_24px_70px_rgba(7,26,47,0.16)] sm:grid-cols-3 lg:grid-cols-6">
          {t.highlights.map(([value, label], index) => (
            <div key={label} className={`p-5 sm:p-6 ${index % 2 ? "border-l border-white/10" : ""} ${index > 1 ? "border-t border-white/10 sm:border-t-0" : ""} ${index > 0 ? "lg:border-l lg:border-white/10" : ""}`}>
              <dt className="text-xs font-bold uppercase tracking-[0.12em] text-white/45">{label}</dt>
              <dd className="font-numeric mt-2 text-xl font-bold tracking-[-0.02em] text-[#e7bd74]"><AnimatedMetric value={value} animate={index > 0} /></dd>
            </div>
          ))}
        </dl>

        <div className="mt-7">
          <aside
            data-motion="slide-left"
            className="relative grid items-center gap-6 overflow-hidden rounded-[1.75rem] bg-[linear-gradient(120deg,#071a2f,#0b3548_58%,#0d6575)] p-7 text-white shadow-[0_24px_65px_rgba(7,26,47,0.16)] sm:grid-cols-[auto_1fr_auto] sm:p-8"
          >
            <Compass
              aria-hidden="true"
              strokeWidth={0.8}
              className="absolute -bottom-20 right-28 h-64 w-64 text-white/[0.05]"
            />
            <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#e7bd74] text-[#071a2f] shadow-[0_12px_30px_rgba(231,189,116,0.16)]">
              <Compass aria-hidden="true" size={24} />
            </span>
            <div className="relative max-w-3xl">
              <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.2em] text-[#a8d7d8]">{t.detailsEyebrow}</p>
              <h3 className="mt-2 text-2xl font-semibold leading-tight tracking-[-0.04em] sm:text-3xl">{t.detailsTitle}</h3>
              <p className="mt-3 text-sm leading-6 text-white/65">{t.detailsHint}</p>
            </div>
            <div className="relative flex items-center gap-3 border-t border-white/12 pt-5 sm:block sm:min-w-40 sm:border-l sm:border-t-0 sm:pl-8 sm:pt-0">
              <strong className="text-4xl font-semibold tracking-[-0.05em] text-[#e7bd74]">07</strong>
              <span className="text-xs font-bold uppercase tracking-[0.14em] text-white/60 sm:mt-1 sm:block">{t.detailsCount}</span>
            </div>
          </aside>

          <div data-motion="cascade" className="mt-4 grid gap-3">
            {t.groups.map(({ icon: Icon, title, items }, index) => (
              <details
                key={title}
                name={`boat-specs-${idioma}`}
                open={index === 0}
                data-motion="fade"
                className={`boat-spec-details group overflow-hidden rounded-[1.35rem] border bg-white transition-[border-color,box-shadow,background-color] duration-300 open:shadow-[0_18px_50px_rgba(7,26,47,0.07)] ${
                  index === t.groups.length - 1
                    ? "border-[#bdd8d3] bg-[#f4faf8] open:border-[#82b7b4]"
                    : "border-[#dce6e3] open:border-[#b9d7d2]"
                }`}
              >
                <summary className="focus-ring flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 marker:hidden sm:px-6 sm:py-5">
                  <span className="flex min-w-0 items-center gap-4">
                    <span className={`card-icon flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${
                      index === t.groups.length - 1
                        ? "bg-[#e7bd74] text-[#071a2f]"
                        : "bg-[#e8f2ef] text-[#0d6575]"
                    }`}>
                      <Icon aria-hidden="true" size={20} />
                    </span>
                    <span className="min-w-0">
                      <strong className="block text-base tracking-[-0.015em] text-[#102a43] sm:text-lg">{title}</strong>
                      <span className="mt-0.5 block text-xs text-[#7a8b91]">{items.length} {t.itemLabel}</span>
                    </span>
                  </span>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#d8e5e2] bg-[#f7faf9] text-[#0d6575] transition-transform duration-300 group-open:rotate-180">
                    <ChevronDown aria-hidden="true" size={18} />
                  </span>
                </summary>

                <div className="boat-spec-content border-t border-[#e3ebe9] bg-[#fbfdfc] px-5 py-5 sm:px-6 sm:py-6">
                  <ul className="grid gap-x-8 gap-y-3 text-sm leading-6 text-[#5e737c] sm:grid-cols-2">
                    {items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <BadgeCheck aria-hidden="true" size={16} className="mt-1 shrink-0 text-[#0d6575]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </details>
            ))}
          </div>
        </div>

        <p data-motion className="mt-6 rounded-[1.25rem] border border-[#cfe0dc] bg-[#edf5f2] px-5 py-4 text-sm font-semibold leading-6 text-[#34515d]">
          {t.note}
        </p>
      </div>
    </section>
  );
}

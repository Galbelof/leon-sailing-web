"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { fotosGaleria, Idioma, textos } from "../data";
import SectionLead from "./SectionLead";

export default function Galeria({ idioma }: { idioma: Idioma }) {
  const [fotoActiva, setFotoActiva] = useState<number | null>(null);
  const disparadores = useRef<Array<HTMLButtonElement | null>>([]);
  const cerrarRef = useRef<HTMLButtonElement>(null);
  const touchStartRef = useRef<number | null>(null);
  const t = textos[idioma];

  const cerrar = useCallback(() => {
    const indiceAnterior = fotoActiva;
    setFotoActiva(null);
    window.setTimeout(() => {
      if (indiceAnterior !== null) disparadores.current[indiceAnterior]?.focus();
    }, 0);
  }, [fotoActiva]);

  const anterior = useCallback(() => {
    setFotoActiva((indice) => (indice === null ? null : (indice - 1 + fotosGaleria.length) % fotosGaleria.length));
  }, []);

  const siguiente = useCallback(() => {
    setFotoActiva((indice) => (indice === null ? null : (indice + 1) % fotosGaleria.length));
  }, []);

  useEffect(() => {
    if (fotoActiva === null) return;

    const overflowAnterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    cerrarRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") cerrar();
      if (event.key === "ArrowLeft") anterior();
      if (event.key === "ArrowRight") siguiente();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = overflowAnterior;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [anterior, cerrar, fotoActiva, siguiente]);

  const tamanos = [
    "col-span-2 h-[280px] md:col-span-7 md:row-span-2 md:h-[596px]",
    "h-[190px] md:col-span-5 md:h-[290px]",
    "h-[190px] md:col-span-5 md:h-[290px]",
    "h-[190px] md:col-span-4 md:h-[280px]",
    "h-[190px] md:col-span-4 md:h-[280px]",
    "col-span-2 h-[220px] md:col-span-4 md:h-[280px]",
    "col-span-2 h-[250px] md:col-span-7 md:h-[360px]",
    "col-span-2 h-[250px] md:col-span-5 md:h-[360px]",
  ];

  return (
    <section id="barco" className="section-wake section-shell relative scroll-mt-24 bg-[#f2f6f5]">
      <div className="site-container">
        <div className="mb-10 grid gap-6 md:mb-14 md:grid-cols-[0.8fr_1.2fr] md:items-center">
          <div>
            <span className="eyebrow">{t.secGaleriaPre}</span>
            <h2 className="section-title mt-4">{t.secGaleriaTitulo}</h2>
          </div>
          <SectionLead className="md:justify-self-end">{t.secGaleriaDesc}</SectionLead>
        </div>

        <div data-motion="cascade" className="grid grid-cols-2 gap-3 md:grid-cols-12 md:gap-4">
          {fotosGaleria.map((foto, index) => (
            <button
              key={foto.src}
              ref={(elemento) => {
                disparadores.current[index] = elemento;
              }}
              type="button"
              onClick={() => setFotoActiva(index)}
              className={`gallery-tile focus-ring group relative overflow-hidden rounded-[1.5rem] bg-[#dce6e4] text-left ${tamanos[index]}`}
              aria-label={`${t.galeriaAbrir}: ${foto.alt[idioma]}`}
            >
              <Image
                src={foto.src}
                alt={foto.alt[idioma]}
                fill
                sizes={index === 0 ? "(min-width: 768px) 58vw, 100vw" : "(min-width: 768px) 42vw, 50vw"}
                className="gallery-image object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
              <span className="gallery-overlay absolute inset-0 bg-gradient-to-t from-[#071a2f]/80 via-transparent to-transparent" aria-hidden="true" />
              <span className="gallery-caption absolute bottom-3 left-3 right-3 flex items-end justify-between gap-3 text-left text-white sm:bottom-4 sm:left-4 sm:right-4">
                <span>
                  <span className="block text-[0.58rem] font-extrabold uppercase tracking-[0.18em] text-[#e7bd74] sm:text-[0.65rem]">{foto.tag[idioma]}</span>
                  <span className="mt-1 block text-sm font-bold leading-tight sm:text-base">{foto.label[idioma]}</span>
                </span>
                <span className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/95 text-[#071a2f] shadow-lg transition-transform group-hover:scale-105 sm:inline-flex" aria-hidden="true">
                  <Expand size={18} />
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>

      {fotoActiva !== null && (
        <div
          className="gallery-dialog fixed inset-0 z-[100] flex items-center justify-center bg-[#020b14]/95 p-4 backdrop-blur-md md:p-10"
          role="dialog"
          aria-modal="true"
          aria-label={fotosGaleria[fotoActiva].alt[idioma]}
          onMouseDown={(event) => {
            if (event.currentTarget === event.target) cerrar();
          }}
          onTouchStart={(event) => {
            touchStartRef.current = event.touches[0]?.clientX ?? null;
          }}
          onTouchEnd={(event) => {
            if (touchStartRef.current === null) return;
            const distance = (event.changedTouches[0]?.clientX ?? touchStartRef.current) - touchStartRef.current;
            touchStartRef.current = null;
            if (Math.abs(distance) < 45) return;
            if (distance > 0) anterior();
            else siguiente();
          }}
        >
          <button
            ref={cerrarRef}
            type="button"
            onClick={cerrar}
            className="focus-ring absolute right-4 top-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 md:right-8 md:top-8"
            aria-label={t.galeriaCerrar}
          >
            <X aria-hidden="true" size={24} />
          </button>

          <button
            type="button"
            onClick={anterior}
            className="gallery-nav gallery-nav-prev focus-ring absolute z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            aria-label={t.galeriaAnterior}
          >
            <ChevronLeft aria-hidden="true" size={28} />
          </button>

          <div className="gallery-dialog-media relative h-[78vh] w-[86vw] max-w-6xl">
            <Image
              src={fotosGaleria[fotoActiva].src}
              alt={fotosGaleria[fotoActiva].alt[idioma]}
              fill
              sizes="90vw"
              priority
              className="object-contain"
            />
          </div>

          <button
            type="button"
            onClick={siguiente}
            className="gallery-nav gallery-nav-next focus-ring absolute z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            aria-label={t.galeriaSiguiente}
          >
            <ChevronRight aria-hidden="true" size={28} />
          </button>

          <div className="absolute bottom-5 left-1/2 w-[80vw] -translate-x-1/2 text-center text-sm text-white/75">
            <p>{fotosGaleria[fotoActiva].label[idioma]}</p>
            <p className="mt-1 text-xs font-bold tracking-[0.14em] text-white/45">{fotoActiva + 1} / {fotosGaleria.length}</p>
          </div>
        </div>
      )}
    </section>
  );
}

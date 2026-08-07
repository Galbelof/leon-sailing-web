"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CalendarDays, Menu, MessageCircle, Volume2, VolumeX, X } from "lucide-react";
import { Idioma, telefonoWhatsApp, textos } from "../data";

type HeaderProps = {
  idioma: Idioma;
};

export default function Header({ idioma }: HeaderProps) {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [musicaActiva, setMusicaActiva] = useState(false);
  const [seccionActiva, setSeccionActiva] = useState("inicio");
  const [compacto, setCompacto] = useState(false);
  const [indicador, setIndicador] = useState({ left: 0, width: 0, visible: false });
  const audioRef = useRef<HTMLAudioElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const labelRefs = useRef<Record<string, HTMLSpanElement | null>>({});
  const t = textos[idioma];
  const whatsapp = `https://wa.me/${telefonoWhatsApp}?text=${encodeURIComponent(t.mensajeWa)}`;

  const alternarMusica = async () => {
    if (!audioRef.current) return;

    if (musicaActiva) {
      audioRef.current.pause();
      setMusicaActiva(false);
      return;
    }

    try {
      await audioRef.current.play();
      setMusicaActiva(true);
    } catch {
      setMusicaActiva(false);
    }
  };

  const links = [
    { href: "#inicio", label: t.navInicio },
    { href: "#precios", label: t.navPrecios },
    { href: "#reservas", label: t.navReservas },
    { href: "#barco", label: t.navBarco },
    { href: "#ruta", label: t.navRuta },
    { href: "#experiencia", label: t.navExperiencia },
    { href: "#patron", label: t.navPatron },
    { href: "#nosotros", label: t.navNosotros },
    { href: "#antes-de-zarpar", label: t.navGuia },
    { href: "#preguntas", label: t.navFaq },
  ];

  useEffect(() => {
    const sectionIds = ["inicio", "precios", "reservas", "barco", "ruta", "experiencia", "patron", "nosotros", "antes-de-zarpar", "preguntas"];
    let frame = 0;

    const actualizarSeccion = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const marker = window.scrollY + window.innerHeight * 0.32;
        let current = sectionIds[0];

        sectionIds.forEach((id) => {
          const section = document.getElementById(id);
          if (section && section.offsetTop <= marker) current = id;
        });

        setSeccionActiva((previous) => previous === current ? previous : current);
        setCompacto((previous) => {
          const next = window.scrollY > 56;
          return previous === next ? previous : next;
        });
      });
    };

    window.addEventListener("scroll", actualizarSeccion, { passive: true });
    window.addEventListener("resize", actualizarSeccion);
    const layoutObserver = new ResizeObserver(actualizarSeccion);
    layoutObserver.observe(document.body);
    const delayedUpdate = window.setTimeout(actualizarSeccion, 1400);
    actualizarSeccion();

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(delayedUpdate);
      layoutObserver.disconnect();
      window.removeEventListener("scroll", actualizarSeccion);
      window.removeEventListener("resize", actualizarSeccion);
    };
  }, []);

  useEffect(() => {
    const actualizarIndicador = () => {
      const nav = navRef.current;
      const link = linkRefs.current[seccionActiva];
      const label = labelRefs.current[seccionActiva];
      if (!nav || !link || !label || nav.offsetWidth === 0) {
        setIndicador((previous) => ({ ...previous, visible: false }));
        return;
      }
      const navBounds = nav.getBoundingClientRect();
      const labelBounds = label.getBoundingClientRect();
      setIndicador({ left: labelBounds.left - navBounds.left, width: labelBounds.width, visible: true });
    };

    const frame = requestAnimationFrame(actualizarIndicador);
    const delayedUpdate = window.setTimeout(actualizarIndicador, 380);
    const resizeObserver = new ResizeObserver(actualizarIndicador);
    if (navRef.current) resizeObserver.observe(navRef.current);
    const activeLink = linkRefs.current[seccionActiva];
    const activeLabel = labelRefs.current[seccionActiva];
    if (activeLink) resizeObserver.observe(activeLink);
    if (activeLabel) resizeObserver.observe(activeLabel);
    let cancelled = false;
    document.fonts?.ready.then(() => {
      if (!cancelled) actualizarIndicador();
    });
    window.addEventListener("resize", actualizarIndicador);
    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      window.clearTimeout(delayedUpdate);
      resizeObserver.disconnect();
      window.removeEventListener("resize", actualizarIndicador);
    };
  }, [compacto, idioma, seccionActiva]);

  const idiomas = [
    { id: "es" as const, src: "/es.png", label: "Español" },
    { id: "en" as const, src: "/en.png", label: "English" },
  ];

  return (
    <>
      <audio ref={audioRef} src="/musica.mp3" loop preload="none" />
      <header className={`site-header pointer-events-none fixed inset-x-0 top-0 z-50 px-3 text-white sm:px-4 ${compacto ? "is-compact pt-2" : "pt-3"}`}>
        <div className={`header-shell pointer-events-auto mx-auto flex w-full max-w-[1440px] items-center justify-between gap-3 rounded-[1.25rem] border px-4 backdrop-blur-2xl sm:px-6 lg:px-8 ${compacto ? "h-14 border-white/12 bg-[#071a2f]/95 shadow-[0_16px_45px_rgba(2,12,24,0.34)]" : "h-16 border-white/15 bg-[#071a2f]/62 shadow-[0_18px_60px_rgba(2,12,24,0.22)]"}`}>
          <Link href={`/${idioma}#inicio`} className="focus-ring shrink-0 rounded-md" aria-label="Leon Sailing Tenerife">
            <span className={`relative block transition-all duration-300 ${compacto ? "h-10 w-[78px]" : "h-12 w-[86px] sm:h-14 sm:w-[100px]"}`}>
              <Image
                src="/logo-oscuro.png"
                alt="Leon Sailing Tenerife"
                fill
                sizes="(min-width: 640px) 100px, 86px"
                priority
                className="object-contain brightness-0 invert"
              />
            </span>
          </Link>

          <nav ref={navRef} className="relative hidden flex-1 items-center justify-center gap-1 xl:flex" aria-label={idioma === "es" ? "Navegación principal" : "Main navigation"}>
            <span
              className="nav-active-indicator absolute bottom-0 left-0 h-0.5 rounded-full bg-[#e7bd74] shadow-[0_0_12px_rgba(231,189,116,0.65)]"
              style={{ width: indicador.width, transform: `translateX(${indicador.left}px)`, opacity: indicador.visible ? 1 : 0 }}
              aria-hidden="true"
            />
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                ref={(element) => { linkRefs.current[link.href.slice(1)] = element; }}
                className={`nav-link focus-ring relative rounded-full px-2.5 py-2 text-[0.69rem] font-bold transition-all 2xl:px-3 2xl:text-xs ${
                  seccionActiva === link.href.slice(1)
                    ? "bg-white/[0.08] text-[#e7bd74]"
                    : "text-white/70 hover:bg-white/[0.06] hover:text-white"
                }`}
                aria-current={seccionActiva === link.href.slice(1) ? "location" : undefined}
              >
                <span ref={(element) => { labelRefs.current[link.href.slice(1)] = element; }}>
                  {link.label}
                </span>
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={alternarMusica}
              className="focus-ring hidden h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/75 transition-colors hover:border-white/30 hover:text-white 2xl:flex"
              aria-label={musicaActiva ? t.musicaPausar : t.musicaActivar}
              aria-pressed={musicaActiva}
            >
              {musicaActiva ? <Volume2 aria-hidden="true" size={18} /> : <VolumeX aria-hidden="true" size={18} />}
            </button>

            <div className="flex items-center rounded-full border border-white/15 bg-white/[0.04] p-0.5" role="group" aria-label={t.idiomaLabel}>
              {idiomas.map((opcion) => (
                <a
                  key={opcion.id}
                  href={`/${opcion.id}`}
                  hrefLang={opcion.id === "es" ? "es-ES" : "en-GB"}
                  lang={opcion.id}
                  className={`focus-ring flex h-11 w-11 items-center justify-center rounded-full transition-all ${
                    idioma === opcion.id
                      ? "bg-white/15 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.18)]"
                      : "opacity-55 hover:bg-white/[0.07] hover:opacity-100"
                  }`}
                  aria-label={opcion.label}
                  aria-current={idioma === opcion.id ? "page" : undefined}
                  title={opcion.label}
                >
                  <span className={`relative block h-5 w-7 overflow-hidden rounded-[0.3rem] shadow-sm ring-1 ${idioma === opcion.id ? "ring-white/70" : "ring-white/25"}`} aria-hidden="true">
                    <Image src={opcion.src} alt="" fill sizes="28px" className="object-cover" />
                  </span>
                </a>
              ))}
            </div>

            <a
              href="#reservas"
              className="focus-ring header-reserve hidden h-11 items-center gap-2 rounded-full bg-[#e7bd74] px-4 text-sm font-bold text-[#071a2f] md:inline-flex xl:px-5"
              data-magnetic
            >
              <CalendarDays aria-hidden="true" size={18} />
              {t.headerReserve}
            </a>

            <button
              type="button"
              onClick={() => setMenuAbierto((abierto) => !abierto)}
              className="focus-ring flex h-11 w-11 items-center justify-center rounded-full border border-white/15 xl:hidden"
              aria-label={menuAbierto ? t.menuCerrar : t.menuAbrir}
              aria-expanded={menuAbierto}
              aria-controls="menu-movil"
            >
              {menuAbierto ? <X aria-hidden="true" size={21} /> : <Menu aria-hidden="true" size={21} />}
            </button>
          </div>
        </div>

        {menuAbierto && (
          <nav id="menu-movil" className="mobile-menu-enter pointer-events-auto mx-auto mt-2 max-h-[calc(100svh-6rem)] w-full max-w-[1440px] overflow-y-auto rounded-[1.25rem] border border-white/10 bg-[#071a2f]/95 p-3 shadow-[0_24px_70px_rgba(2,12,24,0.42)] backdrop-blur-2xl xl:hidden" aria-label={idioma === "es" ? "Navegación móvil" : "Mobile navigation"}>
            <div className="grid gap-1 sm:grid-cols-2">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuAbierto(false)}
                  className={`focus-ring flex items-center justify-between rounded-xl px-4 py-3 text-sm font-bold transition-colors ${
                    seccionActiva === link.href.slice(1)
                      ? "bg-white/10 text-[#e7bd74]"
                      : "text-white/75 hover:bg-white/[0.07] hover:text-white"
                  }`}
                  aria-current={seccionActiva === link.href.slice(1) ? "location" : undefined}
                >
                  {link.label}
                  {seccionActiva === link.href.slice(1) && <span className="h-2 w-2 rounded-full bg-[#e7bd74]" aria-hidden="true" />}
                </a>
              ))}
              <a
                href="#reservas"
                onClick={() => setMenuAbierto(false)}
                className="focus-ring mt-3 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#e7bd74] px-5 font-bold text-[#071a2f] sm:col-span-2"
              >
                <CalendarDays aria-hidden="true" size={19} />
                {t.reserveBandCalendar}
              </a>
              <a
                href={whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring mt-1 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.06] px-5 font-bold text-white sm:col-span-2"
              >
                <MessageCircle aria-hidden="true" size={19} />
                {t.btnWhatsapp}
              </a>
            </div>
          </nav>
        )}
      </header>
    </>
  );
}

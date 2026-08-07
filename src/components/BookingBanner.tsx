import { ArrowRight, CalendarDays, MessageCircle, Phone } from "lucide-react";
import { Idioma, telefonoFormateado, telefonoWhatsApp, textos } from "../data";

export default function BookingBanner({ idioma }: { idioma: Idioma }) {
  const t = textos[idioma];
  const whatsapp = `https://wa.me/${telefonoWhatsApp}?text=${encodeURIComponent(t.mensajeWa)}`;

  return (
    <section id="reserva-directa" className="section-wake relative scroll-mt-24 overflow-hidden bg-[#0b3548] pb-8 pt-16 text-[#071a2f] sm:pb-10 sm:pt-20">
      <div
        data-motion
        className="site-container relative overflow-hidden rounded-[2rem] bg-[#e7bd74] px-6 py-9 shadow-[0_28px_80px_rgba(0,0,0,0.2)] sm:px-10 sm:py-11 lg:grid lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12 lg:px-14"
      >
        <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full border-[48px] border-white/25" aria-hidden="true" />
        <div className="absolute bottom-0 right-[30%] h-32 w-32 translate-y-1/2 rounded-full bg-white/20 blur-2xl" aria-hidden="true" />

        <div className="relative max-w-3xl">
          <span className="text-xs font-black uppercase tracking-[0.22em] text-[#0d6575]">{t.reserveBandPre}</span>
          <h2 className="font-display mt-4 text-4xl font-semibold leading-[1.02] tracking-[-0.045em] sm:text-5xl lg:text-6xl">{t.reserveBandTitle}</h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-[#234550] sm:text-lg">{t.reserveBandDesc}</p>
        </div>

        <div className="relative mt-8 grid min-w-[280px] gap-3 lg:mt-0">
          <a href="#reservas" className="focus-ring booking-banner-primary group inline-flex min-h-14 items-center justify-between gap-4 rounded-full bg-[#071a2f] px-6 font-extrabold text-white shadow-[0_14px_35px_rgba(7,26,47,0.25)]">
            <span className="inline-flex items-center gap-3"><CalendarDays aria-hidden="true" size={20} />{t.reserveBandCalendar}</span>
            <ArrowRight aria-hidden="true" size={18} className="transition-transform group-hover:translate-x-1" />
          </a>
          <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="focus-ring inline-flex min-h-13 items-center justify-center gap-3 rounded-full bg-white/85 px-6 font-extrabold text-[#071a2f] transition-colors hover:bg-white">
            <MessageCircle aria-hidden="true" size={19} /> {t.reserveBandWhatsapp}
          </a>
          <a href={`tel:+${telefonoWhatsApp}`} className="focus-ring inline-flex items-center justify-center gap-2 rounded-full px-5 py-2 text-sm font-bold text-[#234550] hover:text-[#071a2f]">
            <Phone aria-hidden="true" size={16} /> {t.reserveBandCall} · {telefonoFormateado}
          </a>
        </div>
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import { Anchor, ArrowRight, Compass } from "lucide-react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Página no encontrada | Leon Sailing Tenerife",
  description: "La página solicitada no existe. Regresa a Leon Sailing Tenerife.",
  icons: {
    icon: [{ url: "/favicon-leon-original.png", type: "image/png" }],
  },
};

export default function GlobalNotFound() {
  return (
    <html lang="es" className="h-full antialiased">
      <body className="min-h-full bg-[#f7faf8] text-[#102a43]">
        <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 py-12">
          <div className="absolute inset-x-0 top-0 h-2 bg-[linear-gradient(90deg,#071a2f,#0d6575,#e7bd74,#0d6575,#071a2f)]" aria-hidden="true" />
          <div className="absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-[#a8d7d8]/25 blur-[90px]" aria-hidden="true" />
          <div className="absolute -right-24 bottom-1/4 h-72 w-72 rounded-full bg-[#e7bd74]/20 blur-[90px]" aria-hidden="true" />

          <section className="relative w-full max-w-3xl overflow-hidden rounded-[2rem] border border-[#d3e2de] bg-white p-7 text-center shadow-[0_30px_90px_rgba(7,26,47,0.13)] sm:p-12">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#071a2f] text-[#e7bd74]">
              <Compass aria-hidden="true" size={30} />
            </div>
            <p className="mt-7 text-xs font-extrabold uppercase tracking-[0.24em] text-[#0d6575]">Error 404</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-[#071a2f] sm:text-6xl">Esta ruta no lleva a puerto</h1>
            <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-[#5d737c] sm:text-lg">
              La página que buscas no existe o ha cambiado de dirección. Puedes volver al inicio o continuar hacia las reservas.
            </p>
            <p lang="en" className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[#71838a]">
              The page you are looking for does not exist or has moved. Return home or continue to bookings.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a href="/es" className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#071a2f] px-6 text-sm font-extrabold text-white transition-transform hover:-translate-y-0.5">
                <Anchor aria-hidden="true" size={17} /> Inicio en español
              </a>
              <a href="/en" lang="en" className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#c9dcd8] bg-[#eef5f3] px-6 text-sm font-extrabold text-[#0d6575] transition-transform hover:-translate-y-0.5">
                English home <ArrowRight aria-hidden="true" size={17} />
              </a>
              <a href="/es#reservas" className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#e7bd74] px-6 text-sm font-extrabold text-[#071a2f] transition-transform hover:-translate-y-0.5">
                Reservar <ArrowRight aria-hidden="true" size={17} />
              </a>
            </div>
          </section>
        </main>
      </body>
    </html>
  );
}

"use client";

import Image from "next/image";
import { Camera, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import type { Idioma } from "../data";

const SNAPSHOT_URL = "/api/webcam";
const REFRESH_INTERVAL = 5 * 60 * 1000;

export default function LiveWebcamCard({ idioma }: { idioma: Idioma }) {
  const [snapshotVersion, setSnapshotVersion] = useState("");
  const [imageError, setImageError] = useState(false);

  const t = idioma === "es"
    ? {
        eyebrow: "El puerto en este momento",
        title: "Marina del Sur, ahora",
        description: "Consulta un fotograma reciente del puerto antes de venir. Skyline genera una nueva imagen aproximadamente cada cinco minutos.",
        badge: "Fotograma reciente",
        live: "Ver cámara en directo",
        source: "Imagen facilitada por SkylineWebcams",
        alt: "Fotograma actualizado de Marina del Sur y Las Galletas",
        unavailable: "El fotograma no está disponible ahora mismo. Puedes abrir la cámara en directo en SkylineWebcams.",
        openImage: "Abrir la cámara en directo de Marina del Sur",
      }
    : {
        eyebrow: "The marina right now",
        title: "Marina del Sur, now",
        description: "See a recent view of the marina before you arrive. Skyline generates a new image approximately every five minutes.",
        badge: "Recent snapshot",
        live: "View the live webcam",
        source: "Image provided by SkylineWebcams",
        alt: "Updated snapshot of Marina del Sur and Las Galletas",
        unavailable: "The snapshot is currently unavailable. You can open the live webcam on SkylineWebcams.",
        openImage: "Open the Marina del Sur live webcam",
      };

  const liveUrl = `https://www.skylinewebcams.com/${idioma}/webcam/espana/canarias/santa-cruz-de-tenerife/las-galletas.html`;
  const snapshotUrl = snapshotVersion ? `${SNAPSHOT_URL}?refresh=${snapshotVersion}` : SNAPSHOT_URL;

  useEffect(() => {
    const interval = window.setInterval(() => {
      setImageError(false);
      setSnapshotVersion(String(Date.now()));
    }, REFRESH_INTERVAL);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <article data-motion="zoom-soft" className="mt-4 grid w-full overflow-hidden rounded-[1.75rem] border border-[#d6e3e0] bg-white shadow-[0_22px_60px_rgba(7,26,47,0.09)] lg:grid-cols-[1.15fr_0.85fr]">
      <a
        href={liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t.openImage}
        className="focus-ring group relative block min-h-[300px] overflow-hidden bg-[#dfe9e6] sm:min-h-[420px] lg:min-h-[480px]"
      >
        <Image
          src={imageError ? "/media/tenerife/marina-del-sur-las-galletas.webp" : snapshotUrl}
          alt={t.alt}
          fill
          unoptimized
          loading="lazy"
          sizes="(min-width: 1024px) 58vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.015]"
          onError={() => setImageError(true)}
        />
        <span className="absolute inset-0 bg-gradient-to-t from-[#071a2f]/75 via-transparent to-transparent" aria-hidden="true" />
        <span className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-[#071a2f]/65 px-3 py-2 text-[0.65rem] font-extrabold uppercase tracking-[0.16em] text-white backdrop-blur-md sm:left-7 sm:top-7">
          <span className="h-2 w-2 rounded-full bg-[#e7bd74] shadow-[0_0_12px_#e7bd74]" aria-hidden="true" />
          {t.badge}
        </span>
        <span className="absolute bottom-5 left-5 right-5 text-xs font-semibold text-white/75 sm:bottom-7 sm:left-7 sm:right-7">
          {t.source}
        </span>
      </a>

      <div className="flex flex-col justify-center p-7 sm:p-9 lg:p-12">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#e8f2ef] text-[#0d6575]">
          <Camera aria-hidden="true" size={22} />
        </span>
        <p className="mt-7 text-xs font-extrabold uppercase tracking-[0.2em] text-[#0d6575]">{t.eyebrow}</p>
        <h3 className="mt-3 text-3xl font-semibold leading-tight tracking-[-0.035em] text-[#102a43] sm:text-4xl">{t.title}</h3>
        <p className="mt-5 text-sm leading-7 text-[#5d737c] sm:text-base">{imageError ? t.unavailable : t.description}</p>

        <div className="mt-7">
          <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#e7bd74] px-4 text-sm font-extrabold text-[#071a2f] transition-transform hover:-translate-y-0.5">
            {t.live} <ExternalLink aria-hidden="true" size={17} />
          </a>
        </div>
      </div>
    </article>
  );
}

"use client";

import Image from "next/image";
import { Pause, Play, Video } from "lucide-react";
import { useRef, useState } from "react";
import { Idioma, textos } from "../data";

export default function VideoShowcase({ idioma }: { idioma: Idioma }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reproduciendo, setReproduciendo] = useState(false);
  const t = textos[idioma];

  const alternarVideo = async () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      try {
        if (video.readyState === HTMLMediaElement.HAVE_NOTHING) video.load();
        await video.play();
      } catch {
        setReproduciendo(false);
      }
    } else {
      video.pause();
    }
  };

  return (
    <section id="video" className="section-wake relative bg-[#071a2f] py-16 text-white sm:py-20" aria-labelledby="video-title">
      <div data-motion="zoom-soft" className="site-container grid overflow-hidden rounded-[2rem] border border-white/10 bg-[#0b3548] shadow-[0_30px_90px_rgba(2,18,30,0.34)] lg:grid-cols-[1.35fr_0.65fr]">
        <div className="relative min-h-[320px] overflow-hidden sm:min-h-[480px] lg:min-h-[620px]">
          <Image
            src="/media/leon/leon-sailing-tenerife.jpg"
            alt=""
            fill
            sizes="(min-width: 1024px) 68vw, 100vw"
            className="object-cover"
            aria-hidden="true"
          />
          <video
            ref={videoRef}
            loop
            muted
            playsInline
            preload="none"
            poster="/media/leon/leon-sailing-tenerife.jpg"
            className="absolute inset-0 h-full w-full object-cover"
            onPlay={() => setReproduciendo(true)}
            onPause={() => setReproduciendo(false)}
            aria-label={t.videoNote}
          >
            <source src="/media/leon/leon-drone-sailing.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-[#03121f]/65 via-transparent to-[#03121f]/15" aria-hidden="true" />
          <span className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-[#03121f]/45 px-3 py-2 text-[0.66rem] font-bold uppercase tracking-[0.16em] text-white/85 backdrop-blur-md sm:left-7 sm:top-7">
            <Video aria-hidden="true" size={15} className="text-[#e7bd74]" />
            {t.videoNote}
          </span>
          <button
            type="button"
            onClick={alternarVideo}
            className="focus-ring absolute bottom-5 left-5 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/95 text-[#071a2f] shadow-xl transition-transform hover:scale-105 sm:bottom-7 sm:left-7"
            aria-label={reproduciendo ? t.videoPause : t.videoPlay}
          >
            {reproduciendo ? <Pause aria-hidden="true" size={19} /> : <Play aria-hidden="true" size={19} className="ml-0.5" />}
          </button>
        </div>

        <div className="relative flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-14">
          <span className="absolute right-6 top-5 font-serif text-7xl italic text-white/[0.06] sm:right-10 sm:top-7 sm:text-8xl" aria-hidden="true">12m</span>
          <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#e7bd74]">{t.videoPre}</span>
          <h2 id="video-title" className="font-display mt-5 text-4xl font-semibold leading-[1.05] tracking-[-0.045em] sm:text-5xl">{t.videoTitle}</h2>
          <p className="mt-6 text-base leading-7 text-white/70">{t.videoDesc}</p>
          <div className="mt-9 h-px w-16 bg-[#a8d7d8]/55" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}

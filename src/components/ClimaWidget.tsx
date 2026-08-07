"use client";

import { CloudSun, MapPin, RefreshCw, Thermometer, Wind } from "lucide-react";
import { useEffect, useState } from "react";
import { Idioma } from "../data";

interface WeatherData {
  temp: number;
  wind: number;
  code: number;
  time: string;
}

interface WeatherCache {
  weather: WeatherData;
  savedAt: number;
}

const CACHE_KEY = "leon-weather-cache";
const CACHE_MAX_AGE = 2 * 60 * 60 * 1000;

function isWeatherData(value: unknown): value is WeatherData {
  if (!value || typeof value !== "object") return false;
  const item = value as Partial<WeatherData>;
  return (
    typeof item.temp === "number" &&
    typeof item.wind === "number" &&
    typeof item.code === "number" &&
    typeof item.time === "string"
  );
}

async function fetchJson(url: string, signal: AbortSignal) {
  const response = await fetch(url, { signal, cache: "no-store" });
  if (!response.ok) throw new Error("Weather request failed");
  return response.json();
}

async function loadWeather(signal: AbortSignal): Promise<WeatherData> {
  const internal = await fetchJson("/api/clima", signal);
  if (!isWeatherData(internal?.weather)) throw new Error("Weather data unavailable");
  return internal.weather;
}

function readCachedWeather(): WeatherData | null {
  try {
    const cached = JSON.parse(sessionStorage.getItem(CACHE_KEY) ?? "null") as WeatherCache | null;
    if (cached && Date.now() - cached.savedAt < CACHE_MAX_AGE && isWeatherData(cached.weather)) {
      return cached.weather;
    }
  } catch {
    // Ignora datos guardados no válidos.
  }
  return null;
}

export default function ClimaWidget({ idioma }: { idioma: Idioma }) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState(false);
  const [cached, setCached] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    let active = true;
    const timeout = window.setTimeout(() => controller.abort(), 10000);

    loadWeather(controller.signal)
      .then((nextWeather) => {
        if (!active) return;
        setWeather(nextWeather);
        setCached(false);
        setError(false);
        try {
          sessionStorage.setItem(CACHE_KEY, JSON.stringify({ weather: nextWeather, savedAt: Date.now() }));
        } catch {
          // El almacenamiento puede estar desactivado.
        }
      })
      .catch(() => {
        if (!active) return;
        const stored = readCachedWeather();
        if (stored) {
          setWeather(stored);
          setCached(true);
          setError(false);
        } else {
          setError(true);
        }
      })
      .finally(() => window.clearTimeout(timeout));

    return () => {
      active = false;
      controller.abort();
      window.clearTimeout(timeout);
    };
  }, [attempt]);

  const retry = () => {
    setError(false);
    setWeather(null);
    setCached(false);
    setAttempt((value) => value + 1);
  };

  const status = (code: number) => {
    if (code === 0) return idioma === "es" ? "Cielo despejado" : "Clear sky";
    if (code >= 1 && code <= 3) return idioma === "es" ? "Intervalos nubosos" : "Partly cloudy";
    if (code >= 45 && code <= 48) return idioma === "es" ? "Bruma" : "Misty";
    if (code >= 51 && code <= 82) return idioma === "es" ? "Posibilidad de lluvia" : "Chance of rain";
    if (code >= 95) return idioma === "es" ? "Tormenta" : "Thunderstorm";
    return idioma === "es" ? "Condiciones variables" : "Variable conditions";
  };

  if (error) {
    return (
      <div data-motion className="rounded-[1.75rem] border border-[#d9e3e1] bg-white p-6 shadow-[0_20px_60px_rgba(7,26,47,0.06)]" aria-live="polite">
        <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#eef4f3] text-[#0d5f73]">
          <CloudSun aria-hidden="true" size={21} />
        </div>
        <p className="font-semibold text-[#102a43]">
          {idioma === "es" ? "No hemos podido actualizar el tiempo" : "We could not update the weather"}
        </p>
        <p className="mt-2 text-sm leading-6 text-[#667782]">
          {idioma === "es" ? "Puedes intentarlo de nuevo. Antes de cada salida confirmamos personalmente las condiciones reales de navegación." : "You can try again. Before every departure, we personally confirm the actual sailing conditions."}
        </p>
        <button type="button" onClick={retry} className="focus-ring mt-5 inline-flex items-center gap-2 rounded-full bg-[#071a2f] px-4 py-2.5 text-sm font-extrabold text-white transition-transform hover:-translate-y-0.5">
          <RefreshCw aria-hidden="true" size={16} /> {idioma === "es" ? "Reintentar" : "Try again"}
        </button>
      </div>
    );
  }

  if (!weather) {
    return (
      <div data-motion className="min-h-[250px] rounded-[1.75rem] border border-[#d9e3e1] bg-[#0b3548] p-7" aria-live="polite" aria-label={idioma === "es" ? "Cargando el tiempo" : "Loading weather"}>
        <div className="h-4 w-44 animate-pulse rounded bg-white/15" />
        <div className="mt-8 h-20 w-40 animate-pulse rounded-2xl bg-white/10" />
        <div className="mt-7 h-12 w-full animate-pulse rounded-xl bg-white/[0.07]" />
      </div>
    );
  }

  return (
    <div data-motion className="relative overflow-hidden rounded-[1.75rem] border border-white/15 bg-[linear-gradient(135deg,#071a2f_0%,#0b5263_58%,#168095_100%)] p-6 text-white shadow-[0_28px_80px_rgba(7,26,47,0.22)] sm:p-8" aria-live="polite">
      <div className="absolute -right-16 -top-20 h-56 w-56 rounded-full bg-[#f3b35f]/25 blur-2xl" aria-hidden="true" />
      <div className="absolute right-7 top-7 h-24 w-24 rounded-full border-[18px] border-white/[0.06]" aria-hidden="true" />

      <div className="relative flex items-start justify-between gap-4">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.08] px-3 py-2 text-[0.66rem] font-extrabold uppercase tracking-[0.16em] text-[#e7bd74]">
            <span className="h-2 w-2 rounded-full bg-[#e7bd74] shadow-[0_0_12px_#e7bd74]" aria-hidden="true" />
            {cached
              ? idioma === "es" ? "Último dato disponible" : "Latest available reading"
              : idioma === "es" ? "Ahora en Marina del Sur" : "Now at Marina del Sur"}
          </p>
          <p className="mt-5 text-lg font-semibold text-white/85">{status(weather.code)}</p>
        </div>
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 text-[#ffc774] backdrop-blur-sm">
          <CloudSun aria-hidden="true" size={29} />
        </span>
      </div>

      <div className="relative mt-5 flex items-end gap-2">
        <Thermometer aria-hidden="true" size={28} className="mb-3 text-[#a8d7d8]" />
        <strong className="text-[clamp(4.8rem,12vw,7rem)] font-semibold leading-[0.8] tracking-[-0.07em]">{Math.round(weather.temp)}°</strong>
        <span className="mb-2 text-2xl font-bold text-white/60">C</span>
      </div>

      <div className="relative mt-8 grid gap-3 sm:grid-cols-2">
        <div className="rounded-[1.1rem] border border-white/10 bg-white/[0.08] p-4 backdrop-blur-sm">
          <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-white/50"><Wind aria-hidden="true" size={15} />{idioma === "es" ? "Viento" : "Wind"}</span>
          <p className="mt-2 text-2xl font-bold">{Math.round(weather.wind)} <span className="text-sm font-semibold text-white/55">{idioma === "es" ? "nudos" : "knots"}</span></p>
        </div>
        <div className="rounded-[1.1rem] border border-white/10 bg-white/[0.08] p-4 backdrop-blur-sm">
          <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-white/50"><MapPin aria-hidden="true" size={15} />{idioma === "es" ? "Ubicación" : "Location"}</span>
          <p className="mt-2 text-base font-bold">Las Galletas · Tenerife</p>
        </div>
      </div>

      <div className="relative mt-5 flex flex-wrap items-center justify-between gap-3 text-[0.68rem] leading-5 text-white/45">
        <p>Open-Meteo · {idioma === "es" ? "Dato orientativo" : "Indicative reading"} · {weather.time.slice(11, 16)}</p>
        {cached && (
          <button type="button" onClick={retry} className="focus-ring inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5 font-bold text-white/70 transition-colors hover:bg-white/10 hover:text-white">
            <RefreshCw aria-hidden="true" size={12} /> {idioma === "es" ? "Actualizar" : "Refresh"}
          </button>
        )}
      </div>
    </div>
  );
}

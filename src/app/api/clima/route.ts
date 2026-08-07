import { NextResponse } from "next/server";

const OPEN_METEO_URL =
  "https://api.open-meteo.com/v1/forecast?latitude=28.0069&longitude=-16.6586&current=temperature_2m,weather_code,wind_speed_10m&wind_speed_unit=kn&timezone=Atlantic%2FCanary&forecast_days=1";

export const revalidate = 900;

export async function GET() {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 7000);

  try {
    const response = await fetch(OPEN_METEO_URL, {
      signal: controller.signal,
      headers: { Accept: "application/json" },
      next: { revalidate: 900 },
    });

    if (!response.ok) throw new Error(`Open-Meteo responded with ${response.status}`);
    const data = await response.json();
    const current = data?.current;

    if (
      typeof current?.temperature_2m !== "number" ||
      typeof current?.wind_speed_10m !== "number" ||
      typeof current?.weather_code !== "number" ||
      typeof current?.time !== "string"
    ) {
      throw new Error("Open-Meteo returned incomplete data");
    }

    return NextResponse.json(
      {
        success: true,
        weather: {
          temp: current.temperature_2m,
          wind: current.wind_speed_10m,
          code: current.weather_code,
          time: current.time,
        },
      },
      { headers: { "Cache-Control": "public, s-maxage=900, stale-while-revalidate=1800" } },
    );
  } catch {
    return NextResponse.json(
      { success: false, error: "Weather temporarily unavailable" },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  } finally {
    clearTimeout(timeout);
  }
}

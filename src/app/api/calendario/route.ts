import { NextResponse } from "next/server";
import ical, { type VEvent } from "node-ical";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const CALENDAR_TIME_ZONE = "Atlantic/Canary";
const recurrenceRange = () => {
  const now = new Date();
  const from = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - 1, 1));
  const to = new Date(Date.UTC(now.getUTCFullYear() + 5, now.getUTCMonth() + 1, 1));
  return { from, to };
};

export async function GET() {
  const url = process.env.GOOGLE_CALENDAR_ICAL_URL;

  if (!url) {
    return NextResponse.json(
      { success: false, bookedDates: [], error: "Calendar is not configured" },
      { status: 503 }
    );
  }

  try {
    const response = await fetch(url, {
      next: { revalidate: 300 },
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) {
      throw new Error(`Calendar upstream returned ${response.status}`);
    }

    const icsData = await response.text();
    if (!icsData.includes("BEGIN:VCALENDAR")) {
      throw new Error("Calendar upstream returned invalid data");
    }

    const calendar = await ical.async.parseICS(icsData);
    const bookedDates = new Set<string>();
    const range = recurrenceRange();

    for (const component of Object.values(calendar)) {
      if (!component || component.type !== "VEVENT") continue;
      const event = component as VEvent;
      if (event.status === "CANCELLED") continue;

      if (event.rrule) {
        const instances = ical.expandRecurringEvent(event, {
          ...range,
          includeOverrides: true,
          excludeExdates: true,
          expandOngoing: true,
        });

        instances.forEach((instance) => {
          if (instance.event.status !== "CANCELLED") {
            addBookedRange(bookedDates, instance.start, instance.end);
          }
        });
      } else {
        addBookedRange(
          bookedDates,
          event.start,
          event.end ?? event.start,
        );
      }
    }

    return NextResponse.json(
      { success: true, bookedDates: Array.from(bookedDates).sort() },
      { headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" } },
    );
  } catch (error) {
    console.error("No se pudo cargar la disponibilidad:", error instanceof Error ? error.message : "Error desconocido");
    return NextResponse.json(
      { success: false, bookedDates: [], error: "Availability temporarily unavailable" },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }
}

function formatCalendarDate(date: Date) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: CALENDAR_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const year = parts.find((part) => part.type === "year")?.value;
  const month = parts.find((part) => part.type === "month")?.value;
  const day = parts.find((part) => part.type === "day")?.value;

  if (!year || !month || !day) throw new Error("Fecha de calendario no válida");
  return `${year}-${month}-${day}`;
}

function nextCalendarDate(value: string) {
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day + 1));
  return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}-${String(date.getUTCDate()).padStart(2, "0")}`;
}

function addBookedRange(target: Set<string>, start: Date, end: Date) {
  if (!(start instanceof Date) || Number.isNaN(start.getTime())) return;

  const safeEnd = end instanceof Date && end.getTime() > start.getTime()
    ? end
    : new Date(start.getTime() + 1);
  const firstDate = formatCalendarDate(start);
  const lastDate = formatCalendarDate(new Date(safeEnd.getTime() - 1));

  let currentDate = firstDate;
  while (currentDate <= lastDate) {
    target.add(currentDate);
    currentDate = nextCalendarDate(currentDate);
  }
}

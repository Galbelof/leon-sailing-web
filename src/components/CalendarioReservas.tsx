"use client";

import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Mail,
  MessageCircle,
  RefreshCw,
  Sparkles,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { emailContactobarco, Idioma, telefonoWhatsApp } from "../data";

interface CalendarioProps {
  idioma: Idioma;
}

type EstadoCarga = "loading" | "ready" | "error";
type PasoReserva = 1 | 2 | 3 | 4;

type ExtraId =
  | "tender"
  | "beachTowels"
  | "sup"
  | "fishing"
  | "snorkel"
  | "provisioning"
  | "earlyCheckIn"
  | "petCleaning"
  | "gennaker"
  | "wifi";

type ExtraDefinition = {
  id: ExtraId;
  price: number;
  billing: "week" | "personWeek" | "rental";
};

const extraDefinitions: ExtraDefinition[] = [
  { id: "tender", price: 150, billing: "week" },
  { id: "beachTowels", price: 5, billing: "personWeek" },
  { id: "sup", price: 100, billing: "week" },
  { id: "fishing", price: 150, billing: "week" },
  { id: "snorkel", price: 20, billing: "week" },
  { id: "provisioning", price: 25, billing: "rental" },
  { id: "earlyCheckIn", price: 150, billing: "rental" },
  { id: "petCleaning", price: 100, billing: "rental" },
  { id: "gennaker", price: 300, billing: "week" },
  { id: "wifi", price: 100, billing: "week" },
];

type Formulario = {
  nombre: string;
  personas: string;
  duracion: string;
  dias: string;
  patron: string;
  extras: ExtraId[];
  ocasion: string;
  contacto: string;
};

const initialForm: Formulario = {
  nombre: "",
  personas: "",
  duracion: "excursion",
  dias: "3",
  patron: "capitan",
  extras: [],
  ocasion: "",
  contacto: "",
};

export default function CalendarioReservas({ idioma }: CalendarioProps) {
  const [currentDate, setCurrentDate] = useState(() => new Date());
  const [bookedDates, setBookedDates] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [estado, setEstado] = useState<EstadoCarga>("loading");
  const [intento, setIntento] = useState(0);
  const [formulario, setFormulario] = useState<Formulario>(initialForm);
  const [validationError, setValidationError] = useState("");
  const [pasoReserva, setPasoReserva] = useState<PasoReserva>(1);

  useEffect(() => {
    let activo = true;

    const cargar = async () => {
      try {
        const response = await fetch("/api/calendario");
        const data = await response.json();

        if (!response.ok || data.success !== true || !Array.isArray(data.bookedDates)) {
          throw new Error("Availability unavailable");
        }

        if (activo) {
          setBookedDates(data.bookedDates);
          setEstado("ready");
        }
      } catch {
        if (activo) setEstado("error");
      }
    };

    cargar();
    return () => {
      activo = false;
    };
  }, [intento]);

  const t = idioma === "es"
    ? {
        titulo: "Disponibilidad de Leon",
        subtitulo: "Primero elige el servicio y después consulta las fechas compatibles",
        dias: ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"],
        meses: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
        anterior: "Mes anterior",
        siguiente: "Mes siguiente",
        disponible: "Disponible",
        availableStart: "Inicio disponible",
        ocupado: "No disponible",
        hoyNoDisponible: "Hoy no disponible",
        pasado: "Fecha pasada",
        seleccionado: "Seleccionada",
        consultar: "Fecha elegida",
        pasos: ["Servicio", "Fecha", "Detalles", "Contacto"],
        serviceStepTitle: "¿Qué queréis reservar?",
        serviceStepDesc: "El calendario se adaptará al servicio y a la duración elegida.",
        showAvailability: "Ver fechas disponibles",
        calendarStepTitle: "Elegid la fecha de inicio",
        calendarSingleHelp: "Selecciona cualquier día disponible para la salida.",
        calendarRentalHelp: "Los días en naranja pueden estar libres, pero no sirven como inicio porque el alquiler coincidiría con otra reserva.",
        cambiarFecha: "Cambiar fecha",
        continuar: "Continuar al contacto",
        volver: "Volver",
        cargando: "Consultando disponibilidad…",
        errorTitulo: "La disponibilidad no está visible ahora",
        errorDesc: "Preferimos no mostrar fechas desactualizadas. Escríbenos y comprobaremos personalmente la mejor opción para vosotros.",
        reintentar: "Actualizar calendario",
        consultaDirecta: "Consultar directamente",
        aviso: "La solicitud no confirma la reserva. Recibirás personalmente disponibilidad, propuesta y precio.",
        formTitle: "Diseñemos vuestra salida",
        formDesc: "Estos datos preparan un mensaje completo para que podamos responder con una propuesta útil desde el primer contacto.",
        nombre: "Nombre",
        nombrePlaceholder: "¿Cómo podemos llamarte?",
        personas: "Número de personas",
        personasPlaceholder: "Ej. 4",
        excursionCapacity: "Máximo 8 pasajeros, además del patrón.",
        rentalCapacity: "Hasta 6 clientes en alquiler sin patrón: son las plazas disponibles para dormir.",
        excursionCapacityError: "La excursión admite un máximo de 8 pasajeros, además del patrón.",
        rentalCapacityError: "El alquiler admite un máximo de 6 clientes.",
        duracion: "Tipo de servicio",
        patron: "Opción de patrón",
        patronAyuda: "El alquiler puede realizarse con patrón o sin patrón si cuentas con la experiencia y titulación necesarias.",
        excursionSkipper: "La excursión privada de 6 horas se realiza siempre con capitán.",
        instructionSkipper: "El día de instrucción se realiza con el instructor a bordo.",
        rentalDaysLabel: "Número de días",
        diasAyuda: "El alquiler mínimo es de 3 días.",
        daysRequired: "El alquiler debe ser de al menos 3 días.",
        periodUnavailable: "Libre, pero no válido como inicio",
        includedRentalDay: "Incluido en el alquiler",
        selectedPeriod: "Periodo completo elegido",
        confirmDates: "Continuar con estas fechas",
        rentalConflictTitle: "El periodo completo no está disponible.",
        rentalConflictDates: "Fechas ocupadas dentro del alquiler:",
        rentalPriceBlocked: "Selecciona una fecha de inicio que permita completar todos los días del alquiler para calcular el total.",
        ocasion: "Celebración o detalles especiales",
        ocasionPlaceholder: "Cumpleaños, pedida, niños a bordo, preferencias…",
        contacto: "Teléfono o email alternativo (opcional)",
        contactoPlaceholder: "Solo si prefieres otra vía de respuesta",
        required: "Indica cuántas personas seréis para continuar.",
        privacy: "Nada se envía todavía: podrás revisar el mensaje antes de enviarlo en WhatsApp.",
        contactTitle: "Último paso: abre la consulta en WhatsApp",
        contactDesc: "Prepararemos automáticamente un mensaje con la fecha, el servicio, las personas, los extras y el precio calculado.",
        btnWa: "Continuar por WhatsApp",
        btnEm: "Prefiero enviarlo por email",
        priceTitle: "Resumen del precio",
        excursionLine: "Excursión privada de 6 horas",
        instructionLine: "Día de instrucción",
        rentalLine: "Alquiler del velero",
        skipperLine: "Patrón",
        mandatoryLine: "Limpieza, ropa de cama, toallas y tasas",
        extrasTitle: "Complementos opcionales",
        extrasHelp: "Los servicios semanales se calculan por cada semana iniciada. Los complementos por persona se actualizarán al indicar el número de viajeros.",
        extrasSelected: "Complementos seleccionados",
        noExtras: "Ninguno",
        pendingGuests: "Indica las personas",
        extraLabels: {
          tender: "Tender y motor fueraborda",
          beachTowels: "Toallas de playa",
          sup: "SUP",
          fishing: "Equipo de pesca",
          snorkel: "Equipo de snorkel",
          provisioning: "Aprovisionamiento",
          earlyCheckIn: "Entrada anticipada",
          petCleaning: "Limpieza adicional por mascota",
          gennaker: "Gennaker",
          wifi: "Wi-Fi ilimitado",
        },
        extraPrices: {
          tender: "150 €/semana",
          beachTowels: "5 €/persona/semana",
          sup: "100 €/semana",
          fishing: "150 €/semana",
          snorkel: "20 €/semana",
          provisioning: "25 €/alquiler",
          earlyCheckIn: "150 €",
          petCleaning: "100 €/alquiler",
          gennaker: "300 €/semana · fianza adicional de 500 €",
          wifi: "100 €/semana",
        },
        totalLabel: "Total de la reserva",
        taxIncluded: "Precios publicados con IGIC incluido",
        rentalPriceNote: "El total incluye los complementos seleccionados y el canon de pasajeros. No incluye combustible ni las fianzas reembolsables de 2.500 € y 500 € si se solicita el gennaker.",
        excursionPriceNote: "Incluye capitán, almuerzo, fondeo, equipo de snorkel, seguro, canon de pasajeros e IGIC.",
        groupPriceNote: "Precio publicado para el grupo, con canon de pasajeros e IGIC incluidos.",
        durations: {
          excursion: "Excursión privada · 6 horas · 600 €",
          alquiler: "Alquiler · mínimo 3 días · 270 €/día",
          instruccion: "Día de instrucción · 9:00–17:00 · 200 €",
        },
        captainOptions: {
          capitan: "Con el capitán de Leon o un patrón designado",
          experiencia: "Sin patrón: tengo experiencia y titulación",
        },
      }
    : {
        titulo: "Leon availability",
        subtitulo: "Choose the service first, then check the dates that fit",
        dias: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        meses: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        anterior: "Previous month",
        siguiente: "Next month",
        disponible: "Available",
        availableStart: "Available start date",
        ocupado: "Unavailable",
        hoyNoDisponible: "Today unavailable",
        pasado: "Past date",
        seleccionado: "Selected",
        consultar: "Selected date",
        pasos: ["Service", "Date", "Details", "Contact"],
        serviceStepTitle: "What would you like to book?",
        serviceStepDesc: "The calendar will adapt to the service and duration you choose.",
        showAvailability: "View available dates",
        calendarStepTitle: "Choose the start date",
        calendarSingleHelp: "Select any available day for your experience.",
        calendarRentalHelp: "Orange dates may be free, but they cannot be used as a start because the rental would overlap another booking.",
        cambiarFecha: "Change date",
        continuar: "Continue to contact",
        volver: "Back",
        cargando: "Checking availability…",
        errorTitulo: "Availability is not visible right now",
        errorDesc: "We would rather not show outdated dates. Send us a message and we will personally check the best option for your group.",
        reintentar: "Refresh calendar",
        consultaDirecta: "Enquire directly",
        aviso: "Your enquiry does not confirm a booking. We will personally reply with availability, a proposal and price.",
        formTitle: "Let us shape your time aboard",
        formDesc: "These details create a complete message so we can reply with a useful proposal from the very first contact.",
        nombre: "Name",
        nombrePlaceholder: "What should we call you?",
        personas: "Number of guests",
        personasPlaceholder: "E.g. 4",
        excursionCapacity: "Maximum of 8 passengers, plus the captain.",
        rentalCapacity: "Up to 6 guests on a bareboat rental: these are the available sleeping berths.",
        excursionCapacityError: "The excursion allows a maximum of 8 passengers, plus the captain.",
        rentalCapacityError: "The rental allows a maximum of 6 guests.",
        duracion: "Service type",
        patron: "Skipper option",
        patronAyuda: "The yacht may be hired with a skipper or without one if you have the required experience and qualifications.",
        excursionSkipper: "The private 6-hour excursion always takes place with a captain.",
        instructionSkipper: "The training day takes place with the instructor aboard.",
        rentalDaysLabel: "Number of days",
        diasAyuda: "The minimum rental period is 3 days.",
        daysRequired: "The rental must be for at least 3 days.",
        periodUnavailable: "Free, but not valid as a start date",
        includedRentalDay: "Included in the rental",
        selectedPeriod: "Complete period selected",
        confirmDates: "Continue with these dates",
        rentalConflictTitle: "The full rental period is not available.",
        rentalConflictDates: "Unavailable dates within the rental:",
        rentalPriceBlocked: "Choose a start date that keeps every day of the rental available to calculate the total.",
        ocasion: "Celebration or special details",
        ocasionPlaceholder: "Birthday, proposal, children on board, preferences…",
        contacto: "Alternative phone or email (optional)",
        contactoPlaceholder: "Only if you prefer another reply method",
        required: "Please enter your group size to continue.",
        privacy: "Nothing is sent yet: you can review the message before sending it in WhatsApp.",
        contactTitle: "Final step: open the enquiry in WhatsApp",
        contactDesc: "We will automatically prepare a message with the date, service, guests, extras and calculated price.",
        btnWa: "Continue on WhatsApp",
        btnEm: "I prefer to send an email",
        priceTitle: "Price summary",
        excursionLine: "Private 6-hour excursion",
        instructionLine: "Training day",
        rentalLine: "Yacht rental",
        skipperLine: "Skipper",
        mandatoryLine: "Cleaning, bed linen, towels and fees",
        extrasTitle: "Optional extras",
        extrasHelp: "Weekly services are calculated for each week started. Per-person extras update when you enter the number of guests.",
        extrasSelected: "Selected extras",
        noExtras: "None",
        pendingGuests: "Enter guest count",
        extraLabels: {
          tender: "Tender and outboard engine",
          beachTowels: "Beach towels",
          sup: "SUP",
          fishing: "Fishing equipment",
          snorkel: "Snorkelling equipment",
          provisioning: "Provisioning service",
          earlyCheckIn: "Early check-in",
          petCleaning: "Additional pet cleaning",
          gennaker: "Gennaker",
          wifi: "Unlimited Wi-Fi",
        },
        extraPrices: {
          tender: "€150/week",
          beachTowels: "€5/person/week",
          sup: "€100/week",
          fishing: "€150/week",
          snorkel: "€20/week",
          provisioning: "€25/rental",
          earlyCheckIn: "€150",
          petCleaning: "€100/rental",
          gennaker: "€300/week · additional €500 deposit",
          wifi: "€100/week",
        },
        totalLabel: "Booking total",
        taxIncluded: "Published prices include IGIC",
        rentalPriceNote: "The total includes selected extras and the passenger charge. It excludes fuel and the refundable €2,500 deposit, plus the €500 deposit if the gennaker is requested.",
        excursionPriceNote: "Includes the captain, lunch, anchoring, snorkelling equipment, insurance, passenger charge and IGIC.",
        groupPriceNote: "Published group price including the passenger charge and IGIC.",
        durations: {
          excursion: "Private excursion · 6 hours · €600",
          alquiler: "Yacht rental · minimum 3 days · €270/day",
          instruccion: "Training day · 9:00–17:00 · €200",
        },
        captainOptions: {
          capitan: "With Leon's skipper or another skipper appointed by us",
          experiencia: "Without a skipper: I have experience and qualifications",
        },
      };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayMondayBased = (new Date(year, month, 1).getDay() + 6) % 7;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const currentMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
  const canGoBack = new Date(year, month, 1) > currentMonthStart;

  const formatDate = (day: number) => `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

  const localDate = (value: string) => {
    const [y, m, d] = value.split("-").map(Number);
    return new Intl.DateTimeFormat(idioma === "es" ? "es-ES" : "en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(y, m - 1, d));
  };

  const addDaysToDateValue = (value: string, numberOfDays: number) => {
    const [y, m, d] = value.split("-").map(Number);
    const date = new Date(y, m - 1, d + numberOfDays);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  };

  const whatsappGeneral = `https://wa.me/${telefonoWhatsApp}?text=${encodeURIComponent(
    idioma === "es"
      ? "¡Hola! Me gustaría conocer la disponibilidad y las opciones para vivir una experiencia privada a bordo de Leon."
      : "Hello! I would like to know the available dates and options for a private experience aboard Leon."
  )}`;

  const durationLabel = t.durations[formulario.duracion as keyof typeof t.durations];
  const captainLabel = t.captainOptions[formulario.patron as keyof typeof t.captainOptions];
  const rentalDays = Math.max(3, Number.parseInt(formulario.dias, 10) || 3);
  const rentalWeeks = Math.ceil(rentalDays / 7);
  const guestCount = Math.max(0, Number.parseInt(formulario.personas, 10) || 0);
  const guestLimit = formulario.duracion === "excursion" ? 8 : formulario.duracion === "alquiler" ? 6 : null;
  const guestLimitExceeded = guestLimit !== null && guestCount > guestLimit;
  const rentalEndExclusive = selectedDate && formulario.duracion === "alquiler"
    ? addDaysToDateValue(selectedDate, rentalDays)
    : null;
  const rentalEndInclusive = selectedDate && formulario.duracion === "alquiler"
    ? addDaysToDateValue(selectedDate, rentalDays - 1)
    : null;
  const conflictingRentalDates = selectedDate && rentalEndExclusive
    ? bookedDates.filter((date) => date >= selectedDate && date < rentalEndExclusive).sort()
    : [];
  const rentalHasConflict = conflictingRentalDates.length > 0;
  const rentalConflictMessage = rentalHasConflict
    ? `${t.rentalConflictTitle} ${t.rentalConflictDates} ${conflictingRentalDates.map(localDate).join(", ")}.`
    : "";
  const formatPrice = (amount: number) => new Intl.NumberFormat(idioma === "es" ? "es-ES" : "en-GB", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(amount);

  const calculateExtraAmount = (extra: ExtraDefinition) => {
    if (extra.billing === "rental") return extra.price;
    if (extra.billing === "personWeek") return guestCount > 0 ? extra.price * guestCount * rentalWeeks : null;
    return extra.price * rentalWeeks;
  };

  const selectedExtraLines = formulario.duracion === "alquiler"
    ? extraDefinitions
        .filter((extra) => formulario.extras.includes(extra.id))
        .map((extra) => ({
          label: t.extraLabels[extra.id],
          amount: calculateExtraAmount(extra),
        }))
    : [];

  const priceLines: { label: string; amount: number | null }[] = formulario.duracion === "excursion"
    ? [{ label: t.excursionLine, amount: 600 }]
    : formulario.duracion === "instruccion"
      ? [{ label: t.instructionLine, amount: 200 }]
      : [
          { label: `${t.rentalLine} · ${rentalDays} × 270 €`, amount: rentalDays * 270 },
          ...(formulario.patron === "capitan"
            ? [{ label: `${t.skipperLine} · ${rentalDays} × 160 €`, amount: rentalDays * 160 }]
            : []),
          { label: t.mandatoryLine, amount: 150 },
          ...selectedExtraLines,
        ];
  const bookingTotal = priceLines.reduce((total, line) => total + (line.amount ?? 0), 0);
  const selectedExtrasMessage = selectedExtraLines
    .map((line) => `${line.label} (${line.amount === null ? t.pendingGuests : formatPrice(line.amount)})`)
    .join(", ");

  const message = (() => {
    if (!selectedDate) return "";

    const lines = idioma === "es"
      ? [
          "¡Hola! Me gustaría consultar una experiencia privada a bordo de Leon.",
          "",
          `Fecha: ${localDate(selectedDate)}`,
          `Personas: ${formulario.personas || "Por confirmar"}`,
          `Tipo de salida: ${durationLabel}`,
          formulario.duracion === "alquiler" ? `Número de días: ${rentalDays}` : "",
          `Modalidad de navegación: ${captainLabel}`,
          formulario.duracion === "alquiler"
            ? `${t.extrasSelected}: ${selectedExtrasMessage || t.noExtras}`
            : "",
          `Total calculado: ${formatPrice(bookingTotal)}`,
          formulario.duracion === "alquiler"
            ? "El total incluye los complementos seleccionados y el canon de pasajeros. Combustible y fianzas no incluidos."
            : formulario.duracion === "excursion"
              ? t.excursionPriceNote
              : "",
          formulario.nombre ? `Nombre: ${formulario.nombre}` : "",
          formulario.ocasion ? `Detalles especiales: ${formulario.ocasion}` : "",
          formulario.contacto ? `Contacto alternativo: ${formulario.contacto}` : "",
          "",
          "¿Podéis confirmarme las opciones disponibles y el precio? Muchas gracias.",
        ]
      : [
          "Hello! I would like to enquire about a private experience aboard Leon.",
          "",
          `Date: ${localDate(selectedDate)}`,
          `Guests: ${formulario.personas || "To be confirmed"}`,
          `Experience: ${durationLabel}`,
          formulario.duracion === "alquiler" ? `Number of days: ${rentalDays}` : "",
          `Sailing arrangement: ${captainLabel}`,
          formulario.duracion === "alquiler"
            ? `${t.extrasSelected}: ${selectedExtrasMessage || t.noExtras}`
            : "",
          `Calculated total: ${formatPrice(bookingTotal)}`,
          formulario.duracion === "alquiler"
            ? "The total includes selected extras and the passenger charge. Fuel and security deposits are not included."
            : formulario.duracion === "excursion"
              ? t.excursionPriceNote
              : "",
          formulario.nombre ? `Name: ${formulario.nombre}` : "",
          formulario.ocasion ? `Special details: ${formulario.ocasion}` : "",
          formulario.contacto ? `Alternative contact: ${formulario.contacto}` : "",
          "",
          "Could you confirm the available options and price? Thank you.",
        ];

    return lines.filter(Boolean).join("\n");
  })();

  const whatsappFecha = selectedDate
    ? `https://wa.me/${telefonoWhatsApp}?text=${encodeURIComponent(message)}`
    : "#";

  const emailFecha = selectedDate
    ? `mailto:${emailContactobarco}?subject=${encodeURIComponent(
        idioma === "es" ? `Consulta Leon · ${selectedDate}` : `Leon enquiry · ${selectedDate}`
      )}&body=${encodeURIComponent(message)}`
    : "#";

  const updateField = (field: Exclude<keyof Formulario, "extras">, value: string) => {
    if (field === "duracion") setValidationError("");
    if (field === "duracion" || field === "dias") setSelectedDate(null);

    if (field === "duracion" && value !== "alquiler") {
      setFormulario((current) => ({ ...current, duracion: value, patron: "capitan", extras: [] }));
      return;
    }

    setFormulario((current) => ({ ...current, [field]: value }));
    if ((field === "personas" || field === "dias") && value.trim()) setValidationError("");
  };

  const toggleExtra = (extraId: ExtraId) => {
    setFormulario((current) => ({
      ...current,
      extras: current.extras.includes(extraId)
        ? current.extras.filter((id) => id !== extraId)
        : [...current.extras, extraId],
    }));
  };

  const validatePlan = () => {
    if (!formulario.personas.trim() || Number(formulario.personas) < 1) {
      setValidationError(t.required);
      document.getElementById("booking-guests")?.focus();
      return false;
    }

    if (guestLimitExceeded) {
      setValidationError(formulario.duracion === "excursion" ? t.excursionCapacityError : t.rentalCapacityError);
      document.getElementById("booking-guests")?.focus();
      return false;
    }

    if (
      formulario.duracion === "alquiler" &&
      (!Number.isInteger(Number(formulario.dias)) || Number(formulario.dias) < 3)
    ) {
      setValidationError(t.daysRequired);
      document.getElementById("booking-days")?.focus();
      return false;
    }

    if (formulario.duracion === "alquiler" && rentalHasConflict) {
      setValidationError(rentalConflictMessage);
      document.getElementById("booking-period-alert")?.focus();
      return false;
    }

    setValidationError("");
    return true;
  };

  const continueToCalendar = () => {
    if (
      formulario.duracion === "alquiler" &&
      (!Number.isInteger(Number(formulario.dias)) || Number(formulario.dias) < 3)
    ) {
      setValidationError(t.daysRequired);
      document.getElementById("booking-days")?.focus();
      return;
    }

    setValidationError("");
    setPasoReserva(2);
  };

  const continueToContact = () => {
    if (!validatePlan()) return;
    setPasoReserva(4);
  };

  if (estado === "error") {
    return (
      <div data-motion="slide-right" className="rounded-[1.75rem] border border-[#e5d8c8] bg-[#fffaf4] p-6 text-center sm:p-8" role="status">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#f8ead8] text-[#9a5b23]">
          <CalendarDays aria-hidden="true" size={23} />
        </div>
        <h3 className="mt-5 text-xl font-bold text-[#102a43]">{t.errorTitulo}</h3>
        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#667782]">{t.errorDesc}</p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => {
              setEstado("loading");
              setIntento((valor) => valor + 1);
            }}
            className="focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#c9d5d2] bg-white px-5 text-sm font-bold text-[#102a43]"
          >
            <RefreshCw aria-hidden="true" size={17} /> {t.reintentar}
          </button>
          <a
            href={whatsappGeneral}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#e7bd74] px-5 text-sm font-bold text-[#071a2f]"
          >
            <MessageCircle aria-hidden="true" size={17} /> {t.consultaDirecta}
          </a>
        </div>
      </div>
    );
  }

  return (
    <div data-motion="slide-right" className="overflow-hidden rounded-[1.75rem] border border-white/20 bg-white shadow-[0_30px_90px_rgba(2,12,24,0.3)] ring-1 ring-white/10">
      <div className="relative overflow-hidden border-b border-[#e5ecea] bg-[linear-gradient(135deg,#0b3548,#0d6575)] px-6 py-7 text-white sm:px-8">
        <span className="absolute -right-8 -top-14 h-40 w-40 rounded-full border-[24px] border-white/[0.07]" aria-hidden="true" />
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#a8d7d8]">Leon Sailing</p>
        <h3 className="mt-2 text-2xl font-bold">{t.titulo}</h3>
        <p className="mt-1 text-sm text-white/65">{t.subtitulo}</p>
      </div>

      <div className="p-3 min-[380px]:p-5 sm:p-8">
        <ol className="mb-6 grid grid-cols-4 gap-1.5 sm:gap-2" aria-label={idioma === "es" ? "Pasos de la reserva" : "Booking steps"}>
          {t.pasos.map((label, index) => {
            const step = (index + 1) as PasoReserva;
            const active = pasoReserva === step;
            const complete = pasoReserva > step;

            return (
              <li key={label}>
                <button
                  type="button"
                  disabled={step > pasoReserva}
                  onClick={() => setPasoReserva(step)}
                  className={`focus-ring flex w-full flex-col items-center gap-2 rounded-xl px-2 py-3 text-center transition-colors ${
                    active
                      ? "bg-[#0b3548] text-white"
                      : complete
                        ? "bg-[#e7f2ef] text-[#0d6575]"
                        : "bg-[#f2f6f5] text-[#8a999f]"
                  } disabled:cursor-not-allowed`}
                  aria-current={active ? "step" : undefined}
                >
                  <span className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-black ${active ? "bg-[#e7bd74] text-[#071a2f]" : complete ? "bg-[#0d6575] text-white" : "bg-white text-[#8a999f]"}`}>
                    {complete ? <CheckCircle2 aria-hidden="true" size={15} /> : step}
                  </span>
                  <span className="text-[0.66rem] font-extrabold uppercase tracking-[0.12em] sm:text-xs">{label}</span>
                </button>
              </li>
            );
          })}
        </ol>

        {pasoReserva === 1 ? (
          <div className="rounded-[1.5rem] border border-[#d7e7e3] bg-[#f4f9f7] p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#0d6575] shadow-sm">
                <Sparkles aria-hidden="true" size={19} />
              </span>
              <div>
                <h4 className="font-bold text-[#102a43]">{t.serviceStepTitle}</h4>
                <p className="mt-1 text-sm leading-6 text-[#667982]">{t.serviceStepDesc}</p>
              </div>
            </div>

            <div className="mt-5 grid gap-2" role="radiogroup" aria-label={t.duracion}>
              {Object.entries(t.durations).map(([value, label]) => {
                const selected = formulario.duracion === value;

                return (
                  <button
                    key={value}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => updateField("duracion", value)}
                    className={`focus-ring flex min-h-14 items-center justify-between gap-4 rounded-xl border px-4 py-3 text-left text-sm font-bold transition-colors ${
                      selected
                        ? "border-[#0d6575] bg-[#e5f2f3] text-[#0b4c5a] shadow-[inset_0_0_0_1px_rgba(13,101,117,0.08)]"
                        : "border-[#d7e4e1] bg-white text-[#526b75] hover:border-[#9fc5c9]"
                    }`}
                  >
                    <span>{label}</span>
                    <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${selected ? "border-[#0d6575] bg-[#0d6575] text-white" : "border-[#b8c9c5] text-transparent"}`}>
                      <CheckCircle2 aria-hidden="true" size={14} />
                    </span>
                  </button>
                );
              })}
            </div>

            {formulario.duracion === "alquiler" && (
              <label className="booking-field mt-4">
                <span>{t.rentalDaysLabel}</span>
                <input
                  id="booking-days"
                  type="number"
                  min="3"
                  step="1"
                  inputMode="numeric"
                  value={formulario.dias}
                  onChange={(event) => updateField("dias", event.target.value)}
                  aria-invalid={Boolean(validationError)}
                  aria-describedby={validationError ? "booking-service-error" : undefined}
                />
                <small className="text-xs font-normal leading-5 text-[#71828a]">{t.diasAyuda}</small>
              </label>
            )}

            {validationError && <p id="booking-service-error" className="mt-3 text-sm font-semibold text-[#a04444]" role="alert">{validationError}</p>}

            <button
              type="button"
              onClick={continueToCalendar}
              className="focus-ring mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#071a2f] px-4 text-sm font-bold text-white transition-transform hover:-translate-y-0.5"
            >
              {t.showAvailability} <ArrowRight aria-hidden="true" size={17} />
            </button>
          </div>
        ) : pasoReserva === 2 ? (
          <>
          <div className="mb-5 rounded-[1.15rem] border border-[#d7e7e3] bg-[#f4f9f7] px-4 py-4">
            <h4 className="font-bold text-[#102a43]">{t.calendarStepTitle}</h4>
            <p className="mt-1 text-sm leading-6 text-[#667982]">
              {formulario.duracion === "alquiler" ? t.calendarRentalHelp : t.calendarSingleHelp}
            </p>
          </div>
          <div className="mb-5 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setCurrentDate(new Date(year, month - 1, 1))}
            disabled={!canGoBack}
            className="focus-ring flex h-11 w-11 items-center justify-center rounded-full border border-[#dbe4e2] text-[#34515d] transition-colors hover:bg-[#f2f6f5] disabled:cursor-not-allowed disabled:opacity-35"
            aria-label={t.anterior}
          >
            <ChevronLeft aria-hidden="true" size={20} />
          </button>
          <p className="text-center text-base font-bold text-[#102a43] sm:text-lg" aria-live="polite">
            {t.meses[month]} {year}
          </p>
          <button
            type="button"
            onClick={() => setCurrentDate(new Date(year, month + 1, 1))}
            className="focus-ring flex h-11 w-11 items-center justify-center rounded-full border border-[#dbe4e2] text-[#34515d] transition-colors hover:bg-[#f2f6f5]"
            aria-label={t.siguiente}
          >
            <ChevronRight aria-hidden="true" size={20} />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-0.5 sm:gap-1" aria-hidden="true">
          {t.dias.map((dia) => (
            <span key={dia} className="py-2 text-center text-[11px] font-bold uppercase tracking-wide text-[#657983] sm:text-xs">
              {dia}
            </span>
          ))}
        </div>

        {estado === "loading" ? (
          <div className="flex min-h-[260px] items-center justify-center text-sm font-medium text-[#657983]" aria-live="polite">
            {t.cargando}
          </div>
        ) : (
          <div className="grid grid-cols-7 gap-0.5 sm:gap-1">
            {Array.from({ length: firstDayMondayBased }).map((_, index) => (
              <span key={`empty-${index}`} className="h-11" aria-hidden="true" />
            ))}

            {Array.from({ length: daysInMonth }).map((_, index) => {
              const day = index + 1;
              const dateValue = formatDate(day);
              const dateObject = new Date(year, month, day);
              const isPast = dateObject < today;
              const isToday = dateObject.getTime() === today.getTime();
              const isBooked = bookedDates.includes(dateValue);
              const rangeEndExclusive = addDaysToDateValue(dateValue, rentalDays);
              const rentalRangeUnavailable = formulario.duracion === "alquiler" && bookedDates.some(
                (bookedDate) => bookedDate >= dateValue && bookedDate < rangeEndExclusive,
              );
              const isSelected = selectedDate === dateValue;
              const isIncludedRentalDay = Boolean(
                selectedDate && rentalEndExclusive && dateValue > selectedDate && dateValue < rentalEndExclusive,
              );
              const disabled = isPast || isToday || isBooked || rentalRangeUnavailable;
              const stateLabel = isToday
                ? t.hoyNoDisponible
                : isPast
                ? t.pasado
                : isBooked
                  ? t.ocupado
                  : isIncludedRentalDay
                    ? t.includedRentalDay
                  : rentalRangeUnavailable
                    ? t.periodUnavailable
                    : isSelected
                      ? t.seleccionado
                      : t.disponible;

              return (
                <button
                  key={dateValue}
                  type="button"
                  disabled={disabled}
                  onClick={() => {
                    setSelectedDate(dateValue);
                    setValidationError("");
                  }}
                  className={`focus-ring h-11 rounded-lg text-[13px] font-semibold transition-colors sm:rounded-xl sm:text-sm ${
                    isPast || isToday
                      ? "text-[#a7b4b9]"
                      : isSelected && !rentalRangeUnavailable
                      ? "bg-[#0d6575] text-white shadow-md"
                      : isIncludedRentalDay
                        ? "bg-[#cde9e6] text-[#0b4c5a] ring-1 ring-inset ring-[#7ebdb7]"
                      : isBooked
                        ? "bg-[#f8eeee] text-[#a86b6b] line-through"
                      : rentalRangeUnavailable
                          ? "bg-[#fff1df] text-[#9a6231] line-through"
                          : formulario.duracion === "alquiler"
                            ? "bg-[#e5f2f3] text-[#0b4c5a] hover:bg-[#cde9e6]"
                            : "bg-[#f2f6f5] text-[#284b59] hover:bg-[#dff0ec]"
                  }`}
                  aria-label={`${localDate(dateValue)} · ${stateLabel}`}
                  aria-pressed={isSelected}
                >
                  {day}
                </button>
              );
            })}
          </div>
        )}

        {estado === "ready" && (
          <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-xs font-medium text-[#657983]">
            <span className="inline-flex items-center gap-2"><i className={`h-2.5 w-2.5 rounded-full ${formulario.duracion === "alquiler" ? "bg-[#b9dcdf]" : "bg-[#dff0ec]"}`} aria-hidden="true" />{formulario.duracion === "alquiler" ? t.availableStart : t.disponible}</span>
            <span className="inline-flex items-center gap-2"><i className="h-2.5 w-2.5 rounded-full bg-[#f0d8d8]" aria-hidden="true" />{t.ocupado}</span>
            {formulario.duracion === "alquiler" && <span className="inline-flex items-center gap-2"><i className="h-2.5 w-2.5 rounded-full bg-[#f3d7b5]" aria-hidden="true" />{t.periodUnavailable}</span>}
            {formulario.duracion === "alquiler" && selectedDate && <span className="inline-flex items-center gap-2"><i className="h-2.5 w-2.5 rounded-full bg-[#7ebdb7]" aria-hidden="true" />{t.includedRentalDay}</span>}
            <span className="inline-flex items-center gap-2"><i className="h-2.5 w-2.5 rounded-full bg-[#0d6575]" aria-hidden="true" />{t.seleccionado}</span>
          </div>
        )}

        {estado === "ready" && selectedDate && (
          <div className="mt-5 rounded-[1.2rem] border border-[#9fcac5] bg-[#edf8f6] p-4 shadow-[0_12px_35px_rgba(7,26,47,0.06)]">
            <p className="text-xs font-extrabold uppercase tracking-[0.13em] text-[#0d6575]">
              {formulario.duracion === "alquiler" ? t.selectedPeriod : t.consultar}
            </p>
            <p className="mt-2 font-bold leading-6 text-[#102a43]">
              {localDate(selectedDate)}
              {rentalEndInclusive && <><span className="mx-2 text-[#7b9198]">→</span>{localDate(rentalEndInclusive)}</>}
            </p>
            {formulario.duracion === "alquiler" && (
              <p className="mt-1 text-sm font-semibold text-[#526b75]">{rentalDays} {idioma === "es" ? "días consecutivos" : "consecutive days"}</p>
            )}
            <button
              type="button"
              onClick={() => setPasoReserva(3)}
              className="focus-ring mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#071a2f] px-4 text-sm font-bold text-white transition-transform hover:-translate-y-0.5"
            >
              {t.confirmDates} <ArrowRight aria-hidden="true" size={17} />
            </button>
          </div>
        )}

          </>
        ) : selectedDate ? (
          <div className="flex flex-col gap-3 rounded-[1.25rem] border border-[#d7e7e3] bg-[#f4f9f7] px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#0d6575] shadow-sm">
                <CalendarDays aria-hidden="true" size={18} />
              </span>
              <p className="text-sm text-[#526b75]">
                {t.consultar}: <strong className="block text-[#0b4c5a] sm:inline">{localDate(selectedDate)}</strong>
                <span className="mt-1 block text-xs font-semibold text-[#657983]">
                  {durationLabel}{formulario.duracion === "alquiler" ? ` · ${rentalDays} ${idioma === "es" ? "días" : "days"}` : ""}
                </span>
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setPasoReserva(2);
              }}
              className="focus-ring inline-flex min-h-10 items-center justify-center gap-2 rounded-full border border-[#c9d9d5] bg-white px-4 text-xs font-bold text-[#0d6575]"
            >
              <ArrowLeft aria-hidden="true" size={15} /> {t.cambiarFecha}
            </button>
          </div>
        ) : null}

        {selectedDate && pasoReserva >= 3 && estado === "ready" && (
          <div className="mt-6 overflow-hidden rounded-[1.5rem] border border-[#d7e7e3] bg-[#f4f9f7]" aria-live="polite">
            <div className="p-5 sm:p-6">
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#0d6575] shadow-sm">
                  <Sparkles aria-hidden="true" size={19} />
                </span>
                <div>
                  <h4 className="font-bold text-[#102a43]">{pasoReserva === 3 ? t.formTitle : t.contactTitle}</h4>
                  <p className="mt-1 text-sm leading-6 text-[#667982]">{pasoReserva === 3 ? t.formDesc : t.contactDesc}</p>
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {pasoReserva === 4 && (
                  <label className="booking-field">
                    <span>{t.nombre}</span>
                    <input
                      id="booking-name"
                      type="text"
                      autoComplete="name"
                      value={formulario.nombre}
                      onChange={(event) => updateField("nombre", event.target.value)}
                      placeholder={t.nombrePlaceholder}
                    />
                  </label>
                )}

                {pasoReserva === 3 && (
                  <label className="booking-field">
                    <span className="inline-flex items-center gap-2"><Users aria-hidden="true" size={15} />{t.personas} *</span>
                    <input
                      id="booking-guests"
                      type="number"
                      min="1"
                      max={guestLimit ?? undefined}
                      inputMode="numeric"
                      value={formulario.personas}
                      onChange={(event) => updateField("personas", event.target.value)}
                      placeholder={t.personasPlaceholder}
                      aria-invalid={guestLimitExceeded || Boolean(validationError)}
                      aria-describedby={validationError ? "booking-error" : undefined}
                    />
                    {formulario.duracion === "excursion" && <small className="text-xs font-normal leading-5 text-[#71828a]">{t.excursionCapacity}</small>}
                    {formulario.duracion === "alquiler" && <small className="text-xs font-normal leading-5 text-[#71828a]">{t.rentalCapacity}</small>}
                  </label>
                )}

                {pasoReserva === 3 && formulario.duracion === "alquiler" ? (
                  <label className="booking-field sm:col-span-2">
                    <span>{t.patron}</span>
                    <select value={formulario.patron} onChange={(event) => updateField("patron", event.target.value)}>
                      {Object.entries(t.captainOptions).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                    </select>
                    <small className="text-xs font-normal leading-5 text-[#71828a]">{t.patronAyuda}</small>
                  </label>
                ) : pasoReserva === 3 ? (
                  <div className="sm:col-span-2 rounded-[1rem] border border-[#d8e7e3] bg-white px-4 py-3 text-sm font-semibold leading-6 text-[#526b75]">
                    <BadgeCheck aria-hidden="true" size={17} className="mr-2 inline text-[#0d6575]" />
                    {formulario.duracion === "instruccion" ? t.instructionSkipper : t.excursionSkipper}
                  </div>
                ) : null}

                {pasoReserva === 3 && formulario.duracion === "alquiler" && rentalHasConflict && (
                  <div
                    id="booking-period-alert"
                    role="alert"
                    tabIndex={-1}
                    className="sm:col-span-2 rounded-[1rem] border border-[#e4bdbd] bg-[#fff2f2] px-4 py-3 text-sm font-semibold leading-6 text-[#8f3f3f]"
                  >
                    {rentalConflictMessage}
                  </div>
                )}

                {pasoReserva === 3 && formulario.duracion === "alquiler" && (
                  <details className="sm:col-span-2 rounded-[1.25rem] border border-[#cfe2dd] bg-white shadow-[0_12px_35px_rgba(7,26,47,0.05)]">
                    <summary className="focus-ring flex cursor-pointer list-none items-center justify-between gap-3 rounded-[1.25rem] px-5 py-4 text-sm font-extrabold uppercase tracking-[0.13em] text-[#0d6575] marker:hidden">
                      {t.extrasTitle}
                      <span className="text-xl font-normal" aria-hidden="true">+</span>
                    </summary>
                    <div className="border-t border-[#e3ebe9] p-5">
                    <p className="mt-1 text-xs leading-5 text-[#71828a]">{t.extrasHelp}</p>
                    <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
                      {extraDefinitions.map((extra) => {
                        const selected = formulario.extras.includes(extra.id);

                        return (
                          <label
                            key={extra.id}
                            className={`flex cursor-pointer items-start gap-3 rounded-xl border px-4 py-3.5 transition-colors ${
                              selected
                                ? "border-[#0d6575] bg-[#e9f4f1] shadow-[inset_0_0_0_1px_rgba(13,101,117,0.08)]"
                                : "border-[#dbe7e4] bg-[#f8fbfa] hover:border-[#a9c9c2]"
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={selected}
                              onChange={() => toggleExtra(extra.id)}
                              className="mt-0.5 h-5 w-5 shrink-0 accent-[#0d6575]"
                            />
                            <span className="min-w-0">
                              <strong className="block text-sm leading-5 text-[#102a43]">{t.extraLabels[extra.id]}</strong>
                              <small className="mt-1 block text-xs font-semibold leading-5 text-[#0d6575]">{t.extraPrices[extra.id]}</small>
                            </span>
                          </label>
                        );
                      })}
                    </div>
                    </div>
                  </details>
                )}

                <div className="sm:col-span-2 rounded-[1.25rem] border border-[#cfe2dd] bg-white p-5 shadow-[0_12px_35px_rgba(7,26,47,0.06)]">
                  <p className="text-sm font-extrabold uppercase tracking-[0.13em] text-[#0d6575]">{t.priceTitle}</p>
                  {rentalHasConflict ? (
                    <p className="mt-4 rounded-xl bg-[#fff2f2] px-4 py-3 text-sm font-semibold leading-6 text-[#8f3f3f]">
                      {t.rentalPriceBlocked}
                    </p>
                  ) : (
                    <>
                      <dl className="mt-4 grid gap-2.5">
                        {priceLines.map((line) => (
                          <div key={line.label} className="flex items-start justify-between gap-4 text-sm text-[#526b75]">
                            <dt>{line.label}</dt>
                            <dd className="font-numeric shrink-0 font-bold text-[#102a43]">
                              {line.amount === null ? t.pendingGuests : formatPrice(line.amount)}
                            </dd>
                          </div>
                        ))}
                      </dl>
                      <div className="mt-4 flex items-end justify-between gap-4 border-t border-[#dbe7e4] pt-4">
                        <div>
                          <p className="font-bold text-[#102a43]">{t.totalLabel}</p>
                          <p className="mt-1 text-xs text-[#71828a]">{t.taxIncluded}</p>
                        </div>
                        <strong className="font-numeric text-3xl tracking-[-0.04em] text-[#0b4c5a]">{formatPrice(bookingTotal)}</strong>
                      </div>
                      <p className="mt-4 text-xs leading-5 text-[#71828a]">
                        {formulario.duracion === "alquiler"
                          ? t.rentalPriceNote
                          : formulario.duracion === "excursion"
                            ? t.excursionPriceNote
                            : t.groupPriceNote}
                      </p>
                    </>
                  )}
                </div>

                {pasoReserva === 4 && (
                  <label className="booking-field sm:col-span-2">
                    <span>{t.ocasion}</span>
                    <textarea
                      rows={3}
                      value={formulario.ocasion}
                      onChange={(event) => updateField("ocasion", event.target.value)}
                      placeholder={t.ocasionPlaceholder}
                    />
                  </label>
                )}

                {pasoReserva === 4 && (
                  <label className="booking-field sm:col-span-2">
                    <span>{t.contacto}</span>
                    <input
                      id="booking-contact"
                      type="text"
                      autoComplete="email"
                      value={formulario.contacto}
                      onChange={(event) => updateField("contacto", event.target.value)}
                      placeholder={t.contactoPlaceholder}
                    />
                  </label>
                )}

              </div>

              {validationError && <p id="booking-error" className="mt-3 text-sm font-semibold text-[#a04444]" role="alert">{validationError}</p>}

              {pasoReserva === 3 ? (
                <div className="mt-5 grid gap-2 sm:grid-cols-[auto_1fr]">
                  <button
                    type="button"
                    onClick={() => setPasoReserva(2)}
                    className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[#c9d9d5] bg-white px-4 text-sm font-bold text-[#0d6575]"
                  >
                    <ArrowLeft aria-hidden="true" size={17} /> {t.volver}
                  </button>
                  <button
                    type="button"
                    onClick={continueToContact}
                    disabled={rentalHasConflict}
                    className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#071a2f] px-4 text-sm font-bold text-white transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:translate-y-0"
                  >
                    {t.continuar} <ArrowRight aria-hidden="true" size={17} />
                  </button>
                </div>
              ) : (
                <>
                  <p className="mt-4 text-xs leading-5 text-[#71828a]">{t.privacy}</p>

                  <div className="mt-5 grid gap-2">
                    <a
                      href={whatsappFecha}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="focus-ring booking-action-pulse inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#e7bd74] px-4 text-sm font-bold text-[#071a2f] transition-transform hover:-translate-y-0.5"
                    >
                      <MessageCircle aria-hidden="true" size={18} /> {t.btnWa}
                    </a>
                    <a
                      href={emailFecha}
                      className="focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[#c9d9d5] bg-white px-4 text-sm font-bold text-[#0d6575]"
                    >
                      <Mail aria-hidden="true" size={17} /> {t.btnEm}
                    </a>
                    <button
                      type="button"
                      onClick={() => setPasoReserva(3)}
                      className="focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-4 text-sm font-bold text-[#0d6575]"
                    >
                      <ArrowLeft aria-hidden="true" size={16} /> {t.volver}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        <p className="mt-5 text-center text-xs leading-5 text-[#71828a]">{t.aviso}</p>
      </div>
    </div>
  );
}

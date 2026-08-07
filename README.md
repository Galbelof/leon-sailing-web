# Leon Sailing Tenerife

Web oficial de Leon Sailing Tenerife para consultar servicios, precios y disponibilidad del velero Leon desde Marina del Sur.

## Requisitos

- Node.js 20.9 o posterior.
- Una URL privada de Google Calendar en formato iCal para mostrar las fechas ocupadas.

## Configuración local

1. Instala las dependencias:

   ```bash
   npm install
   ```

2. Copia `.env.example` como `.env.local` y añade la URL del calendario:

   ```env
   GOOGLE_CALENDAR_ICAL_URL=https://calendar.google.com/calendar/ical/.../basic.ics
   ```

3. Arranca la web:

   ```bash
   npm run dev
   ```

4. Abre `http://localhost:3000`. La ruta inicial redirige a la versión española.

## Comandos

- `npm run dev`: inicia el entorno de desarrollo.
- `npm run lint`: revisa el código.
- `npm run typecheck`: comprueba los tipos de TypeScript.
- `npm run build`: genera la versión de producción.
- `npm run check`: ejecuta todas las comprobaciones.
- `npm run start`: sirve una compilación de producción.

## Rutas principales

- `/es` y `/en`: página principal en español e inglés.
- `/api/calendario`: fechas ocupadas del calendario privado.
- `/api/clima`: tiempo actual en Marina del Sur.
- `/api/webcam`: fotograma reciente del puerto.

Las consultas de disponibilidad se preparan en la web y se envían por WhatsApp o correo cuando el visitante elige uno de esos canales.

"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react"; 

export default function Home() {
  const [idioma, setIdioma] = useState("es");
  const [isPlaying, setIsPlaying] = useState(false); // Estado para controlar si suena la música
  
  // Referencias
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null); // Referencia para el audio

  // Efecto para el VÍDEO (silenciado automático para móviles)
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch((error) => {
        console.log("El navegador bloqueó el autoplay del vídeo:", error);
      });
    }
  }, []);

  // Función para encender o apagar la música
  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch((error) => {
          console.log("Error al reproducir audio:", error);
        });
      }
    }
  };

  const telefonoWhatsApp = "34631596309"; 
  const telefonoFormateado = "+34 631 59 63 09"; 
  const emailContactobarco = "leonsailingtenerife@gmail.com";
  const emailContactoalquiler = "maureen@whitehotdesign.it";

  const textos = {
    es: {
      slogan: "Chárter a vela, privado en Tenerife",
      titulo1: "Descubre Tenerife",
      titulo2: "Desde el Mar",
      descripcion: "Navega con nosotros, descubre Tenerife y crea recuerdos que durarán toda la vida.",
      btnWhatsapp: "Reservar por WhatsApp",
      btnEmail: "Contactar por Email",
      derechos: "Todos los derechos reservados.",
      mensajeWa: "¡Hola! Estoy interesado en alquilar el velero León. ¿Me das más información?",
      asuntoEmail: "Consulta%20Alquiler%20Velero%20León",
      
      secTenerife: "Un paraíso por descubrir",
      tenP1: "Hay lugares que se visitan y lugares que se sienten. Tenerife pertenece a estos últimos. Bañada por las aguas azules del Atlántico y moldeada por la fuerza de los volcanes, la isla ofrece algunos de los paisajes marinos más espectaculares del mundo.",
      tenP2: "A bordo de nuestro elegante velero de 12 metros, te invitamos a descubrir una Tenerife diferente. Navega junto a impresionantes acantilados volcánicos, contempla cuevas ocultas y disfruta del avistamiento de delfines y ballenas en su entorno natural. Una experiencia que permanece en la memoria para siempre.",
      
      secUbicacion: "Punto de Partida y Rutas",
      ubiPuertoTitulo: "Marina del Sur, Las Galletas",
      ubiPuertoDesc: "Nuestro velero zarpa desde el encantador puerto de Marina del Sur, situado a tan solo 15 km del Aeropuerto de Tenerife Sur. Un punto de partida ideal y de fácil acceso.",
      ubiRutasTitulo: "A dónde podemos navegar",
      ubiRutasDesc: "Dependiendo de los días que alquiles, podemos navegar por la costa de Tenerife o emprender travesías más largas hacia nuestras islas vecinas: La Gomera, La Palma o El Hierro.",
      
      secHistoria: "Nuestra Historia",
      histSub: "Bienvenidos a bordo de León.",
      histP1: "Somos una familia unida por el amor al mar, la aventura y la belleza de Tenerife. Nuestra historia comenzó hace años durante unas vacaciones en un barco en Italia, donde nos conocimos. Desde entonces, la navegación se convirtió en una forma de vida que hoy compartimos con nuestra hija Isabel.",
      histP2: "El capitán de León cuenta con una amplia experiencia en navegación y formación en ingeniería, garantizando la máxima seguridad. Por mi parte, como diseñadora de interiores y agente inmobiliaria, cuido cada detalle para que nuestros huéspedes disfruten de una experiencia especial y personalizada.",
      
      secInmo: "Tu hogar en Tenerife",
      inmoDesc: "Si durante su estancia descubren que Tenerife es el lugar donde les gustaría vivir o invertir, estaremos encantados de asesorarles como agentes inmobiliarios. Les ayudaremos a encontrar la propiedad ideal y les acompañaremos en todo el proceso.",
      
      ctaFinal: "¿Listo para tu aventura en el Atlántico?"
    },
    en: {
      slogan: "Private sailing charter in Tenerife",
      titulo1: "Discover Tenerife",
      titulo2: "From the Sea",
      descripcion: "Sail with us, discover Tenerife and create memories that will last a lifetime.",
      btnWhatsapp: "Book via WhatsApp",
      btnEmail: "Contact via Email",
      derechos: "All rights reserved.",
      mensajeWa: "Hello! I am interested in renting the León sailboat. Can I get more information?",
      asuntoEmail: "León%20Sailboat%20Rental%20Inquiry",
      
      secTenerife: "A Paradise Waiting to Be Discovered",
      tenP1: "There are places you visit, and there are places you truly experience. Tenerife belongs to the latter. Surrounded by the deep blue waters of the Atlantic Ocean and shaped by the power of volcanic forces, the island offers some of the most breathtaking seascapes in the world.",
      tenP2: "Aboard our elegant 12-metre sailing yacht, we invite you to discover a different side of Tenerife. Sail alongside spectacular volcanic cliffs, admire hidden caves, and enjoy watching whales and dolphins in their natural habitat. An unforgettable experience that will stay with you forever.",
      
      secUbicacion: "Departure & Routes",
      ubiPuertoTitulo: "Marina del Sur, Las Galletas",
      ubiPuertoDesc: "Our sailboat departs from the charming port of Marina del Sur, located just 15 km from Tenerife South Airport. An ideal and easily accessible starting point.",
      ubiRutasTitulo: "Where we can sail",
      ubiRutasDesc: "Depending on the days you charter, we can sail along the coast of Tenerife or embark on longer journeys to our neighboring islands: La Gomera, La Palma, or El Hierro.",
      
      secHistoria: "Our Story",
      histSub: "Welcome Aboard León.",
      histP1: "We are a family united by our love for the sea, adventure, and the beauty of Tenerife. Our story began years ago during a sailing holiday in Italy, where we met. Since then, sailing has become a way of life that we now share with our daughter Isabel.",
      histP2: "The captain of León has extensive sailing experience and a degree in Engineering, ensuring the highest standards of safety. As an interior designer and real estate agent, I take care of every detail to ensure our guests enjoy a special and personalized experience.",
      
      secInmo: "Your Home in Tenerife",
      inmoDesc: "If during your stay you discover that Tenerife is a place where you would like to live or invest, we would be delighted to assist you as real estate agents. We will help you find the ideal property and guide you through every step of the process.",
      
      ctaFinal: "Ready for your Atlantic adventure?"
    }
  };

  const t = textos[idioma as keyof typeof textos];
  const mensajeWhatsApp = encodeURIComponent(t.mensajeWa);
  
  return (
    <main className="w-full font-sans bg-[#F8FAFC]">
      
      {/* Audio oculto */}
      <audio ref={audioRef} src="/musica.mp3" loop />
      
      {/* --- Portada (Hero Section) con Vídeo --- */}
      <section className="relative min-h-screen w-full flex flex-col justify-between p-6 md:p-12 text-white overflow-hidden">
        
        {/* Vídeo de Fondo */}
        <div className="absolute inset-0 z-0 bg-black">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-60 pointer-events-none"
          >
            <source src="/video_barco.mp4" type="video/mp4" />
          </video>
        </div>

        <header className="relative z-10 flex justify-between items-center w-full">
          <div className="flex items-center gap-4">
            <Image 
              src="/logo-limpio.png" 
              alt="Leon Tenerife" 
              width={180} 
              height={60} 
              className="object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" 
            />
          </div>

          <div className="flex items-center gap-4">
            
            {/* Botón de Música */}
            <button 
              onClick={toggleAudio}
              className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-black/20 backdrop-blur-md rounded-full border border-white/20 text-white transition-all hover:bg-white/20 hover:scale-105"
              title={isPlaying ? "Pausar música" : "Reproducir música"}
            >
              {isPlaying ? (
                // Icono de volumen activo
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77zM16.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM3 9v6h4l5 5V4L7 9H3z"/></svg>
              ) : (
                // Icono de volumen silenciado
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>
              )}
            </button>

            {/* Botonera de banderas para idiomas */}
            <div className="flex items-center gap-2 bg-black/20 backdrop-blur-md rounded-full p-1.5 border border-white/20">
              <button 
                onClick={() => setIdioma("es")}
                className={`relative w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden transition-all duration-300 ${
                  idioma === "es" ? "ring-2 ring-white scale-110 shadow-lg" : "opacity-60 hover:opacity-100"
                }`}
                title="Español"
              >
                <Image src="/es.png" alt="Español" fill className="object-cover" />
              </button>
              <button 
                onClick={() => setIdioma("en")}
                className={`relative w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden transition-all duration-300 ${
                  idioma === "en" ? "ring-2 ring-white scale-110 shadow-lg" : "opacity-60 hover:opacity-100"
                }`}
                title="English"
              >
                <Image src="/en.png" alt="English" fill className="object-cover" />
              </button>
            </div>
          </div>
        </header>

        {/* Textos principales de la portada */}
        <div className="relative z-10 max-w-3xl my-auto pt-12 md:pt-0">
          <span className="inline-block py-1 px-3 mb-6 border border-sky-400/50 rounded-full text-sky-300 text-xs md:text-sm font-semibold tracking-widest uppercase backdrop-blur-sm bg-black/20">
            {t.slogan}
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight transition-all duration-300 drop-shadow-lg">
            {t.titulo1} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-blue-200">
              {t.titulo2}
            </span>
          </h1>
          
          <p className="mt-6 text-lg md:text-2xl text-gray-100 font-light leading-relaxed transition-all duration-300 max-w-2xl border-l-2 border-sky-400 pl-4 drop-shadow-md">
            "{t.descripcion}"
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <a href={`https://wa.me/${telefonoWhatsApp}?text=${mensajeWhatsApp}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 px-8 py-4 bg-emerald-600 hover:bg-emerald-500 font-semibold rounded-xl shadow-[0_0_20px_rgba(5,150,105,0.4)] transition-all transform hover:-translate-y-0.5 backdrop-blur-sm w-fit">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397 0 11.93 0c3.165.001 6.14 1.233 8.377 3.469 2.237 2.236 3.468 5.21 3.46 8.377-.018 6.585-5.354 11.933-11.886 11.933-2.001-.002-3.974-.509-5.711-1.472L0 24zm6.59-4.846c1.6.95 3.182 1.449 4.745 1.45 5.332 0 9.673-4.34 9.686-9.674.006-2.585-1.002-5.016-2.837-6.853A9.559 9.559 0 0 0 11.93 2.7c-5.338 0-9.682 4.346-9.694 9.682-.005 1.706.452 3.37 1.326 4.834L2.51 21.49l4.137-1.336z"/></svg>
              {t.btnWhatsapp}
            </a>
          </div>

          {/* TEXTO DE RESPALDO EN PORTADA */}
          <div className="mt-4 flex flex-col gap-1 text-white/80 text-sm md:text-base font-light drop-shadow-md">
            <p className="flex items-center gap-2">📞 {telefonoFormateado}</p>
            <p className="flex items-center gap-2">✉️ {emailContactobarco}</p>
          </div>

        </div>

        {/* Icono animado para indicar que hay scroll hacia abajo */}
        <div className="relative z-10 w-full flex justify-center pb-4 opacity-80 animate-bounce hidden md:flex drop-shadow-md">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
        </div>
      </section>

      {/* --- Sección: La experiencia --- */}
      <section className="py-20 px-6 md:px-12 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-8">
          {t.secTenerife}
        </h2>
        <div className="space-y-6 text-lg text-slate-600 font-light leading-relaxed">
          <p>{t.tenP1}</p>
          <p>{t.tenP2}</p>
        </div>
      </section>

      {/* --- Sección: Ubicación y Rutas --- */}
      <section className="py-16 px-6 md:px-12 bg-white border-t border-slate-200">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Tarjeta de Ubicación */}
            <div className="flex gap-4 p-6 bg-slate-50 rounded-3xl border border-slate-100 hover:shadow-md transition-shadow">
              <div className="text-4xl">📍</div>
              <div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">{t.ubiPuertoTitulo}</h4>
                <p className="text-slate-600 font-light leading-relaxed text-sm md:text-base">
                  {t.ubiPuertoDesc}
                </p>
              </div>
            </div>

            {/* Tarjeta de Rutas */}
            <div className="flex gap-4 p-6 bg-slate-50 rounded-3xl border border-slate-100 hover:shadow-md transition-shadow">
              <div className="text-4xl">🗺️</div>
              <div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">{t.ubiRutasTitulo}</h4>
                <p className="text-slate-600 font-light leading-relaxed text-sm md:text-base">
                  {t.ubiRutasDesc}
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Sección: Historia e Inmobiliaria */}
      <section className="bg-white py-20 px-6 md:px-12 border-y border-slate-200">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          <div>
            <span className="text-sky-600 font-bold tracking-widest uppercase text-sm mb-2 block">
              {t.secHistoria}
            </span>
            <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">
              {t.histSub}
            </h3>
            <div className="space-y-4 text-slate-600 font-light leading-relaxed">
              <p>{t.histP1}</p>
              <p>{t.histP2}</p>
            </div>
          </div>

          {/* Tarjeta destacada para la parte inmobiliaria */}
          <div className="bg-slate-50 p-8 md:p-10 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
            <div className="absolute top-0 right-0 w-32 h-32 bg-sky-100 rounded-bl-full -z-0 opacity-50 group-hover:scale-110 transition-transform duration-500"></div>
            <div className="relative z-10">
              <div className="text-4xl mb-4">🗝️</div>
              <h4 className="text-2xl font-bold text-slate-900 mb-4">
                {t.secInmo}
              </h4>
              <p className="text-slate-600 font-light leading-relaxed mb-6">
                {t.inmoDesc}
              </p>
              <a href={`mailto:${emailContactoalquiler}?subject=Real%20Estate%20Inquiry`} className="inline-flex items-center text-sky-600 font-semibold hover:text-sky-700 transition-colors">
                {t.btnEmail} <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* Llamada a la acción final */}
      <section className="bg-slate-900 text-white py-24 px-6 md:px-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-10">{t.ctaFinal}</h2>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href={`https://wa.me/${telefonoWhatsApp}?text=${mensajeWhatsApp}`} target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 font-semibold rounded-xl transition-all flex items-center justify-center gap-2">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397 0 11.93 0c3.165.001 6.14 1.233 8.377 3.469 2.237 2.236 3.468 5.21 3.46 8.377-.018 6.585-5.354 11.933-11.886 11.933-2.001-.002-3.974-.509-5.711-1.472L0 24zm6.59-4.846c1.6.95 3.182 1.449 4.745 1.45 5.332 0 9.673-4.34 9.686-9.674.006-2.585-1.002-5.016-2.837-6.853A9.559 9.559 0 0 0 11.93 2.7c-5.338 0-9.682 4.346-9.694 9.682-.005 1.706.452 3.37 1.326 4.834L2.51 21.49l4.137-1.336z"/></svg>
              {t.btnWhatsapp}
            </a>
            <a href={`mailto:${emailContactobarco}?subject=${t.asuntoEmail}`} className="px-8 py-4 bg-white/10 hover:bg-white/20 font-semibold rounded-xl transition-all">
              {t.btnEmail}
            </a>
          </div>

          {/* TEXTO DE RESPALDO EN FOOTER */}
          <div className="mt-8 pt-6 border-t border-white/10 text-slate-400 text-sm font-light flex flex-col md:flex-row justify-center items-center gap-2 md:gap-6">
            <p>📞 {telefonoFormateado}</p>
            <p className="hidden md:block">|</p>
            <p>✉️ {emailContactobarco}</p>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-500 py-8 px-6 text-center text-sm">
        <p>© {new Date().getFullYear()} Leon Sailing Tenerife. {t.derechos}</p>
      </footer>

    </main>
  );
}
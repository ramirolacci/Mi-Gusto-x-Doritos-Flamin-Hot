import React, { useRef, useEffect, useState } from 'react';
import Reveal from './Reveal';
import SteamOverlay from './SteamOverlay';
import FlameCanvas from './FlameCanvas';
import Confetti from './Confetti';
// import { Bell } from 'lucide-react';

const ProductShowcase: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const epicRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [postArrivalProgress, setPostArrivalProgress] = useState(0); // progreso extra luego de que la empanada llega al contador
  const [edgeProgress, setEdgeProgress] = useState(0); // progreso para imágenes a los bordes tras el logo
  // Notificaciones eliminadas por solicitud
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [logoRevealed, setLogoRevealed] = useState(false);
  const [logoFlash, setLogoFlash] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const launchDate = new Date('2025-10-16T00:00:00');
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = launchDate.getTime() - now;
      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Intersection Observer para el logo reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !logoRevealed) {
            setLogoRevealed(true);
            setShowConfetti(true);
            // Reset confetti después de 3 segundos
            setTimeout(() => setShowConfetti(false), 3000);
          }
        });
      },
      {
        threshold: 0.3, // Se dispara cuando el 30% del logo es visible
        rootMargin: '0px 0px -50px 0px' // Se dispara un poco antes de que esté completamente visible
      }
    );

    if (logoRef.current) {
      observer.observe(logoRef.current);
    }

    return () => {
      if (logoRef.current) {
        observer.unobserve(logoRef.current);
      }
    };
  }, [logoRevealed]);

  // Función para el click del logo
  const handleLogoClick = () => {
    setLogoFlash(true);
    setTimeout(() => setLogoFlash(false), 2000); // Reset después de 2 segundos
  };

  useEffect(() => {
    const update = () => {
      const target = epicRef.current;
      if (!target) return;
      const rect = target.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const start = vh;           // cuando el top del bloque está en la parte baja de la pantalla
      const end = vh * 0.35;      // hasta que llega a 35% de la pantalla
      const raw = 1 - (rect.top - end) / (start - end);
      const clamped = Math.max(0, Math.min(1, raw));
      setScrollProgress(clamped);

      // progreso adicional una vez que rect.top pasó por debajo de "end" (empanada ya llegó)
      const overshoot = (end - rect.top) / (vh * 0.35); // 0→1 en ~35% del viewport adicional
      const overshootClamped = Math.max(0, Math.min(1, overshoot));
      setPostArrivalProgress(overshootClamped);

      // Progreso para las imágenes a los bordes tras el LogoEmp
      const logo = logoRef.current;
      if (logo) {
        const logoRect = logo.getBoundingClientRect();
        const startLogo = vh;        // top del bloque en la parte baja
        const endLogo = vh * 0.45;   // hasta que llega cerca de la mitad superior
        const rawLogo = 1 - (logoRect.top - endLogo) / (startLogo - endLogo);
        // Gate: que empiece a 0 y recién se active cerca del LogoEmp
        const gated = Math.max(0, Math.min(1, (rawLogo - 0.8) / 0.2)); // activa ~80%→100%
        setEdgeProgress(gated);
      }
    };
    const onScroll = () => requestAnimationFrame(update);
    update();
    window.addEventListener('scroll', onScroll, { passive: true } as any);
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-28 relative overflow-hidden">
      {(() => { /* easing precomputado para transiciones suaves en bordes */ return null; })()}
      {/* Background más intenso */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/70 to-black" />
      <div className="absolute inset-0 gradient-bg opacity-80" />
      {/* Fade superior para fusionar con el video */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/80 via-black/40 to-transparent" />
      {/* Fade inferior para transición hacia CTA */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Empanada Revolucionaria: mover debajo del video (al inicio de esta sección) */}
        <div className="text-center mb-14 md:mb-16">
          {/* Logo grande arriba del título */}
          <div ref={logoRef} className="mb-2 -mt-16 md:-mt-20 lg:-mt-24 relative">
            <img
              src="/LogoEmp.png"
              alt="Logo Empanada"
              onClick={handleLogoClick}
              className={`mx-auto w-96 md:w-[28rem] lg:w-[32rem] xl:w-[56rem] h-auto cursor-pointer transition-all duration-1000 ${
                logoRevealed ? 'opacity-100 translate-y-0 scale-100 shine logo-float' : 'opacity-0 translate-y-10 scale-95'
              } ${logoFlash ? 'logo-flash' : ''}`}
            />
            {/* Confetti con Tubito.png - por encima del logo */}
            <div className="absolute inset-0 z-50">
              <Confetti 
                trigger={showConfetti} 
                imageSrc="/Tubito.png" 
                count={15} 
                duration={2500} 
              />
            </div>
            {/* Imágenes a bordes de pantalla que aparecen tras el logo */}
            <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-1/2 w-screen -z-[1]">
              {/* Izquierda: TubitoDinamita2 */}
              <Reveal effect="fade" className="hidden md:block absolute left-0 -translate-y-1/2">
                <img
                  src="/TubitoDinamita2.png"
                  alt="Tubito Dinamita (izquierda)"
                  className="w-40 md:w-48 lg:w-56 will-change-transform"
                  style={{
                    filter: 'drop-shadow(0 10px 20px rgba(255,0,64,0.25))',
                    transition: 'transform 600ms cubic-bezier(.22,.61,.36,1), opacity 600ms ease',
                    opacity: 0.1 + edgeProgress * 0.9,
                    transform: `translateX(${(-80 + edgeProgress * 58)}%)`
                  }}
                  loading="lazy"
                />
              </Reveal>
              {/* Derecha: TubitoDinamita */}
              <Reveal effect="fade" delay={1} className="hidden md:block absolute right-0 -translate-y-1/2">
                <img
                  src="/TubitoDinamita.png"
                  alt="Tubito Dinamita (derecha)"
                  className="w-44 md:w-52 lg:w-60 will-change-transform"
                  style={{
                    filter: 'drop-shadow(0 12px 24px rgba(255,0,64,0.3))',
                    transition: 'transform 600ms cubic-bezier(.22,.61,.36,1), opacity 600ms ease',
                    opacity: 0.1 + edgeProgress * 0.9,
                    transform: `translateX(${(80 - edgeProgress * 58)}%)`
                  }}
                  loading="lazy"
                />
              </Reveal>
            </div>
          </div>
          <Reveal effect="slide-up">
            <h2 className="text-5xl md:text-6xl font-black flame-text font-['Bebas_Neue'] mb-6">
              EMPANADA REVOLUCIONARIA
            </h2>
          </Reveal>
          <Reveal effect="fade" delay={1}>
            <p className="text-purple-200 text-xl max-w-3xl mx-auto">
              Cada mordida es una explosión de sabor que combina la tradición argentina con la intensidad única de Doritos Flamin' Hot
            </p>
          </Reveal>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-center mb-20">
          {/* Main Product 3D */}
          <div className="lg:col-span-2">
            <div className="relative">
              <div className="relative rounded-3xl p-2 md:p-4 border border-fuchsia-500/20 overflow-visible bg-transparent">
                {/* FlameCanvas de toda la card (único, desde el borde inferior) */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                  <FlameCanvas className="absolute inset-0" density={2.5} colorAlpha={1.2} shadowBlur={25} />
                </div>
                
                {/* Contenedor del modelo 3D - se extiende sin límites */}
                <div className="relative z-5 w-full h-[600px] md:h-[700px] lg:h-[800px] -m-2 md:-m-4">
                  {/* Vapor detras */}
                  <div className="pointer-events-none absolute inset-0 z-0">
                    <SteamOverlay intensity={0.85} className="absolute inset-0" />
                  </div>
                  <model-viewer
                    src="/Doritos-3D.glb"
                    alt="Empanada Premium con Doritos Flamin' Hot"
                    camera-controls
                    auto-rotate
                    shadow-intensity="0.8"
                    exposure="1.0"
                    interaction-prompt="none"
                    disable-zoom
                    camera-orbit="90deg 75deg 160%"
                    min-camera-orbit="auto auto 140%"
                    field-of-view="45deg"
                    min-field-of-view="40deg"
                    tone-mapping="neutral"
                    style={{ 
                      width: 'calc(100% + 32px)', 
                      height: 'calc(100% + 64px)', 
                      outline: 'none', 
                      background: 'transparent', 
                      position: 'absolute',
                      top: '-32px',
                      left: '-16px',
                      zIndex: 1,
                      transform: 'scale(0.95)'
                    }}
                  />
                </div>
                
                {/* Textos superpuestos: el modelo queda por detrás */}
                <div className="absolute left-0 right-0 bottom-6 md:bottom-8 z-20 text-center px-4">
                  <h3 className="text-2xl font-bold text-white mb-1 md:mb-2 drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]">Empanada Premium</h3>
                  <p className="text-fuchsia-300 drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">Con Doritos Flamin' Hot</p>
                </div>
              </div>
            </div>
            {/* Marquee: Pican, pero rico! */}
            <div className="hidden">
              <div className="marquee bg-gradient-to-r from-red-600 via-orange-600 to-red-600 border-y border-fuchsia-500/30 py-3">
                <div className="marquee-track text-black font-bold tracking-wide">
                  <span className="text-2xl md:text-3xl font-['Bebas_Neue'] px-6 whitespace-nowrap">Pican, pero rico!  a0 a0 a0 a0 Pican, pero rico!  a0 a0 a0 a0 Pican, pero rico!  a0 a0 a0 a0 Pican, pero rico!</span>
                  <span className="text-2xl md:text-3xl font-['Bebas_Neue'] px-6 whitespace-nowrap">Pican, pero rico!  a0 a0 a0 a0 Pican, pero rico!  a0 a0 a0 a0 Pican, pero rico!  a0 a0 a0 a0 Pican, pero rico!</span>
                </div>
              </div>
            </div>
          </div>

          {/* Detalles del producto a la derecha del 3D */}
          <div className="features-epic space-y-6 lg:mt-0 lg:pl-12 lg:border-l lg:border-fuchsia-500/20 lg:self-stretch lg:flex lg:flex-col lg:justify-center">
            {[ 
              {
                title: "Masa Artesanal",
                description: "Elaborada con la receta tradicional de Mi Gusto, perfecta para contener toda la intensidad",
                icon: "🥟"
              },
              {
                title: "Relleno Intenso",
                description: "Carne premium sazonada con especias que complementan el Flamin' Hot",
                icon: "🔥"
              },
              {
                title: "Topping Crujiente",
                description: "Doritos Flamin' Hot molidos incorporados para un contraste de texturas único",
                icon: (
                  <img
                    src="/dorito.png"
                    alt="Dorito"
                    className="w-12 h-12 md:w-14 md:h-14 inline-block"
                    loading="lazy"
                  />
                )
              }
            ].map((item, index) => (
              <Reveal key={index} effect="scale" delay={(index % 3) as 0 | 1 | 2}>
                <div className="feature-card-pro">
                  <div className="flex items-start gap-4">
                  <div className="feature-icon-pro">
                    {typeof item.icon === 'string' ? (
                      <span className="text-3xl md:text-4xl">{item.icon}</span>
                    ) : (
                      item.icon
                    )}
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg md:text-xl mb-1 leading-tight tracking-wide">{item.title}</h4>
                    <p className="text-purple-200 leading-relaxed text-sm md:text-base max-w-sm">{item.description}</p>
                  </div>
                </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Section Header (badge removido) */}
        <div className="text-center mb-14 md:mb-16">
          <div ref={epicRef} className="relative inline-block">
            <h3 className="text-6xl md:text-7xl lg:text-8xl leading-none tracking-wide font-black flame-text text-shadow-glow font-['Bebas_Neue'] mb-8">
              ALGO EPICO ESTA LLEGANDO
            </h3>
            {/* Imagen izquierda */}
            <img
              src="/CRUNCHY.png"
              alt="Empanada abierta"
              className="pointer-events-none hidden md:block absolute -left-6 md:-left-16 top-1/2 w-72 md:w-96 lg:w-[28rem] drop-shadow-2xl z-30 will-change-transform"
              style={{
                transform: `translateY(-50%) translateX(${(-56 + 44 * scrollProgress)}vw) scale(${0.9 + 0.25 * scrollProgress})`,
                opacity: Math.min(1, Math.max(0, scrollProgress))
              }}
              loading="lazy"
            />
            {/* Doritos Tubito Dinamita detrás de la empanada izquierda */}
            {(() => {
              // Revelar solo después de que la empanada llegue al contador
              // Al inicio (reveal=0) quedan exactamente DETRÁS de la empanada y no se ven
              const reveal = Math.max(0, Math.min(1, (postArrivalProgress - 0.05) / 0.95));
              const empanadaX = -56 + 44 * scrollProgress; // posición de la empanada (más cerca del contador)
              const tubitosX = empanadaX - (6 * Math.max(0, reveal)); // desplazamiento lateral levemente mayor
              const tubitosY = -50 - 2 * Math.max(0, reveal); // ligera subida
              return (
                <img
                  src="/TubitoDinamita.png"
                  alt="Doritos Dinamita"
                  className="pointer-events-none hidden md:block absolute -left-6 md:-left-16 top-1/2 w-48 md:w-56 lg:w-64 will-change-transform z-[5]"
                  style={{
                    transform: `translate(-0%, ${tubitosY}%) translateX(${tubitosX}vw) rotate(-10deg) scale(${0.82 + 0.16 * Math.max(0, reveal)})`,
                    opacity: Math.max(0, reveal),
                    filter: 'drop-shadow(0 12px 24px rgba(255,0,64,0.35))'
                  }}
                  loading="lazy"
                />
              );
            })()}
          </div>
        </div>

      </div>
    </section>
  );
};

export default ProductShowcase;
import React, { useRef, useEffect, useState } from 'react';
import SteamOverlay from './SteamOverlay';
import FlameCanvas from './FlameCanvas';

const ProductShowcase: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const epicRef = useRef<HTMLDivElement>(null);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [scrollProgress, setScrollProgress] = useState(0);

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
      {/* Background más intenso */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/70 to-black" />
      <div className="absolute inset-0 gradient-bg opacity-80" />
      {/* Fade superior para fusionar con el video */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/80 via-black/40 to-transparent" />
      {/* Fade inferior para transición hacia CTA */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Section Header (badge removido) */}
        <div className="text-center mb-14 md:mb-16">
          <div ref={epicRef} className="relative inline-block">
            <h3 className="text-6xl md:text-7xl lg:text-8xl leading-none tracking-wide font-black flame-text text-shadow-glow font-['Bebas_Neue'] mb-8">
              ALGO EPICO ESTA LLEGANDO
            </h3>
            {/* Imagen izquierda */}
            <img
              src="/burgerLoading.png"
              alt="Empanada abierta"
              className="pointer-events-none hidden md:block absolute -left-6 md:-left-16 top-1/2 w-72 md:w-96 lg:w-[28rem] drop-shadow-2xl z-10 will-change-transform"
              style={{
                transform: `translateY(-50%) translateX(${(-52 + 40 * scrollProgress)}vw) scale(${0.9 + 0.25 * scrollProgress})`,
                opacity: Math.min(1, Math.max(0, scrollProgress))
              }}
              loading="lazy"
            />
            {/* Imagen derecha */}
            <img
              src="/DORITOS_flamin%27hot.png"
              alt="Bolsa Doritos Flamin Hot"
              className="pointer-events-none hidden md:block absolute -right-6 md:-right-16 top-1/2 w-56 md:w-72 lg:w-80 drop-shadow-2xl z-10 will-change-transform"
              style={{
                transform: `translateY(-50%) translateX(${(52 - 40 * scrollProgress)}vw) scale(${0.9 + 0.25 * scrollProgress})`,
                opacity: Math.min(1, Math.max(0, scrollProgress))
              }}
              loading="lazy"
            />
            {/* Countdown movido aquí (mismo tamaño que el original) */}
            <div className="relative z-20 bg-gradient-to-br from-purple-900/40 to-fuchsia-900/40 rounded-3xl p-10 lg:p-14 border border-fuchsia-500/20 mb-16 inline-block">
              <div className="grid grid-cols-4 gap-8">
                {[
                  { value: timeLeft.days, label: 'DÍAS' },
                  { value: timeLeft.hours, label: 'HORAS' },
                  { value: timeLeft.minutes, label: 'MINUTOS' },
                  { value: timeLeft.seconds, label: 'SEGUNDOS' }
                ].map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="bg-gradient-to-br from-fuchsia-600 to-purple-600 rounded-2xl p-8 mb-4 pulse-glow">
                      <div className="text-5xl lg:text-6xl font-black text-white font-['Bebas_Neue']">
                        {item.value.toString().padStart(2, '0')}
                      </div>
                    </div>
                    <div className="text-fuchsia-300 font-semibold text-base tracking-wider">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <h2 className="text-5xl md:text-6xl font-black flame-text font-['Bebas_Neue'] mb-6">
            EMPANADA REVOLUCIONARIA
          </h2>
          <p className="text-purple-200 text-xl max-w-3xl mx-auto">
            Cada mordida es una explosión de sabor que combina la tradición argentina con la intensidad única de Doritos Flamin' Hot
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-center mb-20">
          {/* Main Product 3D */}
          <div className="lg:col-span-2">
            <div className="relative">
              <div className="relative rounded-3xl p-4 md:p-8 border border-fuchsia-500/20 overflow-hidden bg-black">
                {/* FlameCanvas de toda la card (único, desde el borde inferior) */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                  <FlameCanvas className="absolute inset-0" density={1.2} colorAlpha={0.9} shadowBlur={18} />
                </div>
                <div className="relative z-10 h-[420px] md:h-96 flex items-center justify-center">
                  <div className="w-full h-full max-w-3xl mx-auto">
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
                      camera-orbit="15deg 70deg 85%"
                      field-of-view="23deg"
                      tone-mapping="neutral"
                      style={{ width: '100%', height: '100%', outline: 'none', background: 'transparent', position: 'relative', zIndex: 1 }}
                    />
                  </div>
                </div>
                <div className="relative z-10 text-center mt-4 md:mt-6">
                  <h3 className="text-2xl font-bold text-white mb-2">Empanada Premium</h3>
                  <p className="text-fuchsia-300">Con topping Doritos Flamin' Hot</p>
                </div>
              </div>
            </div>
          </div>

          {/* Detalles del producto a la derecha del 3D */}
          <div className="space-y-7 lg:mt-0 lg:pl-12 lg:border-l lg:border-fuchsia-500/20 lg:self-stretch lg:flex lg:flex-col lg:justify-center">
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
                    className="w-8 h-8 inline-block"
                    loading="lazy"
                  />
                )
              }
            ].map((item, index) => (
              <div key={index} className="text-left p-0 border-0 bg-transparent">
                <div className="flex items-start gap-4 min-h-[56px]">
                  <div className="text-2xl mt-1">{item.icon}</div>
                  <div>
                    <h4 className="text-white font-bold text-base mb-1 leading-tight">{item.title}</h4>
                    <p className="text-purple-300 leading-snug text-sm max-w-sm">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default ProductShowcase;
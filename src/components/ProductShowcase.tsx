import React, { useRef, useEffect, useState } from 'react';
import SteamOverlay from './SteamOverlay';
import FlameCanvas from './FlameCanvas';
import Confetti from './Confetti';
import { Bell } from 'lucide-react';

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
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>('default');
  const [notificationScheduled, setNotificationScheduled] = useState(false);
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
      } else if (distance <= 0 && notificationPermission === 'granted' && !notificationScheduled) {
        // Cuando el contador llega a 0, enviar notificación con vibración
        if ('Notification' in window) {
          // Vibración en móviles si está disponible
          if ('vibrate' in navigator) {
            navigator.vibrate([200, 100, 200, 100, 200]); // Patrón de vibración épico
          }
          
          new Notification('¡La empanada ya está aquí! 🔥', {
            body: 'Mi Gusto × Doritos Flamin\' Hot ya está disponible. ¡No te la pierdas!',
            icon: '/Logo Mi Gusto 2025.png',
            badge: '/dorito.png',
            tag: 'empanada-launch',
            requireInteraction: true,
            silent: false
          });
          setNotificationScheduled(true);
        }
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [notificationPermission, notificationScheduled]);

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
                  <FlameCanvas className="absolute inset-0" density={2.5} colorAlpha={1.2} shadowBlur={25} />
                </div>
                <div className="relative z-10 h-[520px] md:h-[560px] lg:h-[600px] flex items-center justify-center">
                  <div className="w-full h-full max-w-4xl mx-auto">
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
                      camera-orbit="90deg 75deg 78%"
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
              <div key={index} className="feature-card-pro">
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
            {/* Tubito Dinamita derecho: coreografía espejada del izquierdo, tamaño menor y detrás del Flamin Hot */}
            {(() => {
              const reveal = Math.max(0, Math.min(1, (postArrivalProgress - 0.05) / 0.95));
              // Posición de referencia para el lado derecho (espejo del cálculo de la empanada izquierda)
              const flaminX = 52 - 40 * scrollProgress;
              const tubitosXRight = flaminX + (6 * reveal);
              const tubitosYRight = -50 - 2 * reveal;
              const scaleRight = 0.82 + 0.16 * reveal; // misma curva de escala
              return (
                <img
                  src="/TubitoDinamita2.png"
                  alt="Tubito Dinamita"
                  className="pointer-events-none hidden md:block absolute -right-6 md:-right-16 top-1/2 w-36 md:w-44 lg:w-56 will-change-transform z-[9]"
                  style={{
                    transform: `translate(-0%, ${tubitosYRight}%) translateX(${tubitosXRight}vw) rotate(10deg) scale(${scaleRight})`,
                    opacity: Math.max(0, reveal),
                    filter: 'drop-shadow(0 10px 20px rgba(255,0,64,0.25))'
                  }}
                  loading="lazy"
                />
              );
            })()}
            
            {/* Imagen derecha - Flamin Hot */}
            <img
              src="/FlaminHot.png"
              alt="Doritos Flamin' Hot"
              className="pointer-events-none hidden md:block absolute -right-6 md:-right-16 top-1/2 w-72 md:w-96 lg:w-[28rem] drop-shadow-2xl z-20 will-change-transform"
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
              {/* Botón de notificaciones debajo del countdown */}
              <div className="mt-8 flex justify-center">
                <button
                  onClick={async () => {
                    try {
                      if ('Notification' in window) {
                        const permission = await Notification.requestPermission();
                        setNotificationPermission(permission);
                        if (permission === 'granted') {
                          // Vibración de confirmación en móviles
                          if ('vibrate' in navigator) {
                            navigator.vibrate([100, 50, 100]); // Vibración de confirmación
                          }
                          
                          // Mostrar confirmación visual
                          const button = event?.target as HTMLButtonElement;
                          if (button) {
                            button.textContent = '¡Notificaciones activadas! 🔔';
                            button.className = button.className.replace('from-fuchsia-600 to-purple-600', 'from-green-600 to-emerald-600');
                            setTimeout(() => {
                              button.textContent = 'Notificaciones activadas';
                              button.className = button.className.replace('from-green-600 to-emerald-600', 'from-fuchsia-600 to-purple-600');
                            }, 2000);
                          }
                        }
                      }
                    } catch (err) {
                      console.error('Error requesting notification permission:', err);
                    }
                  }}
                  className="group px-6 py-3 bg-gradient-to-r from-fuchsia-600 to-purple-600 rounded-full text-white font-semibold text-sm shadow-lg hover:from-fuchsia-500 hover:to-purple-500 transition-all duration-300 transform hover:scale-105"
                >
                  <span className="inline-flex items-center gap-2">
                    <Bell className="w-4 h-4" />
                    {notificationPermission === 'granted' ? 'Notificaciones activadas' : 'Activar Notificaciones'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

      {/* Marquee: Pican, pero rico! (debajo del contador, ancho completo) */}
      <div className="relative z-10 mt-6">
        <div className="marquee bg-gradient-to-r from-fuchsia-700/80 via-purple-700/80 to-fuchsia-700/80 border-y-2 border-fuchsia-500/50 py-6 md:py-7">
          <div className="marquee-track text-black font-extrabold tracking-tight drop-shadow-[0_2px_2px_rgba(0,0,0,0.25)]">
            <span className="text-5xl md:text-7xl lg:text-8xl font-['Bebas_Neue'] uppercase px-10 whitespace-nowrap">Pican, pero rico! — Pican, pero rico! — Pican, pero rico! — Pican, pero rico!</span>
            <span className="text-5xl md:text-7xl lg:text-8xl font-['Bebas_Neue'] uppercase px-10 whitespace-nowrap">Pican, pero rico! — Pican, pero rico! — Pican, pero rico! — Pican, pero rico!</span>
          </div>
        </div>
      </div>


      </div>
    </section>
  );
};

export default ProductShowcase;
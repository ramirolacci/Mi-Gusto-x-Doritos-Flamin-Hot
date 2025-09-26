import React, { useEffect, useState } from 'react';
import { Flame, Bell } from 'lucide-react';

const Hero: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [diagonalAngle, setDiagonalAngle] = useState<number>(0);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Calcular el ángulo de la diagonal del viewport para alinear las cintas con las esquinas
  useEffect(() => {
    const computeAngle = () => {
      const w = window.innerWidth || 1;
      const h = window.innerHeight || 1;
      const deg = (Math.atan2(h, w) * 180) / Math.PI;
      setDiagonalAngle(deg);
    };
    computeAngle();
    window.addEventListener('resize', computeAngle);
    return () => window.removeEventListener('resize', computeAngle);
  }, []);

  // Offsets (en vh) para posicionar cada cinta con precisión
  const ribbonOffsetLeftVh = 52;   // franja que sale desde la izquierda
  const ribbonOffsetRightVh = 36;  // franja que sale desde la derecha (ajustable)
  const showMarquees = false; // bandera para ocultar/mostrar las franjas

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pb-16 md:pb-24">
      {/* Botón flotante de notificaciones */}
      <button
        onClick={async () => {
          try {
            if ('Notification' in window) {
              await Notification.requestPermission();
            }
          } catch (err) {
            // noop
          }
        }}
        className="fixed top-5 right-5 z-50 px-4 py-2 rounded-full bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white font-semibold text-sm shadow-lg hover:from-fuchsia-500 hover:to-purple-500 transition-colors"
      >
        <span className="inline-flex items-center gap-2">
          <Bell className="w-4 h-4" />
          Activar Notificaciones
        </span>
      </button>
      {/* Video de fondo */}
      <div className="absolute inset-0">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="/BMW M3.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
      </div>
      {/* Sin overlays: el video queda limpio, sin viñeta ni fades */}

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        <div className={`transition-all duration-1000 ${isLoaded ? 'fade-in-up' : 'opacity-0 translate-y-10'}`}>

          {/* Main Title */}
          <h1 className="font-black text-6xl md:text-8xl lg:text-9xl mb-8 leading-none tracking-wide">
            <span className="block flame-text font-['Bebas_Neue']">Mi Gusto</span>
            <span className="block text-white font-['Bebas_Neue'] text-shadow-glow">×</span>
            <span className="block flame-text font-['Bebas_Neue']">DORITOS</span>
          </h1>

          {/* Subtitle */}
          <div className="mb-10">
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 tracking-wide">
              EMPANADA <span className="flame-text flame-fire">FLAMIN' HOT</span>
            </h2>
          </div>

          {/* CTA Button */}
          <div className="flex justify-center items-center">
            <button className="group px-10 py-4 md:px-12 bg-gradient-to-r from-fuchsia-600 to-purple-600 rounded-full text-white font-bold text-lg transition-all duration-300 hover:from-fuchsia-500 hover:to-purple-500 transform hover:scale-105">
              <span className="flex items-center gap-2">
                <Flame className="w-5 h-5 group-hover:animate-bounce" />
                Descubrir Ahora
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Marquees diagonales (ocultos temporalmente con showMarquees) */}
      {showMarquees && (
        <>
          {/* Cinta 1: anclada a esquina inferior izquierda → superior derecha */}
          <div
            className="pointer-events-none absolute z-[5] will-change-transform"
            style={{
              left: 0,
              bottom: 0,
              transformOrigin: 'left bottom',
              transform: `translateY(-${ribbonOffsetLeftVh}vh) rotate(${-diagonalAngle}deg)`,
              width: '220vw'
            }}
          >
            <div className="diagonal-marquee" style={{ ['--marquee-duration' as any]: '14s', ['--marquee-shift' as any]: '100%' }}>
              <div className="marquee-track reverse">
                {/* Duplicación para loop infinito */}
                <div className="marquee-content border-2 border-white bg-black/80">
                  <span className="text-white text-lg md:text-2xl tracking-[0.25em] font-extrabold">
                    EXPERIENCIA DE VERDAD • EXPERIENCIA DE VERDAD • EXPERIENCIA DE VERDAD • EXPERIENCIA DE VERDAD •
                  </span>
                </div>
                <div className="marquee-content border-2 border-white bg-black/80">
                  <span className="text-white text-lg md:text-2xl tracking-[0.25em] font-extrabold">
                    EXPERIENCIA DE VERDAD • EXPERIENCIA DE VERDAD • EXPERIENCIA DE VERDAD • EXPERIENCIA DE VERDAD •
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Cinta 2: igual a la primera, pero saliendo desde la derecha (anclada a esquina superior derecha) */}
          <div
            className="pointer-events-none absolute z-[4] will-change-transform"
            style={{
              right: 0,
              top: 0,
              transformOrigin: 'right top',
              transform: `translateY(${ribbonOffsetRightVh}vh) rotate(${-diagonalAngle}deg)`,
              width: '220vw'
            }}
          >
            <div className="diagonal-marquee" style={{ ['--marquee-duration' as any]: '16s', ['--marquee-shift' as any]: '100%' }}>
              <div className="marquee-track reverse">
                <div className="marquee-content border-2 border-white bg-black/80">
                  <span className="text-white text-lg md:text-2xl tracking-[0.25em] font-extrabold">
                    EXPERIENCIA DE VERDAD • EXPERIENCIA DE VERDAD • EXPERIENCIA DE VERDAD • EXPERIENCIA DE VERDAD •
                  </span>
                </div>
                <div className="marquee-content border-2 border-white bg-black/80">
                  <span className="text-white text-lg md:text-2xl tracking-[0.25em] font-extrabold">
                    EXPERIENCIA DE VERDAD • EXPERIENCIA DE VERDAD • EXPERIENCIA DE VERDAD • EXPERIENCIA DE VERDAD •
                  </span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Floating Product Mockup */}
      <div className="absolute right-10 top-1/2 transform -translate-y-1/2 hidden lg:block">
        <div className="floating">
          <div className="w-64 h-64 bg-gradient-to-br from-fuchsia-500/20 to-purple-600/20 rounded-full blur-3xl pulse-glow" />
        </div>
      </div>

      {/* Scroll Indicator removido */}
    </section>
  );
};

export default Hero;
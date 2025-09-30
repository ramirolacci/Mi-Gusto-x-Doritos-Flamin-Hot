import React, { useEffect, useState, useRef } from 'react';
import FlameCanvas from './FlameCanvas';

const Hero: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollFade, setScrollFade] = useState(0); // 0: sin fade, 1: full fade
  const [curtainProgress, setCurtainProgress] = useState(0); // 0: cerrado, 1: abierto
  const [parallaxOffset, setParallaxOffset] = useState(0);
  const [videoTime, setVideoTime] = useState(0);
  const [diagonalAngle, setDiagonalAngle] = useState<number>(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Efectos cinematográficos avanzados: parallax, curtain reveal y sincronización con video
  useEffect(() => {
    const handleScroll = () => {
      const vh = window.innerHeight || 1;
      const y = window.scrollY || window.pageYOffset || 0;
      
      // Parallax: el video se mueve más lento que el scroll
      const parallaxFactor = 0.5;
      setParallaxOffset(y * parallaxFactor);
      
      // Curtain reveal: barra negra que sube desde abajo
      const curtainStart = vh * 0.3;
      const curtainEnd = vh * 0.8;
      const curtainRaw = (y - curtainStart) / Math.max(1, (curtainEnd - curtainStart));
      const curtainClamped = Math.max(0, Math.min(1, curtainRaw));
      setCurtainProgress(curtainClamped);
      
      // Fade del video con curva más suave
      const fadeStart = vh * 0.2;
      const fadeEnd = vh * 0.7;
      const fadeRaw = (y - fadeStart) / Math.max(1, (fadeEnd - fadeStart));
      const fadeClamped = Math.max(0, Math.min(1, fadeRaw));
      setScrollFade(fadeClamped);
    };
    
    // Sincronización con el video para efectos dinámicos
    const handleVideoTimeUpdate = () => {
      if (videoRef.current) {
        setVideoTime(videoRef.current.currentTime);
      }
    };
    
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true } as any);
    window.addEventListener('resize', handleScroll);
    
    if (videoRef.current) {
      videoRef.current.addEventListener('timeupdate', handleVideoTimeUpdate);
    }
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (videoRef.current) {
        videoRef.current.removeEventListener('timeupdate', handleVideoTimeUpdate);
      }
    };
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
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pb-16 md:pb-24">
      {/* Video de fondo con parallax */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-75"
          src="/BMW M3.mp4"
          autoPlay
          muted
          loop
          playsInline
          style={{
            transform: `translateY(${parallaxOffset}px) scale(1.1)`,
            filter: `brightness(${1 - scrollFade * 0.3}) contrast(${1 + scrollFade * 0.2})`
          }}
        />
        
        {/* Viñeta cinematográfica dinámica */}
        <div
          className="pointer-events-none absolute inset-0 transition-all duration-500"
          style={{
            background: `radial-gradient(120% 80% at 50% 20%, 
              rgba(0,0,0,${0.0 + scrollFade * 0.3}), 
              rgba(0,0,0,${0.25 + scrollFade * 0.4}) 55%, 
              rgba(0,0,0,${0.45 + scrollFade * 0.5}) 85%)`
          }}
        />
        
        {/* Overlay dinámico que cambia con el tiempo del video */}
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300 z-5"
          style={{
            background: `linear-gradient(135deg, 
              rgba(255,0,128,${0.05 + Math.sin(videoTime * 2) * 0.02}) 0%, 
              rgba(147,51,234,${0.03 + Math.cos(videoTime * 1.5) * 0.01}) 50%, 
              rgba(255,94,0,${0.04 + Math.sin(videoTime * 3) * 0.015}) 100%)`
          }}
        />
        
        {/* Curtain reveal: barra negra que sube desde abajo */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 transition-all duration-700 ease-out"
          style={{
            height: `${curtainProgress * 100}%`,
            background: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 70%, transparent 100%)',
            transform: `translateY(${curtainProgress * 20}px)`
          }}
        />
        
        {/* Overlay de fade por scroll con gradiente dinámico */}
        <div
          className="pointer-events-none absolute inset-0 transition-all duration-500"
          style={{
            background: `linear-gradient(180deg, 
              transparent 0%, 
              rgba(0,0,0,${scrollFade * 0.3}) 30%, 
              rgba(0,0,0,${scrollFade * 0.7}) 70%, 
              rgba(0,0,0,${scrollFade * 0.9}) 100%)`
          }}
        />
        
        {/* Gradiente inferior mejorado para transición suave */}
        <div 
          className="pointer-events-none absolute inset-x-0 bottom-0 transition-all duration-500"
          style={{
            height: '60vh',
            background: `linear-gradient(to top, 
              rgba(0,0,0,1) 0%, 
              rgba(0,0,0,0.9) 20%, 
              rgba(0,0,0,0.6) 50%, 
              rgba(0,0,0,0.2) 80%, 
              transparent 100%)`
          }}
        />
        
        {/* Efecto de partículas sutiles que se mueven con el scroll */}
        <div 
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle at ${20 + parallaxOffset * 0.1}% ${30 + parallaxOffset * 0.05}%, rgba(255,0,128,0.1) 0%, transparent 50%),
                             radial-gradient(circle at ${80 - parallaxOffset * 0.1}% ${70 - parallaxOffset * 0.05}%, rgba(147,51,234,0.08) 0%, transparent 50%)`
          }}
        />
      </div>
      {/* Sin overlays: el video queda limpio, sin viñeta ni fades */}

      {/* Main Content con parallax */}
      <div 
        className="relative z-10 text-center px-4 max-w-6xl mx-auto transition-transform duration-75"
        style={{
          transform: `translateY(${-parallaxOffset * 0.3}px)`
        }}
      >
        <div className={`transition-all duration-1000 ${isLoaded ? 'fade-in-up' : 'opacity-0 translate-y-10'}`}>

          {/* Main Title - CON DEGRADADO */}
          <h1 className="relative z-50 font-black text-6xl md:text-8xl lg:text-9xl mb-8 leading-none tracking-wide">
            <span 
              className="block font-['Bebas_Neue']"
              style={{
                background: 'linear-gradient(45deg, #FF0040, #FF6B00, #FFFF00, #FF0080)',
                backgroundSize: '400% 400%',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                color: '#ffffff', // fallback
                animation: 'flameGradient 3s ease-in-out infinite'
              }}
            >
              Mi Gusto
            </span>
            <span className="block text-white font-['Bebas_Neue']">×</span>
            <span 
              className="block font-['Bebas_Neue']"
              style={{
                background: 'linear-gradient(45deg, #FF0040, #FF6B00, #FFFF00, #FF0080)',
                backgroundSize: '400% 400%',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                color: '#ffffff', // fallback
                animation: 'flameGradient 3s ease-in-out infinite'
              }}
            >
              DORITOS
            </span>
          </h1>

          {/* Subtitle - CON DEGRADADO */}
          <div className="mb-10 relative z-50">
            <h2 className="relative z-50 text-2xl md:text-4xl font-bold text-white mb-4 tracking-wide">
              EMPANADA <span 
                className="flame-fire"
                style={{
                  background: 'linear-gradient(45deg, #FF0040, #FF6B00, #FFFF00, #FF0080)',
                  backgroundSize: '400% 400%',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  color: '#ffffff', // fallback
                  animation: 'flameGradient 2s ease-in-out infinite, fireFlicker 0.1s ease-in-out infinite alternate',
                  textShadow: `
                    0 0 5px rgba(255, 0, 64, 0.8),
                    0 0 10px rgba(255, 94, 0, 0.7),
                    0 0 15px rgba(255, 145, 0, 0.6),
                    0 0 20px rgba(255, 0, 128, 0.5),
                    0 0 30px rgba(255, 94, 0, 0.4),
                    0 0 40px rgba(255, 0, 64, 0.3)
                  `,
                  position: 'relative',
                  filter: 'drop-shadow(0 0 20px rgba(255, 94, 0, 0.6))',
                  transform: 'scale(1.02)',
                  zIndex: 10
                }}
              >
                FLAMIN' HOT
              </span>
            </h2>
            {/* Fuego saliendo desde el subtítulo */}
            <div className="pointer-events-none absolute inset-x-0 -bottom-1 h-16 md:h-20">
              <FlameCanvas className="absolute inset-0" density={1.2} colorAlpha={1.0} shadowBlur={30} />
            </div>
            
            {/* Efecto de fuego adicional para FLAMIN' HOT */}
            <div 
              className="pointer-events-none absolute inset-0"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(255, 145, 0, 0.3) 0%, rgba(255, 0, 64, 0.2) 30%, transparent 70%)',
                filter: 'blur(8px)',
                animation: 'firePulse 1.5s ease-in-out infinite alternate',
                zIndex: 5
              }}
            />
          </div>

          {/* CTA Button */}
          <div className="flex justify-center items-center">
            <button className="group px-10 py-4 md:px-12 bg-gradient-to-r from-fuchsia-600 to-purple-600 rounded-full text-white font-bold text-lg transition-all duration-300 hover:from-fuchsia-500 hover:to-purple-500 transform hover:scale-105">
              <span className="flex items-center gap-2">
                <img 
                  src="/Tubito.png" 
                  alt="Tubito" 
                  className="w-5 h-5 group-hover:animate-bounce transition-transform duration-300"
                  style={{ filter: 'brightness(1.2) contrast(1.1)' }}
                />
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

      {/* Indicador de scroll cinematográfico */}
      <div
        className="absolute left-1/2 -translate-x-1/2 bottom-6 md:bottom-10 text-white/90 transition-all duration-500"
        style={{ 
          opacity: Math.max(0, 1 - scrollFade * 2),
          transform: `translateY(${curtainProgress * 20}px)`
        }}
      >
        <div className="flex flex-col items-center gap-3 text-xs tracking-widest">
          <span className="font-semibold">DESCUBRE</span>
          <div className="relative">
            <div className="w-[1px] h-8 bg-gradient-to-b from-white/90 via-white/60 to-transparent" />
            <div 
              className="absolute top-0 left-0 w-[1px] bg-white/90 transition-all duration-1000"
              style={{ 
                height: `${Math.min(100, (1 - scrollFade) * 100)}%`,
                boxShadow: '0 0 10px rgba(255,255,255,0.5)'
              }}
            />
          </div>
          <span className="text-[10px] opacity-70">SCROLL</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
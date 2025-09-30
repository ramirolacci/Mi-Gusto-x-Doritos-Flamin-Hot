import React, { useEffect, useRef, useState } from 'react';

interface ConfettiProps {
  trigger: boolean;
  imageSrc: string;
  count?: number;
  duration?: number;
}

const Confetti: React.FC<ConfettiProps> = ({ 
  trigger, 
  imageSrc, 
  count = 20, 
  duration = 3000 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    rotation: number;
    scale: number;
    velocityX: number;
    velocityY: number;
    rotationSpeed: number;
    gravity: number;
    airResistance: number;
    bounce: number;
    life: number;
  }>>([]);

  useEffect(() => {
    if (!trigger) return;
    
    // Función para obtener la posición actual del logo
    const getLogoPosition = () => {
      const logoElement = document.querySelector('[alt="Logo Empanada"]');
      if (!logoElement) return null;
      
      const logoRect = logoElement.getBoundingClientRect();
      
      // Verificar que el logo esté visible en el viewport
      const isVisible = logoRect.top < window.innerHeight && 
                       logoRect.bottom > 0 && 
                       logoRect.left < window.innerWidth && 
                       logoRect.right > 0;
      
      if (!isVisible) return null;
      
      return {
        centerX: logoRect.left + logoRect.width / 2,
        centerY: logoRect.top + logoRect.height / 2
      };
    };
    
    // Función para crear una explosión de confetti
    const createExplosion = (explosionCount: number, delay: number) => {
      setTimeout(() => {
        const logoPosition = getLogoPosition();
        
        // Solo crear confetti si el logo está visible
        if (!logoPosition) return;
        
        const { centerX, centerY } = logoPosition;
        
        // Crear partículas de confetti con física realista
        const newParticles = Array.from({ length: count }, (_, i) => {
          const angle = (i / count) * Math.PI * 2; // Distribución circular
          const speed = 4 + Math.random() * 6; // Velocidad más alta
          const spread = 0.4 + Math.random() * 0.6; // Dispersión más amplia
          
          return {
            id: i + (explosionCount * count), // IDs únicos para cada explosión
            x: centerX, // Posición desde el centro del logo
            y: centerY,
            rotation: Math.random() * 360,
            scale: 1.2 + Math.random() * 0.8, // Tamaños más grandes y notorios
            velocityX: Math.cos(angle) * speed * spread,
            velocityY: Math.sin(angle) * speed * spread - (2 + Math.random() * 3), // Hacia arriba
            rotationSpeed: (Math.random() - 0.5) * 8,
            gravity: 0.15 + Math.random() * 0.1, // Gravedad realista
            airResistance: 0.98 + Math.random() * 0.02, // Resistencia del aire
            bounce: 0.3 + Math.random() * 0.2, // Rebote en el suelo
            life: 1.0 // Vida de la partícula
          };
        });

        setParticles(prev => [...prev, ...newParticles]);
      }, delay);
    };

    // Crear dos explosiones de confetti
    createExplosion(0, 100); // Primera explosión inmediata
    createExplosion(1, 800); // Segunda explosión con delay

    // Animar partículas con física optimizada
    let animationId: number;
    let startTime = Date.now();
    const groundLevel = window.innerHeight - 50;
    const frameRate = 60; // Limitar a 60fps
    let lastFrameTime = 0;
    const totalDuration = duration + 1000; // Duración extendida para cubrir ambas explosiones

    const animate = (currentTime: number) => {
      if (currentTime - lastFrameTime < 1000 / frameRate) {
        animationId = requestAnimationFrame(animate);
        return;
      }
      lastFrameTime = currentTime;
      
      const elapsed = currentTime - startTime;
      
      if (elapsed < totalDuration) {
        setParticles(prev => {
          const newParticles = [];
          for (let i = 0; i < prev.length; i++) {
            const particle = prev[i];
            
            // Cálculos optimizados
            const newX = particle.x + particle.velocityX;
            const newY = particle.y + particle.velocityY;
            const newVelocityX = particle.velocityX * particle.airResistance;
            const newVelocityY = particle.velocityY + particle.gravity;
            const newLife = particle.life - (16 / totalDuration); // Desvanecimiento ajustado

            // Solo agregar si está vivo
            if (newLife > 0) {
              newParticles.push({
                ...particle,
                x: newX,
                y: newY,
                rotation: particle.rotation + particle.rotationSpeed,
                velocityX: newVelocityX,
                velocityY: newVelocityY,
                life: newLife
              });
            }
          }
          return newParticles;
        });
        animationId = requestAnimationFrame(animate);
      } else {
        setParticles([]);
      }
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [trigger, count, duration]);

  if (!trigger || particles.length === 0) return null;

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-[9999]"
      style={{ width: '100vw', height: '100vh' }}
    >
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            transform: `rotate(${particle.rotation}deg) scale(${particle.scale})`,
            transition: 'none',
            opacity: particle.life,
            zIndex: 10000,
            width: '28px',
            height: '28px',
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.4))'
          }}
        >
          <img
            src={imageSrc}
            alt="Confetti"
            className="w-full h-full object-contain"
            style={{
              filter: `brightness(${1.1 + particle.life * 0.2})`
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default Confetti;

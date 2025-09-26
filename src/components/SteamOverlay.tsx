import React, { useEffect, useRef } from 'react';

type SteamOverlayProps = {
  className?: string;
  intensity?: number; // 0..1
};

// Capa de vapor suave usando partículas con alpha y ruido sutil
const SteamOverlay: React.FC<SteamOverlayProps> = ({ className, intensity = 0.7 }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId = 0;
    const particles: SteamParticle[] = [];

    class SteamParticle {
      x: number = 0;
      y: number = 0;
      vx: number = 0;
      vy: number = 0;
      life: number = 0;
      maxLife: number = 0;
      size: number = 0;
      wobble: number = 0;
      wobbleSpeed: number = 0;

      constructor() {
        this.reset();
      }

      reset() {
        const w = canvas.width;
        const h = canvas.height;
        // Emitimos desde una zona central inferior (boca de la empanada)
        this.x = w * 0.5 + (Math.random() - 0.5) * (w * 0.12);
        this.y = h * 0.68 + Math.random() * (h * 0.05);
        this.vx = (Math.random() - 0.5) * 0.2;
        this.vy = - (0.5 + Math.random() * 0.9);
        this.size = 10 + Math.random() * 24;
        this.life = 200 + Math.random() * 200;
        this.maxLife = this.life;
        this.wobble = Math.random() * Math.PI * 2;
        this.wobbleSpeed = 0.02 + Math.random() * 0.03;
      }

      update() {
        this.life--;
        this.wobble += this.wobbleSpeed;
        this.x += this.vx + Math.sin(this.wobble) * 0.4;
        this.y += this.vy;
        this.size *= 1.003; // se expande levemente al subir
        if (this.life <= 0 || this.y < -50) this.reset();
      }

      draw() {
        const alpha = (this.life / this.maxLife) * 0.5 * intensity;
        const gradient = ctx.createRadialGradient(this.x, this.y, this.size * 0.1, this.x, this.y, this.size);
        gradient.addColorStop(0, `rgba(255,255,255,${alpha})`);
        gradient.addColorStop(1, `rgba(255,255,255,0)`);
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const sizeToContainer = () => {
      const { clientWidth, clientHeight } = container;
      canvas.width = clientWidth;
      canvas.height = clientHeight;
    };

    const init = () => {
      sizeToContainer();
      particles.length = 0;
      const area = canvas.width * canvas.height;
      const baseArea = 1280 * 720;
      const count = Math.max(40, Math.floor(120 * (area / baseArea) * intensity));
      for (let i = 0; i < count; i++) particles.push(new SteamParticle());
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = 'lighter';
      for (const p of particles) {
        p.update();
        p.draw();
      }
      ctx.globalCompositeOperation = 'source-over';
      animationId = requestAnimationFrame(animate);
    };

    init();
    animate();

    const onResize = () => init();
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', onResize);
    };
  }, [intensity]);

  return (
    <div ref={containerRef} className={className}>
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
};

export default SteamOverlay;





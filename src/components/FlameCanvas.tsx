import React, { useEffect, useRef } from 'react';

type FlameCanvasProps = {
  className?: string;
  colorAlpha?: number;   // Multiplicador de opacidad del color (0-1)
  density?: number;      // Multiplicador de densidad de partículas
  shadowBlur?: number;   // Intensidad del brillo
};

const FlameCanvas: React.FC<FlameCanvasProps> = ({ className, colorAlpha = 0.7, density = 1, shadowBlur = 15 }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: FlameParticle[] = [];
    let animationId = 0;

    class FlameParticle {
      x: number = 0;
      y: number = 0;
      radius: number = 0;
      initialRadius: number = 0;
      speedY: number = 0;
      life: number = 0;
      maxLife: number = 0;
      color: string = '';
      waver: number = 0;
      waverSpeed: number = 0;

      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + Math.random() * 50;
        this.radius = Math.random() * 6 + 2;
        this.initialRadius = this.radius;
        this.speedY = Math.random() * 2 + 1;
        this.life = Math.random() * 300 + 200;
        this.maxLife = this.life;
        const hue = Math.random() * 30 + 10;
        this.color = `hsl(${hue}, 100%, 50%)`;
        this.waver = Math.random() * 2 - 1;
        this.waverSpeed = Math.random() * 0.05 + 0.01;
      }

      update() {
        this.life--;
        this.y -= this.speedY;
        this.waver += this.waverSpeed;
        this.x += Math.sin(this.waver) * 1.0;
        this.radius = this.initialRadius * (this.life / this.maxLife);
        if (this.life <= 0 || this.radius <= 0.1) {
          this.reset();
        }
      }

      draw() {
        const opacity = this.life / this.maxLife;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.shadowColor = this.color;
        ctx.shadowBlur = shadowBlur;
        // Extraer el valor de hue desde la cadena hsl(hue, ...)
        const hueStr = this.color.match(/hsl\((\d+(?:\.\d+)?)\,/);
        const hue = hueStr ? parseFloat(hueStr[1]) : 20;
        const alpha = Math.max(0, Math.min(1, opacity * colorAlpha));
        ctx.fillStyle = `hsla(${hue}, 100%, 50%, ${alpha})`;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    const sizeCanvasToContainer = () => {
      const { clientWidth, clientHeight } = container;
      canvas.width = clientWidth;
      canvas.height = clientHeight;
    };

    const init = () => {
      sizeCanvasToContainer();
      particles = [];
      // Escala simple de densidad basada en el área (referencia 1920x1080)
      const area = canvas.width * canvas.height;
      const baseArea = 1920 * 1080;
      const numberOfParticles = Math.max(80, Math.floor(300 * density * (area / baseArea)));
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new FlameParticle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const particle of particles) {
        particle.update();
        particle.draw();
      }
      animationId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      init();
    };

    init();
    animate();
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [colorAlpha, density, shadowBlur]);

  return (
    <div ref={containerRef} className={className}>
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
};

export default FlameCanvas;



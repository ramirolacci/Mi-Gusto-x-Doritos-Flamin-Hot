import React, { useEffect, useState } from 'react';
import { Flame, Sparkles } from 'lucide-react';
import FlameCanvas from './FlameCanvas';

const Hero: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background (reemplazado por FlameCanvas) */}
      <div className="absolute inset-0">
        <FlameCanvas className="absolute inset-0" colorAlpha={1} density={1.6} shadowBlur={24} />
      </div>
      {/* Overlay violeta sobre el efecto (intenso, sin mezcla) */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-black/40 via-purple-900/85 to-fuchsia-900/85" />

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        <div className={`transition-all duration-1000 ${isLoaded ? 'fade-in-up' : 'opacity-0 translate-y-10'}`}>
          {/* Brand Badge */}
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-fuchsia-600/20 to-purple-600/20 rounded-full border border-fuchsia-500/30 mb-8">
            <Flame className="w-5 h-5 text-yellow-400" />
            <span className="text-fuchsia-300 font-semibold text-sm uppercase tracking-wider">Colaboración Exclusiva</span>
            <Sparkles className="w-5 h-5 text-yellow-400" />
          </div>

          {/* Main Title */}
          <h1 className="font-black text-6xl md:text-8xl lg:text-9xl mb-6 leading-none">
            <span className="block flame-text font-['Bebas_Neue']">Mi Gusto</span>
            <span className="block text-white font-['Bebas_Neue'] text-shadow-glow">×</span>
            <span className="block flame-text font-['Bebas_Neue']">DORITOS</span>
          </h1>

          {/* Subtitle */}
          <div className="mb-8">
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
              EMPANADAS <span className="flame-text flame-fire">FLAMIN' HOT</span>
            </h2>
            <p className="text-purple-200 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              La fusión perfecta entre el sabor auténtico argentino y la intensidad ardiente de Doritos Flamin' Hot
            </p>
          </div>

          {/* CTA Button */}
          <div className="flex justify-center items-center">
            <button className="group px-8 py-4 bg-gradient-to-r from-fuchsia-600 to-purple-600 rounded-full text-white font-bold text-lg transition-all duration-300 hover:from-fuchsia-500 hover:to-purple-500 transform hover:scale-105">
              <span className="flex items-center gap-2">
                <Flame className="w-5 h-5 group-hover:animate-bounce" />
                Descubrir Ahora
              </span>
            </button>
          </div>
        </div>
      </div>

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
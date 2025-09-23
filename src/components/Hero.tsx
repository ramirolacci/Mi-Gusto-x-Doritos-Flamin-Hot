import React, { useEffect, useState } from 'react';
import { Flame, Sparkles } from 'lucide-react';

const Hero: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-900 to-fuchsia-900">
        <div className="absolute inset-0 opacity-30">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-yellow-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>

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
              <span className="flame-text">FLAMIN' HOT</span> EMPANADAS
            </h2>
            <p className="text-purple-200 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              La fusión perfecta entre el sabor auténtico argentino y la intensidad ardiente de Doritos Flamin' Hot
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="group px-8 py-4 bg-gradient-to-r from-fuchsia-600 to-purple-600 rounded-full text-white font-bold text-lg hover-lift fire-glow transition-all duration-300 hover:from-fuchsia-500 hover:to-purple-500">
              <span className="flex items-center gap-2">
                <Flame className="w-5 h-5 group-hover:animate-bounce" />
                Descubrir Ahora
              </span>
            </button>
            <button className="px-8 py-4 border-2 border-yellow-400 text-yellow-400 rounded-full font-semibold text-lg hover:bg-yellow-400 hover:text-black transition-all duration-300 flame-border">
              Ver Lanzamiento
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

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-yellow-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-yellow-400 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
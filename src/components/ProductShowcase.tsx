import React, { useRef } from 'react';
import { Star, Flame, Zap, Sparkles, Award } from 'lucide-react';
import SteamOverlay from './SteamOverlay';

const ProductShowcase: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={sectionRef} className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/50 to-black" />
      <div className="absolute inset-0 gradient-bg opacity-50" />

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-fuchsia-600/20 rounded-full border border-fuchsia-500/30 mb-6">
            <Star className="w-4 h-4 text-yellow-400" />
            <span className="text-fuchsia-300 font-semibold text-sm uppercase tracking-wider">Producto Estrella</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black flame-text font-['Bebas_Neue'] mb-6">
            EMPANADA REVOLUCIONARIA
          </h2>
          <p className="text-purple-200 text-xl max-w-3xl mx-auto">
            Cada mordida es una explosión de sabor que combina la tradición argentina con la intensidad única de Doritos Flamin' Hot
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Main Product 3D */}
          <div className="lg:col-span-2">
            <div className="relative group hover-lift">
              <div className="epic-3d-bg rounded-3xl p-4 md:p-8 border border-fuchsia-500/20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="relative z-10 h-[420px] md:h-96 flex items-center justify-center">
                  <div className="epic-3d-ring" />
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

          {/* Features Cards */}
          <div className="space-y-6">
            <div className="feature-card-pro hover-lift">
              <div className="flex items-start gap-4">
                <div className="feature-icon-pro flex-shrink-0">
                  <Flame className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg mb-2">Intensidad Extrema</h4>
                  <p className="text-purple-300 text-sm">El sabor picante y único de Doritos Flamin' Hot como protagonista</p>
                </div>
              </div>
            </div>

            <div className="feature-card-pro hover-lift">
              <div className="flex items-start gap-4">
                <div className="feature-icon-pro flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg mb-2">Innovación Total</h4>
                  <p className="text-purple-300 text-sm">Primera empanada del mundo con topping de Doritos incorporado</p>
                </div>
              </div>
            </div>

            <div className="feature-card-pro hover-lift">
              <div className="flex items-start gap-4">
                <div className="feature-icon-pro flex-shrink-0">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg mb-2">Calidad Premium</h4>
                  <p className="text-purple-300 text-sm">Ingredientes seleccionados y la tradición de Mi Gusto</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
            <div key={index} className="text-center group">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <h4 className="text-white font-bold text-xl mb-3">{item.title}</h4>
              <p className="text-purple-300 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
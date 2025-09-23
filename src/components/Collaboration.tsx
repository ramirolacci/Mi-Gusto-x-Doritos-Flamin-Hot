import React from 'react';
import { Users, Heart, Trophy } from 'lucide-react';

const Collaboration: React.FC = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-orange-950/30 to-black" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-600/20 rounded-full border border-orange-500/30 mb-6">
            <Users className="w-4 h-4 text-orange-400" />
            <span className="text-orange-300 font-semibold text-sm uppercase tracking-wider">Colaboración Épica</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black flame-text font-['Bebas_Neue'] mb-6">
            CUANDO DOS MUNDOS SE UNEN
          </h2>
          <p className="text-gray-300 text-xl max-w-3xl mx-auto">
            La fusión perfecta entre la tradición argentina de Mi Gusto y la intensidad global de Doritos Flamin' Hot
          </p>
        </div>

        {/* Brands Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Mi Gusto */}
          <div className="text-center lg:text-right">
            <div className="mb-8">
              <div className="inline-block hover-lift mx-auto lg:ml-auto lg:mr-0">
                <img
                  src="/Logo Mi Gusto 2025.png"
                  alt="Logo Mi Gusto 2025"
                  className="h-24 w-auto object-contain"
                  loading="lazy"
                />
              </div>
            </div>
            <h3 className="text-3xl font-black text-white mb-4 font-['Bebas_Neue']">MI GUSTO</h3>
            <p className="text-gray-400 text-lg leading-relaxed max-w-md mx-auto lg:ml-auto lg:mr-0">
              <strong className="text-orange-400">25 años</strong> de tradición argentina en empanadas artesanales. 
              Sabor auténtico, masa perfecta y el cariño de siempre en cada mordida.
            </p>
            <div className="flex items-center justify-center lg:justify-end gap-4 mt-6">
              <Heart className="w-5 h-5 text-red-400" />
              <span className="text-orange-300 font-semibold">Tradición Argentina</span>
            </div>
          </div>

          {/* Doritos */}
          <div className="text-center lg:text-left">
            <div className="mb-8">
              <div className="inline-block hover-lift">
                <img
                  src="/pngegg.png"
                  alt="Doritos Flamin' Hot"
                  className="h-24 w-auto object-contain"
                  loading="lazy"
                />
              </div>
            </div>
            <h3 className="text-3xl font-black flame-text mb-4 font-['Bebas_Neue']">DORITOS FLAMIN' HOT</h3>
            <p className="text-gray-400 text-lg leading-relaxed max-w-md mx-auto lg:mr-auto lg:ml-0">
              La marca de snacks más <strong className="text-red-400">audaz del mundo</strong>. 
              Sabor intenso, picante extremo y la actitud que define una generación.
            </p>
            <div className="flex items-center justify-center lg:justify-start gap-4 mt-6">
              <Trophy className="w-5 h-5 text-orange-400" />
              <span className="text-red-300 font-semibold">Intensidad Global</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Collaboration;
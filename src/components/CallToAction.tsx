import React from 'react';
import FlameCanvas from './FlameCanvas';
import { Flame, Instagram, Twitter, Facebook, Mail, ArrowRight } from 'lucide-react';

const CallToAction: React.FC = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background con efecto de llamas */}
      <FlameCanvas className="absolute inset-0" />
      {/* Overlay violeta sobre el efecto (intenso, sin mezcla) */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-purple-950/85 via-black/40 to-black/20" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
        {/* Main CTA */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-fuchsia-600/20 to-purple-600/20 rounded-full border border-fuchsia-500/30 mb-8">
            <Flame className="w-5 h-5 text-yellow-400 animate-bounce" />
            <span className="text-fuchsia-300 font-semibold text-sm uppercase tracking-wider">¡Tu Momento Es Ahora!</span>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-black flame-text font-['Bebas_Neue'] mb-8 leading-tight">
            ¿LISTO PARA LA
            <br />
            REVOLUCIÓN?
          </h2>
          
          <p className="text-purple-200 text-xl md:text-2xl max-w-4xl mx-auto mb-12 leading-relaxed">
            No dejes que otros vivan esta experiencia antes que tú. 
            Sé parte de la historia gastronómica más intensa del año.
          </p>

          {/* Primary CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <a
              href="https://pedir.migusto.com.ar/index.php"
              target="_blank"
              rel="noopener noreferrer"
              className="group px-10 py-5 bg-gradient-to-r from-fuchsia-600 to-purple-600 rounded-full text-white font-bold text-xl hover-lift fire-glow transition-all duration-300 hover:from-fuchsia-500 hover:to-purple-500 hover:scale-105"
            >
              <span className="flex items-center gap-3">
                <Flame className="w-6 h-6 group-hover:animate-spin" />
                Quiero Probarlas YA
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </a>

            <a
              href="https://pedir.migusto.com.ar/index.php"
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-5 border-2 border-yellow-400 text-yellow-400 rounded-full font-bold text-xl hover:bg-yellow-400 hover:text-black transition-all duration-300 flame-border hover:scale-105"
            >
              Encontrar Mi Local
            </a>
          </div>

          {/* Secondary Actions */}
          <div className="grid grid-cols-1 gap-6 max-w-4xl mx-auto mb-16">
            <div className="bg-gradient-to-br from-purple-900/30 to-fuchsia-900/30 rounded-2xl p-6 border border-fuchsia-500/20 hover-lift">
              <h4 className="text-white font-bold text-lg mb-3 flex items-center gap-2">
                <Mail className="w-5 h-5 text-yellow-400" />
                Newsletter Exclusivo
              </h4>
              <p className="text-purple-300 mb-4 text-sm">
                Recibe ofertas especiales y noticias sobre próximos lanzamientos
              </p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="tu@email.com" 
                  className="flex-1 px-4 py-2 bg-black/50 border border-purple-600 rounded-lg text-white placeholder-purple-400 focus:border-fuchsia-500 focus:outline-none"
                />
                <button className="px-4 py-2 bg-fuchsia-600 text-white rounded-lg hover:bg-fuchsia-500 transition-colors">
                  Suscribir
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-800 pt-12">
          <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-6">
            <div className="flex items-center gap-4 justify-self-start">
              <div className="text-left">
                <div className="flex items-center gap-2">
                  <img
                    src="/Logo Mi Gusto 2025.png"
                    alt="Mi Gusto"
                    className="h-8 md:h-10 w-auto object-contain"
                    loading="lazy"
                  />
                  <span className="text-white font-bold text-lg">×</span>
                  <img
                    src="/pngegg.png"
                    alt="Doritos"
                    className="h-8 md:h-10 w-auto object-contain"
                    loading="lazy"
                  />
                </div>
                <div className="text-sm flame-text-inline">Flamin' Hot Experience</div>
              </div>
            </div>
            
            <div className="text-purple-400 text-sm text-center justify-self-center">
              <p>© 2025 Mi Gusto. Todos los derechos reservados.</p>
              <p className="text-xs mt-1">Doritos es una marca registrada de PepsiCo.</p>
            </div>

            {/* Redes en el lado derecho del footer */}
            <div className="justify-self-end text-right">
              <h4 className="text-white font-bold text-sm md:text-base mb-3 flex items-center gap-2 justify-end md:justify-end">
                <Instagram className="w-4 h-4 text-yellow-400" />
                Síguenos en Redes
              </h4>
              <div className="flex gap-3 justify-end">
                {[
                  { icon: Instagram, label: 'Instagram' },
                  { icon: Twitter, label: 'Twitter' },
                  { icon: Facebook, label: 'Facebook' }
                ].map((social, index) => (
                  <a
                    key={index}
                    href="#"
                    className="w-9 h-9 md:w-10 md:h-10 bg-gradient-to-br from-fuchsia-600 to-purple-600 rounded-lg flex items-center justify-center hover:scale-110 transition-transform duration-200"
                    title={social.label}
                  >
                    <social.icon className="w-4 h-4 md:w-5 md:h-5 text-white" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Efecto final sutil (opcional): mantenemos el canvas de fondo */}
      </div>
    </section>
  );
};

export default CallToAction;
import React from 'react';
import FlameCanvas from './FlameCanvas';
import { Instagram, Twitter, Facebook } from 'lucide-react';

const CallToAction: React.FC = () => {
  return (
    <section className="py-24 md:py-28 relative overflow-hidden">
      {/* Background con efecto de llamas intensificado */}
      <FlameCanvas className="absolute inset-0 z-50" density={3.0} colorAlpha={1.5} shadowBlur={35} />
      {/* Overlay más intenso para reforzar contraste */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-purple-950/90 via-black/50 to-black/20" />
      {/* Fade inferior para fusionar con el final de la página */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent via-black/40 to-black/90" />
      
      {/* Sección de Newsletter eliminada por solicitud */}

        {/* Footer */}
        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <div className="border-t border-gray-800 pt-12 md:pt-14">
            <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-6 md:gap-8">
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
                  <div className="text-sm md:text-base flame-text-inline">Flamin' Hot Experience</div>
                </div>
              </div>
              
              <div className="text-purple-400 text-sm md:text-base text-center justify-self-center">
                <p>© 2025 Mi Gusto. Todos los derechos reservados.</p>
                <p className="text-xs mt-1">Doritos es una marca registrada de PepsiCo.</p>
              </div>

              {/* Redes en el lado derecho del footer */}
              <div className="justify-self-end text-right">
                <h4 className="text-white font-bold text-sm md:text-base mb-3 flex items-center gap-2 justify-end md:justify-end">
                  <Instagram className="w-4 h-4" style={{ stroke: 'url(#flame-stroke)', fill: 'none', strokeWidth: 2 }} />
                  Síguenos en Redes
                </h4>
                <div className="flex gap-3 md:gap-4 justify-end">
                  {[
                    { icon: Instagram, label: 'Instagram' },
                    { icon: Twitter, label: 'Twitter' },
                    { icon: Facebook, label: 'Facebook' }
                  ].map((social, index) => (
                    <a
                      key={index}
                      href="#"
                      className="inline-flex items-center justify-center hover:scale-110 transition-transform duration-200 text-white hover:text-fuchsia-400"
                      title={social.label}
                    >
                      <social.icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Efecto final sutil (opcional): mantenemos el canvas de fondo */}
    </section>
  );
};

export default CallToAction;
import React from 'react';
import FlameCanvas from './FlameCanvas';
import { Instagram, Twitter, Facebook } from 'lucide-react';

const CallToAction: React.FC = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background con efecto de llamas */}
      <FlameCanvas className="absolute inset-0" />
      {/* Overlay violeta sobre el efecto (intenso, sin mezcla) */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-purple-950/85 via-black/40 to-black/20" />
      
      {/* Sección de Newsletter eliminada por solicitud */}

        {/* Footer */}
        <div className="relative z-10 max-w-6xl mx-auto px-4">
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
        </div>

        {/* Efecto final sutil (opcional): mantenemos el canvas de fondo */}
    </section>
  );
};

export default CallToAction;
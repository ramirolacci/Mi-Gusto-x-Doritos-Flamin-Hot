import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Bell } from 'lucide-react';

const LaunchInfo: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Set launch date to October 16, 2025
    const launchDate = new Date('2025-10-16T00:00:00');

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = launchDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/40 to-black" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-fuchsia-600/20 rounded-full border border-fuchsia-500/30 mb-6">
            <Calendar className="w-4 h-4 text-yellow-400" />
            <span className="text-fuchsia-300 font-semibold text-sm uppercase tracking-wider">Información de Lanzamiento</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black flame-text font-['Bebas_Neue'] mb-6">
            EL MOMENTO ESTÁ LLEGANDO
          </h2>
          <p className="text-purple-200 text-xl max-w-3xl mx-auto">
            Prepárate para vivir una experiencia gastronómica que cambiará para siempre tu concepto de empanada
          </p>
        </div>

        {/* Countdown */}
        <div className="bg-gradient-to-br from-purple-900/40 to-fuchsia-900/40 rounded-3xl p-8 lg:p-12 border border-fuchsia-500/20 mb-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { value: timeLeft.days, label: 'DÍAS' },
              { value: timeLeft.hours, label: 'HORAS' },
              { value: timeLeft.minutes, label: 'MINUTOS' },
              { value: timeLeft.seconds, label: 'SEGUNDOS' }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="bg-gradient-to-br from-fuchsia-600 to-purple-600 rounded-2xl p-6 mb-3 pulse-glow">
                  <div className="text-4xl lg:text-5xl font-black text-white font-['Bebas_Neue']">
                    {item.value.toString().padStart(2, '0')}
                  </div>
                </div>
                <div className="text-fuchsia-300 font-semibold text-sm tracking-wider">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Where to Find */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-fuchsia-900/40 to-purple-900/40 rounded-2xl p-8 border border-fuchsia-500/20">
            <div className="flex items-center gap-3 mb-6">
              <MapPin className="w-6 h-6 text-yellow-400" />
              <h4 className="text-white font-bold text-xl">¿Dónde Conseguirlas?</h4>
            </div>
            <ul className="space-y-3 text-purple-200">
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-yellow-400 rounded-full" />
                En tu sucursal Mi Gusto más cercana
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-yellow-400 rounded-full" />
                Pedidos online y delivery
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-purple-900/40 to-fuchsia-900/40 rounded-2xl p-8 border border-purple-500/20">
            <div className="flex items-center gap-3 mb-6">
              <Bell className="w-6 h-6 text-fuchsia-400" />
              <h4 className="text-white font-bold text-xl">Notificaciones</h4>
            </div>
            <p className="text-purple-200 mb-6">
              Sé el primero en saber cuándo las empanadas Mi Gusto x Doritos Flamin' Hot están disponibles en tu zona
            </p>
            <button className="w-full px-6 py-3 bg-gradient-to-r from-fuchsia-600 to-purple-600 rounded-xl text-white font-semibold hover:from-fuchsia-500 hover:to-purple-500 transition-all duration-300 flame-border">
              <span className="flex items-center justify-center gap-2">
                <Bell className="w-5 h-5" />
                Activar Notificaciones
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LaunchInfo;
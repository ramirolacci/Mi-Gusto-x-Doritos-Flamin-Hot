import Hero from './components/Hero';
import ProductShowcase from './components/ProductShowcase';
import CallToAction from './components/CallToAction';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-black">
      {/* Definiciones SVG globales para gradientes reutilizables */}
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="flame-stroke" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF0040">
              <animate attributeName="stop-color" values="#FF0040;#FF6B00;#FFFF00;#FF0080;#FF0040" dur="3s" repeatCount="indefinite" />
            </stop>
            <stop offset="50%" stopColor="#FF6B00">
              <animate attributeName="stop-color" values="#FF6B00;#FFFF00;#FF0080;#FF0040;#FF6B00" dur="3s" repeatCount="indefinite" />
            </stop>
            <stop offset="100%" stopColor="#FFFF00">
              <animate attributeName="stop-color" values="#FFFF00;#FF0080;#FF0040;#FF6B00;#FFFF00" dur="3s" repeatCount="indefinite" />
            </stop>
          </linearGradient>
        </defs>
      </svg>

      <Navbar />
      <div className="pt-16 relative">
        <Hero />
        <ProductShowcase />
        <CallToAction />
      </div>
    </div>
  );
}

export default App;
import Hero from './components/Hero';
import ProductShowcase from './components/ProductShowcase';
import CallToAction from './components/CallToAction';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-black">
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
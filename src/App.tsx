import React from 'react';
import Hero from './components/Hero';
import ProductShowcase from './components/ProductShowcase';
import Collaboration from './components/Collaboration';
import LaunchInfo from './components/LaunchInfo';
import CallToAction from './components/CallToAction';
import Navbar from './components/Navbar';
import FlameCanvas from './components/FlameCanvas';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="pt-16 relative">
      <Hero />
      <ProductShowcase />
      <Collaboration />
      <LaunchInfo />
        <CallToAction />
      </div>
    </div>
  );
}

export default App;
import React from 'react';
import Hero from './components/Hero';
import ProductShowcase from './components/ProductShowcase';
import Collaboration from './components/Collaboration';
import LaunchInfo from './components/LaunchInfo';
import CallToAction from './components/CallToAction';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-black">
      <Hero />
      <ProductShowcase />
      <Collaboration />
      <LaunchInfo />
      <CallToAction />
    </div>
  );
}

export default App;
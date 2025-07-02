import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import Hero from './components/Hero';
import Nominees from './components/Nominees';
import Winner from './components/Winner';
import GameStats from './components/GameStats';
import VotingSystem from './components/VotingSystem';
import Future from './components/Future';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import ParticleBackground from './components/ParticleBackground';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

function App() {
  useEffect(() => {
    // Smooth scrolling setup
    gsap.to(window, {duration: 0.5, scrollTo: { y: 0 }});
    
    // Page load animation
    gsap.fromTo('body', 
      { opacity: 0 }, 
      { opacity: 1, duration: 1, ease: 'power2.out' }
    );
  }, []);

  return (
    <div className="min-h-screen bg-black text-white relative">
      <ParticleBackground />
      <Navbar />
      <Hero />
      <Nominees />
      <Winner />
      <GameStats />
      <VotingSystem />
      <Future />
      <Footer />
    </div>
  );
}

export default App;
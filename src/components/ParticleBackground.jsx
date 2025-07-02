import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const ParticleBackground = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const particles = [];

    // Create enhanced particles with different types
    for (let i = 0; i < 50; i++) {
      const particle = document.createElement('div');
      
      const particleType = Math.random();
      if (particleType < 0.3) {
        // Glowing orbs
        particle.className = 'absolute rounded-full particle-glow';
        const size = Math.random() * 4 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.background = `radial-gradient(circle, rgba(59, 130, 246, 0.8), rgba(59, 130, 246, 0.2))`;
      } else if (particleType < 0.6) {
        // Geometric shapes
        particle.className = 'absolute particle-geometric';
        const size = Math.random() * 3 + 1;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.background = 'rgba(147, 51, 234, 0.6)';
        particle.style.transform = 'rotate(45deg)';
      } else {
        // Sparkle particles
        particle.className = 'absolute particle-sparkle';
        const size = Math.random() * 2 + 1;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.background = 'rgba(34, 211, 238, 0.8)';
        particle.style.borderRadius = '50%';
      }
      
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      
      container.appendChild(particle);
      particles.push(particle);

      // Enhanced floating animation
      gsap.to(particle, {
        y: -window.innerHeight - 200,
        duration: Math.random() * 20 + 15,
        repeat: -1,
        ease: 'none',
        delay: Math.random() * 15,
      });

      gsap.to(particle, {
        x: Math.random() * 200 - 100,
        duration: Math.random() * 15 + 10,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      });

      // Rotation for geometric shapes
      if (particleType >= 0.3 && particleType < 0.6) {
        gsap.to(particle, {
          rotation: 360,
          duration: Math.random() * 10 + 5,
          repeat: -1,
          ease: 'none'
        });
      }

      // Pulsing for sparkles
      if (particleType >= 0.6) {
        gsap.to(particle, {
          scale: 1.5,
          opacity: 0.3,
          duration: Math.random() * 2 + 1,
          repeat: -1,
          yoyo: true,
          ease: 'power2.inOut'
        });
      }
    }

    return () => {
      particles.forEach(particle => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      });
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 pointer-events-none overflow-hidden" />;
};

export default ParticleBackground;
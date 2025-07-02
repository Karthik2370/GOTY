import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, Gamepad2 } from 'lucide-react';

const Footer = () => {
  const footerRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    // Footer entrance animation
    gsap.fromTo(contentRef.current.children,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 90%',
        }
      }
    );
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <footer ref={footerRef} className="relative py-16 px-6 bg-gradient-to-t from-black via-slate-900/50 to-transparent border-t border-white/10">


      <div className="max-w-7xl mx-auto relative z-10">
        <div ref={contentRef}>

          {/* Bottom Section */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-2 text-white/60">
              <span>© {currentYear} Karthik Nambiar </span>
            </div>
            
            <div className="flex flex-wrap items-center justify-center space-x-4 text-xs text-white/40">
              <span>Images from Pexels</span>
              <span>•</span>
              <span>Game data from The Game Awards</span>
              <span>•</span>
              <span>Built with React & GSAP</span>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-8 p-4 bg-white/5 rounded-lg border border-white/10">
            <p className="text-xs text-white/50 text-center leading-relaxed">
              <strong className="text-white/70">Disclaimer:</strong> This website is a personal project created for educational and portfolio purposes. 
              All game titles, logos, and trademarks are property of their respective owners. 
              This site is not affiliated with The Game Awards, game developers, or publishers mentioned. 
              No copyright infringement intended.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
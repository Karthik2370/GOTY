import React, { useEffect, useRef, useState } from 'react';
import { Gamepad2, Trophy, Eye, Menu, X, BarChart3, Clock, Vote } from 'lucide-react';
import { gsap } from 'gsap';

const Navbar = () => {
  const navRef = useRef(null);
  const logoRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Enhanced navbar entrance animation
    gsap.fromTo(navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: 'back.out(1.7)', delay: 0.5 }
    );

    // Logo animation
    gsap.to(logoRef.current, {
      rotation: 360,
      duration: 2,
      ease: 'power2.inOut',
      repeat: -1,
      yoyo: true
    });

    // Navbar background blur effect on scroll
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const opacity = Math.min(scrollY / 100, 0.95);
      
      gsap.to(navRef.current, {
        backdropFilter: `blur(${scrollY / 10}px)`,
        backgroundColor: `rgba(15, 23, 42, ${opacity})`,
        duration: 0.3
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    gsap.to(window, {
      duration: 1.2,
      scrollTo: { y: sectionId, offsetY: 80 },
      ease: "power2.inOut"
    });
    setIsMenuOpen(false);
  };

  return (
    <nav ref={navRef} className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 py-2 sm:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div ref={logoRef} className="relative">
              <Gamepad2 className="w-7 h-7 sm:w-8 sm:h-8 text-blue-400" />
              <div className="absolute inset-0 bg-blue-400/20 rounded-full animate-ping"></div>
            </div>
            <span className="font-display text-lg sm:text-xl font-bold text-white">GOTY 2024</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-4 sm:space-x-8">
            <button 
              onClick={() => scrollToSection("#nominees")}
              className="nav-link group"
            >
              <Trophy className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>Nominees</span>
            </button>
            <button 
              onClick={() => scrollToSection("#winner")}
              className="nav-link group"
            >
              <Trophy className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>Winner</span>
            </button>
            <button 
              onClick={() => scrollToSection("#voting")}
              className="nav-link group"
            >
              <Vote className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>Vote 2025</span>
            </button>
            <button 
              onClick={() => scrollToSection("#future")}
              className="nav-link group"
            >
              <Eye className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>2025</span>
            </button>
          </div>

          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-blue-400 transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-2 sm:mt-4 pb-2 sm:pb-4 border-t border-white/10">
            <div className="flex flex-col space-y-2 sm:space-y-4 pt-2 sm:pt-4">
              <button 
                onClick={() => scrollToSection("#nominees")}
                className="nav-link-mobile"
              >
                <Trophy className="w-4 h-4" />
                <span>Nominees</span>
              </button>
              <button 
                onClick={() => scrollToSection("#winner")}
                className="nav-link-mobile"
              >
                <Trophy className="w-4 h-4" />
                <span>Winner</span>
              </button>
              <button 
                onClick={() => scrollToSection("#voting")}
                className="nav-link-mobile"
              >
                <Vote className="w-4 h-4" />
                <span>Vote 2025</span>
              </button>
              <button 
                onClick={() => scrollToSection("#future")}
                className="nav-link-mobile"
              >
                <Eye className="w-4 h-4" />
                <span>2025</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
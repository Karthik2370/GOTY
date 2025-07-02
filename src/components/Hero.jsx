import React, { useEffect, useRef } from 'react';
import { Trophy, Play, ChevronDown, Sparkles } from 'lucide-react';
import { gsap } from 'gsap';

const Hero = () => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const backgroundRef = useRef(null);
  const floatingElementsRef = useRef(null);
  const morphingShapeRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    // Set initial states
    gsap.set([titleRef.current, subtitleRef.current, ctaRef.current], { 
      opacity: 0, 
      y: 60 
    });

    // Background parallax effect
    gsap.to(backgroundRef.current, {
      yPercent: -50,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });

    // Morphing shape animation
    gsap.to(morphingShapeRef.current, {
      rotation: 360,
      duration: 20,
      repeat: -1,
      ease: "none"
    });

    gsap.to(morphingShapeRef.current, {
      scale: 1.2,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut"
    });

    // Floating elements animation
    const floatingElements = floatingElementsRef.current.children;
    Array.from(floatingElements).forEach((element, index) => {
      gsap.to(element, {
        y: -30,
        duration: 3 + index * 0.5,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
        delay: index * 0.3
      });

      gsap.to(element, {
        rotation: 360,
        duration: 15 + index * 2,
        repeat: -1,
        ease: "none"
      });
    });

    // Main animation sequence
    tl.to(titleRef.current, { 
      opacity: 1, 
      y: 0, 
      duration: 1.2, 
      ease: 'power3.out',
      delay: 0.3
    })
    .to(subtitleRef.current, { 
      opacity: 1, 
      y: 0, 
      duration: 1, 
      ease: 'power3.out' 
    }, '-=0.6')
    .to(ctaRef.current, { 
      opacity: 1, 
      y: 0, 
      duration: 0.8, 
      ease: 'power3.out' 
    }, '-=0.4');

  }, []);

  const scrollToNominees = () => {
    gsap.to(window, {
      duration: 1.5,
      scrollTo: { y: "#nominees", offsetY: 80 },
      ease: "power2.inOut"
    });
  };

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden px-2 sm:px-4">
      {/* Enhanced Background with better coverage */}
      <div ref={backgroundRef} className="absolute inset-0 z-0">
        {/* Primary gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900/30 to-black"></div>
        
        {/* Secondary overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50"></div>
        
        {/* Radial gradient for focus */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.15),transparent_70%)]"></div>
        
        {/* Additional coverage for edges */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20"></div>
        
        {/* Animated grid pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 animated-grid"></div>
        </div>

        {/* Morphing background shape */}
        <div ref={morphingShapeRef} className="absolute top-1/4 right-1/4 w-96 h-96 opacity-10">
          <div className="morphing-blob"></div>
        </div>

        {/* Additional atmospheric elements */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent"></div>
      </div>

      {/* Floating UI elements */}
      <div ref={floatingElementsRef} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-blue-400/30 rounded-full floating-orb"></div>
        <div className="absolute top-1/3 right-1/3 w-6 h-6 bg-purple-400/30 rounded-full floating-orb"></div>
        <div className="absolute bottom-1/3 left-1/5 w-3 h-3 bg-cyan-400/30 rounded-full floating-orb"></div>
        <div className="absolute top-1/2 right-1/4 w-5 h-5 bg-pink-400/30 rounded-full floating-orb"></div>
      </div>

      <div className="relative z-10 text-center max-w-6xl mx-auto px-2 sm:px-6 pt-16 sm:pt-20">
        {/* Main title */}
        <div ref={titleRef} className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row items-center justify-center mb-4 sm:mb-6 gap-2 sm:gap-6">
            <div className="relative">
              <Trophy className="w-10 h-10 sm:w-12 sm:h-12 text-amber-400 mr-0 sm:mr-4 trophy-glow" />
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-amber-300 absolute -top-2 -right-2 animate-pulse" />
            </div>
            <span className="text-amber-400 font-medium tracking-wider text-xs sm:text-sm uppercase">
              The Game Awards 2024
            </span>
          </div>
          <h1 className="font-display text-3xl xs:text-4xl sm:text-6xl md:text-8xl font-bold mb-4 sm:mb-6 leading-tight break-words">
            <span className="text-gradient-advanced">
              GAME OF THE YEAR
            </span>
            <br />
            <span className="text-white/90 text-xl xs:text-2xl sm:text-4xl md:text-6xl font-medium">
              2024
            </span>
          </h1>
        </div>

        {/* Subtitle */}
        <p ref={subtitleRef} className="text-base xs:text-lg sm:text-xl md:text-2xl text-white/70 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed font-light">
          Celebrating the most exceptional gaming experiences that defined this year
        </p>

        {/* CTA */}
        <div ref={ctaRef} className="space-y-6 sm:space-y-8">
          <button 
            onClick={scrollToNominees}
            className="group relative inline-flex items-center space-x-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-6 sm:px-8 py-3 sm:py-4 rounded-full smooth-hover font-medium overflow-hidden text-sm sm:text-base"
          >
            <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            <Play className="w-5 h-5 group-hover:scale-110 transition-transform relative z-10" />
            <span className="relative z-10">Explore Nominees</span>
          </button>
          
          <div className="flex flex-col items-center space-y-1 sm:space-y-2 text-white/50">
            <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 animate-bounce" />
            <span className="text-xs sm:text-sm font-medium">Scroll to discover</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="scroll-indicator"></div>
      </div>
    </section>
  );
};

export default Hero;
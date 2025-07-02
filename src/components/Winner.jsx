import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Trophy, Crown, Star, Award, Users, Calendar, Sparkles, Play } from 'lucide-react';

const Winner = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardRef = useRef(null);
  const particlesRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
      }
    });

    // Particle explosion effect
    gsap.set(particlesRef.current.children, {
      scale: 0,
      opacity: 0
    });

    tl.fromTo(titleRef.current,
      { opacity: 0, y: 50, scale: 0.8 },
      { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        duration: 1.2, 
        ease: 'back.out(1.7)' 
      }
    )
    .to(particlesRef.current.children, {
      scale: 1,
      opacity: 1,
      duration: 0.8,
      stagger: 0.1,
      ease: 'back.out(2)'
    }, '-=0.5')
    .fromTo(cardRef.current,
      { opacity: 0, y: 80, rotationX: -15 },
      { 
        opacity: 1, 
        y: 0, 
        rotationX: 0,
        duration: 1.5, 
        ease: 'power3.out' 
      }, '-=0.8')
    .fromTo(statsRef.current.children,
      { opacity: 0, scale: 0.5, rotation: 180 },
      {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'back.out(2)'
      }, '-=0.5');

    // Continuous floating animation for particles
    Array.from(particlesRef.current.children).forEach((particle, index) => {
      gsap.to(particle, {
        y: -20,
        duration: 2 + index * 0.3,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut',
        delay: index * 0.2
      });
    });

  }, []);

  return (
    <section id="winner" ref={sectionRef} className="py-24 px-6 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="winner-bg-animation"></div>
      </div>

      {/* Floating particles */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none">
        <Sparkles className="absolute top-1/4 left-1/4 w-6 h-6 text-amber-400" />
        <Star className="absolute top-1/3 right-1/4 w-4 h-4 text-amber-300" />
        <Trophy className="absolute bottom-1/3 left-1/3 w-5 h-5 text-amber-500" />
        <Crown className="absolute top-1/2 right-1/3 w-6 h-6 text-amber-400" />
        <Sparkles className="absolute bottom-1/4 right-1/4 w-4 h-4 text-amber-300" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div ref={titleRef} className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-amber-400/10 border border-amber-400/20 rounded-full px-4 py-2 mb-6 backdrop-blur-sm">
            <Crown className="w-4 h-4 text-amber-400" />
            <span className="text-amber-400 text-sm font-medium">Game of the Year 2024</span>
          </div>
          
          <h2 className="font-display text-5xl md:text-7xl font-bold mb-6">
            <span className="text-gradient-winner">The Winner</span>
          </h2>
        </div>

        <div ref={cardRef} className="relative perspective-1000">
          <div className="glass-dark rounded-3xl overflow-hidden border border-amber-400/20 winner-glow-enhanced transform-gpu">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="relative h-80 lg:h-auto overflow-hidden">
                <img 
                  src="/astro-bot.jpg" 
                  alt="Astro Bot"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/50 lg:to-black/80"></div>
                
                {/* Animated winner badge */}
                <div className="absolute top-6 left-6">
                  <div className="flex items-center space-x-2 bg-amber-400/20 backdrop-blur-sm border border-amber-400/30 rounded-full px-4 py-2 winner-badge-glow">
                    <Trophy className="w-5 h-5 text-amber-400 animate-pulse" />
                    <span className="text-amber-400 font-semibold">WINNER</span>
                  </div>
                </div>

                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <button className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-full p-4 hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 text-white" />
                  </button>
                </div>
              </div>
              
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <h3 className="font-display text-4xl lg:text-5xl font-bold text-white mb-6">
                  Astro Bot
                </h3>
                
                <p className="text-white/70 text-lg mb-8 leading-relaxed">
                  A masterpiece of platforming that perfectly showcases PlayStation 5's innovative features. 
                  Astro Bot delivers pure joy through clever level design, charming character animations, 
                  and revolutionary use of the DualSense controller.
                </p>
                
                <div ref={statsRef} className="grid grid-cols-2 gap-6 mb-8">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 stat-item">
                      <Star className="w-5 h-5 text-amber-400" />
                      <div>
                        <p className="text-white/40 text-sm">Metacritic</p>
                        <p className="text-white font-semibold text-xl">94/100</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 stat-item">
                      <Users className="w-5 h-5 text-blue-400" />
                      <div>
                        <p className="text-white/40 text-sm">Developer</p>
                        <p className="text-white font-semibold">Team Asobi</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 stat-item">
                      <Award className="w-5 h-5 text-green-400" />
                      <div>
                        <p className="text-white/40 text-sm">Genre</p>
                        <p className="text-white font-semibold">Platformer</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 stat-item">
                      <Calendar className="w-5 h-5 text-purple-400" />
                      <div>
                        <p className="text-white/40 text-sm">Released</p>
                        <p className="text-white font-semibold">September 2024</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-gradient-to-r from-amber-400/5 to-amber-600/5 border border-amber-400/20 rounded-xl backdrop-blur-sm">
                  <p className="text-amber-400/90 font-medium text-center italic">
                    "A perfect blend of nostalgia and innovation that reminds us why we fell in love with gaming."
                  </p>
                </div>
              </div>
            </div>

            {/* Holographic overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-400/5 via-transparent to-purple-400/5 pointer-events-none"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Winner;
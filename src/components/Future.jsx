import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Eye, Clock, Gamepad2 } from 'lucide-react';

const futureGames = [
  {
    id: 1,
    title: 'Death Stranding 2: On the Beach',
    description: "Hideo Kojima's highly anticipated sequel promises to push the boundaries of storytelling and gameplay innovation.",
    image: '/death-stranding.jpeg',
    releaseDate: '2025',
    status: 'Most Anticipated',
    developer: 'Kojima Productions',
    color: 'blue'
  },
  {
    id: 2,
    title: 'Ghost of Yōtei',
    description: 'The next chapter in the Ghost series, featuring a new protagonist in 1603 Japan with stunning visuals.',
    image: '/Ghost-of-Yotei.jpg',
    releaseDate: '2025',
    status: 'Sequel Excellence',
    developer: 'Sucker Punch Productions',
    color: 'red'
  },
  {
    id: 3,
    title: 'Clair Obscur: Expedition 33',
    description: 'A mysterious turn-based RPG with stunning Belle Époque-inspired art and innovative gameplay mechanics.',
    image: '/expedition-33.jpg',
    releaseDate: 'Spring 2025',
    status: 'Artistic Innovation',
    developer: 'Sandfall Interactive',
    color: 'purple'
  },
  {
    id: 4,
    title: 'Split Fiction',
    description: 'From the creators of It Takes Two, a new co-op adventure that blends genres and storytelling.',
    image: '/split-fiction.jpg',
    releaseDate: 'March 2025',
    status: 'Co-op Innovation',
    developer: 'Hazelight Studios',
    color: 'cyan'
  },
  {
    id: 5,
    title: 'Mafia: The Old Country',
    description: 'Return to the origins of organized crime in early 20th century Sicily in this prequel to the Mafia series.',
    image: '/mafia.jpg',
    releaseDate: 'Summer 2025',
    status: 'Crime Drama',
    developer: 'Hangar 13',
    color: 'orange'
  },
  {
    id: 6,
    title: 'Civilization VII',
    description: 'The next evolution of the legendary strategy series with revolutionary gameplay changes.',
    image: '/civilization-7.jpg',
    releaseDate: 'February 2025',
    status: 'Strategy Evolution',
    developer: 'Firaxis Games',
    color: 'green'
  }
];

const Future = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const carouselRef = useRef(null);
  const timelineRef = useRef(null);
  const progressDotRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  useEffect(() => {
    // Title animation with magnetic effect
    gsap.fromTo(titleRef.current,
      { opacity: 0, y: 50, rotationX: -15 },
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 1.2,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 85%',
        }
      }
    );

    // Fixed Timeline animation - progress bar fills to 75%
    gsap.fromTo(timelineRef.current,
      { scaleX: 0 },
      {
        scaleX: 0.75, // 75% progress through 2024 to 2025
        duration: 2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: timelineRef.current,
          start: 'top 80%',
        }
      }
    );

    // Fixed progress dot animation - smooth gentle pulse
    gsap.to(progressDotRef.current, {
      scale: 1.1,
      opacity: 0.8,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: 'power2.inOut'
    });

    // Only run carousel animation on desktop
    if (!isMobile && carouselRef.current) {
      const carousel = carouselRef.current;
      const cards = carousel.children;
      const cardWidth = 350;
      const totalWidth = cardWidth * cards.length;
      gsap.to(carousel, {
        x: -totalWidth / 2,
        duration: 40,
        repeat: -1,
        ease: 'none',
        modifiers: {
          x: gsap.utils.unitize(x => parseFloat(x) % -totalWidth)
        }
      });
      gsap.fromTo(cards,
        { opacity: 0, rotationY: 45, z: -200 },
        {
          opacity: 1,
          rotationY: 0,
          z: 0,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: carousel,
            start: 'top 80%',
          }
        }
      );
    }
  }, [isMobile]);

  // Mobile card switch handlers
  const handlePrev = () => setActiveIndex(i => (i === 0 ? futureGames.length - 1 : i - 1));
  const handleNext = () => setActiveIndex(i => (i === futureGames.length - 1 ? 0 : i + 1));

  return (
    <section id="future" ref={sectionRef} className="py-16 sm:py-24 px-2 sm:px-6 relative overflow-hidden">
      {/* Futuristic background */}
      <div className="absolute inset-0">
        <div className="future-bg-animation"></div>
      </div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div ref={titleRef} className="text-center mb-10 sm:mb-16">
          <div className="inline-flex items-center space-x-2 bg-purple-600/10 border border-purple-600/20 rounded-full px-4 py-2 mb-4 sm:mb-6 backdrop-blur-sm">
            <Eye className="w-4 h-4 text-purple-400" />
            <span className="text-purple-400 text-xs sm:text-sm font-medium">Looking Ahead</span>
          </div>
          <h2 className="font-display text-2xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6">
            <span className="text-gradient-future">2025 Preview</span>
          </h2>
          <p className="text-base sm:text-xl text-white/60 max-w-3xl mx-auto mb-6 sm:mb-8">
            The future of gaming looks brighter than ever. Here are the potential GOTY nominees for 2025.
          </p>
          {/* Fixed Timeline indicator */}
          <div className="relative w-full max-w-md mx-auto mb-6 sm:mb-8">
            <div className="flex justify-between text-xs text-white/40 mb-1">
              <span>2024</span>
              <span>2025</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden relative">
              <div ref={timelineRef} className="h-full bg-gradient-to-r from-purple-500 to-blue-500" style={{ transformOrigin: 'left', width: '75%' }}></div>
            </div>
            <div className="text-center text-xs text-white/60 mt-2">We're 75% through the journey to 2025!</div>
          </div>
        </div>
        {/* Carousel or mobile card switcher */}
        {isMobile ? (
          <div className="flex flex-col items-center">
            <div className="w-full max-w-xs mx-auto">
              <div className="glass rounded-2xl overflow-hidden border border-white/10 mb-4">
                <img src={futureGames[activeIndex].image} alt={futureGames[activeIndex].title} className="w-full h-48 object-cover sm:h-64" />
                <div className="p-4">
                  <h3 className="font-display text-lg font-bold text-white mb-2">{futureGames[activeIndex].title}</h3>
                  <p className="text-white/70 text-sm mb-2">{futureGames[activeIndex].description}</p>
                  <div className="flex justify-between text-xs text-white/50 mb-2">
                    <span>{futureGames[activeIndex].developer}</span>
                    <span>{futureGames[activeIndex].releaseDate}</span>
                  </div>
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-400 mb-2">{futureGames[activeIndex].status}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button onClick={handlePrev} className="px-3 py-2 rounded-full bg-purple-600 text-white font-bold text-lg">&#8592;</button>
              <span className="text-white/70 text-sm">{activeIndex + 1} / {futureGames.length}</span>
              <button onClick={handleNext} className="px-3 py-2 rounded-full bg-purple-600 text-white font-bold text-lg">&#8594;</button>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto pb-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <style>{`.scrollbar-hide::-webkit-scrollbar{display:none}`}</style>
            <div ref={carouselRef} className="flex space-x-8 min-w-max scrollbar-hide">
              {[...futureGames, ...futureGames].map((game, idx) => (
                <div key={game.id + '-' + idx} className="glass rounded-2xl overflow-hidden border border-white/10 min-w-[350px] max-w-xs">
                  <img src={game.image} alt={game.title} className="w-full h-48 object-cover sm:h-64" />
                  <div className="p-4">
                    <h3 className="font-display text-lg font-bold text-white mb-2">{game.title}</h3>
                    <p className="text-white/70 text-sm mb-2">{game.description}</p>
                    <div className="flex justify-between text-xs text-white/50 mb-2">
                      <span>{game.developer}</span>
                      <span>{game.releaseDate}</span>
                    </div>
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-400 mb-2">{game.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Future;
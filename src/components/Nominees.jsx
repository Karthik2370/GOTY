import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Star, Calendar, Trophy, Gamepad2, Users, Award, Clock } from 'lucide-react';

// Real 2024 Game Awards nominees data
const nominees = [
  {
    id: 1,
    title: 'Astro Bot',
    description: 'A masterful 3D platformer that showcases PlayStation 5\'s innovative DualSense controller with charming gameplay and technical excellence.',
    image: '/astro-bot.jpg',
    genre: '3D Platformer',
    rating: '94',
    developer: 'Team Asobi',
    releaseDate: 'September 6, 2024',
    isWinner: true,
    color: 'amber',
    platforms: 'PlayStation 5'
  },
  {
    id: 2,
    title: 'Final Fantasy VII Rebirth',
    description: 'The epic continuation of Cloud\'s journey with breathtaking visuals, emotional storytelling, and refined real-time combat system.',
    image: '/final-fantasy.jpg',
    genre: 'Action JRPG',
    rating: '92',
    developer: 'Square Enix',
    releaseDate: 'February 29, 2024',
    color: 'blue',
    platforms: 'PlayStation 5'
  },
  {
    id: 3,
    title: 'Black Myth: Wukong',
    description: 'A visually stunning action RPG inspired by Journey to the West, featuring incredible combat and artistic direction.',
    image: '/black-myth-wukong.jpg',
    genre: 'Action RPG',
    rating: '88',
    developer: 'Game Science',
    releaseDate: 'August 20, 2024',
    color: 'purple',
    platforms: 'PC, PlayStation 5'
  },
  {
    id: 4,
    title: 'Elden Ring: Shadow of the Erdtree',
    description: 'A massive expansion that adds new realms and challenges to FromSoftware\'s acclaimed souls-like masterpiece.',
    image: '/elden-ring-shadow-of-the-erdtree.jpg',
    genre: 'Action RPG',
    rating: '95',
    developer: 'FromSoftware',
    releaseDate: 'June 21, 2024',
    color: 'green',
    platforms: 'Multi-platform'
  },
  {
    id: 5,
    title: 'Metaphor: ReFantazio',
    description: 'A fantasy RPG from the creators of Persona, blending political intrigue with supernatural elements.',
    image: '/metaphor.png',
    genre: 'Fantasy RPG',
    rating: '90',
    developer: 'Studio Zero',
    releaseDate: 'October 11, 2024',
    color: 'indigo',
    platforms: 'Multi-platform'
  },
  {
    id: 6,
    title: 'Balatro',
    description: 'An innovative roguelike deckbuilder that combines poker mechanics with strategic gameplay.',
    image: '/Balatro.jpg',
    genre: 'Roguelike Deckbuilder',
    rating: '87',
    developer: 'LocalThunk',
    releaseDate: 'February 20, 2024',
    color: 'pink',
    platforms: 'Multi-platform'
  }
];

const Nominees = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    // Title animation with magnetic effect
    gsap.fromTo(titleRef.current,
      { opacity: 0, y: 50, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 85%',
        }
      }
    );

    // Cards 3D flip animation
    gsap.fromTo(cardsRef.current.children,
      { opacity: 0, rotationY: -90, z: -100 },
      {
        opacity: 1,
        rotationY: 0,
        z: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 80%',
        }
      }
    );

    // Stats counter animation
    gsap.fromTo(statsRef.current.children,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: statsRef.current,
          start: 'top 90%',
        }
      }
    );

    // Add hover animations for cards
    Array.from(cardsRef.current.children).forEach((card) => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          scale: 1.05,
          rotationY: 5,
          z: 50,
          duration: 0.3,
          ease: 'power2.out'
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          scale: 1,
          rotationY: 0,
          z: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
      });
    });

  }, []);

  return (
    <section id="nominees" ref={sectionRef} className="py-24 px-6 relative">
      {/* Floating geometric shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="floating-shape floating-shape-1"></div>
        <div className="floating-shape floating-shape-2"></div>
        <div className="floating-shape floating-shape-3"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div ref={titleRef} className="text-center mb-20">
          <div className="inline-flex items-center space-x-2 bg-blue-600/10 border border-blue-600/20 rounded-full px-4 py-2 mb-6 backdrop-blur-sm">
            <Star className="w-4 h-4 text-blue-400" />
            <span className="text-blue-400 text-sm font-medium">The Game Awards 2024</span>
          </div>
          
          <h2 className="font-display text-4xl md:text-6xl font-bold text-white mb-6">
            Game of the Year <span className="text-gradient-advanced">Nominees</span>
          </h2>
          <p className="text-xl text-white/60 max-w-3xl mx-auto">
            Six exceptional games that defined 2024 and pushed the boundaries of interactive entertainment
          </p>
        </div>

        {/* Stats Section */}
        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="text-center glass rounded-xl p-4 border border-white/10">
            <Gamepad2 className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">6</div>
            <div className="text-sm text-white/60">Nominees</div>
          </div>
          <div className="text-center glass rounded-xl p-4 border border-white/10">
            <Users className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">100M+</div>
            <div className="text-sm text-white/60">Players</div>
          </div>
          <div className="text-center glass rounded-xl p-4 border border-white/10">
            <Award className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">91</div>
            <div className="text-sm text-white/60">Avg Score</div>
          </div>
          <div className="text-center glass rounded-xl p-4 border border-white/10">
            <Trophy className="w-8 h-8 text-amber-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">1</div>
            <div className="text-sm text-white/60">Winner</div>
          </div>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-1000">
          {nominees.map((game) => (
            <div key={game.id} className="group card-3d smooth-hover">
              <div className={`glass rounded-2xl overflow-hidden border relative transform-gpu ${
                game.isWinner 
                  ? 'border-amber-400/30 winner-glow' 
                  : 'border-white/10 hover:border-blue-400/30'
              }`}>
                
                {game.isWinner && (
                  <div className="absolute top-4 right-4 z-10">
                    <div className="flex items-center space-x-2 bg-amber-400/20 border border-amber-400/30 rounded-full px-3 py-1 backdrop-blur-sm">
                      <Trophy className="w-4 h-4 text-amber-400" />
                      <span className="text-amber-400 text-sm font-medium">WINNER</span>
                    </div>
                  </div>
                )}
                
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={game.image} 
                    alt={game.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  
                  {/* Animated overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center justify-between">
                      <span className={`px-3 py-1 bg-${game.color}-500/20 backdrop-blur-sm border border-${game.color}-500/30 text-${game.color}-400 text-sm font-medium rounded-full`}>
                        {game.genre}
                      </span>
                      <div className="flex items-center space-x-2 text-white">
                        <Star className="w-4 h-4 fill-current text-amber-400" />
                        <span className="font-semibold">{game.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-display text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">
                    {game.title}
                  </h3>
                  
                  <p className="text-white/60 text-sm mb-3 leading-relaxed">
                    {game.description}
                  </p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-white/40">Developer</span>
                      <span className="text-white/60">{game.developer}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-white/40">Released</span>
                      <span className="text-white/60">{game.releaseDate}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-white/40">Platforms</span>
                      <span className="text-white/60">{game.platforms}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-end">
                    {/* <ExternalLink className="w-4 h-4 text-white/40 group-hover:text-blue-400 transition-colors" /> */}
                    <span className="w-4 h-4"></span>
                  </div>
                </div>

                {/* Holographic effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Nominees;
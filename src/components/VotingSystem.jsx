import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Vote, Trophy, TrendingUp, Users, Clock, Star, Zap, Crown, Award, CheckCircle } from 'lucide-react';

const votingGames = [
  {
    id: 1,
    title: 'Death Stranding 2: On the Beach',
    description: "Hideo Kojima's highly anticipated sequel with revolutionary social strand mechanics.",
    image: '/death-stranding.jpeg',
    developer: 'Kojima Productions',
    releaseWindow: 'Q3 2025',
    genre: 'Action/Adventure',
    anticipationLevel: 95,
    votes: 12847,
    color: 'blue'
  },
  {
    id: 2,
    title: 'Ghost of Yōtei',
    description: 'The next chapter in the Ghost series set in 1603 Japan with a new female protagonist.',
    image: '/Ghost-of-Yotei.jpg',
    developer: 'Sucker Punch Productions',
    releaseWindow: 'Q4 2025',
    genre: 'Action/Adventure',
    anticipationLevel: 92,
    votes: 11234,
    color: 'red'
  },
  {
    id: 3,
    title: 'Clair Obscur: Expedition 33',
    description: 'A stunning turn-based RPG with Belle Époque-inspired art and innovative mechanics.',
    image: '/expedition-33.jpg',
    developer: 'Sandfall Interactive',
    releaseWindow: 'Q2 2025',
    genre: 'Turn-based RPG',
    anticipationLevel: 88,
    votes: 8956,
    color: 'purple'
  },
  {
    id: 4,
    title: 'Civilization VII',
    description: 'The next evolution of the legendary strategy series with revolutionary changes.',
    image: '/civilization-7.jpg',
    developer: 'Firaxis Games',
    releaseWindow: 'Q1 2025',
    genre: 'Strategy',
    anticipationLevel: 90,
    votes: 9876,
    color: 'green'
  },
  {
    id: 5,
    title: 'Split Fiction',
    description: 'From the creators of It Takes Two, a new co-op adventure blending genres.',
    image: '/split-fiction.jpg',
    developer: 'Hazelight Studios',
    releaseWindow: 'Q1 2025',
    genre: 'Co-op Adventure',
    anticipationLevel: 85,
    votes: 7654,
    color: 'cyan'
  },
  {
    id: 6,
    title: 'Mafia: The Old Country',
    description: 'Return to the origins of organized crime in early 20th century Sicily.',
    image: '/mafia.jpg',
    developer: 'Hangar 13',
    releaseWindow: 'Q3 2025',
    genre: 'Action/Crime',
    anticipationLevel: 82,
    votes: 6543,
    color: 'orange'
  }
];

// Custom ProgressBar component
const ProgressBar = ({ value, color, label }) => (
  <div className="relative w-full h-3 bg-gray-800 rounded-full overflow-hidden" aria-label={label} role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100}>
    <div
      className="h-full rounded-full transition-all duration-500"
      style={{
        width: `${value}%`,
        background: color,
        transition: 'width 0.5s cubic-bezier(0.4,0,0.2,1)',
      }}
    ></div>
    <span className="sr-only">{label}: {value}%</span>
  </div>
);

const VotingSystem = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef(null);
  const leaderboardRef = useRef(null);
  const [userVotes, setUserVotes] = useState(new Set());
  const [gameVotes, setGameVotes] = useState(
    votingGames.reduce((acc, game) => ({ ...acc, [game.id]: game.votes }), {})
  );
  const [votingEnds, setVotingEnds] = useState(null);
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    // Set voting end date (6 months from now)
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 6);
    setVotingEnds(endDate);

    // Update countdown every second
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = endDate.getTime() - now;
      
      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        setTimeLeft(`${days}d ${hours}h ${minutes}m`);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Title animation
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

    // Cards animation
    gsap.fromTo(cardsRef.current.children,
      { opacity: 0, rotationY: -45, z: -100 },
      {
        opacity: 1,
        rotationY: 0,
        z: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 80%',
        }
      }
    );

    // Leaderboard animation
    gsap.fromTo(leaderboardRef.current.children,
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: leaderboardRef.current,
          start: 'top 85%',
        }
      }
    );
  }, []);

  const handleVote = (gameId) => {
    if (userVotes.has(gameId)) {
      // Remove vote
      setUserVotes(prev => {
        const newVotes = new Set(prev);
        newVotes.delete(gameId);
        return newVotes;
      });
      setGameVotes(prev => ({
        ...prev,
        [gameId]: prev[gameId] - 1
      }));
    } else {
      // Add vote (limit to 3 votes per user)
      if (userVotes.size < 3) {
        setUserVotes(prev => new Set([...prev, gameId]));
        setGameVotes(prev => ({
          ...prev,
          [gameId]: prev[gameId] + 1
        }));
      }
    }
  };

  const sortedGames = [...votingGames]
    .map(game => ({ ...game, votes: gameVotes[game.id] }))
    .sort((a, b) => b.votes - a.votes);

  const totalVotes = Object.values(gameVotes).reduce((sum, votes) => sum + votes, 0);

  return (
    <section id="voting" ref={sectionRef} className="py-24 px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/10 to-cyan-900/20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(139,92,246,0.1),transparent_50%)]"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div ref={titleRef} className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-purple-600/10 border border-purple-600/20 rounded-full px-4 py-2 mb-6 backdrop-blur-sm">
            <Vote className="w-4 h-4 text-purple-400" />
            <span className="text-purple-400 text-sm font-medium">Community Choice</span>
          </div>
          
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-6">
            Vote for <span className="text-gradient-future">GOTY 2025</span>
          </h2>
          
          <p className="text-xl text-white/60 max-w-3xl mx-auto mb-8">
            Cast your votes for the games you think will dominate 2025. You can vote for up to 3 games.
          </p>

          {/* Voting Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-8">
            <div className="glass rounded-lg p-4 border border-white/10">
              <Users className="w-6 h-6 text-blue-400 mx-auto mb-2" />
              <div className="text-lg font-bold text-white">{totalVotes.toLocaleString()}</div>
              <div className="text-xs text-white/60">Total Votes</div>
            </div>
            <div className="glass rounded-lg p-4 border border-white/10">
              <Trophy className="w-6 h-6 text-amber-400 mx-auto mb-2" />
              <div className="text-lg font-bold text-white">{userVotes.size}/3</div>
              <div className="text-xs text-white/60">Your Votes</div>
            </div>
            <div className="glass rounded-lg p-4 border border-white/10">
              <Clock className="w-6 h-6 text-green-400 mx-auto mb-2" />
              <div className="text-lg font-bold text-white">{timeLeft}</div>
              <div className="text-xs text-white/60">Time Left</div>
            </div>
            <div className="glass rounded-lg p-4 border border-white/10">
              <Star className="w-6 h-6 text-purple-400 mx-auto mb-2" />
              <div className="text-lg font-bold text-white">6</div>
              <div className="text-xs text-white/60">Candidates</div>
            </div>
          </div>
        </div>

        {/* Voting Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 mb-8 sm:mb-16">
          {votingGames.map((game) => {
            const hasVoted = userVotes.has(game.id);
            const votePercentage = ((gameVotes[game.id] / totalVotes) * 100).toFixed(1);
            // Pick a solid color for the bar
            const barColor = game.color === 'amber' ? '#f59e0b' :
              game.color === 'blue' ? '#3b82f6' :
              game.color === 'purple' ? '#8b5cf6' :
              game.color === 'green' ? '#10b981' :
              game.color === 'cyan' ? '#06b6d4' :
              game.color === 'red' ? '#ef4444' :
              game.color === 'orange' ? '#f97316' :
              '#6366f1';
            
            return (
              <div key={game.id} className="group">
                <div className={`glass rounded-2xl overflow-hidden border transition-all duration-300 ${
                  hasVoted 
                    ? 'border-purple-400/50 bg-purple-500/10' 
                    : 'border-white/10 hover:border-purple-400/30'
                }`}>
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={game.image} 
                      alt={game.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    
                    {/* Vote indicator */}
                    {hasVoted && (
                      <div className="absolute top-4 right-4">
                        <div className="flex items-center space-x-2 bg-purple-400/20 border border-purple-400/30 rounded-full px-3 py-1 backdrop-blur-sm">
                          <CheckCircle className="w-4 h-4 text-purple-400" />
                          <span className="text-purple-400 text-sm font-medium">Voted</span>
                        </div>
                      </div>
                    )}
                    
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center justify-between">
                        <span className={`px-3 py-1 bg-${game.color}-500/20 backdrop-blur-sm border border-${game.color}-500/30 text-${game.color}-400 text-sm font-medium rounded-full`}>
                          {game.genre}
                        </span>
                        <div className="flex items-center space-x-2 text-white">
                          <TrendingUp className="w-4 h-4" />
                          <span className="font-semibold">{game.anticipationLevel}%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="font-display text-xl font-bold text-white mb-2">
                      {game.title}
                    </h3>
                    
                    <p className="text-white/60 text-sm mb-3 leading-relaxed">
                      {game.description}
                    </p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-xs">
                        <span className="text-white/40">Developer</span>
                        <span className="text-white/60">{game.developer}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-white/40">Release</span>
                        <span className="text-white/60">{game.releaseWindow}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-white/40">Votes</span>
                        <span className="text-white/60">{gameVotes[game.id].toLocaleString()} ({votePercentage}%)</span>
                      </div>
                    </div>

                    {/* Vote Progress Bar (custom CSS) */}
                    <div className="mb-4">
                      <ProgressBar value={votePercentage} color={barColor} label={`Votes for ${game.title}`} />
                    </div>
                    
                    <button
                      onClick={() => handleVote(game.id)}
                      disabled={!hasVoted && userVotes.size >= 3}
                      className={`w-full py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center space-x-2 ${
                        hasVoted
                          ? 'bg-purple-600 text-white hover:bg-purple-700'
                          : userVotes.size >= 3
                          ? 'bg-white/10 text-white/40 cursor-not-allowed'
                          : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700'
                      }`}
                    >
                      <Vote className="w-4 h-4" />
                      <span>{hasVoted ? 'Remove Vote' : userVotes.size >= 3 ? 'Vote Limit Reached' : 'Vote'}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Live Leaderboard */}
        <div className="glass rounded-2xl p-4 sm:p-8 border border-white/10">
          <h3 className="font-display text-lg sm:text-2xl font-bold text-white mb-4 sm:mb-8 text-center flex items-center justify-center space-x-2">
            <Crown className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400" />
            <span>Live Leaderboard</span>
            <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400 animate-pulse" />
          </h3>
          <div ref={leaderboardRef} className="space-y-2 sm:space-y-4">
            {sortedGames.map((game, index) => {
              const votePercentage = ((game.votes / totalVotes) * 100).toFixed(1);
              const isLeader = index === 0;
              // Pick a solid color for the bar
              const barColor = isLeader ? '#f59e0b' :
                game.color === 'amber' ? '#f59e0b' :
                game.color === 'blue' ? '#3b82f6' :
                game.color === 'purple' ? '#8b5cf6' :
                game.color === 'green' ? '#10b981' :
                game.color === 'cyan' ? '#06b6d4' :
                game.color === 'red' ? '#ef4444' :
                game.color === 'orange' ? '#f97316' :
                '#6366f1';
              
              return (
                <div key={game.id} className={`flex items-center space-x-4 p-4 rounded-lg transition-all duration-300 ${
                  isLeader ? 'bg-amber-500/10 border border-amber-500/20' : 'bg-white/5'
                }`}>
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full font-bold ${
                    isLeader ? 'bg-amber-500 text-black' : 
                    index === 1 ? 'bg-gray-400 text-black' : 
                    index === 2 ? 'bg-orange-600 text-white' : 
                    'bg-white/20 text-white'
                  }`}>
                    {index + 1}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className={`font-semibold ${isLeader ? 'text-amber-400' : 'text-white'}`}>
                        {game.title}
                      </h4>
                      <div className="flex items-center space-x-4">
                        <span className="text-white/60 text-sm">
                          {game.votes.toLocaleString()} votes
                        </span>
                        <span className={`font-bold ${isLeader ? 'text-amber-400' : 'text-white'}`}>
                          {votePercentage}%
                        </span>
                      </div>
                    </div>
                    <ProgressBar value={votePercentage} color={barColor} label={`Leaderboard votes for ${game.title}`} />
                  </div>
                  
                  {isLeader && (
                    <Crown className="w-6 h-6 text-amber-400 animate-pulse" />
                  )}
                </div>
              );
            })}
          </div>
          
          <div className="text-center mt-4 sm:mt-8 p-2 sm:p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
            <p className="text-blue-400 font-medium text-xs sm:text-base">
              🔥 Voting is live! Results update in real-time
            </p>
            <p className="text-white/60 text-[10px] sm:text-sm mt-1">
              Share your predictions and see how the community votes evolve
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VotingSystem;
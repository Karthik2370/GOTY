import React from 'react';
import { TrendingUp, Users, Calendar, Globe, Award, Zap } from 'lucide-react';

const GameStats = () => {
  const stats = [
    {
      icon: Users,
      value: '150M+',
      label: 'Total Players',
      color: 'blue',
      description: 'Across all nominees'
    },
    {
      icon: Calendar,
      value: '2024',
      label: 'Release Year',
      color: 'purple',
      description: 'Gaming excellence'
    },
    {
      icon: Globe,
      value: '50+',
      label: 'Countries',
      color: 'green',
      description: 'Global reach'
    },
    {
      icon: Award,
      value: '91',
      label: 'Avg Metacritic',
      color: 'amber',
      description: 'Critical acclaim'
    },
    {
      icon: TrendingUp,
      value: '95%',
      label: 'User Rating',
      color: 'cyan',
      description: 'Player satisfaction'
    },
    {
      icon: Zap,
      value: '6',
      label: 'Nominees',
      color: 'pink',
      description: 'Elite selection'
    }
  ];

  const chartData = [
    { game: 'Elden Ring DLC', score: 95, color: '#10b981', lightColor: '#34d399' },
    { game: 'Astro Bot', score: 94, color: '#f59e0b', lightColor: '#fbbf24' },
    { game: 'FF VII Rebirth', score: 92, color: '#3b82f6', lightColor: '#60a5fa' },
    { game: 'Metaphor', score: 90, color: '#6366f1', lightColor: '#818cf8' },
    { game: 'Black Myth', score: 88, color: '#8b5cf6', lightColor: '#a78bfa' },
    { game: 'Balatro', score: 87, color: '#ec4899', lightColor: '#f472b6' }
  ];

  return (
    <section className="py-24 px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-purple-900/10 to-cyan-900/10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            2024 Gaming <span className="text-gradient-advanced">Statistics</span>
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            The numbers behind this year's most exceptional gaming experiences
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="group">
              <div className="glass rounded-xl p-6 border border-white/10 hover:border-blue-400/30 smooth-hover text-center">
                <div className={`w-12 h-12 mx-auto mb-4 rounded-full bg-${stat.color}-500/20 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <stat.icon className={`w-6 h-6 text-${stat.color}-400`} />
                </div>
                <div className={`text-2xl font-bold text-${stat.color}-400 mb-1`}>
                  {stat.value}
                </div>
                <div className="text-white font-medium text-sm mb-1">
                  {stat.label}
                </div>
                <div className="text-white/50 text-xs">
                  {stat.description}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Metacritic Chart (CSS only) */}
        <div className="glass rounded-2xl p-4 sm:p-8 border border-white/10">
          <h3 className="font-display text-lg sm:text-2xl font-bold text-white mb-4 sm:mb-8 text-center">
            Metacritic Scores Comparison
          </h3>
          <div className="overflow-x-auto">
            <div className="flex items-end justify-center space-x-4 sm:space-x-8 h-60 sm:h-80 px-2 sm:px-4 min-w-[420px] sm:min-w-0">
              {chartData.map((item, index) => (
                <div key={index} className="flex flex-col items-center group cursor-pointer min-w-[48px] sm:min-w-0">
                  {/* CSS Bar */}
                  <div className="relative flex flex-col items-center">
                    <div
                      className="w-8 sm:w-20 rounded-t-xl relative overflow-hidden shadow-lg transition-all duration-300 group-hover:scale-105"
                      style={{
                        height: `${(item.score / 100) * 140}px`,
                        background: `linear-gradient(to top, ${item.color}, ${item.lightColor})`,
                        boxShadow: `0 0 20px ${item.color}40`,
                        transition: 'height 0.5s cubic-bezier(0.4,0,0.2,1)',
                      }}
                    >
                    </div>
                    {/* Score at bottom */}
                    <div className="text-white font-bold text-xs sm:text-lg mt-2 sm:mt-3 bg-gradient-to-r from-gray-800 to-gray-700 px-2 sm:px-3 py-1 rounded-lg border border-white/20">
                      {item.score}
                    </div>
                  </div>
                  {/* Game name */}
                  <div className="text-white/80 text-xs sm:text-sm mt-2 sm:mt-4 text-center max-w-16 sm:max-w-24 leading-tight font-medium">
                    {item.game}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="text-center mt-4 sm:mt-8">
            <p className="text-white/50 text-xs sm:text-sm">
              All nominees achieved exceptional critical acclaim with scores above 85
            </p>
            <div className="flex items-center justify-center space-x-2 sm:space-x-4 mt-2 sm:mt-4">
              <div className="flex items-center space-x-1 sm:space-x-2">
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
                <span className="text-[10px] sm:text-xs text-white/60">90+ Universal Acclaim</span>
              </div>
              <div className="flex items-center space-x-1 sm:space-x-2">
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-blue-500 rounded-full"></div>
                <span className="text-[10px] sm:text-xs text-white/60">85+ Generally Favorable</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GameStats;
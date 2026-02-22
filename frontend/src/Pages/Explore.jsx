import React, { useState } from 'react';
import { Search, TrendingUp, Hash, ChevronRight, Flame } from 'lucide-react';

const Explore = () => {
    const [activeCategory, setActiveCategory] = useState('for-you');

    const categories = [
        { id: 'for-you', label: 'For You' },
        { id: 'trending', label: 'Trending' },
        { id: 'news', label: 'News' },
        { id: 'sports', label: 'Sports' },
        { id: 'entertainment', label: 'Entertainment' },
        { id: 'technology', label: 'Technology' },
    ];

    const trendingTopics = [
        { category: 'Technology', tag: '#ReactJS', posts: '125K posts', rank: 1 },
        { category: 'Trending in India', tag: '#VaaniApp', posts: '89.2K posts', rank: 2 },
        { category: 'Entertainment', tag: '#Bollywood', posts: '52.1K posts', rank: 3 },
        { category: 'Sports', tag: '#IPL2026', posts: '201K posts', rank: 4 },
        { category: 'Technology', tag: '#AI', posts: '340K posts', rank: 5 },
        { category: 'Trending', tag: '#WebDev', posts: '67.8K posts', rank: 6 },
        { category: 'Music', tag: '#NewRelease', posts: '45.3K posts', rank: 7 },
        { category: 'Gaming', tag: '#GTA6', posts: '890K posts', rank: 8 },
    ];

    const discoverCards = [
        { title: 'Tech & Innovation', desc: 'Latest in AI, Web Dev & More', gradient: 'from-blue-600 to-cyan-500', emoji: '💻' },
        { title: 'Entertainment', desc: 'Movies, Music & Pop Culture', gradient: 'from-purple-600 to-pink-500', emoji: '🎬' },
        { title: 'Sports', desc: 'Live scores & highlights', gradient: 'from-green-600 to-emerald-400', emoji: '⚽' },
        { title: 'Gaming', desc: 'News, Reviews & Esports', gradient: 'from-orange-600 to-red-500', emoji: '🎮' },
    ];

    return (
        <div className="pb-20">
            {/* Search Header */}
            <div className="sticky top-0 z-30 bg-black/70 backdrop-blur-xl px-4 py-3 border-b border-gray-800/50">
                <div className="relative">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                        type="text"
                        placeholder="Search Vaani"
                        className="w-full bg-gray-900/80 border border-gray-800 rounded-full py-2.5 pl-12 pr-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:bg-gray-900 transition-all"
                    />
                </div>
            </div>

            {/* Category Tabs */}
            <div className="flex overflow-x-auto border-b border-gray-800 scrollbar-hide">
                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                        className={`flex-shrink-0 px-5 py-3.5 text-sm font-semibold relative transition-colors whitespace-nowrap hover:bg-white/5 ${activeCategory === cat.id ? 'text-white' : 'text-gray-500'
                            }`}
                    >
                        {cat.label}
                        {activeCategory === cat.id && (
                            <div className="absolute bottom-0 left-1/3 right-1/3 h-1 bg-blue-500 rounded-full" />
                        )}
                    </button>
                ))}
            </div>

            {/* Discover Cards */}
            <div className="grid grid-cols-2 gap-3 p-4">
                {discoverCards.map((card, i) => (
                    <div
                        key={i}
                        className={`bg-gradient-to-br ${card.gradient} rounded-2xl p-4 cursor-pointer hover:scale-[1.02] transition-transform duration-200 relative overflow-hidden group min-h-[100px]`}
                    >
                        <div className="absolute top-3 right-3 text-2xl opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all">
                            {card.emoji}
                        </div>
                        <div className="relative z-10 mt-auto">
                            <h3 className="font-bold text-white text-sm">{card.title}</h3>
                            <p className="text-white/70 text-xs mt-0.5">{card.desc}</p>
                        </div>
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors rounded-2xl" />
                    </div>
                ))}
            </div>

            {/* Trending Section */}
            <div className="mt-2">
                <div className="px-4 py-3 flex items-center gap-2">
                    <Flame className="w-5 h-5 text-orange-500" />
                    <h2 className="text-xl font-black">Trends for you</h2>
                </div>

                <div className="divide-y divide-gray-800/50">
                    {trendingTopics.map((topic, i) => (
                        <div
                            key={i}
                            className="px-4 py-3 hover:bg-white/5 cursor-pointer transition-colors group"
                        >
                            <div className="flex justify-between items-start">
                                <div className="flex-1">
                                    <p className="text-gray-500 text-xs flex items-center gap-1.5">
                                        <span>{topic.category}</span>
                                        <span className="text-gray-700">·</span>
                                        <TrendingUp className="w-3 h-3 text-green-500" />
                                        <span className="text-green-500">Trending</span>
                                    </p>
                                    <h3 className="font-bold text-[15px] mt-0.5 group-hover:text-blue-400 transition-colors flex items-center gap-1.5">
                                        <Hash className="w-3.5 h-3.5 text-gray-500" />
                                        {topic.tag.replace('#', '')}
                                    </h3>
                                    <p className="text-gray-500 text-xs mt-0.5">{topic.posts}</p>
                                </div>
                                <button className="p-2 rounded-full hover:bg-blue-500/10 hover:text-blue-400 text-gray-600 transition-colors opacity-0 group-hover:opacity-100">
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Explore;

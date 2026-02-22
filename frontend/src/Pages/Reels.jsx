import React, { useState } from 'react';
import { Play, Heart, MessageCircle, Share2, Bookmark, Volume2, VolumeX, ChevronUp, ChevronDown } from 'lucide-react';

const Reels = () => {
    const [currentReel, setCurrentReel] = useState(0);
    const [liked, setLiked] = useState({});
    const [muted, setMuted] = useState(false);

    const reels = [
        {
            id: 1,
            user: { name: 'CodeMaster', username: 'codemaster_dev', avatar: '🧑‍💻' },
            desc: 'Building a full-stack app in 60 seconds! 🚀 #coding #react #nodejs',
            likes: '12.4K',
            comments: '234',
            shares: '89',
            gradient: 'from-violet-900 via-purple-800 to-indigo-900',
            icon: '⚡'
        },
        {
            id: 2,
            user: { name: 'Design Queen', username: 'design_queen', avatar: '👩‍🎨' },
            desc: 'UI/UX tips that will blow your mind 🎨✨ #design #uiux',
            likes: '8.7K',
            comments: '156',
            shares: '67',
            gradient: 'from-pink-900 via-rose-800 to-red-900',
            icon: '🎨'
        },
        {
            id: 3,
            user: { name: 'TechBro', username: 'techbro_ai', avatar: '🤖' },
            desc: 'AI is changing everything. Here\'s what you need to know 🧠 #AI #tech',
            likes: '25.1K',
            comments: '445',
            shares: '312',
            gradient: 'from-emerald-900 via-teal-800 to-cyan-900',
            icon: '🤖'
        },
        {
            id: 4,
            user: { name: 'Travel Diaries', username: 'wanderlust', avatar: '✈️' },
            desc: 'Hidden gems of Rajasthan you MUST visit! 🏰 #travel #india',
            likes: '18.3K',
            comments: '298',
            shares: '201',
            gradient: 'from-amber-900 via-orange-800 to-yellow-900',
            icon: '🌍'
        },
    ];

    const reel = reels[currentReel];

    const goNext = () => setCurrentReel((prev) => (prev + 1) % reels.length);
    const goPrev = () => setCurrentReel((prev) => (prev - 1 + reels.length) % reels.length);

    return (
        <div className="h-screen flex flex-col relative overflow-hidden bg-black">
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-4 py-3 bg-gradient-to-b from-black/60 to-transparent">
                <h1 className="text-lg font-black tracking-tight">Reels</h1>
                <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
                    <Play className="w-5 h-5" />
                </button>
            </div>

            {/* Reel Content */}
            <div className={`flex-1 bg-gradient-to-br ${reel.gradient} relative flex flex-col justify-end overflow-hidden`}>
                {/* Background Icon */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[120px] opacity-10 select-none pointer-events-none">
                    {reel.icon}
                </div>

                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

                {/* Navigation Arrows */}
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-20">
                    <button
                        onClick={goPrev}
                        className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center backdrop-blur-md transition-all hover:scale-110 active:scale-90"
                    >
                        <ChevronUp className="w-5 h-5" />
                    </button>
                    <button
                        onClick={goNext}
                        className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center backdrop-blur-md transition-all hover:scale-110 active:scale-90"
                    >
                        <ChevronDown className="w-5 h-5" />
                    </button>
                </div>

                {/* User Info + Description */}
                <div className="relative z-10 px-4 pb-6 space-y-4">
                    {/* Action Buttons (Right Side) */}
                    <div className="absolute right-4 bottom-20 flex flex-col items-center gap-5">
                        <button
                            onClick={() => setLiked({ ...liked, [reel.id]: !liked[reel.id] })}
                            className="flex flex-col items-center gap-1 group"
                        >
                            <div className={`p-3 rounded-full transition-all duration-200 ${liked[reel.id] ? 'bg-red-500/20' : 'bg-white/10 hover:bg-white/20'}`}>
                                <Heart className={`w-6 h-6 transition-all ${liked[reel.id] ? 'fill-red-500 text-red-500 scale-110' : 'group-hover:scale-110'}`} />
                            </div>
                            <span className="text-xs font-semibold">{reel.likes}</span>
                        </button>
                        <button className="flex flex-col items-center gap-1 group">
                            <div className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all">
                                <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
                            </div>
                            <span className="text-xs font-semibold">{reel.comments}</span>
                        </button>
                        <button className="flex flex-col items-center gap-1 group">
                            <div className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all">
                                <Share2 className="w-6 h-6 group-hover:scale-110 transition-transform" />
                            </div>
                            <span className="text-xs font-semibold">{reel.shares}</span>
                        </button>
                        <button className="flex flex-col items-center gap-1 group">
                            <div className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all">
                                <Bookmark className="w-6 h-6 group-hover:scale-110 transition-transform" />
                            </div>
                        </button>
                    </div>

                    {/* User */}
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-xl border border-white/20">
                            {reel.user.avatar}
                        </div>
                        <div className="flex-1">
                            <p className="font-bold text-sm">{reel.user.name}</p>
                            <p className="text-gray-400 text-xs">@{reel.user.username}</p>
                        </div>
                        <button className="px-4 py-1.5 rounded-full bg-white text-black text-sm font-bold hover:bg-gray-200 transition-colors active:scale-95">
                            Follow
                        </button>
                    </div>

                    {/* Description */}
                    <p className="text-sm leading-relaxed max-w-[280px]">{reel.desc}</p>

                    {/* Sound / Progress */}
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setMuted(!muted)}
                            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-all"
                        >
                            {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                        </button>
                        <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
                            <div className="h-full bg-white/80 rounded-full w-[65%]" />
                        </div>
                        <span className="text-xs text-gray-400">{currentReel + 1}/{reels.length}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reels;

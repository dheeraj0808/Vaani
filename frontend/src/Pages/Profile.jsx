import React, { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Link as LinkIcon, Edit3, ArrowLeft } from 'lucide-react';

const Profile = () => {
    const { user } = useAuthContext();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('posts');

    const tabs = [
        { id: 'posts', label: 'Posts' },
        { id: 'replies', label: 'Replies' },
        { id: 'media', label: 'Media' },
        { id: 'likes', label: 'Likes' }
    ];

    if (!user) return <div className="p-8 text-center text-gray-500 animate-pulse">Loading profile...</div>;

    return (
        <div className="pb-20">
            {/* Top Bar */}
            <div className="sticky top-0 z-30 bg-black/70 backdrop-blur-xl px-4 py-3 flex items-center gap-6 border-b border-gray-800/50">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 rounded-full hover:bg-gray-800/60 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <div>
                    <h2 className="font-bold text-lg leading-tight">{user.full_name}</h2>
                    <p className="text-gray-500 text-xs">0 posts</p>
                </div>
            </div>

            {/* Cover Image */}
            <div className="h-44 sm:h-52 w-full relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-400/20 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors duration-300" />
                <button className="absolute bottom-3 right-3 bg-black/40 hover:bg-black/60 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 transition-all opacity-0 group-hover:opacity-100">
                    <Edit3 className="w-3.5 h-3.5" /> Edit Cover
                </button>
            </div>

            {/* Avatar + Edit Button Row */}
            <div className="px-4 sm:px-6 flex justify-between items-start">
                <div className="relative -mt-16 sm:-mt-[70px] group">
                    <div className="w-28 h-28 sm:w-[130px] sm:h-[130px] rounded-full border-[5px] border-black overflow-hidden flex items-center justify-center text-5xl font-black bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 shadow-2xl shadow-purple-900/30 text-white">
                        {user.avatar ? (
                            <img src={user.avatar} alt={user.full_name} className="w-full h-full object-cover" />
                        ) : (
                            user.full_name?.charAt(0)?.toUpperCase() || 'V'
                        )}
                    </div>
                    <div className="absolute inset-0 rounded-full bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-all duration-200 border-[5px] border-transparent">
                        <Edit3 className="w-7 h-7 text-white drop-shadow-lg" />
                    </div>
                </div>

                <button className="mt-3 border border-gray-600 text-white font-bold px-5 py-1.5 rounded-full hover:bg-white/10 transition-all duration-200 text-sm active:scale-95">
                    Edit Profile
                </button>
            </div>

            {/* User Info */}
            <div className="px-4 sm:px-6 mt-3 space-y-3">
                <div>
                    <h1 className="text-xl font-black tracking-tight leading-tight">{user.full_name}</h1>
                    <p className="text-gray-500 text-sm">@{user.username}</p>
                </div>

                <p className="text-[15px] text-gray-200 leading-relaxed">
                    {user.bio || "Building the future of social media. Exploring the digital cosmos one commit at a time. 🚀✨"}
                </p>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-gray-500 text-[13px]">
                    <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>India</span>
                    </div>
                    <div className="flex items-center gap-1 hover:text-blue-400 transition-colors cursor-pointer">
                        <LinkIcon className="w-4 h-4" />
                        <span className="hover:underline">mywebsite.com</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>Joined {new Date(user.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                    </div>
                </div>

                <div className="flex items-center gap-5 text-sm">
                    <div className="flex gap-1 hover:underline cursor-pointer group">
                        <span className="font-bold text-white group-hover:text-blue-400 transition-colors">420</span>
                        <span className="text-gray-500">Following</span>
                    </div>
                    <div className="flex gap-1 hover:underline cursor-pointer group">
                        <span className="font-bold text-white group-hover:text-blue-400 transition-colors">6.9K</span>
                        <span className="text-gray-500">Followers</span>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-800 mt-4 sticky top-[57px] bg-black/80 backdrop-blur-xl z-20">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex-1 py-3.5 text-sm font-semibold relative transition-colors duration-200 hover:bg-white/5 ${activeTab === tab.id ? 'text-white' : 'text-gray-500'
                            }`}
                    >
                        {tab.label}
                        {activeTab === tab.id && (
                            <div className="absolute bottom-0 left-1/3 right-1/3 h-1 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.4)]" />
                        )}
                    </button>
                ))}
            </div>

            {/* Empty State Content */}
            <div className="py-16 text-center text-gray-500 min-h-[40vh] flex flex-col items-center justify-center relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
                <div className="max-w-[260px] mx-auto space-y-3 relative z-10">
                    <div className="w-16 h-16 bg-gray-900/80 rounded-full mx-auto flex items-center justify-center border border-gray-800/50">
                        <div className="w-8 h-8 border-[3px] border-gray-700/60 rounded-full" />
                    </div>
                    <h3 className="text-lg font-bold text-white">No {activeTab} yet</h3>
                    <p className="text-[13px] leading-relaxed">
                        When {user.full_name?.split(' ')[0]} creates {activeTab}, they'll show up here.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Profile;

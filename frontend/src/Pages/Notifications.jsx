import React, { useState } from 'react';
import { Settings, Heart, MessageCircle, Repeat2, UserPlus, AtSign, Star } from 'lucide-react';

const Notifications = () => {
    const [activeTab, setActiveTab] = useState('all');

    const tabs = [
        { id: 'all', label: 'All' },
        { id: 'verified', label: 'Verified' },
        { id: 'mentions', label: 'Mentions' },
    ];

    const notifications = [
        {
            id: 1,
            type: 'like',
            icon: Heart,
            color: 'text-red-500',
            bgColor: 'bg-red-500/10',
            user: 'Aman Kumar',
            avatar: '🧑',
            action: 'liked your post',
            content: '"Just deployed the new Vaani update! 🚀"',
            time: '2m ago'
        },
        {
            id: 2,
            type: 'follow',
            icon: UserPlus,
            color: 'text-blue-500',
            bgColor: 'bg-blue-500/10',
            user: 'Priya Sharma',
            avatar: '👩',
            action: 'started following you',
            content: null,
            time: '15m ago'
        },
        {
            id: 3,
            type: 'retweet',
            icon: Repeat2,
            color: 'text-green-500',
            bgColor: 'bg-green-500/10',
            user: 'Tech Community',
            avatar: '💻',
            action: 'reposted your post',
            content: '"React 20 is a game changer for web dev"',
            time: '1h ago'
        },
        {
            id: 4,
            type: 'comment',
            icon: MessageCircle,
            color: 'text-blue-400',
            bgColor: 'bg-blue-400/10',
            user: 'Rahul Verma',
            avatar: '👨',
            action: 'replied to your post',
            content: '"Great insights! I\'ve been thinking the same thing about AI"',
            time: '3h ago'
        },
        {
            id: 5,
            type: 'mention',
            icon: AtSign,
            color: 'text-purple-500',
            bgColor: 'bg-purple-500/10',
            user: 'Sakshi Patel',
            avatar: '👧',
            action: 'mentioned you',
            content: '"Shoutout to @dheeraj for the amazing UI work! 🎨"',
            time: '5h ago'
        },
        {
            id: 6,
            type: 'like',
            icon: Heart,
            color: 'text-red-500',
            bgColor: 'bg-red-500/10',
            user: 'Design Squad and 12 others',
            avatar: '🎨',
            action: 'liked your post',
            content: '"Dark mode UI is just superior ✨"',
            time: '8h ago'
        },
        {
            id: 7,
            type: 'follow',
            icon: Star,
            color: 'text-yellow-500',
            bgColor: 'bg-yellow-500/10',
            user: 'Vaani Official',
            avatar: '⭐',
            action: 'added you to recommended creators',
            content: null,
            time: '1d ago'
        },
    ];

    return (
        <div className="pb-20">
            {/* Header */}
            <div className="sticky top-0 z-30 bg-black/70 backdrop-blur-xl px-4 py-3 border-b border-gray-800/50 flex items-center justify-between">
                <h1 className="text-xl font-black">Notifications</h1>
                <button className="p-2 rounded-full hover:bg-gray-800/60 transition-colors">
                    <Settings className="w-5 h-5 text-gray-400" />
                </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-800">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex-1 py-3.5 text-sm font-semibold relative transition-colors hover:bg-white/5 ${activeTab === tab.id ? 'text-white' : 'text-gray-500'
                            }`}
                    >
                        {tab.label}
                        {activeTab === tab.id && (
                            <div className="absolute bottom-0 left-1/3 right-1/3 h-1 bg-blue-500 rounded-full" />
                        )}
                    </button>
                ))}
            </div>

            {/* Notification List */}
            <div className="divide-y divide-gray-800/30">
                {notifications.map((notif) => {
                    const IconComponent = notif.icon;
                    return (
                        <div
                            key={notif.id}
                            className="px-4 py-4 hover:bg-white/[0.03] cursor-pointer transition-colors flex gap-3"
                        >
                            <div className={`w-9 h-9 rounded-full ${notif.bgColor} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                                <IconComponent className={`w-4.5 h-4.5 ${notif.color}`} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-lg">{notif.avatar}</span>
                                    <span className="font-bold text-sm truncate">{notif.user}</span>
                                    <span className="text-gray-500 text-xs flex-shrink-0">{notif.time}</span>
                                </div>
                                <p className="text-gray-400 text-sm">{notif.action}</p>
                                {notif.content && (
                                    <p className="text-gray-500 text-sm mt-1 border-l-2 border-gray-800 pl-3 italic">
                                        {notif.content}
                                    </p>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Notifications;

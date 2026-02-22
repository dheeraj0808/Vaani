import React, { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { Edit3, Heart, MessageCircle, Repeat2, MoreHorizontal, ImageIcon } from 'lucide-react';

const Threads = () => {
    const { user } = useAuthContext();
    const [newThread, setNewThread] = useState('');

    const threads = [
        {
            id: 1,
            user: { name: 'Aman Kumar', username: 'aman_k', avatar: '🧑' },
            content: 'Hot take: Tailwind CSS has completely changed how we think about styling. No more naming classes for simple layouts. 🔥',
            time: '2h',
            likes: 234,
            replies: 18,
            reposts: 12,
            hasThread: true,
            threadReplies: [
                { content: 'But what about maintainability in large codebases?', user: { name: 'Priya', avatar: '👩' } },
            ]
        },
        {
            id: 2,
            user: { name: 'Priya Sharma', username: 'priya_s', avatar: '👩' },
            content: 'Just finished a 30-day design challenge! Here are my top 3 learnings:\n\n1. Consistency beats perfection\n2. User feedback is gold\n3. Simplicity always wins\n\nWhat would you add? 👇',
            time: '4h',
            likes: 567,
            replies: 43,
            reposts: 89,
            hasThread: false,
        },
        {
            id: 3,
            user: { name: 'Tech Community', username: 'tech_group', avatar: '💻' },
            content: 'Survey: What\'s your go-to tech stack in 2026?\n\n⚛️ React + Node\n🟢 Vue + Django\n🅰️ Angular + Spring\n🦀 Rust + HTMX\n\nDrop your choice below! 👇',
            time: '6h',
            likes: 1200,
            replies: 234,
            reposts: 156,
            hasThread: true,
            threadReplies: [
                { content: 'React + Node all day every day! 🚀', user: { name: 'Rahul', avatar: '👨' } },
            ]
        },
        {
            id: 4,
            user: { name: 'Sakshi Patel', username: 'sakshi_p', avatar: '👧' },
            content: 'Remember: Your code doesn\'t have to be perfect on the first try. It just has to work. Refactor later. Ship now. 🚢\n\n#CodingAdvice #DevLife',
            time: '8h',
            likes: 892,
            replies: 67,
            reposts: 234,
            hasThread: false,
        },
    ];

    const formatCount = (num) => {
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
        return num.toString();
    };

    return (
        <div className="pb-20">
            {/* Header */}
            <div className="sticky top-0 z-30 bg-black/70 backdrop-blur-xl px-4 py-3 border-b border-gray-800/50">
                <h1 className="text-xl font-black">Threads</h1>
            </div>

            {/* Compose Thread */}
            <div className="px-4 py-4 border-b border-gray-800/50">
                <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold flex-shrink-0">
                        {user?.full_name?.charAt(0) || 'V'}
                    </div>
                    <div className="flex-1">
                        <textarea
                            value={newThread}
                            onChange={(e) => setNewThread(e.target.value)}
                            placeholder="Start a thread..."
                            className="w-full bg-transparent text-white placeholder-gray-600 resize-none outline-none text-[15px] min-h-[60px]"
                        />
                        <div className="flex items-center justify-between pt-2 border-t border-gray-800/30">
                            <div className="flex gap-3">
                                <button className="p-1.5 rounded-full hover:bg-blue-500/10 text-gray-500 hover:text-blue-400 transition-colors">
                                    <ImageIcon className="w-5 h-5" />
                                </button>
                            </div>
                            <button
                                disabled={!newThread.trim()}
                                className="bg-white text-black font-bold px-4 py-1.5 rounded-full text-sm hover:bg-gray-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed active:scale-95"
                            >
                                Post
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Threads Feed */}
            <div className="divide-y divide-gray-800/30">
                {threads.map((thread) => (
                    <div key={thread.id} className="hover:bg-white/[0.02] transition-colors">
                        <div className="px-4 pt-4 pb-1">
                            <div className="flex gap-3">
                                {/* Avatar & Thread Line */}
                                <div className="flex flex-col items-center">
                                    <div className="w-10 h-10 rounded-full bg-gray-800/80 flex items-center justify-center text-xl flex-shrink-0 border border-gray-700/30">
                                        {thread.user.avatar}
                                    </div>
                                    {thread.hasThread && (
                                        <div className="w-0.5 flex-1 bg-gray-800 mt-2 rounded-full min-h-[20px]" />
                                    )}
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0 pb-3">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className="font-bold text-sm">{thread.user.name}</span>
                                            <span className="text-gray-500 text-sm">@{thread.user.username}</span>
                                            <span className="text-gray-600 text-xs">· {thread.time}</span>
                                        </div>
                                        <button className="p-1.5 rounded-full hover:bg-blue-500/10 text-gray-600 hover:text-blue-400 transition-colors">
                                            <MoreHorizontal className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <p className="text-[15px] text-gray-200 mt-1 leading-relaxed whitespace-pre-line">{thread.content}</p>

                                    {/* Actions */}
                                    <div className="flex items-center gap-8 mt-3 -ml-2">
                                        <button className="flex items-center gap-1.5 text-gray-500 hover:text-blue-400 group transition-colors">
                                            <div className="p-2 rounded-full group-hover:bg-blue-500/10 transition-colors">
                                                <MessageCircle className="w-4 h-4" />
                                            </div>
                                            <span className="text-xs">{formatCount(thread.replies)}</span>
                                        </button>
                                        <button className="flex items-center gap-1.5 text-gray-500 hover:text-green-400 group transition-colors">
                                            <div className="p-2 rounded-full group-hover:bg-green-500/10 transition-colors">
                                                <Repeat2 className="w-4 h-4" />
                                            </div>
                                            <span className="text-xs">{formatCount(thread.reposts)}</span>
                                        </button>
                                        <button className="flex items-center gap-1.5 text-gray-500 hover:text-red-400 group transition-colors">
                                            <div className="p-2 rounded-full group-hover:bg-red-500/10 transition-colors">
                                                <Heart className="w-4 h-4" />
                                            </div>
                                            <span className="text-xs">{formatCount(thread.likes)}</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Thread Replies */}
                        {thread.hasThread && thread.threadReplies?.map((reply, i) => (
                            <div key={i} className="px-4 pb-3">
                                <div className="flex gap-3 ml-[3px]">
                                    <div className="w-8 h-8 rounded-full bg-gray-800/60 flex items-center justify-center text-sm flex-shrink-0 border border-gray-700/20">
                                        {reply.user.avatar}
                                    </div>
                                    <div>
                                        <span className="font-semibold text-sm">{reply.user.name}</span>
                                        <p className="text-gray-400 text-sm mt-0.5">{reply.content}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Threads;

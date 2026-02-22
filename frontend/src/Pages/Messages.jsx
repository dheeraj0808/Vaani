import React, { useState } from 'react';
import { Search, Settings, Pin, MoreVertical, Send, ImageIcon, Smile, Phone, Video } from 'lucide-react';

const Messages = () => {
    const [selectedChat, setSelectedChat] = useState(null);
    const [message, setMessage] = useState('');

    const chats = [
        { id: 1, name: 'Aman Kumar', username: 'aman_k', lastMsg: 'Bro check this new feature! 🔥', time: '2m', online: true, unread: 3, avatar: '🧑' },
        { id: 2, name: 'Priya Sharma', username: 'priya_s', lastMsg: 'The design looks amazing 💜', time: '15m', online: true, unread: 0, avatar: '👩' },
        { id: 3, name: 'Tech Community', username: 'tech_group', lastMsg: 'React 20 just dropped!', time: '1h', online: false, unread: 12, avatar: '💻' },
        { id: 4, name: 'Rahul Verma', username: 'rahul_v', lastMsg: 'Meeting at 5pm today', time: '3h', online: false, unread: 0, avatar: '👨' },
        { id: 5, name: 'Design Squad', username: 'design_squad', lastMsg: 'New Figma file shared 🎨', time: '5h', online: false, unread: 5, avatar: '🎨' },
        { id: 6, name: 'Sakshi Patel', username: 'sakshi_p', lastMsg: 'Thanks for the help!', time: '1d', online: false, unread: 0, avatar: '👧' },
    ];

    const chatMessages = [
        { id: 1, sender: 'them', text: 'Hey! How\'s the project going?', time: '10:30 AM' },
        { id: 2, sender: 'me', text: 'Going great! Just pushed the new UI updates 🚀', time: '10:32 AM' },
        { id: 3, sender: 'them', text: 'Bro check this new feature! 🔥', time: '10:33 AM' },
        { id: 4, sender: 'them', text: 'The animations are so smooth', time: '10:33 AM' },
        { id: 5, sender: 'me', text: 'Thanks man! Used Framer Motion for those ✨', time: '10:35 AM' },
    ];

    return (
        <div className="h-screen flex flex-col">
            {/* Header */}
            <div className="sticky top-0 z-30 bg-black/70 backdrop-blur-xl px-4 py-3 border-b border-gray-800/50 flex items-center justify-between">
                <h1 className="text-xl font-black">Messages</h1>
                <div className="flex items-center gap-2">
                    <button className="p-2 rounded-full hover:bg-gray-800/60 transition-colors">
                        <Settings className="w-5 h-5 text-gray-400" />
                    </button>
                </div>
            </div>

            {/* Search */}
            <div className="px-4 py-2 border-b border-gray-800/50">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                        type="text"
                        placeholder="Search Direct Messages"
                        className="w-full bg-gray-900/60 border border-gray-800 rounded-full py-2 pl-10 pr-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 transition-all"
                    />
                </div>
            </div>

            <div className="flex-1 overflow-hidden flex">
                {/* Chat List */}
                <div className={`${selectedChat ? 'hidden sm:block' : ''} w-full sm:w-full overflow-y-auto`}>
                    {chats.map((chat) => (
                        <div
                            key={chat.id}
                            onClick={() => setSelectedChat(chat)}
                            className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors hover:bg-white/5 ${selectedChat?.id === chat.id ? 'bg-white/5 border-r-2 border-blue-500' : ''
                                }`}
                        >
                            <div className="relative flex-shrink-0">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center text-xl border border-gray-800">
                                    {chat.avatar}
                                </div>
                                {chat.online && (
                                    <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-[3px] border-black" />
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                    <p className="font-bold text-sm truncate">{chat.name}</p>
                                    <span className="text-gray-500 text-xs flex-shrink-0 ml-2">{chat.time}</span>
                                </div>
                                <p className="text-gray-500 text-sm truncate mt-0.5">{chat.lastMsg}</p>
                            </div>
                            {chat.unread > 0 && (
                                <span className="bg-blue-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0">
                                    {chat.unread}
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* New Message Button */}
            <div className="p-4 border-t border-gray-800/50">
                <button className="w-full bg-blue-500 hover:bg-blue-400 text-white font-bold py-3 rounded-full transition-all active:scale-[0.98] shadow-lg shadow-blue-500/20">
                    New Message
                </button>
            </div>
        </div>
    );
};

export default Messages;

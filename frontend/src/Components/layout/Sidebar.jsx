import React from 'react';
import { Home, Hash, Bell, Mail, List, User, Settings, PenSquare } from 'lucide-react';
import { useAuthContext } from '../../context/AuthContext';

const Sidebar = () => {
    const { user } = useAuthContext();
    const menuItems = [
        { icon: Home, label: 'Home', active: true },
        { icon: Hash, label: 'Explore' },
        { icon: Bell, label: 'Notifications' },
        { icon: Mail, label: 'Messages' },
        { icon: List, label: 'Lists' },
        { icon: User, label: 'Profile' },
        { icon: Settings, label: 'Settings' },
    ];

    return (
        <aside className="w-64 fixed left-0 top-0 bottom-0 p-4 flex flex-col border-r border-gray-800">
            {/* Logo */}
            <div className="px-4 py-3 mb-4">
                <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center transform rotate-12">
                    <span className="text-white text-2xl font-black -rotate-12 italic">V</span>
                </div>
            </div>

            <div className="flex-1 space-y-1">
                {menuItems.map((item, index) => (
                    <div
                        key={index}
                        className={`flex items-center gap-4 px-4 py-3 rounded-full cursor-pointer transition-all duration-200 group ${item.active
                            ? 'text-white'
                            : 'text-gray-400 hover:bg-gray-900 hover:text-white'
                            }`}
                    >
                        <item.icon className={`w-7 h-7 ${item.active ? 'stroke-[2.5px]' : 'stroke-2'}`} />
                        <span className={`text-xl ${item.active ? 'font-bold' : 'font-medium'}`}>{item.label}</span>
                    </div>
                ))}
            </div>

            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 rounded-full mt-4 transition-all duration-200 shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 group">
                <PenSquare className="w-6 h-6 group-hover:scale-110 transition-transform" />
                <span>Post</span>
            </button>

            <div className="mt-auto p-4 flex items-center gap-3 hover:bg-gray-900 rounded-full cursor-pointer transition-colors max-w-full overflow-hidden">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex-shrink-0 flex items-center justify-center text-white font-bold">
                    {user ? user.fullName?.charAt(0) : <div className="w-5 h-5 bg-gray-600 rounded-full animate-pulse" />}
                </div>
                <div className="flex-1 min-w-0">
                    {user ? (
                        <>
                            <p className="font-bold truncate text-white">{user.fullName}</p>
                            <p className="text-gray-500 text-sm truncate">@{user.username}</p>
                        </>
                    ) : (
                        <div className="space-y-1">
                            <div className="h-4 w-24 bg-gray-800 rounded animate-pulse" />
                            <div className="h-3 w-16 bg-gray-800 rounded animate-pulse" />
                        </div>
                    )}
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;

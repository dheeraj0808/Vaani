import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Rocket,
    Home,
    Compass,
    Film,
    Mail,
    Bell,
    AtSign,
    User,
    Settings,
    Search,
    MoreVertical,
    LogOut
} from 'lucide-react';
import { useAuthContext } from '../../context/AuthContext';

const Sidebar = () => {
    const { user, logout } = useAuthContext();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const menuItems = [
        { icon: Home, label: 'Home', active: true, color: 'text-blue-500' },
        { icon: Compass, label: 'Explore' },
        { icon: Film, label: 'Reels' },
        { icon: Mail, label: 'Messages', badge: '3' },
        { icon: Bell, label: 'Notifications', dot: true },
        { icon: AtSign, label: 'Threads' },
    ];

    const secondaryItems = [
        { icon: User, label: 'Profile' },
        { icon: Settings, label: 'Settings' },
    ];

    return (
        <aside className="w-[280px] fixed left-0 top-0 bottom-0 bg-[#0a0c14] border-r border-gray-800/50 flex flex-col pt-6 pb-4">
            {/* Logo Section */}
            <div className="px-6 mb-8 flex items-center gap-3">
                <div className="w-11 h-11 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20 transform hover:scale-105 transition-transform cursor-pointer">
                    <Rocket className="text-white w-6 h-6 fill-white" />
                </div>
                <div>
                    <h1 className="text-white font-bold text-lg leading-tight uppercase tracking-wide">Vaani</h1>
                    <p className="text-blue-500/60 text-[10px] font-black uppercase tracking-widest leading-none">Social Media</p>
                </div>
            </div>

            {/* Navigation Section */}
            <nav className="flex-1 px-3 space-y-1 overflow-y-auto custom-scrollbar">
                {menuItems.map((item, index) => (
                    <div
                        key={index}
                        className={`group px-4 py-3 rounded-xl flex items-center gap-4 cursor-pointer transition-all duration-200 ${item.active
                            ? 'bg-blue-600/10 text-blue-500'
                            : 'text-gray-400 hover:bg-gray-800/50 hover:text-white'
                            }`}
                    >
                        <div className="relative">
                            <item.icon className={`w-6 h-6 ${item.active ? 'stroke-[2.5px]' : 'stroke-2'}`} />
                            {item.dot && (
                                <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-blue-500 rounded-full border-2 border-[#0a0c14]" />
                            )}
                        </div>
                        <span className={`text-base flex-1 ${item.active ? 'font-bold' : 'font-medium'}`}>
                            {item.label}
                        </span>
                        {item.badge && (
                            <span className="bg-blue-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md">
                                {item.badge}
                            </span>
                        )}
                    </div>
                ))}

                <div className="my-6 border-t border-gray-800/50" />

                {secondaryItems.map((item, index) => (
                    <div
                        key={index}
                        className="group px-4 py-3 rounded-xl flex items-center gap-4 text-gray-400 hover:bg-gray-800/50 hover:text-white cursor-pointer transition-all duration-200"
                    >
                        <item.icon className="w-6 h-6 stroke-2" />
                        <span className="text-base font-medium">{item.label}</span>
                    </div>
                ))}
            </nav>

            {/* Search Section */}
            <div className="px-4 mb-4">
                <div className="relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-blue-500 transition-colors" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full bg-gray-800/30 border border-gray-800 hover:border-gray-700 focus:border-blue-500/50 focus:bg-gray-800/50 outline-none rounded-xl py-2.5 pl-10 pr-4 text-sm text-gray-200 placeholder-gray-500 transition-all"
                    />
                </div>
            </div>

            {/* User Profile Section */}
            <div className="px-3 pt-4 border-t border-gray-800/50">
                <div className="bg-gray-800/20 rounded-2xl p-3 flex items-center gap-3 hover:bg-gray-800/40 cursor-pointer transition-all group">
                    <div className="relative flex-shrink-0">
                        <div className="w-11 h-11 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-inner">
                            {user?.full_name?.charAt(0) || 'R'}
                        </div>
                        <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-[3px] border-[#0a0c14]" />
                    </div>
                    <div className="flex-1 min-w-0">
                        {user ? (
                            <div className="flex flex-col">
                                <p className="text-sm font-bold text-white truncate leading-tight">
                                    {user.full_name}
                                </p>
                                <p className="text-gray-500 text-xs truncate leading-tight mt-0.5">
                                    @{user.username}
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                <div className="h-3 w-20 bg-gray-800 rounded animate-pulse" />
                                <div className="h-2 w-16 bg-gray-800 rounded animate-pulse" />
                            </div>
                        )}
                    </div>
                    <MoreVertical className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors" />
                </div>

                <div
                    onClick={handleLogout}
                    className="mt-4 px-4 py-3 flex items-center gap-4 text-gray-400 hover:text-red-400 cursor-pointer transition-all group"
                >
                    <LogOut className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                    <span className="text-base font-medium">Logout</span>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;

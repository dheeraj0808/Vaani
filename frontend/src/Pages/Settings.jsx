import React, { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
    ArrowLeft, User, Lock, Bell, Palette, Globe, HelpCircle, Shield,
    Moon, Sun, ChevronRight, LogOut, Smartphone, Eye, Database, Trash2
} from 'lucide-react';

const Settings = () => {
    const { user, logout } = useAuthContext();
    const navigate = useNavigate();
    const [darkMode, setDarkMode] = useState(true);

    const settingsSections = [
        {
            title: 'Account',
            items: [
                { icon: User, label: 'Your Account', desc: 'See information about your account', color: 'text-blue-400' },
                { icon: Lock, label: 'Security & Password', desc: 'Manage your password and 2FA', color: 'text-green-400' },
                { icon: Shield, label: 'Privacy & Safety', desc: 'Manage what people can see', color: 'text-purple-400' },
            ]
        },
        {
            title: 'Preferences',
            items: [
                { icon: Bell, label: 'Notifications', desc: 'Select notification preferences', color: 'text-yellow-400' },
                { icon: Palette, label: 'Appearance', desc: 'Manage display and themes', color: 'text-pink-400', toggle: true },
                { icon: Globe, label: 'Language', desc: 'English (India)', color: 'text-cyan-400' },
                { icon: Smartphone, label: 'Devices', desc: 'Manage logged in devices', color: 'text-orange-400' },
            ]
        },
        {
            title: 'Data & Storage',
            items: [
                { icon: Database, label: 'Data Usage', desc: 'Manage data downloads', color: 'text-teal-400' },
                { icon: Eye, label: 'Content Preferences', desc: 'Topics and interests', color: 'text-indigo-400' },
            ]
        },
        {
            title: 'Support',
            items: [
                { icon: HelpCircle, label: 'Help Center', desc: 'Get help with Vaani', color: 'text-gray-400' },
            ]
        },
    ];

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="pb-20">
            {/* Header */}
            <div className="sticky top-0 z-30 bg-black/70 backdrop-blur-xl px-4 py-3 border-b border-gray-800/50 flex items-center gap-6">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 rounded-full hover:bg-gray-800/60 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <div>
                    <h2 className="font-bold text-lg leading-tight">Settings</h2>
                    <p className="text-gray-500 text-xs">@{user?.username}</p>
                </div>
            </div>

            {/* User Card */}
            <div className="mx-4 mt-4 p-4 rounded-2xl bg-gradient-to-br from-gray-900/80 to-gray-900/40 border border-gray-800/50 backdrop-blur-md">
                <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-purple-900/20">
                        {user?.full_name?.charAt(0) || 'V'}
                    </div>
                    <div className="flex-1">
                        <h3 className="font-bold text-lg">{user?.full_name || 'User'}</h3>
                        <p className="text-gray-500 text-sm">@{user?.username}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-600" />
                </div>
            </div>

            {/* Settings Sections */}
            <div className="mt-6 space-y-6">
                {settingsSections.map((section, sIdx) => (
                    <div key={sIdx}>
                        <h3 className="px-4 text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                            {section.title}
                        </h3>
                        <div className="divide-y divide-gray-800/30">
                            {section.items.map((item, iIdx) => {
                                const IconComponent = item.icon;
                                return (
                                    <div
                                        key={iIdx}
                                        className="flex items-center gap-4 px-4 py-3.5 hover:bg-white/[0.03] cursor-pointer transition-colors group"
                                    >
                                        <div className={`w-9 h-9 rounded-xl bg-gray-900 flex items-center justify-center ${item.color} border border-gray-800/50`}>
                                            <IconComponent className="w-4.5 h-4.5" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-semibold">{item.label}</p>
                                            <p className="text-gray-500 text-xs mt-0.5">{item.desc}</p>
                                        </div>
                                        {item.toggle ? (
                                            <button
                                                onClick={(e) => { e.stopPropagation(); setDarkMode(!darkMode); }}
                                                className={`w-11 h-6 rounded-full transition-all duration-200 flex items-center px-0.5 ${darkMode ? 'bg-blue-500' : 'bg-gray-700'
                                                    }`}
                                            >
                                                <div className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-200 flex items-center justify-center ${darkMode ? 'translate-x-5' : 'translate-x-0'
                                                    }`}>
                                                    {darkMode ? <Moon className="w-3 h-3 text-blue-500" /> : <Sun className="w-3 h-3 text-yellow-500" />}
                                                </div>
                                            </button>
                                        ) : (
                                            <ChevronRight className="w-4 h-4 text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            {/* Danger Zone */}
            <div className="mt-8 mx-4 space-y-3">
                <button
                    onClick={handleLogout}
                    className="w-full py-3 rounded-xl border border-red-500/30 text-red-400 font-bold text-sm hover:bg-red-500/10 transition-colors flex items-center justify-center gap-2 active:scale-[0.98]"
                >
                    <LogOut className="w-4 h-4" />
                    Log Out
                </button>
                <button className="w-full py-3 rounded-xl border border-red-800/30 text-red-600 font-semibold text-sm hover:bg-red-500/5 transition-colors flex items-center justify-center gap-2 active:scale-[0.98]">
                    <Trash2 className="w-4 h-4" />
                    Deactivate Account
                </button>
            </div>

            {/* Footer */}
            <div className="mt-8 pb-8 text-center">
                <p className="text-gray-700 text-xs">Vaani v1.0.0</p>
                <p className="text-gray-800 text-[10px] mt-1">© 2026 Vaani. All rights reserved.</p>
            </div>
        </div>
    );
};

export default Settings;

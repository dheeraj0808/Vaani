import React from 'react';

const Sidebar = () => {
    const menuItems = [
        { icon: '🏠', label: 'Home', active: true },
        { icon: '🔍', label: 'Explore' },
        { icon: '🔔', label: 'Notifications' },
        { icon: '✉️', label: 'Messages' },
        { icon: '📑', label: 'Lists' },
        { icon: '👤', label: 'Profile' },
        { icon: '⚙️', label: 'Settings' },
    ];

    return (
        <aside className="w-64 h-screen sticky top-0 p-4">
            <div className="space-y-2">
                {menuItems.map((item, index) => (
                    <div
                        key={index}
                        className={`flex items-center gap-4 px-4 py-3 rounded-full cursor-pointer transition-colors ${item.active
                                ? 'font-bold'
                                : 'hover:bg-gray-900'
                            }`}
                    >
                        <span className="text-xl">{item.icon}</span>
                        <span className="text-lg">{item.label}</span>
                    </div>
                ))}
            </div>
            <button className="w-full bg-blue-500 text-white font-bold py-3 rounded-full mt-4 hover:bg-blue-600 transition-colors">
                Post
            </button>
        </aside>
    );
};

export default Sidebar;

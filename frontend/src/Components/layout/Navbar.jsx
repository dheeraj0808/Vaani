import React from 'react';

const Navbar = () => {
    return (
        <nav className="sticky top-0 bg-black/80 backdrop-blur-md border-b border-gray-800 px-4 py-3">
            <div className="flex items-center justify-between max-w-7xl mx-auto">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center transform rotate-12">
                        <span className="text-white text-lg font-black -rotate-12 italic">V</span>
                    </div>
                    <span className="text-xl font-black tracking-tighter">VAANI</span>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

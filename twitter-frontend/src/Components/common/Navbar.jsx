import React from 'react';

const Navbar = () => {
    return (
        <nav className="sticky top-0 bg-black/80 backdrop-blur-md border-b border-gray-800 px-4 py-3">
            <div className="flex items-center justify-between max-w-7xl mx-auto">
                <div className="text-2xl font-bold text-blue-500">𝕏</div>
                <div className="flex-1 max-w-md mx-4">
                    <input
                        type="text"
                        placeholder="Search"
                        className="w-full bg-gray-900 rounded-full px-4 py-2 text-white placeholder-gray-500 border border-gray-700 focus:border-blue-500 focus:outline-none"
                    />
                </div>
                <div className="flex items-center gap-4">
                    <button className="bg-white text-black font-bold px-4 py-2 rounded-full hover:bg-gray-200">
                        Post
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

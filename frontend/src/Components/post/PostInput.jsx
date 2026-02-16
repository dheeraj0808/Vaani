import React from 'react';
import { useAuthContext } from '../../context/AuthContext';

const PostInput = () => {
    const { user } = useAuthContext();

    return (
        <div className="border-b border-gray-800 p-4">
            <div className="flex gap-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex-shrink-0 flex items-center justify-center text-white font-bold text-xl">
                    {user ? user.fullName?.charAt(0) : 'V'}
                </div>
                <div className="flex-1">
                    <textarea
                        placeholder="What's happening?!"
                        className="w-full bg-transparent text-xl text-white placeholder-gray-500 resize-none outline-none min-h-[80px]"
                    />
                    <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                        <div className="flex gap-4 text-blue-500">
                            <button className="hover:bg-blue-500/10 p-2 rounded-full">📷</button>
                            <button className="hover:bg-blue-500/10 p-2 rounded-full">📊</button>
                            <button className="hover:bg-blue-500/10 p-2 rounded-full">😊</button>
                            <button className="hover:bg-blue-500/10 p-2 rounded-full">📅</button>
                        </div>
                        <button className="bg-blue-500 text-white font-bold px-4 py-2 rounded-full hover:bg-blue-600 disabled:opacity-50">
                            Post
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostInput;

import React from 'react';

const StoryBar = () => {
    const stories = [
        { id: 1, name: 'Your Story', isAdd: true },
        { id: 2, name: 'Alex' },
        { id: 3, name: 'Maria' },
        { id: 4, name: 'John' },
        { id: 5, name: 'Sarah' },
    ];

    return (
        <div className="border-b border-gray-800 p-4">
            <div className="flex gap-4 overflow-x-auto scrollbar-hide">
                {stories.map((story) => (
                    <div key={story.id} className="flex flex-col items-center gap-2 cursor-pointer">
                        <div
                            className={`w-16 h-16 rounded-full flex items-center justify-center ${story.isAdd
                                    ? 'border-2 border-dashed border-gray-600 bg-gray-900'
                                    : 'bg-gradient-to-r from-purple-500 to-pink-500 p-0.5'
                                }`}
                        >
                            {story.isAdd ? (
                                <span className="text-2xl text-gray-400">+</span>
                            ) : (
                                <div className="w-full h-full bg-gray-700 rounded-full"></div>
                            )}
                        </div>
                        <span className="text-xs text-gray-400 truncate max-w-[64px]">
                            {story.name}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StoryBar;

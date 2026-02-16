import React from 'react';

const PostCard = () => {
    const samplePost = {
        user: {
            name: 'John Doe',
            handle: '@johndoe',
            avatar: null,
        },
        content: 'Just setting up my Vaani account! 🚀 This is going to be amazing.',
        timestamp: '2h',
        likes: 42,
        retweets: 12,
        replies: 5,
    };

    return (
        <div className="border-b border-gray-800 p-4 hover:bg-gray-900/50 cursor-pointer transition-colors">
            <div className="flex gap-4">
                <div className="w-12 h-12 bg-gray-600 rounded-full flex-shrink-0"></div>
                <div className="flex-1">
                    <div className="flex items-center gap-2">
                        <span className="font-bold">{samplePost.user.name}</span>
                        <span className="text-gray-500">{samplePost.user.handle}</span>
                        <span className="text-gray-500">·</span>
                        <span className="text-gray-500">{samplePost.timestamp}</span>
                    </div>
                    <p className="mt-2">{samplePost.content}</p>
                    <div className="flex justify-between mt-4 max-w-md text-gray-500">
                        <button className="flex items-center gap-2 hover:text-blue-500">
                            💬 <span>{samplePost.replies}</span>
                        </button>
                        <button className="flex items-center gap-2 hover:text-green-500">
                            🔁 <span>{samplePost.retweets}</span>
                        </button>
                        <button className="flex items-center gap-2 hover:text-pink-500">
                            ❤️ <span>{samplePost.likes}</span>
                        </button>
                        <button className="flex items-center gap-2 hover:text-blue-500">
                            📤
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostCard;

import React from 'react';

const TweetCard = () => {
    const sampleTweet = {
        user: {
            name: 'John Doe',
            handle: '@johndoe',
            avatar: null,
        },
        content: 'Just setting up my Twitter clone! 🚀 This is going to be amazing.',
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
                        <span className="font-bold">{sampleTweet.user.name}</span>
                        <span className="text-gray-500">{sampleTweet.user.handle}</span>
                        <span className="text-gray-500">·</span>
                        <span className="text-gray-500">{sampleTweet.timestamp}</span>
                    </div>
                    <p className="mt-2">{sampleTweet.content}</p>
                    <div className="flex justify-between mt-4 max-w-md text-gray-500">
                        <button className="flex items-center gap-2 hover:text-blue-500">
                            💬 <span>{sampleTweet.replies}</span>
                        </button>
                        <button className="flex items-center gap-2 hover:text-green-500">
                            🔁 <span>{sampleTweet.retweets}</span>
                        </button>
                        <button className="flex items-center gap-2 hover:text-pink-500">
                            ❤️ <span>{sampleTweet.likes}</span>
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

export default TweetCard;

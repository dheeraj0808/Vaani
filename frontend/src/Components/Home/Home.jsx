import React from 'react';
import Sidebar from '../common/Sidebar';
import Navbar from '../common/Navbar';
import PostInput from '../post/PostInput';
import PostCard from '../post/PostCard';
import StoryBar from '../story/StoryBar';

const Home = () => {
    return (
        <div className="min-h-screen bg-black text-white">
            <Navbar />
            <div className="flex">
                <Sidebar />
                {/* Main content with left margin to account for fixed sidebar */}
                <main className="flex-1 border-x border-gray-800 max-w-xl ml-64">
                    <StoryBar />
                    <PostInput />
                    <PostCard />
                </main>
            </div>
        </div>
    );
};

export default Home;

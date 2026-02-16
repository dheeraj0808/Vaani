import React from 'react';
import Sidebar from '../components/layout/Sidebar';
import Navbar from '../components/layout/Navbar';
import PostInput from '../components/post/PostInput';
import PostCard from '../components/post/PostCard';
import StoryBar from '../components/story/StoryBar';

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

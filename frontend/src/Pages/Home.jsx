import React from 'react';
import PostInput from '../components/post/PostInput';
import PostCard from '../components/post/PostCard';
import StoryBar from '../components/story/StoryBar';

const Home = () => {
    return (
        <div className="pb-20">
            <StoryBar />
            <PostInput />
            <PostCard />
        </div>
    );
};

export default Home;

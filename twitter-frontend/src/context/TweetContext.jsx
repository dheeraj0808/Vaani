import React, { createContext, useState, useContext } from 'react';

const TweetContext = createContext();

export const TweetProvider = ({ children }) => {
    const [tweets, setTweets] = useState([]);

    return (
        <TweetContext.Provider value={{ tweets, setTweets }}>
            {children}
        </TweetContext.Provider>
    );
};

export const useTweetContext = () => useContext(TweetContext);

export default TweetContext;

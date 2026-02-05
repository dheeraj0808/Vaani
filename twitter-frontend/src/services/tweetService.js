import api from './api';

export const getTweets = async () => {
    const response = await api.get('/tweets');
    return response.data;
};

export const createTweet = async (tweetData) => {
    const response = await api.post('/tweets', tweetData);
    return response.data;
};

export const deleteTweet = async (tweetId) => {
    const response = await api.delete(`/tweets/${tweetId}`);
    return response.data;
};

export const likeTweet = async (tweetId) => {
    const response = await api.post(`/tweets/${tweetId}/like`);
    return response.data;
};

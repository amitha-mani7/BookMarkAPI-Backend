import axios from 'axios';

const BASE_URL = 'https://api.github.com';

export const searchUsers = async (query: string) => {
    const response = await axios.get(`${BASE_URL}/search/users`, {
        params: { q: query }
    });
    return response.data;
};

export const searchRepositories = async (query: string) => {
    const response = await axios.get(`${BASE_URL}/search/repositories`, {
        params: { q: query }
    });
    return response.data;
};

export const getUserRepositories = async (username: string) => {
    const response = await axios.get(`${BASE_URL}/users/${username}/repos`);
    return response.data;
};

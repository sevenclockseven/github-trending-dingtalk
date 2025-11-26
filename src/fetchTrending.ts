import axios from 'axios';
import { Project } from './types';

const GITHUB_TRENDING_URL = 'https://api.github.com/search/repositories?q=stars:>1&sort=stars&order=desc';

export const fetchTrending = async (): Promise<Project[]> => {
    try {
        const response = await axios.get(GITHUB_TRENDING_URL);
        return response.data.items;
    } catch (error) {
        console.error('Error fetching trending projects:', error);
        throw new Error('Failed to fetch trending projects');
    }
};
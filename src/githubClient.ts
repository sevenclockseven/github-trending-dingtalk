import axios from 'axios';

const GITHUB_API_URL = 'https://api.github.com';
const TRENDING_REPO_QUERY = 'repositories?sort=stars&order=desc';

export class GitHubClient {
    private token: string;

    constructor(token: string) {
        this.token = token;
    }

    private async request(endpoint: string) {
        const response = await axios.get(`${GITHUB_API_URL}/${endpoint}`, {
            headers: {
                Authorization: `token ${this.token}`,
            },
        });
        return response.data;
    }

    public async fetchTrendingRepos() {
        return await this.request(TRENDING_REPO_QUERY);
    }
}
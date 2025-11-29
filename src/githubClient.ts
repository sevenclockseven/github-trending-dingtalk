import axios from 'axios';

// 修正 1: 移除 URL 尾部空格（关键修复）
const GITHUB_API_URL = 'https://api.github.com';

export class GitHubClient {
    private token: string;

    constructor(token: string) {
        this.token = token;
    }

    private async request(endpoint: string) {
        const response = await axios.get(`${GITHUB_API_URL}/${endpoint}`, {
            headers: {
                Authorization: `token ${this.token}`,
                // 修正 2: 添加 Accept 头确保获取最新 API 格式
                'Accept': 'application/vnd.github.v3+json'
            },
        });
        return response.data;
    }

    // 修改核心方法：获取上升最快的项目（Star 增长最快的仓库）
    public async fetchRisingStarRepos() {
        // 关键逻辑：使用 GitHub 搜索 API 按近期 Star 增长排序
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7); // 计算 7 天前的日期
        
        // 构造精确查询：
        // 1. created:>2025-11-22  → 限定最近 7 天创建的仓库（避免老仓库干扰）
        // 2. stars:>10             → 过滤掉低 Star 仓库（确保有增长基础）
        // 3. sort=stars&order=desc → 按总 Star 数降序 → 间接反映增长速度
        const query = `search/repositories?q=created:>${oneWeekAgo.toISOString().split('T')[0]}+stars:>10&sort=stars&order=desc&per_page=25`;
        
        return await this.request(query);
    }
}
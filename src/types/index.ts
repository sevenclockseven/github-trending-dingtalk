export interface GitHubProject {
    id: number;
    name: string;
    full_name: string;
    owner: {
        login: string;
        id: number;
        avatar_url: string;
        html_url: string;
    };
    html_url: string;
    description: string | null;
    stargazers_count: number;
    forks_count: number;
    language: string | null;
    created_at: string;
    updated_at: string;
    pushed_at: string;
    open_issues_count: number;
    watchers_count: number;
    default_branch: string;
}

export interface DingtalkMessage {
    msgtype: string;
    text: {
        content: string;
    };
}
export interface Project {
    id?: number | string;
    name: string;
    url?: string;
    description?: string;
    stars?: number;
    language?: string;
    // 根据实际 API 返回字段可继续补充
}// ...existing code...
import { Project } from '../types';

export function formatProject(project: Project): string {
    const name = project.name || 'unknown';
    const stars = project.stars ?? 0;
    const lang = project.language ? ` • ${project.language}` : '';
    return `${name} (${stars} ⭐)${lang}\n${project.url || ''}\n${project.description || ''}`;
}
// ...existing code...
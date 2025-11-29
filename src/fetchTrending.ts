import axios from 'axios';

type Project = any;

// 修改为：获取最近创建且 star 高的项目（反映上升趋势）
const GITHUB_TRENDING_URL = () => {
  const today = new Date();
  const pastDate = new Date();
  pastDate.setMonth(pastDate.getMonth() - 1); // 一个月前

  const dateString = pastDate.toISOString().split('T')[0]; // 格式：YYYY-MM-DD

  // 搜索：过去一个月创建的项目，按 star 数降序排列
  return `https://api.github.com/search/repositories?q=created:>=${dateString}+stars:>50&sort=stars&order=desc&per_page=100`;
};

export const fetchTrending = async (): Promise<Project[]> => {
  try {
    const response = await axios.get(GITHUB_TRENDING_URL());
    return response.data.items;
  } catch (error) {
    console.error('Error fetching rising projects:', error);
    throw new Error('Failed to fetch rising projects');
  }
};
import { fetchTrending } from './fetchTrending';
import { sendToDingtalk } from './sendToDingtalk';

async function main() {
    try {
        const trendingProjects = await fetchTrending();
        await sendToDingtalk(trendingProjects);
    } catch (error) {
        console.error('Error fetching or sending trending projects:', error);
    }
}

main();
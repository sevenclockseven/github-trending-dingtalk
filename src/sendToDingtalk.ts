import dotenv from 'dotenv';
dotenv.config();
import axios from 'axios';
import { formatProject, Project } from './utils/format';


export const sendToDingtalk = async (projects: Project[]) => {
    const DINGTALK_WEBHOOK_URL = process.env.DINGTALK_WEBHOOK_URL;
    if (!DINGTALK_WEBHOOK_URL) {
        throw new Error('DINGTALK_WEBHOOK_URL 未定义，请在 GitHub Actions 的 secrets 中添加该变量');
    }

    const formattedData = projects.map(formatProject).join('\n\n');

    try {
        await axios.post(DINGTALK_WEBHOOK_URL, {
            msgtype: 'text',
            text: {
                content: "热门项目："+formattedData,
            },
        });
    } catch (error) {
        console.error('Error sending message to DingTalk:', error);
    }
};
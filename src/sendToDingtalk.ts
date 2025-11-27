import axios from 'axios';
import { formatProject, Project } from './utils/format';

const DINGTALK_WEBHOOK_URL =
    (process.env.DINGTALK_WEBHOOK_URL || process.env.INPUT_DINGTALK_WEBHOOK_URL || '').trim() || undefined;

export const sendToDingtalk = async (projects: Project[]) => {
    if (!DINGTALK_WEBHOOK_URL) {
        throw new Error('DINGTALK_WEBHOOK_URL is not defined in environment variables');
    }

    const formattedData = projects.map(formatProject).join('\n\n');

    try {
        await axios.post(DINGTALK_WEBHOOK_URL, {
            msgtype: 'text',
            text: {
                content: "侦测到："+formattedData,
            },
        });
    } catch (error) {
        console.error('Error sending message to DingTalk:', error);
    }
};
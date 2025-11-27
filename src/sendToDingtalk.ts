import axios from 'axios';
import { formatProject } from './utils/format';

const DINGTALK_WEBHOOK_URL = process.env.DINGTALK_WEBHOOK_URL;

export const sendToDingtalk = async (projects: any[]) => {
    if (!DINGTALK_WEBHOOK_URL) {
        throw new Error('DINGTALK_WEBHOOK_URL is not defined in environment variables');
    }

    const formattedData = formatProjectData(projects);

    try {
        await axios.post(DINGTALK_WEBHOOK_URL, {
            msgtype: 'text',
            text: {
                content: formattedData,
            },
        });
    } catch (error) {
        console.error('Error sending message to DingTalk:', error);
    }
};
import axios from 'axios';
import { formatProjectData } from './utils/format';
import { Project } from './types';

const DINGTALK_WEBHOOK_URL = process.env.DINGTALK_WEBHOOK_URL;

export const sendToDingtalk = async (projects: Project[]) => {
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
import axios from 'axios';
import { formatProject, Project } from './utils/format';


export const sendToDingtalk = async (projects: Project[]) => {
    const DINGTALK_WEBHOOK_URL = 'https://oapi.dingtalk.com/robot/send?access_token=0be49d62bf02133eb679b8f14a15e93cc32e0a1c4cb6c1efeb84a7458ad2db07';
    if (!DINGTALK_WEBHOOK_URL) {
        throw new Error('DINGTALK_WEBHOOK_URL 未定义，请在 GitHub Actions 的 secrets 中添加该变量');
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
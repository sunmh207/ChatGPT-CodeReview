import { ChatGPTAPI } from 'chatgpt';
export class Chat {
  private chatAPI: ChatGPTAPI;

  constructor(apikey: string) {
    this.chatAPI = new ChatGPTAPI({
      apiKey: apikey,
    });
  }

  private generatePrompt = (patch: string) => {
    /*return `, please help me do a brief code review, if any bug risk and improvement suggestion are welcome */
    return `请帮我做一个简短的代码审查，是否有错误风险和改进建议
    ${patch}
    `;
  };

  public codeReview = async (patch: string) => {
    if (!patch) {
      return '';
    }

    console.time('code-review cost');
    const prompt = this.generatePrompt(patch);

    const res = await this.chatAPI.sendMessage(prompt, {
      promptPrefix: 'hi,',
      promptSuffix: "\nlet's start",
    });

    console.timeEnd('code-review cost');
    return res.text;
  };
}

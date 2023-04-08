import { Injectable } from '@nestjs/common';
import { IChatGptRequest, IChatResponse } from './dto/chatgpt-request';
import { ConfigService } from '@nestjs/config/dist';

import { Configuration, OpenAIApi } from 'openai';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class ChatgptService {
  openAI: OpenAIApi = null; // using this as a wrapper instead of axios
  constructor(private configService: ConfigService) {
    this.openAI = new OpenAIApi(
      new Configuration({
        apiKey: this.chatGTPKey,
      }),
    );
  }

  private get chatGTPKey(): string {
    return this.configService.get<string>('CHAT_GPT_KEY');
  }

  private get chatGPTModel() {
    return this.configService.get<string>('CHAT_GPT_MODEL');
  }

  /**
   *  Run the command against chat gpt
   * @param aiRequest the request parameters to run with chat GPT
   * @returns
   */
  async runCommand(aiRequest: IChatGptRequest) {
    if (!aiRequest || !aiRequest.content) {
      throw new BadRequestException('A command is required');
    }

    const { data } = (await this.openAI.createChatCompletion({
      model: this.chatGPTModel,
      messages: [
        { role: aiRequest.role ?? 'user', content: aiRequest.content },
      ],
    })) as any as IChatResponse; // incorrect return type on function

    if (!data) {
      return 'I have failed :(';
    }

    return data.choices[0].message.content;
  }

  /**
   *  Run the commands against chat gpt
   * @param aiRequest an array of request parameters to run with chat GPT
   * @returns
   */
  async runCommands(aiRequest: IChatGptRequest[]) {
    if (!aiRequest || aiRequest.length === 0) {
      throw new BadRequestException('A command is required');
    }
    const { data } = (await this.openAI.createChatCompletion({
      model: this.chatGPTModel,
      messages: aiRequest,
    })) as any as IChatResponse; // incorrect return type on function

    if (!data) {
      return 'I have failed :(';
    }
    return data.choices;
  }
}

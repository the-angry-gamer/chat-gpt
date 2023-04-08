import { ChatCompletionRequestMessageRoleEnum } from 'openai';

export interface IChatGptRequest {
  content: string;
  role: ChatCompletionRequestMessageRoleEnum;
}

export interface IChatResponse {
  data: {
    choices: {
      message: { role: string; content: string };
    }[];
  };
}

import { Body, Controller, Post } from '@nestjs/common';
import { ChatgptService } from './chatgpt.service';
import { IChatGptRequest } from './dto/chatgpt-request';

@Controller('chatgpt')
export class ChatgptController {
  constructor(private chatService: ChatgptService) {}

  @Post()
  runCommand(@Body() request: IChatGptRequest): Promise<any> {
    return this.chatService.runCommand(request);
  }

  @Post('/complex')
  runCommands(@Body() request: IChatGptRequest[]): Promise<any> {
    return this.chatService.runCommands(request);
  }
}

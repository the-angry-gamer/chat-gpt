import { ChatgptController } from './chatgpt.controller';
import { ChatgptService } from './chatgpt.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [ChatgptController],
  providers: [ChatgptService],
})
export class ChatgptModule {}

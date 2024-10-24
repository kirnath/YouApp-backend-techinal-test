import { Inject, Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/message.dto';
import { MessagesGateway } from './app.gateway';

@Injectable()
export class AppService {
  constructor(
    @Inject() private readonly messagesGateway: MessagesGateway,
  ) {}
  messageReceived(message: CreateMessageDto) {
    const { senderId } = message;
    this.messagesGateway.notifyUser(senderId, message);
    console.log(`RabbitMQ: Received new message: ${message.content}`);
  }
}

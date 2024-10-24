import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Message, MessageDocument } from './schemas/message.schema';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
    @Inject('MESSAGE_SERVICE') private rabbitClient: ClientProxy,
  ) {}

  async create(senderId: string, receiverId: string, content: string) {
    const message = new this.messageModel({
      senderId,
      receiverId,
      content,
    });
    await message.save();
    
    this.rabbitClient.emit('new_message', message);
    return message;
  }

  async findConversation(userId: string) {
    try {
      console.log("FIND CONVERSATION USER ID", userId);
      const objectId = new Types.ObjectId(userId);
      console.log("Converted ObjectId:", objectId);
  
      const conversation = await this.messageModel
        .find({
          $or: [
            { senderId: objectId },
            { receiverId: userId },
          ],
        })
        .sort({ createdAt: -1 })
        .populate('senderId', 'username displayName')
        .populate('receiverId', 'username displayName')
        .exec();
  
      console.log("Conversation found:", conversation);
      return conversation;
    } catch (error) {
      console.error("Error finding conversation:", error);
      throw new Error("Internal Server Error");
    }
  }
}


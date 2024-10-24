import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import * as jwt from 'jsonwebtoken';

@WebSocketGateway({
  namespace: '/messages/viewMessages',
  cors: {
    origin: '*',
  },
})
export class MessagesGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private connectedUsers = new Map<string, Socket>();

  handleConnection(client: Socket) {
    try {
      const token = client.handshake.auth.token.split(' ')[1];
      const { userId } = jwt.verify(token, 'secret'); 

      this.connectedUsers.set(userId, client);
      console.log(`User connected: ${userId}`);
    } catch (error) {
      console.error('JWT verification failed:', error);
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    const token = client.handshake.auth.token.split(' ')[1];
    const { userId } = jwt.verify(token, 'secret');

    this.connectedUsers.delete(userId);
    console.log(`User disconnected: ${userId}`);
  }

  notifyUser(userId: string, message: any) {
    const userSocket = this.connectedUsers.get(userId);
    if (userSocket) {
      console.log(`Sending message to user ${userId}:`, message);
      userSocket.emit('newMessage', message);
    } else {
      console.log(`User ${userId} not connected`);
    }
  }
}
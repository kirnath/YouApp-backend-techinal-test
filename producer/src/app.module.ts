import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { ZodiacModule } from './zodiac/zodiac.module';
import { MessagesModule } from './messages/message.module';
import { JwtStrategy } from './auth/jwt.strategy';
import { ClientsModule, Transport } from '@nestjs/microservices';
@Module({
  imports: [
    AuthModule, 
    MongooseModule.forRoot('mongodb://localhost:27017/YouAppDB'),
    JwtModule.register({
      global: true,
      secret: 'secret',
      signOptions: { expiresIn: '1h' }
    }),
    
    ZodiacModule,
    MessagesModule
    
  ],
  controllers: [],
  providers: [JwtStrategy],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { TelegramAuthService } from 'src/common/telegram-auth.service';

@Module({
  controllers: [AuthController],
  providers: [TelegramAuthService],
})
export class AuthModule {}

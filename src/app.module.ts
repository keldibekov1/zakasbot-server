import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BotModule } from './bot/bot.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TelegramAuthService } from './common/telegram-auth.service';

@Module({
  imports: [BotModule, PrismaModule, UserModule, AuthModule],
  controllers: [AppController],
  providers: [TelegramAuthService,AppService],
})
export class AppModule {}

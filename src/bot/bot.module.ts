import { Module } from '@nestjs/common';
import { BotService } from './bot.service';
import { BotController } from './bot.controller';
import { TelegrafModule } from 'nestjs-telegraf';
import { PrismaService } from 'src/prisma/prisma.service';
import { BotUpdate } from './bot.update';

@Module({
  imports: [
    TelegrafModule.forRoot({
      token: process.env.BOT_TOKEN ?? (() => { throw new Error('BOT_TOKEN is not defined'); })(),
    }),
  ],
  controllers: [BotController],
  providers: [BotService, PrismaService, BotUpdate],
})
export class BotModule {}

import { Controller, Post, Body } from '@nestjs/common';
import { TelegramAuthService } from 'src/common/telegram-auth.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly tgAuthService: TelegramAuthService,
    private readonly prisma: PrismaService,
  ) {}

@Post('telegram')
async telegramLogin(@Body('initData') initData: string) {
  const tgUser = this.tgAuthService.checkAuth(initData);
  const telegramId = BigInt(tgUser.id);

  let user = await this.prisma.user.findUnique({ where: { telegramId } });

  if (!user) {
    user = await this.prisma.user.create({
      data: {
        telegramId,
        name: tgUser.first_name,
        telegramFirstName: tgUser.first_name,
        telegramLastName: tgUser.last_name || null,
        username: tgUser.username || null,
        role: 'ZAMERCHI', // default
        status: 'ACTIVE',
      },
    });
  }

  return { ok: true, telegramId: user.telegramId, role: user.role };
}

}

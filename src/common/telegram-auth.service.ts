import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class TelegramAuthService {
  checkAuth(initData: string) {
    if (!initData) throw new UnauthorizedException('initData topilmadi');

    const botToken = process.env.BOT_TOKEN;
    if (!botToken) throw new UnauthorizedException('BOT_TOKEN sozlanmagan');

    const secretKey = crypto.createHash('sha256').update(botToken).digest();

    const params = new URLSearchParams(initData);
    const hash = params.get('hash');
    params.delete('hash');

    const dataCheckString = Array.from(params.entries())
      .map(([key, val]) => `${key}=${val}`)
      .sort()
      .join('\n');

    const hmac = crypto.createHmac('sha256', secretKey).update(dataCheckString).digest('hex');

    if (hmac !== hash) {
      throw new UnauthorizedException('Hash tekshiruv xatosi');
    }

    const userJson = params.get('user');
    if (!userJson) throw new UnauthorizedException('User maʼlumotlari yo‘q');

    return JSON.parse(userJson); // { id, first_name, last_name?, username?, ... }
  }
}

import { Ctx, Start, Update, On } from 'nestjs-telegraf';
import { PrismaService } from '../prisma/prisma.service';
import { Context, Markup } from 'telegraf';
import { Message } from 'telegraf/typings/core/types/typegram';

@Update()
export class BotUpdate {
  constructor(private prisma: PrismaService) {}

  @Start()
  async startCommand(@Ctx() ctx: Context) {
    const firstName = ctx.from?.first_name || 'Dostim';

    await ctx.reply(
      `Assalomu alaykum ${firstName} 👋\n📱 Telefon raqamingizni yuboring!`,
      Markup.keyboard([
        [Markup.button.contactRequest('📱 Raqam yuborish')],
      ])
        .oneTime()
        .resize(),
    );
  }

  @On('contact')
  async handleContact(@Ctx() ctx: Context) {
    const message = ctx.message as Message.ContactMessage;
    if (!message.contact) {
      await ctx.reply('🚫Telefon raqamingizni yubormadingiz!');
      return;
    }

    const contact = message.contact;

    const existingUser = await this.prisma.user.findUnique({
      where: { phone: contact.phone_number },
    });

    if (existingUser) {
      await this.prisma.user.update({
        where: { phone: contact.phone_number },
        data: {
          telegramId: existingUser.telegramId ?? (contact.user_id !== undefined ? BigInt(contact.user_id) : null),
          telegramFirstName:
            existingUser.telegramFirstName ?? (ctx.from?.first_name || null),
          telegramLastName:
            existingUser.telegramLastName ?? (ctx.from?.last_name || null),
          username: existingUser.username ?? (ctx.from?.username || null),
        },
      });

      await ctx.reply('✅ Malumotlaringiz toldirildi.');
    } else {
      await this.prisma.user.create({
        data: {
          phone: contact.phone_number,
          telegramId: contact.user_id !== undefined ? BigInt(contact.user_id) : null,
          telegramFirstName: ctx.from?.first_name || null,
          telegramLastName: ctx.from?.last_name || null,
          username: ctx.from?.username || null,
          status: 'INACTIVE'
        },
      });

      await ctx.reply('✅ Siz muvaffaqiyatli royxatdan otdingiz.');
    }
  }
}

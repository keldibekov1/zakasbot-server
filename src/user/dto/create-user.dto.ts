import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsPhoneNumber, IsString } from 'class-validator';
import { UserRole } from '@prisma/client';

export class CreateUserDto {
  @ApiProperty({
    example: 'Kimdir zamerchi aka',
  })
  
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiPropertyOptional({
    description: 'Telefon raqam',
    example: '+998901234567',
  })
  @IsOptional()
  @IsPhoneNumber('UZ') 
  phone?: string;

  @ApiPropertyOptional({
    description: 'Foydalanuvchi roli',
    enum: UserRole,
    example: UserRole.ZAMERCHI,
  })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}

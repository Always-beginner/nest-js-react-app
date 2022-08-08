import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty } from 'class-validator';

@Exclude()
export class LoginAuthDto {
  @Expose()
  @ApiHideProperty()
  id?: number;

  @Expose()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email!: string;

  @Expose()
  @IsNotEmpty()
  @ApiProperty()
  password!: string;
}

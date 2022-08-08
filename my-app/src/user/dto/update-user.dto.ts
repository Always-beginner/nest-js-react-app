import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsEmail, IsOptional, IsString, MaxLength } from 'class-validator';

@Exclude()
export class UpdateUserDto {
  @Expose()
  @ApiHideProperty()
  id!: number;

  @Expose()
  @IsString()
  @IsOptional()
  @MaxLength(50)
  @ApiProperty()
  name?: string;

  @Expose()
  @IsString()
  @IsOptional()
  @IsEmail()
  @MaxLength(50)
  @ApiProperty()
  email?: string;

  @Expose()
  @IsOptional()
  @MaxLength(50)
  @ApiProperty()
  password?: string;
}

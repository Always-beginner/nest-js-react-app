import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from "class-validator";

@Exclude()
export class CreateUserDto {
  @Expose()
  @ApiHideProperty()
  id!: number;

  @Expose()
  @IsString()
  @IsOptional()
  @MaxLength(50)
  @ApiProperty()
  Name?: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(50)
  @ApiProperty()
  email__c!: string;

  @Expose()
  @IsNotEmpty()
  @MaxLength(50)
  @ApiProperty()
  password__c!: string;
}

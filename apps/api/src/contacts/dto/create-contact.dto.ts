import { OptInStatus } from '@prisma/client';
import { IsArray, IsDateString, IsEmail, IsEnum, IsOptional, IsPhoneNumber, IsString } from 'class-validator';

export class CreateContactDto {
  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsPhoneNumber()
  phone!: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  emotionalProfile?: string | null;

  @IsDateString()
  @IsOptional()
  birthday?: string | null;

  @IsString()
  @IsOptional()
  leadSource?: string | null;

  @IsString()
  @IsOptional()
  pipelineStage?: string | null;

  @IsEnum(OptInStatus)
  @IsOptional()
  optInStatus?: OptInStatus;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];
}

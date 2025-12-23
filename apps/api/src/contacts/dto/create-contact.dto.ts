import { OptInStatus } from '@soniarose/database';
import { IsArray, IsDateString, IsEmail, IsEnum, IsOptional, IsPhoneNumber, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateContactDto {
  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsPhoneNumber()
  @Transform(({ value }: { value: any }) => {
    if (typeof value !== 'string') return value;
    // Remove all non-digit characters except +
    const cleaned = value.replace(/[^\d+]/g, '');

    // If 10 digits, assume US/Canada and add +1
    if (cleaned.length === 10) {
      return `+1${cleaned}`;
    }

    // If 11 digits and starts with 1, add +
    if (cleaned.length === 11 && cleaned.startsWith('1')) {
      return `+${cleaned}`;
    }

    // If it doesn't start with +, add + (naive assumption, but helps with IsPhoneNumber)
    if (!cleaned.startsWith('+')) {
      return `+${cleaned}`;
    }

    return cleaned;
  })
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

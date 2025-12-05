import { IsEnum, IsOptional, IsString, IsArray, IsBoolean } from 'class-validator';
import { TemplateType } from '@prisma/client';

export class CreateTemplateDto {
    @IsString()
    name!: string;

    @IsString()
    body!: string;

    @IsOptional()
    @IsEnum(TemplateType)
    type?: TemplateType;

    @IsOptional()
    @IsArray()
    variables?: string[];

    @IsOptional()
    @IsBoolean()
    isSystem?: boolean;
}

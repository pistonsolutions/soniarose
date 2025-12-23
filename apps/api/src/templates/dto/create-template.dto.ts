import { IsEnum, IsOptional, IsString, IsArray, IsBoolean } from 'class-validator';
import { TemplateType } from '@soniarose/database';

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

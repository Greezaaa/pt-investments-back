import {
  IsString,
  MinLength,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsPositive,
  IsNotEmpty,
  IsArray,
  IsUUID,
} from 'class-validator';
import { ApiProperty }from '@nestjs/swagger';

export class InvestorDto {
  @IsString()
  @IsNotEmpty({ message: 'id is required' })
  readonly id!: string;

  @IsString()
  @IsNotEmpty({ message: 'name is required' })
  @IsUUID('all', { message: 'userId must be a valid UUID' })
  readonly userId!: string;
}

export class CreateProjectDto {
  @IsString()
  @MinLength(1)
  title: string;

  @IsString()
  @MinLength(50)
  description: string;

  @IsString()
  company_name: string;

  @IsBoolean()
  @IsOptional()
  is_active?: boolean;

  @IsNumber()
  @IsPositive()
  desired_goal: number;

  @IsString()
  @MinLength(1)
  language: string;

  @IsString()
  location?: string;

  @IsString()
  @IsOptional()
  slug?: string;
  
  @IsOptional()
  @ApiProperty({
    isArray: true
  })
  investors?: InvestorDto[];
  
  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  images?: string[];
}
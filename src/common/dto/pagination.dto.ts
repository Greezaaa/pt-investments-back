import { Type } from 'class-transformer';
import { IsPositive, IsOptional, Min, IsInt } from 'class-validator';

export class Paginator {
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  limit?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Type(() => Number)
  offset?: number;
}

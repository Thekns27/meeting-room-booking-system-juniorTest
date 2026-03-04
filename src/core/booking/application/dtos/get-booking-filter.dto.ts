

import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsOptional } from 'class-validator';

export class GetBookingsFilterDto {
  @ApiPropertyOptional({ description: 'start date' })
  @IsDateString()
  @IsOptional()
  fromDate?: string;

  @ApiPropertyOptional({ description: 'end date' })
  @IsDateString()
  @IsOptional()
  toDate?: string;
}
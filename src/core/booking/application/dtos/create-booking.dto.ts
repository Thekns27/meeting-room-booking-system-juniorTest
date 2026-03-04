
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsDateString, IsOptional } from 'class-validator';

export class CreateBookingDto {
  @ApiProperty({ example: 'Weekly Sync Meeting' })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiPropertyOptional({ example: 'Discussing project milestones' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: '2026-03-04T012:00:00.000Z' })
   @IsDateString()
  @IsNotEmpty()
  start_time!: string;

  @ApiProperty({ example: '2026-03-04T12:00:45.000Z' })
  @IsDateString()
  @IsNotEmpty()
  end_time!: string;

  @ApiProperty({ example: 'cuid-room-id-123' })
  @IsString()
  @IsNotEmpty()
  room_id!: string;

}

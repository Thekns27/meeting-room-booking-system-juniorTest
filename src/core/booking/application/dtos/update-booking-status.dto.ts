
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class UpdateBookingStatusDto {
  @ApiProperty({ enum: ['BOOKED', 'CANCELLED'], example: 'CANCELLED' })
  @IsEnum(['BOOKED', 'CANCELLED'])
  @IsNotEmpty()
  status!: 'BOOKED' | 'CANCELLED';
}
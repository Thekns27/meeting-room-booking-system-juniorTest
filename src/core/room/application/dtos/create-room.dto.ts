import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateRoomDto {

  @ApiProperty({ example: 'Meeting Room A' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ example: 10 })
  @IsNumber()
  @Min(1)
  capacity!: number;

  @ApiProperty({ example: 'Level 1, Block B' })
  @IsString()
  @IsNotEmpty()
  location!: string;

}

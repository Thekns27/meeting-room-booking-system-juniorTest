import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../../domain/user.entity';


export class CreateUserDto {
  @ApiProperty({ example: 'John Doe' })
  name!: string;

  @ApiProperty({ example: 'john@example.com' })
  email!: string;

  @ApiProperty({ example: 'password' })
  password!: string;

  @ApiProperty({ enum: UserRole, example: UserRole.EMPLOYEE })
  role?: UserRole;
}
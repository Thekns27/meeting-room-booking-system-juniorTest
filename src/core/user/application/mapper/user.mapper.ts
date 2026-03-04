import { User } from '../../domain/user.entity';
import { UserResponseDto } from '../dtos/user-response.dto';

export class UserMapper {
  static toResponse(user: User): UserResponseDto {
    const primitives = user.toPrimitives();
    return {
      id: primitives.id!,
      name: primitives.name,
      email: primitives.email,
      createdAt: primitives.createdAt!,
    };
  }
}

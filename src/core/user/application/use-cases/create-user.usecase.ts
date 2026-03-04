import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { IUserRepository } from '../../domain/user.repository';
import { User, UserRole } from '../../domain/user.entity';
import { Email } from '../../domain/value-objects/user-email.vo';
import * as bcrypt from 'bcrypt';
import { ERROR_CODES } from 'src/common/errors/error.codes';

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(dto: CreateUserDto): Promise<User> {
    //  const email = Email.create(dto.email);
    const existingUser = await this.userRepository.findByEmail(dto.email);
    if (existingUser) {
      throw new ConflictException(ERROR_CODES.CONFLICT_EMAIL);
    }
    const hashedPasscode = await bcrypt.hash(dto.password, 10);

    const user = User.create({
      name: dto.name,
      email: Email.create(dto.email),
      password: hashedPasscode,
      role: dto.role as UserRole,
    });

    return this.userRepository.save(user);
  }
}

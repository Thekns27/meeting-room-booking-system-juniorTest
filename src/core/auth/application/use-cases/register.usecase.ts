import { Injectable, ConflictException } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { RegisterDto } from "../dtos/register.dto";
import { Email } from "src/core/user/domain/value-objects/user-email.vo";
import { User, UserRole } from "../../domain/entities/auth.entity";
import { AuthRepository } from "../../domain/repositories/auth.repository";

@Injectable()
export class RegisterUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(dto: RegisterDto): Promise<User> {
    const existingUser = await this.authRepository.findByEmail(dto.email);
    if (existingUser) {
      throw new ConflictException("User with this email already exists");
    }
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = User.create({
      name: dto.name,
      email: Email.create(dto.email),
      password: hashedPassword,
      role: dto.role as UserRole,
    });

    return await this.authRepository.save(user);
  }
}

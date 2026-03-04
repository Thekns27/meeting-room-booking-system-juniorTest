import { Injectable } from '@nestjs/common';
import { AuthRepository } from '../domain/repositories/auth.repository';
import { User } from '../domain/entities/auth.entity';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/core/infrastructure/prisma/prisma.service';

@Injectable()
export class PrismaAuthRepository implements AuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  private toDomain(record: any): User {
    return User.create(record);
  }

  async findByEmail(email: string) {
    const record = await this.prisma.user.findUnique({
      where: { email },
    });

    return record ? this.toDomain(record) : null;
  }

  async findById(id: string) {
    const record = await this.prisma.user.findUnique({
      where: { id },
    });

    return record ? this.toDomain(record) : null;
  }

  async save(user: User): Promise<User> {
    const primitives = user.toPrimitives();
    const savedData = await this.prisma.user.create({
      data: {
        name: primitives.name,
        email: primitives.email,
        password: primitives.password,
        role: primitives.role,
      },
    });
    return this.toDomain(savedData);
  }
}

import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../domain/user.repository';
import { Email } from '../domain/value-objects/user-email.vo';
import { PrismaService } from 'src/core/infrastructure/prisma/prisma.service';
import { User, UserRole } from '../domain/user.entity'; // UserRole ပါ import လုပ်ပါ

@Injectable()
export class PrismaUserRepository implements IUserRepository {
  constructor(private prisma: PrismaService) {}

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

    return this.ToDomain(savedData);
  }

  async findByEmail(email: string): Promise<User | null> {
    const data = await this.prisma.user.findUnique({ where: { email } });
    if (!data) return null;
    return this.ToDomain(data);
  }

  private ToDomain(prismaUser: any): User {
    return User.create({
      id: prismaUser.id,
      name: prismaUser.name,
      email: Email.create(prismaUser.email),
      role: prismaUser.role as UserRole,
      password: prismaUser.password,
      createdAt: prismaUser.createdAt,
    });
  }
}

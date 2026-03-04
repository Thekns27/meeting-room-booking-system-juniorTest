import { CreateUserUseCase } from './application/use-cases/create-user.usecase';
import { IUserRepository } from './domain/user.repository';
import { PrismaService } from '../infrastructure/prisma/prisma.service';
import { UserController } from './presentation/user.controller';
import { PrismaUserRepository } from './infrastructure/prisma.user.repository';
import { Module } from '@nestjs/common';
@Module({
  controllers: [UserController],
  providers: [
    PrismaService,
    CreateUserUseCase,
    {
      provide: IUserRepository,
      useClass: PrismaUserRepository,
    },
  ],
  exports: [CreateUserUseCase],
})
export class UserModule {}

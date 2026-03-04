import { HashService } from 'src/module/hash-service/hash.service';

import { Get, Module } from '@nestjs/common';
import { PrismaService } from 'src/core/infrastructure/prisma/prisma.service';
import { AuthController } from './presentation/auth.controller';
import { RegisterUseCase } from './application/use-cases/register.usecase';
import { LoginUseCase } from './application/use-cases/login.usecase';
import { AuthRepository } from './domain/repositories/auth.repository';
import { PrismaAuthRepository } from './infrastructure/prisma.auth.repository';
import { GetMeUseCase } from './application/use-cases/get-me.usecase';
import { REPOSITORY_TOKEN } from 'src/common/constant/repository.config';
import { IHASH_SERVICE } from 'src/common/constant';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/module/auth/strategies/jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'my-secret-key',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    JwtStrategy,
    RegisterUseCase,
    LoginUseCase,
    GetMeUseCase,
    PrismaService,
    {
      provide: AuthRepository,
      useClass: PrismaAuthRepository,
    },
    {
      provide: IHASH_SERVICE,
      useClass: HashService,
    },
    {
      provide: REPOSITORY_TOKEN.AUTH,
      useClass: PrismaAuthRepository,
    },
  ],
  exports: [
    RegisterUseCase,
    LoginUseCase,
    GetMeUseCase,
    PassportModule,
    JwtStrategy,
  ],
})
export class AuthModule {}

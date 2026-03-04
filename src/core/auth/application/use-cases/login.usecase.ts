import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthRepository } from '../../domain/repositories/auth.repository';
import { HashService } from 'src/module/hash-service/hash.service';
import { REPOSITORY_TOKEN } from 'src/common/constant/repository.config';
import { LoginDto } from '../dtos/login.dot';
import { IHASH_SERVICE } from 'src/common/constant';

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject(REPOSITORY_TOKEN.AUTH)
    private readonly userRepo: AuthRepository,
    private readonly jwt: JwtService,
    @Inject(IHASH_SERVICE)
    private readonly hashService: HashService,
  ) {}

  async execute(dto: LoginDto) {
    const user = await this.userRepo.findByEmail(dto.email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const userPrimitives = user.toPrimitives();

    const match = await this.hashService.compare(
      dto.password,
      userPrimitives.password,
    );

    if (!match) {
      throw new UnauthorizedException('Incorrect credentials');
    }

    const payload = {
      id: userPrimitives.id,
      email: userPrimitives.email,
      role: userPrimitives.role,
    };

    return {
      access_token: await this.jwt.signAsync(payload),
      user: {
        id: userPrimitives.id,
        name: userPrimitives.name,
        email: userPrimitives.email,
        role: userPrimitives.role,
      },
    };
  }
}

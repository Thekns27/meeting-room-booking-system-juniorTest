import {
  Controller,
  Post,
  Body,
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from '../application/dtos/create-user.dto';
import { UserMapper } from '../application/mapper/user.mapper';
import { CreateUserUseCase } from '../application/use-cases/create-user.usecase';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('users')
export class UserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User created successfully.' })
  async register(@Body() dto: CreateUserDto) {
    try {
      const user = await this.createUserUseCase.execute(dto);
      return UserMapper.toResponse(user);
    } catch (error) {
      if (error instanceof BadRequestException)
        throw new BadRequestException(error.message);
    }
  }
}

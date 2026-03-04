import { Inject, Injectable, ConflictException } from '@nestjs/common';
import { REPOSITORY_TOKEN } from 'src/common/constant/repository.config';
import { ERROR_CODES } from 'src/common/errors/error.codes';
import { CreateRoomDto } from '../dtos/create-room.dto';
import { IRoomRepository } from '../../domain/repositories/room.repository';
import { Room } from '../../domain/entities/room.entity';

@Injectable()
export class CreateRoomUseCase {
  constructor(
    @Inject(REPOSITORY_TOKEN.ROOM)
    private readonly roomRepo: IRoomRepository,
  ) {}

  async execute(dto: CreateRoomDto) {
    const existing = await this.roomRepo.findByName(dto.name);
    if (existing) {
      throw new ConflictException({
        code: ERROR_CODES.CONFLICT_ROOM_NAME,
        message: 'Room name already exists',
      });
    }
    console.log(dto);

    const newRoom = Room.create({
      id: null,
      name: dto.name,
      capacity: dto.capacity,
      location: dto.location,
      createdAt: new Date(),
    });

    return await this.roomRepo.save(newRoom);
  }
}

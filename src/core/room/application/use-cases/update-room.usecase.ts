import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { REPOSITORY_TOKEN } from 'src/common/constant/repository.config';
import { IRoomRepository } from '../../domain/repositories/room.repository';
import { Room } from '../../domain/entities/room.entity';
import { UpdateRoomDto } from '../dtos/update-room.dto';

@Injectable()
export class UpdateRoomUseCase {
  constructor(
    @Inject(REPOSITORY_TOKEN.ROOM)
    private readonly roomRepo: IRoomRepository,
  ) {}

  async execute(id: string, dto: UpdateRoomDto) {
    const existingRoom = await this.roomRepo.findById(id);
    if (!existingRoom) {
      throw new NotFoundException('room not found');
    }

    const updatedRoom = Room.create({
      id: id,
      name: dto.name!,
      capacity: dto.capacity!,
      location: dto.location!,
      createdAt: new Date(),
    });

    return await this.roomRepo.save(updatedRoom);
  }
}

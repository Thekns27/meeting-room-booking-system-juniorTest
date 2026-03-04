import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { REPOSITORY_TOKEN } from 'src/common/constant/repository.config';
import { IRoomRepository } from '../../domain/repositories/room.repository';

@Injectable()
export class DeleteRoomUseCase {
  constructor(
    @Inject(REPOSITORY_TOKEN.ROOM)
    private readonly roomRepo: IRoomRepository,
  ) {}

  async execute(id: string) {
    const existingRoom = await this.roomRepo.findById(id);
    if (!existingRoom) {
      throw new NotFoundException('room not found');
    }
    return await this.roomRepo.delete(id);
  }
}

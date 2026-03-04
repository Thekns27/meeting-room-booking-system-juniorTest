import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { REPOSITORY_TOKEN } from 'src/common/constant/repository.config';
import { IRoomRepository } from '../../domain/repositories/room.repository';

@Injectable()
export class GetRoomDetailUseCase {
  constructor(
    @Inject(REPOSITORY_TOKEN.ROOM)
    private readonly roomRepo: IRoomRepository,
  ) {}

  async execute(id: string) {
    const room = await this.roomRepo.findById(id);
    if (!room) {
      throw new NotFoundException('room not found');
    }
    return room;
  }
}

import { Module } from '@nestjs/common';
import { PrismaService } from '../infrastructure/prisma/prisma.service';
import { CreateRoomUseCase } from './application/use-cases/create-room.usecase';
import { PrismaRoomRepository } from './infrastructure/prisma.room.repository';
import { RoomController } from './presentation/room.controller';
import { REPOSITORY_TOKEN } from 'src/common/constant/repository.config';
import { DeleteRoomUseCase } from './application/use-cases/delete-room.usecase';
import { UpdateRoomUseCase } from './application/use-cases/update-room.usecase';
import { GetAllRoomsUseCase } from './application/use-cases/get-all-rooms.usecase';
import { GetRoomDetailUseCase } from './application/use-cases/get-room-details.usecase';

@Module({
  controllers: [RoomController],
  providers: [
    PrismaService,
    CreateRoomUseCase,
    UpdateRoomUseCase,
    DeleteRoomUseCase,
    GetAllRoomsUseCase,
    GetRoomDetailUseCase,
    {
      provide: REPOSITORY_TOKEN.ROOM,
      useClass: PrismaRoomRepository,
    },
  ],
  exports: [CreateRoomUseCase, REPOSITORY_TOKEN.ROOM],
})
export class RoomModule {}

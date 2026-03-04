import { Module } from '@nestjs/common';
import { BookingController } from './presentation/booking.controller';
import { CreateBookingUseCase } from './application/use-cases/create-booking.usecase';
import { GetMyBookingsUseCase } from './application/use-cases/get-my-bookings.usecase';
import { CancelBookingUseCase } from './application/use-cases/cancle-booking.usecase';
import { GetAllBookingsUseCase } from './application/use-cases/get-all-bookings.usecase';
import { GetRoomBookingsUseCase } from './application/use-cases/get-room-bookings.usecase';
import { REPOSITORY_TOKEN } from 'src/common/constant/repository.config';
import { PrismaBookingRepository } from './infrastructure/prisma-booking.repository';
import { RoomModule } from '../room/room.module';

@Module({
  imports: [RoomModule],
  controllers: [BookingController],
  providers: [
    CreateBookingUseCase,
    GetMyBookingsUseCase,
    CancelBookingUseCase,
    GetAllBookingsUseCase,
    GetRoomBookingsUseCase,
    {
      provide: REPOSITORY_TOKEN.BOOKING,
      useClass: PrismaBookingRepository,
    },
  ],
})
export class BookingModule {}

import { Inject, Injectable } from '@nestjs/common';
import { REPOSITORY_TOKEN } from 'src/common/constant/repository.config';
import { IBookingRepository } from '../../domain/repository/booking.repository';

@Injectable()
export class GetRoomBookingsUseCase {
  constructor(
    @Inject(REPOSITORY_TOKEN.BOOKING)
    private readonly bookingRepo: IBookingRepository,
  ) {}

  async execute(roomId: string) {
    return await this.bookingRepo.findByRoomId(roomId);
  }
}

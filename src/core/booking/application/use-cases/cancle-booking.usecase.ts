import {
  ConflictException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { REPOSITORY_TOKEN } from 'src/common/constant/repository.config';
import { IBookingRepository } from '../../domain/repository/booking.repository';

@Injectable()
export class CancelBookingUseCase {
  constructor(
    @Inject(REPOSITORY_TOKEN.BOOKING)
    private readonly bookingRepo: IBookingRepository,
  ) {}

  async execute(bookingId: string, userId: string, userRole: string) {
    const booking = await this.bookingRepo.findById(bookingId);
    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    const data = (booking as any).toPrimitives;
    if (data.user_id !== userId && userRole !== 'ADMIN') {
      throw new ForbiddenException(
        'You do not have permission to cancel this booking',
      );
    }

    if (data.status === 'CANCELLED') {
      throw new ConflictException('Booking is already cancelled');
    }

    await this.bookingRepo.updateStatus(bookingId, 'CANCELLED');

    return { message: 'Booking cancelled successfully', id: bookingId };
  }
}
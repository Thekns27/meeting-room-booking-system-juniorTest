import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { REPOSITORY_TOKEN } from 'src/common/constant/repository.config';
import { IBookingRepository } from '../../domain/repository/booking.repository';
import { IRoomRepository } from 'src/core/room/domain/repositories/room.repository';
import { CreateBookingDto } from '../dtos/create-booking.dto';
import { Booking } from '../../domain/entities/booking.entity';

@Injectable()
export class CreateBookingUseCase {
  constructor(
    @Inject(REPOSITORY_TOKEN.BOOKING)
    private readonly bookingRepo: IBookingRepository,
    @Inject(REPOSITORY_TOKEN.ROOM) 
    private readonly roomRepo: IRoomRepository,
  ) {}

  async execute(userId: string, dto: CreateBookingDto): Promise<Booking> {
    const startTime = new Date(dto.start_time);
    const endTime = new Date(dto.end_time);

    if (startTime >= endTime)
      throw new BadRequestException('End time must be after start time');
    if (startTime < new Date(Date.now() - 60000))
      throw new BadRequestException('Cannot book in the past');

    const room = await this.roomRepo.findById(dto.room_id);
    if (!room) throw new NotFoundException('Room not found');

    const isOverlapping = await this.bookingRepo.checkOverlapTime(
      dto.room_id,
      startTime,
      endTime,
    );
    if (isOverlapping)
      throw new ConflictException('Room is already booked for this period');

    const bookingEntity = Booking.create({
      title: dto.title,
      description: dto.description || '',
      startTime: startTime,
      endTime: endTime,
      roomId: dto.room_id,
      userId: userId,
      status: 'BOOKED',
    });
    return await this.bookingRepo.save(bookingEntity);
  }
}


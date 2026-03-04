import { Injectable } from '@nestjs/common';
import { BookingStatus } from '@prisma/client';
import { PrismaService } from 'src/core/infrastructure/prisma/prisma.service';
import { IBookingRepository } from '../domain/repository/booking.repository';
import { Booking } from '../domain/entities/booking.entity';
import { BookingMapper } from '../application/mapper/booking.mapper';

@Injectable()
export class PrismaBookingRepository implements IBookingRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(booking: Booking): Promise<Booking> {
    const data = (booking as any).toPrimitives;
    const primitives =
      typeof data === 'function' ? (booking as any).toPrimitives() : data;

    const result = await this.prisma.booking.upsert({
      where: { id: primitives.id || 'new-ucid' },
      update: {
        title: primitives.title,
        description: primitives.description,
        start_time: primitives.start_time,
        end_time: primitives.end_time,
        status: primitives.status,
      },
      create: {
        title: primitives.title,
        description: primitives.description,
        start_time: primitives.start_time,
        end_time: primitives.end_time,
        user_id: primitives.user_id,
        room_id: primitives.room_id,
        status: primitives.status || 'BOOKED',
      },
    });

    return BookingMapper.toDomain(result);
  }

  async updateStatus(id: string, status: BookingStatus): Promise<void> {
    await this.prisma.booking.update({
      where: { id },
      data: { status },
    });
  }

  async findById(id: string): Promise<Booking | null> {
    const result = await this.prisma.booking.findUnique({
      where: { id },
      include: { room: true, user: true },
    });
    return result ? BookingMapper.toDomain(result) : null;
  }

  async findByUserId(userId: string): Promise<Booking[]> {
    const results = await this.prisma.booking.findMany({
      where: { user_id: userId },
      include: { room: true },
      orderBy: { start_time: 'desc' },
    });
    return results.map((res) => BookingMapper.toDomain(res));
  }

  async findByRoomId(roomId: string): Promise<Booking[]> {
    const results = await this.prisma.booking.findMany({
      where: { room_id: roomId },
      include: { user: true },
      orderBy: { start_time: 'asc' },
    });
    return results.map((res) => BookingMapper.toDomain(res));
  }

  async findAll(): Promise<Booking[]> {
    const results = await this.prisma.booking.findMany({
      include: { room: true, user: true },
      orderBy: { created_at: 'desc' },
    });
    return results.map((res) => BookingMapper.toDomain(res));
  }

  async checkOverlapTime(
    roomId: string,
    startTime: Date,
    endTime: Date,
  ): Promise<boolean> {
    const overlap = await this.prisma.booking.findFirst({
      where: {
        room_id: roomId,
        status: 'BOOKED',
        AND: [{ start_time: { lt: endTime } }, { end_time: { gt: startTime } }],
      },
    });
    return !!overlap;
  }
}

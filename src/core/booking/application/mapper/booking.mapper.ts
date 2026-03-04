import { Booking as PrismaBooking } from '@prisma/client';
import { Booking } from '../../domain/entities/booking.entity';

export class BookingMapper {
  static toDomain(raw: PrismaBooking): Booking {
    return Booking.create({
      title: raw.title,
      description: raw.description ?? '',
      startTime: raw.start_time,
      endTime: raw.end_time,
      roomId: raw.room_id,
      userId: raw.user_id,
      createdAt: raw.created_at,
    } as any);
  }

  static toPersistence(domain: Booking) {
    const primitives = (domain as any).toPrimitives;
    const data =
      typeof primitives === 'function'
        ? (domain as any).toPrimitives()
        : primitives;

    return {
      id: data.id,
      title: data.title,
      description: data.description,
      start_time: data.start_time,
      end_time: data.end_time,
      room_id: data.room_id,
      user_id: data.user_id,
      status: data.status,
    };
  }
}

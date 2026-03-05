import { Booking as PrismaBooking } from '@prisma/client';
import { Booking } from '../../domain/entities/booking.entity';

export class BookingMapper {
  static toDomain(raw: PrismaBooking): Booking {
    return Booking.create({
      id : raw.id,
      title: raw.title,
      description: raw.description ?? '',
      startTime: raw.start_time,
      endTime: raw.end_time,
      roomId: raw.room_id,
      userId: raw.user_id,
      createdAt: raw.created_at,
      status: raw.status as any,
    } as any);
  }
  static toPersistence(domain: Booking) {
    const primitives = (domain as any).toPrimitives;
    const data =
      typeof primitives === 'function'
        ? (domain as any).toPrimitives()
        : primitives;

    return {
      id: primitives.id,
      title: primitives.title,
      description: primitives.description,
      start_time: primitives.start_time,
      end_time: primitives.end_time,
      room_id: primitives.room_id,
      user_id: primitives.user_id,
      status: primitives.status,
    };
  }
}



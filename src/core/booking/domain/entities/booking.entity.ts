import { BookingStatus } from '@prisma/client';

export class Booking {
  constructor(
    private readonly id: string | null,
    private readonly title: string,
    private readonly description: string | null,
    private readonly startTime: Date,
    private readonly endTime: Date,
    private readonly status: BookingStatus,
    private readonly userId: string,
    private readonly roomId: string,
    private readonly createdAt: Date,
  ) {}

  static create(data: {
    title: string;
    description?: string;
    startTime: Date;
    endTime: Date;
    userId: string;
    roomId: string;
    status?: BookingStatus;
  }): Booking {
    return new Booking(
      null,
      data.title,
      data.description || null,
      data.startTime,
      data.endTime,
      data.status || 'BOOKED',
      data.userId,
      data.roomId,
      new Date(),
    );
  }

  static fromPrimitives(data: Booking): Booking {
    return new Booking(
      data.id,
      data.title,
      data.description,
      new Date(data.startTime),
      new Date(data.endTime),
      data.status,
      data.userId,
      data.roomId,
      new Date(data.createdAt),
    );
  }

  get toPrimitives() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      start_time: this.startTime,
      end_time: this.endTime,
      status: this.status,
      user_id: this.userId,
      room_id: this.roomId,
      created_at: this.createdAt,
    };
  }

  isValidDuration(): boolean {
    return this.startTime < this.endTime;
  }
}

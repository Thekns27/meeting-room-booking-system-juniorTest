import { BookingStatus } from "@prisma/client";
import { CreateBookingDto } from "../../application/dtos/create-booking.dto";
import { Booking } from "../entities/booking.entity";

export abstract class IBookingRepository {
  abstract save(booking: Booking): Promise<Booking>;
  abstract updateStatus(id: string, status: BookingStatus): Promise<any>;
  abstract findById(id: string): Promise<Booking | null>;
  abstract findByUserId(userId: string): Promise<Booking[]>;

  abstract findByRoomId(roomId: string): Promise<any[]>;
  abstract findAll(): Promise<any[]>;
  abstract checkOverlapTime(roomId: string, startTime: Date, endTime: Date): Promise<boolean>;

}

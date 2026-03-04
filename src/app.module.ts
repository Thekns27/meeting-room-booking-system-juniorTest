import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './core/infrastructure/prisma/prisma.module';
import { UserModule } from './core/user/user.module';
import { AuthModule } from './core/auth/auth.module';
import { RoomModule } from './core/room/room.module';
import { BookingModule } from './core/booking/booking.module';

@Module({
  imports: [PrismaModule, UserModule, AuthModule, RoomModule, BookingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

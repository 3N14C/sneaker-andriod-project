import { Module } from '@nestjs/common';
import { SneakersService } from './sneakers.service';
import { SneakersController } from './sneakers.controller';
import { PrismaService } from 'src/prisma.service';
import { FileService } from 'src/file/file.service';
import { OrderService } from 'src/order/order.service';

@Module({
  controllers: [SneakersController],
  providers: [SneakersService, PrismaService, FileService, OrderService],
})
export class SneakersModule {}

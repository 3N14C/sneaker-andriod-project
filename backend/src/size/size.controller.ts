import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { SizeService } from './size.service';
import { SizeDto } from './dto/size.dto';

@Controller('size')
export class SizeController {
  constructor(private readonly sizeService: SizeService) {}

  @Post('create')
  create(@Body() dto: SizeDto) {
    return this.sizeService.create(dto);
  }

  @Get()
  getAll() {
    return this.sizeService.getAll();
  }
}

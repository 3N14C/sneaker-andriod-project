import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { SneakersService } from './sneakers.service';
import { SneakersDto } from './dto/sneakers.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('sneakers')
export class SneakersController {
	constructor(private readonly sneakersService: SneakersService) {}

	@Post('create')
	@UseInterceptors(
		FileFieldsInterceptor([
			{
				name: 'image',
				maxCount: 1
			}
		])
	)
	create(@UploadedFiles() files, @Body() dto: SneakersDto) {
		const { image } = files
		return this.sneakersService.create(dto, image[0])
	}

	@Get()
	getAll() {
		return this.sneakersService.getAll()
	}

	@Get(':id')
	getById(@Param('id') id: string) {
		return this.sneakersService.getById(id)
	}

	@Delete('delete/:id')
	deleteById(@Param('id') id: string) {
		return this.sneakersService.deleteById(id)
	}

	@Patch('update/:id')
	@UseInterceptors(
		FileFieldsInterceptor([
			{
				name: 'image',
				maxCount: 1
			}
		])
	)
	updateFileds(@Param('id') id: string, @UploadedFiles() files, @Body() dto: SneakersDto,) {
		const { image } = files
		return this.sneakersService.updateFields(id, dto, image[0])
	}
}

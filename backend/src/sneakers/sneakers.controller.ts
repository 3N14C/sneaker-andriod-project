import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Put,
	UploadedFiles,
	UseInterceptors
} from '@nestjs/common'
import { SneakersService } from './sneakers.service'
import { SneakersDto } from './dto/sneakers.dto'
import { FileFieldsInterceptor } from '@nestjs/platform-express'
import { FileService, FileType } from 'src/file/file.service'

@Controller('sneakers')
export class SneakersController {
	constructor(
		private readonly sneakersService: SneakersService,
		private fileService: FileService
	) {}

	@Post('create')
	@UseInterceptors(
		FileFieldsInterceptor([
			{
				name: 'image',
				maxCount: 7
			}
		])
	)
	create(@UploadedFiles() files, @Body() dto: SneakersDto) {
		const { image } = files
		return this.sneakersService.create(dto, image)
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
	updateFileds(
		@Param('update/:id') id: string,
		@Body() dto: SneakersDto,
		@UploadedFiles() files?
	) {
		let imagePath = null

		if (files && files.image) {
			imagePath = this.fileService.createFile(FileType.SNEAKERS, files.image[0])
		}

		// const { image } = files
		return this.sneakersService.updateFields(id, dto, imagePath)
	}

	

	@Patch('update/size/:id')
	removeSizeFromSneaker(@Param('id') id: string, @Body() dto: SneakersDto) {
		return this.sneakersService.removeSizeFromSneaker(id)
	}
}

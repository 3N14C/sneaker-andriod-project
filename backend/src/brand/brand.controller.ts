import {
	Controller,
	Post,
	Body,
	Get,
	Param,
	UseInterceptors,
	UploadedFiles,
	Delete,
	Put
} from '@nestjs/common'
import { BrandService } from './brand.service'
import { BrandDto } from './dto/brand.dto'
import { FileFieldsInterceptor } from '@nestjs/platform-express'

@Controller('brand')
export class BrandController {
	constructor(private readonly brandService: BrandService) {}

	@Post('create')
	@UseInterceptors(FileFieldsInterceptor([{ name: 'logo', maxCount: 1 }]))
	create(@UploadedFiles() files, @Body() dto: BrandDto) {
    const { logo } = files
		return this.brandService.create(dto, logo[0])
	}

	@Get()
	getAll() {
		return this.brandService.getAll()
	}

	@Get(':name')
	getBrandBYName(@Param('name') name: string) {
		return this.brandService.getBrandBYName(name)
	}

	@Delete('delete/:id')
	deleteById(@Param('id') id: string) {
		return this.brandService.deleteById(id)
	}

	@Put('changeLogo/:id')
	@UseInterceptors(FileFieldsInterceptor([{ name: 'logo', maxCount: 1 }]))
	changeLogoById(@Param('id') id: string, @UploadedFiles() files) {
		const { logo } = files
		return this.brandService.changeLogoById(id, logo[0])
	}
}

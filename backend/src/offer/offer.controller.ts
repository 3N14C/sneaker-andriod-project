import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import { OfferService } from './offer.service'
import { OfferDto } from './dto/offer.dto'

@Controller('offer')
export class OfferController {
	constructor(private readonly offerService: OfferService) {}

	@Post('create')
	create(@Body() dto: OfferDto) {
		return this.offerService.create(dto)
	}

	@Get()
	getAll() {
		return this.offerService.getAll()
	}

	@Get(':discount')
	getByDay(@Param('discount') discount: string) {
		return this.offerService.getByIdorDayOrDiscount(discount)
	}

	@Patch('update/:id')
	updateDiscountByID(@Param('id') id: string, @Body() dto: OfferDto) {
		return this.offerService.updateDiscountByID(id, dto)
	}

	@Delete(':discount')
	deleteByDiscount(@Param('discount') discount: string) {
		return this.offerService.deleteByDiscount(discount)
	}
}

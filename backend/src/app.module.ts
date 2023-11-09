import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { BrandModule } from './brand/brand.module'
import { FileModule } from './file/file.module'
import { OfferModule } from './offer/offer.module'
import { PrismaService } from './prisma.service'
import { OrderModule } from './order/order.module'
import { SizeModule } from './size/size.module'
import { SneakersModule } from './sneakers/sneakers.module'
import { UserModule } from './user/user.module'
import { ServeStaticModule } from '@nestjs/serve-static'
import * as path from 'path'

@Module({
	imports: [
		ServeStaticModule.forRoot({
			rootPath: path.resolve(__dirname, '..', 'static')
		}),
		BrandModule,
		FileModule,
		OfferModule,
		OrderModule,
		SizeModule,
		SneakersModule,
		UserModule
	],
	controllers: [AppController],
	providers: [AppService, PrismaService]
})
export class AppModule {}

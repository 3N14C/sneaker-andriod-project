import { BadRequestException, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { BrandDto } from './dto/brand.dto'
import { FileService, FileType } from 'src/file/file.service'

@Injectable()
export class BrandService {
	constructor(private prisma: PrismaService, private fileService: FileService) {}

	async create(dto: BrandDto, files) {
		
		const oldBrand = await this.prisma.brand.findUnique({
			where: {
				name: dto.name
				
			}
		})

		if (oldBrand) throw new BadRequestException('Brand already in use')

		const logoPath = this.fileService.createFile(FileType.BRAND, files)
		const brand = await this.prisma.brand.create({
			data: {
				...dto,
				logo: logoPath
			},

			include: {
				sneaker: true
			}
		})

		return brand
	}

	async getAll() {
		const brand = await this.prisma.brand.findMany({
			include: {
				sneaker: {
					include: {
						size: true
					}
				},

			}
		})

		return brand
	}

    async getBrandBYName(name: string) {
        const brand = await this.prisma.brand.findUnique({
            where: {
                name
            },

            include: {
                sneaker: true
            }
        })

        return brand
    }

	async deleteById(id: string) {
		const brand = await this.prisma.brand.delete({
			where: {
				id
			}
		})

		return brand
	}

	async changeLogoById(id: string, files: any[]) {
		const brand = await this.prisma.brand.update({
			where: {
				id
			},
			data: {
				logo: this.fileService.createFile(FileType.BRAND, files) 
			}
		})

		return brand
	}
}

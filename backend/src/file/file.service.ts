import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import * as path from 'path'
import * as fs from 'fs'
import * as uuid from 'uuid'

export enum FileType {
	USERS = 'avatar',
    SNEAKERS = 'sneakers',
	BRAND = 'brand',
}

@Injectable()
export class FileService {
	createFile(type: FileType, file): string {
		try {
			const fileExtension = file.originalname.split('.').pop()
			const fileName = uuid.v4() + '.' + fileExtension
			const filePath = path.resolve(__dirname, '..', '..', 'static', type)

			if (!fs.existsSync(filePath)) {
				fs.mkdirSync(filePath, { recursive: true })
			}

			fs.writeFileSync(path.resolve(filePath, fileName), file.buffer)

            return 'http://192.168.0.130:4200/' + type + '/' + fileName
		} catch (error) {
			throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
		}
	}

	async removeFile() {}
}

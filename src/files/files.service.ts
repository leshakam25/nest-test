import {Injectable} from '@nestjs/common';
import {FileElementResponse} from './dto/file-element.response';
import {format} from 'date-fns';
import {path} from 'app-root-path';

@Injectable()
export class FilesService {

	async saveFiles(file: Express.Multer.File): Promise<FileElementResponse[]> {
		const dateFolder = format(new Date(), 'yyyy-MM-dd');
		const uploadFolder = `${path}`/uploads
	}
}

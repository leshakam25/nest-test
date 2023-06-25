import {
	Body,
	Controller,
	Delete,
	Get,
	HttpException,
	HttpStatus,
	Param,
	Post,
	UseGuards,
	UsePipes,
	ValidationPipe
} from '@nestjs/common';
import {IdValidationPipe} from 'src/pipes/ad-validation.pipe';
import {JwtAuthGuard} from '../auth/guards/jwt.guard';
import {CreateReviewDto} from './dto/create-review.dto';
import {REVIEW_NOT_FOUND} from './review.constants';
import {ReviewService} from './review.service';
import {TelegramService} from '../telegram/telegram.service';

@Controller('review')
export class ReviewController {
	constructor(
		private readonly reviewService: ReviewService,
		private readonly telegramService: TelegramService
	) {
	}

	@UsePipes(new ValidationPipe())
	@Post('notify')
	async create(@Body() dto: CreateReviewDto) {
		const message = `Name: ${dto.name}\n`
			+ `Title: ${dto.title}\n`
			+ `Description:${dto.description}\n`
			+ `Rate:${dto.rating}\n`
			+ `ID:${dto.productId}`;
		return this.telegramService.sendMessage(message);
	}

	@UseGuards(JwtAuthGuard)
	@Delete(':id')
	async delete(@Param('id', IdValidationPipe) id: string) {
		const deletedDoc = await this.reviewService.delete(id);
		if (!deletedDoc) {
			throw new HttpException(REVIEW_NOT_FOUND, HttpStatus.NOT_FOUND);
		}
	}

	@Get('byProduct/:productId')
	async getByProduct(@Param('productId', IdValidationPipe) productId: string) {
		return this.reviewService.findByProductId(productId);
	}
}

import {DynamicModule, Module} from '@nestjs/common';
import {TelegramService} from './telegram.service';
import {ITelegramModuleAsyncOptions} from './telegram.interface';

@Module({
	providers: [TelegramService],
	exports: [TelegramService]
})
export class TelegramModule {
	forRootAsync(options: ITelegramModuleAsyncOptions): DynamicModule {
		return {
			module: TelegramModule,
			imports: options.imports,
			providers: [TelegramService],
			exports: [TelegramService]
		};
	}
}

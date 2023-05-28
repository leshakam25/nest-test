import {Test, TestingModule} from '@nestjs/testing';
import {INestApplication} from '@nestjs/common';
import {AppModule} from '../src/app.module';
import {CreateReviewDto} from '../src/review/dto/create-review.dto';
import {disconnect, Types} from 'mongoose';
import * as request from 'supertest';
import {REVIEW_NOT_FOUND} from '../src/review/review.constants';
import {AuthDto} from '../src/auth/dto/auth.dto';


const loginDto: AuthDto = {login: 'test@test.test', password: 'testpass'};


describe('AuthController (e2e)', () => {
	let app: INestApplication;
	let createdId: string;
	let token: string;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	it('/auth/login (POST) - success', async (done) => {
		return request(app.getHttpServer())
			.post('/auth/login')
			.send(loginDto)
			.expect(200)
			.then(({body}: request.Response) => {
				expect(body.access_token).toBeDefined();
				done();
			});

	});

	it('/auth/login (POST) - fail password', async () => {
		return request(app.getHttpServer())
			.post('/auth/login')
			.send({...loginDto, password: '2'})
			.expect(401, {
				statusCode: 401,
				error: 'Unauthorized',
				message: 'WRONG PASSWORD'
			});
	});

	it('/auth/login (POST) - fail login', async () => {
		return request(app.getHttpServer())
			.post('/auth/login')
			.send({...loginDto, login: 'aaa'})
			.expect(401, {
				statusCode: 401,
				error: 'Unauthorized',
				message: 'USER NOT FOUND'
			});
	});

	afterAll(() => {
		disconnect();
	});
});
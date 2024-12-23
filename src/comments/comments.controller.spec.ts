import { Test, TestingModule } from '@nestjs/testing';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';

describe('CommentsController', () => {
  let controller: CommentsController;
  let commentsService: CommentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentsController],
      providers: [
              {
                provide: CommentsService,
                useValue: {
                  // Mock methods of UsersService
                  findAll: jest.fn(),
                  findOne: jest.fn(),
                  create: jest.fn(),
                  update: jest.fn(),
                  remove: jest.fn(),
                },
              },
            ],
    }).compile();

    controller = module.get<CommentsController>(CommentsController);
    commentsService = module.get<CommentsService>(CommentsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

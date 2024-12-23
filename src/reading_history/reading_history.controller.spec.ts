import { Test, TestingModule } from '@nestjs/testing';
import { ReadingHistoryController } from './reading_history.controller';
import { ReadingHistoryService } from './reading_history.service';

describe('ReadingHistoryController', () => {
  let controller: ReadingHistoryController;
  let readingHistoryService: ReadingHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReadingHistoryController],
      providers: [
              {
                provide: ReadingHistoryService,
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

    controller = module.get<ReadingHistoryController>(ReadingHistoryController);
    readingHistoryService = module.get<ReadingHistoryService>(ReadingHistoryService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

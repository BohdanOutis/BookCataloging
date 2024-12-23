import { Test, TestingModule } from '@nestjs/testing';
import { ReadingHistoryService } from './reading_history.service';

describe('ReadingHistoryService', () => {
  let service: ReadingHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReadingHistoryService,
        {
          provide: 'ReadingHistoryRepository', // Mock the GenresService
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
          },
        },
        {
          provide: 'BookRepository', // Mock the GenresService
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
          },
        },
        {
          provide: 'UserRepository', // Mock the GenresService
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ReadingHistoryService>(ReadingHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

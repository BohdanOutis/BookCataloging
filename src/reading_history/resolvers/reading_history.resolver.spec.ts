import { Test, TestingModule } from '@nestjs/testing';
import { ReadingHistoryResolver } from './reading_history.resolver';
import { ReadingHistoryService } from '../reading_history.service';

describe('ReadingHistoryResolver', () => {
  let resolver: ReadingHistoryResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReadingHistoryResolver,
        {
          provide: ReadingHistoryService, // Mock the GenresService
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<ReadingHistoryResolver>(ReadingHistoryResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});

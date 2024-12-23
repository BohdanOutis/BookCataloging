import { Test, TestingModule } from '@nestjs/testing';
import { RatingsService } from './ratings.service';

describe('RatingsService', () => {
  let service: RatingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RatingsService,
        {
          provide: 'RatingRepository', 
          useValue: {
            find: jest.fn(),
            save: jest.fn(),
          },
        },
        {
          provide: 'BookRepository',
          useValue: {
            find: jest.fn(),
            save: jest.fn(),
          },
        },
        {
          provide: 'UserRepository', 
          useValue: {
            find: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<RatingsService>(RatingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

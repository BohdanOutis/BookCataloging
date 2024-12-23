import { Test, TestingModule } from '@nestjs/testing';
import { RatingsResolver } from './ratings.resolver';
import { RatingsService } from '../ratings.service';

describe('RatingsResolver', () => {
  let resolver: RatingsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RatingsResolver,
        {
          provide: RatingsService, // Mock the GenresService
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],    
    }).compile();

    resolver = module.get<RatingsResolver>(RatingsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});

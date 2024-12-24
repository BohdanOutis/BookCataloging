import { Test, TestingModule } from '@nestjs/testing';
import { GenresService } from './genres.service';

describe('GenresService', () => {
  let service: GenresService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GenresService,
        {
          provide: 'GenresRepository', // Mock the GenresService
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
      ],
    }).compile();

    service = module.get<GenresService>(GenresService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

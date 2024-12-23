import { Test, TestingModule } from '@nestjs/testing';
import { EditionService } from './edition.service';

describe('EditionService', () => {
  let service: EditionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EditionService,
        {
          provide: 'EditionRepository', // Mock the GenresService
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

    service = module.get<EditionService>(EditionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

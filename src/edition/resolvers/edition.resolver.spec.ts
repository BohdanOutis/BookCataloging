import { Test, TestingModule } from '@nestjs/testing';
import { EditionResolver } from './edition.resolver';
import { EditionService } from '../edition.service';

describe('EditionResolver', () => {
  let resolver: EditionResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EditionResolver,
        {
          provide: EditionService,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<EditionResolver>(EditionResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});

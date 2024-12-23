import { Test, TestingModule } from '@nestjs/testing';
import { AuthorsResolver } from './authors.resolver';
import { AuthorsService } from '../authors.service';

describe('AuthorsResolver', () => {
  let resolver: AuthorsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
              AuthorsResolver,
              {
                provide: AuthorsService,
                useValue: {
                  findAll: jest.fn(),
                  findOne: jest.fn(),
                },
              },
            ],
    }).compile();

    resolver = module.get<AuthorsResolver>(AuthorsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});

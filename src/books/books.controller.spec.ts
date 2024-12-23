import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';

describe('BooksController', () => {
  let controller: BooksController;
  let booksService: BooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [
              {
                provide: BooksService,
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

    controller = module.get<BooksController>(BooksController);
    booksService = module.get<BooksService>(BooksService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

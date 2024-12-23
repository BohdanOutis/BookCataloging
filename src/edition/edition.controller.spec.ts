import { Test, TestingModule } from '@nestjs/testing';
import { EditionController } from './edition.controller';
import { EditionService } from './edition.service';

describe('EditionController', () => {
  let controller: EditionController;
  let editionService: EditionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EditionController],
      providers: [
              {
                provide: EditionService,
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

    controller = module.get<EditionController>(EditionController);
    editionService = module.get<EditionService>(EditionService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

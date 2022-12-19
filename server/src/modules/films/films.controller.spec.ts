import { Test, TestingModule } from '@nestjs/testing';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';

describe('FilmsController', () => {
  let controller: FilmsController;
  let filmsService: FilmsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [
        FilmsService,
        {
          provide: FilmsService,
          useValue: {
            create: jest.fn(() => ({})),
            findAll: jest.fn(() => ({})),
          },
        },
      ],
    }).compile();

    controller = module.get<FilmsController>(FilmsController);
    filmsService = module.get(FilmsService);
  });

  afterEach(async () => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should send to service ::create', async function () {
    const responseController = await controller.create();

    expect(responseController).toBeDefined();
  });

  it('should send to service ::findAll', async function () {
    const responseController = await controller.findAll({ skip: 0 });

    expect(responseController).toBeDefined();
  });
});

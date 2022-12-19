import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Films } from './entities/film.entity';
import { FilmsService } from './films.service';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const response = [
  {
    id: '790e0028-a31c-4626-a694-86b7a8cada40',
    title: 'Earwig and the Witch',
    image:
      'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/sJhFtY3eHuvvACaPpxpzdCLQqpQ.jpg',
    description:
      'An orphan girl, Earwig, is adopted by a witch and comes home to a spooky house filled with mystery and magic.',
    director: 'Gorō Miyazaki',
    producer: 'Toshio Suzuki',
    release_date: '2021',
    rt_score: '30',
  },
];

describe('FilmsService', () => {
  let service: FilmsService;

  describe('::registerFilm success', () => {
    const mockedRepo = {
      fechingOnApi: jest.fn(() => Promise.resolve([{ test: 'moked object' }])),
      findByIdRef: jest.fn((films) =>
        Promise.resolve([{ test: 'moked object' }]),
      ),
      create: jest.fn((data) => Promise.resolve()),
      findOne: jest.fn((data) => Promise.resolve()),
      save: jest.fn((data) => Promise.resolve()),
    };

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          FilmsService,
          {
            provide: getRepositoryToken(Films),
            useValue: mockedRepo,
          },
        ],
      }).compile();

      service = module.get<FilmsService>(FilmsService);
    });

    afterEach(async () => {
      jest.clearAllMocks();
    });

    it('should be defined', () => {
      expect(service).toBeDefined();
    });

    it('should be able to add data via integration', async function () {
      mockedAxios.get.mockResolvedValueOnce({
        data: [response],
        status: 200,
        statusText: 'Ok',
        headers: {},
        config: {},
      });
      const responseData = await service.create();

      expect(responseData).toBeUndefined();
    });
  });

  describe('::registerFilm fail', () => {
    const mockedRepo = {
      findByIdRef: jest.fn((films) => Promise.resolve([])),
    };

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          FilmsService,
          {
            provide: getRepositoryToken(Films),
            useValue: mockedRepo,
          },
        ],
      }).compile();

      service = module.get<FilmsService>(FilmsService);
    });

    afterEach(async () => {
      jest.clearAllMocks();
    });

    it('::registerFilm exception Api films is not work', async () => {
      mockedAxios.get.mockRejectedValueOnce({
        data: [],
        status: 400,
        statusText: 'Error',
        headers: {},
        config: {},
      });
      try {
        await service.create();
      } catch (err) {
        expect(err.message).toBe('Api films is not work');
        expect(err.status).toBe(503);
      }
    });
  });

  describe('::registerFilm fail', () => {
    const mockedRepo = {};

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          FilmsService,
          {
            provide: getRepositoryToken(Films),
            useValue: mockedRepo,
          },
        ],
      }).compile();

      service = module.get<FilmsService>(FilmsService);

      service.fechingOnApi = jest.fn().mockResolvedValueOnce([]);
    });

    afterEach(async () => {
      jest.clearAllMocks();
    });

    it('::registerFilm exception No new data to insert', async () => {
      mockedAxios.get.mockResolvedValueOnce({
        data: [response],
        status: 200,
        statusText: 'Ok',
        headers: {},
        config: {},
      });
      try {
        await service.create();
      } catch (err) {
        expect(err.message).toBe('no new data to insert');
        expect(err.status).toBe(400);
      }
    });
  });
});

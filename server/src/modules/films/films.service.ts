import {
  BadRequestException,
  Injectable,
  ServiceUnavailableException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { fiels } from '../../utils/fields-to-feching';
import { Repository } from 'typeorm';
import { FilmsByApiFechingDto } from './dto/films-by-api-feching.dto';
import { Films } from './entities/film.entity';
import * as uuid from 'uuid';

@Injectable()
export class FilmsService {
  constructor(@InjectRepository(Films) private repository: Repository<Films>) {}

  async create() {
    const films: FilmsByApiFechingDto[] = await this.fechingOnApi();
    const NotSavedFilm = await this.findByIdRef(films);

    if (!NotSavedFilm[0]) {
      throw new BadRequestException('no new data to insert');
    }

    const filmsSaved = NotSavedFilm.map((film) => {
      return this.repository.create({
        id: uuid.v4(),
        idRef: film.id,
        title: film.title,
        image: film.image,
        director: film.director,
        descricao: film.description,
        producer: film.producer,
        releaseDate: film.release_date,
        rtScore: parseInt(film.rt_score),
      });
    });

    await this.repository.save(filmsSaved);
  }

  async findAll(skip = 0) {
    const take = 10;
    const [result, total] = await this.repository.findAndCount({
      order: { id: 'DESC' },
      take,
      skip,
    });

    return {
      data: result,
      count: total,
    };
  }

  async findTopScore() {
    const skip = 0;
    const take = 3;
    const [result] = await this.repository.findAndCount({
      order: { rtScore: 'DESC' },
      take,
      skip,
    });

    return result;
  }

  async findByIdRef(films: FilmsByApiFechingDto[]) {
    const response = [];
    for (let i = 0; i < films.length; i++) {
      const isExist = await this.repository.findOne({
        where: { idRef: films[i].id },
      });
      if (!isExist) {
        response.push(films[i]);
      }
    }

    return response;
  }

  async fechingOnApi(): Promise<FilmsByApiFechingDto[]> {
    const apiResponse = await axios
      .get(`https://ghibliapi.herokuapp.com/films?fields=${fiels}&limit=50`)
      .then((response) => response.data)
      .catch(() => {
        throw new ServiceUnavailableException('Api films is not work');
      });

    return apiResponse;
  }
}

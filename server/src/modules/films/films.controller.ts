import { Controller, Get, Post, Query } from '@nestjs/common';
import { ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FilmsService } from './films.service';

@Controller('api/v1/films')
@ApiTags('Films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Created',
  })
  @ApiResponse({
    status: 400,
    description: 'No new data to insert',
  })
  @ApiResponse({
    status: 503,
    description: 'Api films is not work',
  })
  create() {
    return this.filmsService.create();
  }

  @Get()
  @ApiOkResponse({
    schema: {
      allOf: [
        {
          properties: {
            data: {
              type: 'array',
              example: [
                {
                  id: 'f44aa963-e642-4e55-bdec-1f257ebcd05e',
                  idRef: '90b72513-afd4-4570-84de-a56c312fdf81',
                  title: 'The Cat Returns',
                  image:
                    'https://image.tmdb.org/t/p/w600_and_h900_bestv2/avPMO5cnaGHgLaNiAIhy33WoQLm.jpg',
                  descricao:
                    'Haru, a schoolgirl bored by her ordinary routine, saves the life of an unusual cat and suddenly her world is transformed',
                  director: 'Hiroyuki Morita',
                  producer: 'Toshio Suzuki',
                  releaseDate: '2002',
                  rtScore: 89,
                },
              ],
            },
            count: { type: 'number', example: 1 },
          },
        },
      ],
    },
  })
  findAll(@Query('skip') skip?: number) {
    return this.filmsService.findAll(skip);
  }

  @Get('/top-score')
  findTopScore() {
    return this.filmsService.findTopScore();
  }
}

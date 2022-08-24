import {
  Injectable,
  NotFoundException,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MovieSchema } from 'src/schemas/movie.schema';
import { Repository } from 'typeorm';
import { MovieModel } from './Movie.model';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(MovieModel)
    private readonly movieRepository: Repository<MovieModel>,
  ) {}

  async store(data: MovieSchema) {
    const movie = this.movieRepository.create(data);
    return await this.movieRepository.save(movie);
  }

  async findAll() {
    return await this.movieRepository.find({
      select: [
        'id',
        'name',
        'author',
        'classification',
        'summary',
        'director',
        'releaseyear',
        'created_at',
        'updated_at',
      ],
    });
  }

  async findOneMovie(@Param('id', ParseIntPipe) id: number) {
    const movie = await this.movieRepository.findOne({ where: { id } });

    if (!movie) {
      throw new NotFoundException(`Movie with id ${id} does not exists`);
    }
    return { data: movie };
  }

  async update(id: number, data: MovieSchema) {
    const movie = await this.movieRepository.findOne({ where: { id } });
    this.movieRepository.merge(movie, data);
    return await this.movieRepository.save(movie);
  }

  async destroyed(id: number) {
    await this.movieRepository.findOne({ where: { id } });
    this.movieRepository.delete({ id });
  }
}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieController } from './MovieController';
import { MovieModel } from './Movie.model';
import { MovieService } from './movie.service';

@Module({
  imports: [TypeOrmModule.forFeature([MovieModel])],
  controllers: [MovieController],
  providers: [MovieService],
})
export class MovieModule {}

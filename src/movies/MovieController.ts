import {
  Body,
  CacheKey,
  CacheTTL,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { MovieSchema } from 'src/schemas/movie.schema';
import { MovieService } from './movie.service';

@Controller('/movie')
@ApiTags('Movies Routes')
@UseGuards(AuthGuard('jwt'))
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post()
  async createMovie(@Body() body: MovieSchema) {
    return this.movieService.store(body);
  }

  @Get(':id')
  async getOneMovie(@Param('id', ParseIntPipe) id: number) {
    return await this.movieService.findOneMovie(id);
  }

  @Get()
  @CacheKey('some_route')
  @CacheTTL(60)
  async getAllMovie() {
    return await this.movieService.findAll();
  }

  @Put(':id')
  async updateMovie(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: MovieSchema,
  ) {
    return await this.movieService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.MOVED_PERMANENTLY)
  async deleteMovie(@Param('id', ParseIntPipe) id: number) {
    await this.movieService.destroyed(id);
  }
}

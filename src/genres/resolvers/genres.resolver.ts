import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { GenresService } from '../genres.service';
import { Genre } from '../entities/Genre';
import { CreateGenreDto } from '../dtos/CreateGenre.dto';
import { UpdateGenreDto } from '../dtos/UpdateGenre.dto';

@Resolver(() => Genre)
export class GenresResolver {
  constructor(private readonly genresService: GenresService) {}

  @Query(() => [Genre], { name: 'genres' })
  async findAll(): Promise<Genre[]> {
    return this.genresService.findAll();
  }

  @Query(() => Genre, { name: 'genre' })
  async findOne(@Args('id', { type: () => Int }) id: number): Promise<Genre> {
    return this.genresService.findOne(id);
  }

  @Mutation(() => Genre)
  async createGenre(
    @Args('createGenreInput') createGenreDto: CreateGenreDto,
  ): Promise<Genre> {
    return this.genresService.create(createGenreDto);
  }

  @Mutation(() => Genre)
  async updateGenre(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateGenreInput') updateGenreDto: UpdateGenreDto,
  ): Promise<Genre> {
    return this.genresService.update(id, updateGenreDto);
  }

  @Mutation(() => Boolean)
  async removeGenre(@Args('id', { type: () => Int }) id: number): Promise<boolean> {
    await this.genresService.remove(id);
    return true;
  }
}

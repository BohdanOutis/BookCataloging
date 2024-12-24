import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { GenresService } from '../genres.service';
import { Genres } from '../entities/Genre';
import { CreateGenreDto } from '../dtos/CreateGenre.dto';
import { UpdateGenreDto } from '../dtos/UpdateGenre.dto';

@Resolver(() => Genres)
export class GenresResolver {
  constructor(private readonly genresService: GenresService) {}

  @Query(() => [Genres], { name: 'genres' })
  async findAll(): Promise<Genres[]> {
    return this.genresService.findAll();
  }

  @Query(() => Genres, { name: 'genre' })
  async findOne(@Args('id', { type: () => Int }) id: number): Promise<Genres> {
    return this.genresService.findOne(id);
  }

  @Mutation(() => Genres)
  async createGenre(
    @Args('createGenreInput') createGenreDto: CreateGenreDto,
  ): Promise<Genres> {
    return this.genresService.create(createGenreDto);
  }

  @Mutation(() => Genres)
  async updateGenre(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateGenreInput') updateGenreDto: UpdateGenreDto,
  ): Promise<Genres> {
    return this.genresService.update(id, updateGenreDto);
  }

  @Mutation(() => Boolean)
  async removeGenre(@Args('id', { type: () => Int }) id: number): Promise<boolean> {
    await this.genresService.remove(id);
    return true;
  }
}

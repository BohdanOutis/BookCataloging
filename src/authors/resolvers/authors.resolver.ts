import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AuthorsService } from '../authors.service';
import { Author } from '../entities/Author';
import { CreateAuthorDto } from '../dtos/CreateAuthors.dto';
import { UpdateAuthorDto } from '../dtos/UpdateAuthors.dto';
import { NotFoundException } from '@nestjs/common';

@Resolver(() => Author)
export class AuthorsResolver {
  constructor(private readonly authorsService: AuthorsService) {}

  // Query to get all authors
  @Query(() => [Author])
  async authors(): Promise<Author[]> {
    return this.authorsService.findAll();
  }

  // Query to get a single author by ID
  @Query(() => Author)
  async author(@Args('id', { type: () => Int }) id: number): Promise<Author> {
    return this.authorsService.findOne(id);
  }

  // Mutation to create a new author
  @Mutation(() => Author)
  async createAuthor(
    @Args('createAuthorDto') createAuthorDto: CreateAuthorDto,
  ): Promise<Author> {
    return this.authorsService.create(createAuthorDto);
  }

  // Mutation to update an author by ID
  @Mutation(() => Author)
  async updateAuthor(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateAuthorDto') updateAuthorDto: UpdateAuthorDto,
  ): Promise<Author> {
    try {
      return this.authorsService.update(id, updateAuthorDto);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(`Author with ID ${id} not found`);
      }
      throw error;
    }
  }

  // Mutation to delete an author by ID
  @Mutation(() => Boolean)
  async removeAuthor(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<boolean> {
    try {
      await this.authorsService.remove(id);
      return true;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(`Author with ID ${id} not found`);
      }
      throw error;
    }
  }
}

import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { EditionService } from '../edition.service';
import { Edition } from '../entities/Edition';
import { CreateEditionDto } from '../dtos/CreateEdition.dto';
import { UpdateEditionDto } from '../dtos/UpdateEditon.dto';

@Resolver(() => Edition)
export class EditionResolver {
  constructor(private readonly editionService: EditionService) {}

  // Create a new edition for a book
  @Mutation(() => Edition)
  async createEdition(
    @Args('createEditionInput') createEditionDto: CreateEditionDto,
    @Args('bookId', { type: () => Int }) bookId: number,
  ): Promise<Edition> {
    return this.editionService.create(createEditionDto, bookId);
  }

  // Get all editions for a specific book
  @Query(() => [Edition])
  async findEditionsByBook(
    @Args('bookId', { type: () => Int }) bookId: number,
  ): Promise<Edition[]> {
    return this.editionService.findByBook(bookId);
  }

  // Update an edition by ID
  @Mutation(() => Edition)
  async updateEdition(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateEditionInput') updateEditionDto: UpdateEditionDto,
  ): Promise<Edition> {
    return this.editionService.update(id, updateEditionDto);
  }

  // Delete an edition by ID
  @Mutation(() => Boolean)
  async removeEdition(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<boolean> {
    await this.editionService.remove(id);
    return true;
  }
}

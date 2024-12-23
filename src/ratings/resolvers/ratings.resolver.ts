import { Resolver, Query, Mutation, Args, Int, Float } from '@nestjs/graphql';
import { RatingsService } from '../ratings.service';
import { Rating } from '../entities/Rating';
import { Book } from '../../books/entities/Book'; // Assuming you have a Book entity
import { CreateRatingDto } from '../dtos/CreateRating.dto';

@Resolver(() => Rating)
export class RatingsResolver {
  constructor(private readonly ratingsService: RatingsService) {}

  @Mutation(() => Rating)
  async createRating(
    @Args('createRatingInput') createRatingDto: CreateRatingDto,
    @Args('userId', { type: () => Int }) userId: number,
  ): Promise<Rating> {
    return this.ratingsService.create(createRatingDto, userId);
  }

  @Mutation(() => Rating)
  async updateRating(
    @Args('ratingId', { type: () => Int }) ratingId: number,
    @Args('newRating', { type: () => Int }) newRating: number,
    @Args('userId', { type: () => Int }) userId: number,
  ): Promise<Rating> {
    return this.ratingsService.update(ratingId, newRating, userId);
  }

  @Mutation(() => Boolean)
  async removeRating(
    @Args('ratingId', { type: () => Int }) ratingId: number,
    @Args('userId', { type: () => Int }) userId: number,
  ): Promise<boolean> {
    await this.ratingsService.remove(ratingId, userId);
    return true;
  }

  @Query(() => Float, { name: 'averageRating' })
  async getAverageRating(
    @Args('bookId', { type: () => Int }) bookId: number,
  ): Promise<number> {
    return this.ratingsService.getAverageRating(bookId);
  }

  @Query(() => [Book], { name: 'booksByRating' }) // Return books instead of ratings
  async findBooksByRating(
    @Args('rating', { type: () => Int }) rating: number,
  ): Promise<Book[]> { // Adjust return type to Book[]
    return this.ratingsService.findBooksByRating(rating);
  }
}

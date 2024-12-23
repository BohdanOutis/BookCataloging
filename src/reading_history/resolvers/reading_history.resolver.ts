import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ReadingHistoryService } from '../reading_history.service';
import { ReadingHistory } from '../entities/ReadingHistory';
import { CreateReadingHistoryDto } from '../dtos/CreateReadingHistory.dto';

@Resolver(() => ReadingHistory)
export class ReadingHistoryResolver {
  constructor(private readonly readingHistoryService: ReadingHistoryService) {}

  // Query to get a user's reading history
  @Query(() => [ReadingHistory], { name: 'getUserReadingHistory' })
  async getUserReadingHistory(
    @Args('userId', { type: () => Int }) userId: number,
  ): Promise<ReadingHistory[]> {
    return this.readingHistoryService.getUserHistory(userId);
  }

  // Mutation to add a book to the user's reading history
  @Mutation(() => ReadingHistory)
  async addReadingHistory(
    @Args('createReadingHistoryInput') createReadingHistoryDto: CreateReadingHistoryDto,
    @Args('userId', { type: () => Int }) userId: number,
  ): Promise<ReadingHistory> {
    return this.readingHistoryService.addToHistory(createReadingHistoryDto, userId);
  }

  // Mutation to remove a book from the user's reading history
  @Mutation(() => Boolean)
  async removeReadingHistory(
    @Args('userId', { type: () => Int }) userId: number,
    @Args('bookId', { type: () => Int }) bookId: number,
  ): Promise<boolean> {
    await this.readingHistoryService.removeFromHistory(userId, bookId);
    return true;
  }
}

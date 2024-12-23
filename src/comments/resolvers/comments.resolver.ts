import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CommentsService } from '../comments.service';
import { Comment } from '../entities/Comment';
import { CreateCommentDto } from '../dtos/CreateComment.dto';
import { UseGuards } from '@nestjs/common';
import { UpdateCommentDto } from '../dtos/UpdateComment.dto';

@Resolver(() => Comment)
export class CommentsResolver {
  constructor(private readonly commentsService: CommentsService) {}

  // Create a comment for a book
  @Mutation(() => Comment)
  async createComment(
    @Args('createCommentDto') createCommentDto: CreateCommentDto,
    @Args('userId', { type: () => Int }) userId: number,
    @Args('bookId', { type: () => Int }) bookId: number,
  ): Promise<Comment> {
    return this.commentsService.create(createCommentDto, userId, bookId);
  }

  // Get all comments for a specific book
  @Query(() => [Comment])
  async commentsByBook(@Args('bookId', { type: () => Int }) bookId: number): Promise<Comment[]> {
    return this.commentsService.findByBook(bookId);
  }

  // Update a comment by its ID
  @Mutation(() => Comment)
  async updateComment(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateCommentDto') updateCommentDto: UpdateCommentDto,
    @Args('userId', { type: () => Int }) userId: number,
  ): Promise<Comment> {
    return this.commentsService.update(id, updateCommentDto, userId);
  }

  // Delete a comment by its ID
  @Mutation(() => Boolean)
  async deleteComment(
    @Args('id', { type: () => Int }) id: number,
    @Args('userId', { type: () => Int }) userId: number,
  ): Promise<boolean> {
    await this.commentsService.remove(id, userId);
    return true;
  }
}


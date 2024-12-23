import { Controller, Post, Body, Get, Param, Delete, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dtos/CreateComment.dto';
import { UpdateCommentDto } from './dtos/UpdateComment.dto';

@ApiTags('comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @ApiOperation({ summary: 'Add a comment for a book' })
  @ApiResponse({ status: 201, description: 'Comment successfully added.' })
  @ApiResponse({ status: 404, description: 'Book or user not found.' })
  async addComment(@Body() createCommentDto: CreateCommentDto, @Param('userId') userId: number, @Param('bookId') bookId: number) {
    return this.commentsService.create(createCommentDto, userId, bookId);
  }

  @Get(':bookId')
  @ApiOperation({ summary: 'Get all comments for a book' })
  @ApiResponse({ status: 200, description: 'List of comments fetched successfully.' })
  @ApiResponse({ status: 404, description: 'Book not found.' })
  async getComments(@Param('bookId') bookId: number) {
    return this.commentsService.findByBook(bookId);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a comment by its ID' })
  @ApiResponse({ status: 200, description: 'Comment updated successfully.' })
  @ApiResponse({ status: 404, description: 'Comment not found.' })
  @ApiResponse({ status: 401, description: 'Not authorized to update this comment.' })
  async updateComment(@Param('id') id: number, @Body() updateCommentDto: UpdateCommentDto, @Param('userId') userId: number) {
    return this.commentsService.update(id, updateCommentDto, userId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a comment by its ID' })
  @ApiResponse({ status: 200, description: 'Comment deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Comment not found.' })
  @ApiResponse({ status: 401, description: 'Not authorized to delete this comment.' })
  async deleteComment(@Param('id') id: number, @Param('userId') userId: number) {
    return this.commentsService.remove(id, userId);
  }
}

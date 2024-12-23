import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { CreateReadingHistoryDto } from './dtos/CreateReadingHistory.dto';
import { ReadingHistoryService } from './reading_history.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('reading-history')
@Controller('reading-history')
export class ReadingHistoryController {
  constructor(private readonly readingHistoryService: ReadingHistoryService) {}

  @Post()
  @ApiOperation({ summary: 'Add a book to the reading history' })
  @ApiResponse({ status: 201, description: 'Book added to reading history.' })
  @ApiResponse({ status: 404, description: 'Book or User not found.' }) 
  async addReadingHistory(
    @Body() createReadingHistoryDto: CreateReadingHistoryDto,
    @Param('userId') userId: string, // Expect userId from the route params
  ) {
    // Convert userId to a number
    const userIdNumber = parseInt(userId, 10);
    if (isNaN(userIdNumber)) {
      throw new Error('Invalid userId');
    }
    return this.readingHistoryService.addToHistory(createReadingHistoryDto, userIdNumber);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get all books in the reading history of a user' })
  @ApiResponse({ status: 200, description: 'Reading history fetched successfully.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async getUserReadingHistory(@Param('userId') userId: string) {
    // Convert userId from string to number
    const userIdNumber = parseInt(userId, 10);
    if (isNaN(userIdNumber)) {
      throw new Error('Invalid userId');
    }
    return this.readingHistoryService.getUserHistory(userIdNumber);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove a book from reading history' })
  @ApiResponse({ status: 200, description: 'Book removed from reading history.' })
  @ApiResponse({ status: 404, description: 'Reading history entry not found.' })
  async removeFromReadingHistory(@Param('id') id: number, @Param('bookId') bookId: number) {
    return this.readingHistoryService.removeFromHistory(id, bookId);
  }
}

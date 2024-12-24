import { Controller, Post, Body, Param, Put, Delete, Get } from '@nestjs/common';
import { CreateRatingDto } from './dtos/CreateRating.dto';
import { RatingsService } from './ratings.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('ratings')  // Grouping under "ratings"
@Controller('ratings')
export class RatingsController {
  constructor(private readonly ratingService: RatingsService) {}

  // Add a rating to a book
  @Post()
  @ApiOperation({ summary: 'Add a rating for a book' })
  @ApiResponse({ status: 201, description: 'Rating successfully added.' })
  @ApiResponse({ status: 400, description: 'Invalid rating.' })
  async createRating(@Body() createRatingDto: CreateRatingDto, @Param('userId') userId: number) {
    return this.ratingService.create(createRatingDto, userId);
  }

  // Update an existing rating
  @Put(':ratingId')
  @ApiOperation({ summary: 'Update ration of a book' })
  @ApiResponse({ status: 200, description: 'Book rating fetched successfully.' })
  @ApiResponse({ status: 404, description: 'Book not found.' })
  async updateRating(
    @Param('ratingId') ratingId: number,
    @Body('newRating') newRating: number,
    @Param('userId') userId: number,
  ) {
    return this.ratingService.update(ratingId, newRating, userId);
  }

  @Get()
  @ApiOperation({ summary: 'Get average rating for a book' })
  @ApiResponse({ status: 200, description: 'Average rating fetched successfully.' })
  @ApiResponse({ status: 404, description: 'Book not found.' })
  async getAverageRating(
    @Param('bookId') bookId: number,
  ){
    return this.ratingService.getAverageRating(bookId)
  }


  // Delete a rating
  @Delete(':ratingId')
  @ApiOperation({ summary: 'Delete a rating' })
  @ApiResponse({ status: 200, description: 'Rating successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Rating not found.' })
  async deleteRating(@Param('ratingId') ratingId: number, @Param('userId') userId: number) {
    return this.ratingService.remove(ratingId, userId);
  }
}

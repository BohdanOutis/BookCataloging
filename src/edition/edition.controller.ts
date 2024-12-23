import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { EditionService } from './edition.service';
import { CreateEditionDto } from './dtos/CreateEdition.dto';
import { UpdateEditionDto } from './dtos/UpdateEditon.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('editions')
@Controller('books/:bookId/editions')  // Book-specific edition routes
export class EditionController {
  constructor(private readonly editionsService: EditionService) {}

  // Create a new edition for a specific book
  @Post()
  @ApiOperation({ summary: 'Add a new edition for a book' })
  @ApiResponse({ status: 201, description: 'Edition successfully added.' })
  @ApiResponse({ status: 404, description: 'Book not found.' })
  create(@Param('bookId') bookId: number, @Body() createEditionDto: CreateEditionDto) {
    return this.editionsService.create(createEditionDto, bookId);
  }

  // Get all editions for a specific book
  @Get()
  @ApiOperation({ summary: 'Get all editions for a book' })
  @ApiResponse({ status: 200, description: 'List of editions fetched successfully.' })
  @ApiResponse({ status: 404, description: 'Book not found.' })
  findByBook(@Param('bookId') bookId: number) {
    return this.editionsService.findByBook(bookId);
  }

  // Update an edition by ID
  @Put(':id')
  @ApiOperation({ summary: 'Update an edition by its ID' })
  @ApiResponse({ status: 200, description: 'Edition updated successfully.' })
  @ApiResponse({ status: 404, description: 'Edition or Book not found.' })
  update(@Param('id') id: number, @Body() updateEditionDto: UpdateEditionDto) {
    return this.editionsService.update(id, updateEditionDto);
  }

  // Delete an edition by ID
  @Delete(':id')
  @ApiOperation({ summary: 'Delete an edition by its ID' })
  @ApiResponse({ status: 200, description: 'Edition deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Edition not found.' })
  remove(@Param('id') id: number) {
    return this.editionsService.remove(id);
  }
}

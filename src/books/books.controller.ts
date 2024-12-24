import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { CreateBookDto } from './dtos/CreateBook.dto';
import { UpdateBookDto } from './dtos/UpdateBook.dto';
import { BooksService } from './books.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('books')  // Grouping under "books"
@Controller('books')
export class BooksController {
  constructor(private readonly bookService: BooksService) {}

  @Post()
  @ApiOperation({ summary: 'Add a new book' })
  @ApiResponse({ status: 201, description: 'Book successfully added.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  async createBook(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all books' })
  @ApiResponse({ status: 200, description: 'List of all books.' })
  async getAllBooks() {
    return this.bookService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get book details by ID' })
  @ApiResponse({ status: 200, description: 'Book details fetched successfully.' })
  @ApiResponse({ status: 404, description: 'Book not found.' })
  async getBookById(@Param('id') id: string) {
    return this.bookService.findOne(Number(id));
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update book details' })
  @ApiResponse({ status: 200, description: 'Book successfully updated.' })
  @ApiResponse({ status: 404, description: 'Book not found.' })
  async updateBook(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update(Number(id), updateBookDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a book by ID' })
  @ApiResponse({ status: 200, description: 'Book successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Book not found.' })
  async deleteBook(@Param('id') id: string) {
    return this.bookService.remove(Number(id));
  }
}

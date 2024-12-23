import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { CreateAuthorDto } from './dtos/CreateAuthors.dto';
import { UpdateAuthorDto } from './dtos/UpdateAuthors.dto';
import { AuthorsService } from './authors.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('authors')  // Grouping under "authors"
@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorService: AuthorsService) {}

  @Post()
  @ApiOperation({ summary: 'Add a new author' })
  @ApiResponse({ status: 201, description: 'Author successfully added.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  async createAuthor(@Body() createAuthorDto: CreateAuthorDto) {
    return this.authorService.create(createAuthorDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all authors' })
  @ApiResponse({ status: 200, description: 'List of all authors.' })
  async getAllAuthors() {
    return this.authorService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get author details by ID' })
  @ApiResponse({ status: 200, description: 'Author details fetched successfully.' })
  @ApiResponse({ status: 404, description: 'Author not found.' })
  async getAuthorById(@Param('id') id: string) {
    return this.authorService.findOne(Number(id));
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update author details' })
  @ApiResponse({ status: 200, description: 'Author successfully updated.' })
  @ApiResponse({ status: 404, description: 'Author not found.' })
  async updateAuthor(@Param('id') id: string, @Body() updateAuthorDto: UpdateAuthorDto) {
    return this.authorService.update(Number(id), updateAuthorDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an author by ID' })
  @ApiResponse({ status: 200, description: 'Author successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Author not found.' })
  async deleteAuthor(@Param('id') id: string) {
    return this.authorService.remove(Number(id));
  }
}

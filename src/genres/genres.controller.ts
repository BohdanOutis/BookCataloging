import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { CreateGenreDto } from './dtos/CreateGenre.dto';
import { UpdateGenreDto } from './dtos/UpdateGenre.dto';
import { GenresService } from './genres.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('genres')
@Controller('genres')
export class GenresController {
  constructor(private readonly genreService: GenresService) {}

  @Post()
  @ApiOperation({ summary: 'Add a new genre' })
  @ApiResponse({ status: 201, description: 'Genre successfully added.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  async createGenre(@Body() createGenreDto: CreateGenreDto) {
    return this.genreService.create(createGenreDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all genres' })
  @ApiResponse({ status: 200, description: 'List of all genres.' })
  async getAllGenres() {
    return this.genreService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get genre details by ID' })
  @ApiResponse({ status: 200, description: 'Genre details fetched successfully.' })
  @ApiResponse({ status: 404, description: 'Genre not found.' })
  async getGenreById(@Param('id') id: number) {
    return this.genreService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update genre details' })
  @ApiResponse({ status: 200, description: 'Genre successfully updated.' })
  @ApiResponse({ status: 404, description: 'Genre not found.' })
  async updateGenre(@Param('id') id: number, @Body() updateGenreDto: UpdateGenreDto) {
    return this.genreService.update(id, updateGenreDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a genre by ID' })
  @ApiResponse({ status: 200, description: 'Genre successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Genre not found.' })
  async deleteGenre(@Param('id') id: number) {
    return this.genreService.remove(id);
  }
}

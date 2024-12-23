import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Genre } from './entities/Genre';
import { CreateGenreDto } from './dtos/CreateGenre.dto';
import { UpdateGenreDto } from './dtos/UpdateGenre.dto';
import { Book } from '../books/entities/Book';

@Injectable()
export class GenresService {
  constructor(
    @InjectRepository(Genre)
    private readonly genreRepository: Repository<Genre>,
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  // Create a new genre
  async create(createGenreDto: CreateGenreDto) {
    const genre = this.genreRepository.create(createGenreDto);
    return this.genreRepository.save(genre);
  }

  // Get all genres
  async findAll() {
    return this.genreRepository.find();
  }

  // Get a genre by ID
  async findOne(id: number) {
    const genre = await this.genreRepository.findOne({
      where: { id },
      relations: ['books'],
    });

    if (!genre) {
      throw new Error('Genre not found');
    }

    return genre;
  }

  // Update a genre by ID
  async update(id: number, updateGenreDto: UpdateGenreDto) {
    const genre = await this.genreRepository.findOne({
      where: { id },
    });

    if (!genre) {
      throw new Error('Genre not found');
    }

    genre.name = updateGenreDto.name || genre.name;
    return this.genreRepository.save(genre);
  }

  // Delete a genre by ID
  async remove(id: number) {
    const genre = await this.genreRepository.findOne({
      where: { id },
    });

    if (!genre) {
      throw new Error('Genre not found');
    }

    return this.genreRepository.delete(id);
  }

  // Associate a genre with a book
  async addGenreToBook(bookId: number, genreId: number) {
    const book = await this.bookRepository.findOne({
      where: { id: bookId },
    });

    const genre = await this.genreRepository.findOne({
      where: { id: genreId },
    });

    if (!book || !genre) {
      throw new Error('Book or Genre not found');
    }

    book.genres = [...book.genres, genre];
    await this.bookRepository.save(book);

    return book;
  }

  // Remove a genre from a book
  async removeGenreFromBook(bookId: number, genreId: number) {
    const book = await this.bookRepository.findOne({
      where: { id: bookId },
      relations: ['genres'],
    });

    if (!book) {
      throw new Error('Book not found');
    }

    book.genres = book.genres.filter((genre) => genre.id !== genreId);
    await this.bookRepository.save(book);

    return book;
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entities/Book';
import { CreateBookDto } from './dtos/CreateBook.dto';
import { UpdateBookDto } from './dtos/UpdateBook.dto';
import { Genre } from '../genres/entities/Genre';
import { Author } from '../authors/entities/Author';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
    @InjectRepository(Genre)
    private readonly genreRepository: Repository<Genre>,
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
  ) {}

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const { genres, authors, ...bookData } = createBookDto;

    // Fetch genres by IDs
    const genreEntities = await this.genreRepository.findByIds(genres);
    if (genreEntities.length !== genres.length) {
      throw new NotFoundException('One or more genres not found');
    }

    // Fetch authors by IDs
    const authorEntities = await this.authorRepository.findByIds(authors);
    if (authorEntities.length !== authors.length) {
      throw new NotFoundException('One or more authors not found');
    }

    const book = this.bookRepository.create({
      ...bookData,
      genres: genreEntities,
      authors: authorEntities,
    });

    return this.bookRepository.save(book);
  }

  async findAll(): Promise<Book[]> {
    return this.bookRepository.find({
      relations: ['genres', 'authors'],
    });
  }

  async findOne(id: number): Promise<Book> {
    const book = await this.bookRepository.findOne({
      where: { id },
      relations: ['genres', 'authors'],
    });
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return book;
  }
  

  async update(id: number, updateBookDto: UpdateBookDto): Promise<Book> {
    const { genres, authors, ...bookData } = updateBookDto;

    const book = await this.findOne(id);

    // Update genres if provided
    if (genres) {
      const genreEntities = await this.genreRepository.findByIds(genres);
      if (genreEntities.length !== genres.length) {
        throw new NotFoundException('One or more genres not found');
      }
      book.genres = genreEntities;
    }

    if (authors) {
      const authorEntities = await this.authorRepository.findByIds(authors);
      if (authorEntities.length !== authors.length) {
        throw new NotFoundException('One or more authors not found');
      }
      book.authors = authorEntities;
    }

    Object.assign(book, bookData);

    return this.bookRepository.save(book);
  }

  async remove(id: number): Promise<void> {
    const book = await this.findOne(id);
    await this.bookRepository.remove(book);
  }
}

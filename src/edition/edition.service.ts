import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Edition } from './entities/Edition';
import { CreateEditionDto } from './dtos/CreateEdition.dto';
import { UpdateEditionDto } from './dtos/UpdateEditon.dto';
import { Book } from '../books/entities/Book';

@Injectable()
export class EditionService {
  constructor(
    @InjectRepository(Edition)
    private readonly editionRepository: Repository<Edition>,
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  // Create a new edition for a book
  async create(createEditionDto: CreateEditionDto, bookId: number) {
    const book = await this.bookRepository.findOne({
      where: { id: bookId },
    });

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    const edition = this.editionRepository.create({
      year: createEditionDto.year,
      publisher: createEditionDto.publisher,
      book,
    });

    return this.editionRepository.save(edition);
  }

  // Get all editions for a specific book
  async findByBook(bookId: number) {
    const book = await this.bookRepository.findOne({
      where: { id: bookId },
      relations: ['editions'],
    });

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    return book.editions;
  }

  // Update an edition by ID
  async update(id: number, updateEditionDto: UpdateEditionDto) {
    const edition = await this.editionRepository.findOne({
      where: { id },
    });

    if (!edition) {
      throw new NotFoundException('Edition not found');
    }

    edition.year = updateEditionDto.year || edition.year;
    edition.publisher = updateEditionDto.publisher || edition.publisher;

    return this.editionRepository.save(edition);
  }

  // Delete an edition by ID
  async remove(id: number) {
    const edition = await this.editionRepository.findOne({
      where: { id },
    });

    if (!edition) {
      throw new NotFoundException('Edition not found');
    }

    return this.editionRepository.delete(id);
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReadingHistory } from './entities/ReadingHistory';
import { User } from '../users/entities/User';
import { Book } from '../books/entities/Book';
import { CreateReadingHistoryDto } from './dtos/CreateReadingHistory.dto';

@Injectable()
export class ReadingHistoryService {
  constructor(
    @InjectRepository(ReadingHistory)
    private readonly readingHistoryRepository: Repository<ReadingHistory>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  // Add a book to the user's reading history
  async addToHistory(createReadingHistoryDto: CreateReadingHistoryDto, userId: number) {
    const { bookId, dateRead } = createReadingHistoryDto;

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const book = await this.bookRepository.findOne({ where: { id: bookId } });
    if (!book) {
      throw new NotFoundException('Book not found');
    }

    // Check if the book is already in the user's reading history
    const existingHistory = await this.readingHistoryRepository.findOne({
      where: { book: { id: bookId }, user: { id: userId } },
    });
    if (existingHistory) {
      throw new Error('This book is already in your reading history');
    }

    const readingHistory = this.readingHistoryRepository.create({
      user,
      book,
      dateRead,
    });

    await this.readingHistoryRepository.save(readingHistory);

    return readingHistory;
  }

  // Get a user's reading history
  async getUserHistory(userId: number) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['readingHistory', 'readingHistory.book'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user.readingHistory;
  }

  // Remove a book from the user's reading history
  async removeFromHistory(userId: number, bookId: number) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const book = await this.bookRepository.findOne({ where: { id: bookId } });
    if (!book) {
      throw new NotFoundException('Book not found');
    }

    const readingHistory = await this.readingHistoryRepository.findOne({
      where: { user: { id: userId }, book: { id: bookId } },
    });

    if (!readingHistory) {
      throw new NotFoundException('Book not found in your reading history');
    }

    await this.readingHistoryRepository.remove(readingHistory);

    return { message: 'Book removed from reading history' };
  }
}

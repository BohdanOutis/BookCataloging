import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rating } from './entities/Rating';
import { CreateRatingDto } from './dtos/CreateRating.dto';
import { Book } from '../books/entities/Book';
import { User } from '../users/entities/User';

@Injectable()
export class RatingsService {
  constructor(
    @InjectRepository(Rating)
    private readonly ratingRepository: Repository<Rating>,
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Add a rating to a book
  async create(createRatingDto: CreateRatingDto, userId: number) {
    const { bookId, rating } = createRatingDto;

    const book = await this.bookRepository.findOne({ where: { id: bookId } });
    if (!book) {
      throw new NotFoundException('Book not found');
    }

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Check if the user has already rated this book
    const existingRating = await this.ratingRepository.findOne({
      where: { book: { id: bookId }, user: { id: userId } },
    });
    if (existingRating) {
      throw new Error('You have already rated this book');
    }

    const newRating = this.ratingRepository.create({
      rating,
      book,
      user,
    });

    await this.ratingRepository.save(newRating);

    // Update the book's average rating
    await this.updateAverageRating(bookId);

    return newRating;
  }

  // Update an existing rating
  async update(ratingId: number, newRating: number, userId: number) {
    const rating = await this.ratingRepository.findOne({
      where: { id: ratingId, user: { id: userId } },
    });

    if (!rating) {
      throw new NotFoundException('Rating not found');
    }

    rating.rating = newRating;
    await this.ratingRepository.save(rating);

    // Update the book's average rating
    await this.updateAverageRating(rating.book.id);

    return rating;
  }

  // Delete a rating
  async remove(ratingId: number, userId: number) {
    const rating = await this.ratingRepository.findOne({
      where: { id: ratingId, user: { id: userId } },
    });

    if (!rating) {
      throw new NotFoundException('Rating not found');
    }

    await this.ratingRepository.remove(rating);

    // Update the book's average rating
    await this.updateAverageRating(rating.book.id);

    return { message: 'Rating deleted successfully' };
  }

  // Get the average rating of a book
  async getAverageRating(bookId: number) {
    const book = await this.bookRepository.findOne({
      where: { id: bookId },
      relations: ['ratings'],
    });

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    const ratings = book.ratings;
    if (ratings.length === 0) {
      return 0;
    }

    const averageRating =
      ratings.reduce((acc, rating) => acc + rating.rating, 0) / ratings.length;

    return parseFloat(averageRating.toFixed(2));
  }

  // Update the average rating of a book
  private async updateAverageRating(bookId: number) {
    const averageRating = await this.getAverageRating(bookId);

    const book = await this.bookRepository.findOne({ where: { id: bookId } });
    if (!book) {
      throw new NotFoundException('Book not found');
    }

    book.averageRating = averageRating;
    await this.bookRepository.save(book);
  }

  // Find books with a specific rating
  async findBooksByRating(rating: number) {
    const books = await this.bookRepository
      .createQueryBuilder('book')
      .leftJoinAndSelect('book.ratings', 'rating')
      .where('rating.rating = :rating', { rating })
      .getMany();

    return books;
  }
}

import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BooksService } from '../books.service';
import { Book } from '../entities/Book';
import { CreateBookDto } from '../dtos/CreateBook.dto';
import { UpdateBookDto } from '../dtos/UpdateBook.dto';
import { NotFoundException } from '@nestjs/common';

@Resolver(() => Book)
export class BooksResolver {
  constructor(private readonly booksService: BooksService) {}

  // Query to get all books
  @Query(() => [Book])
  async books(): Promise<Book[]> {
    return this.booksService.findAll();
  }

  // Query to get a book by ID
  @Query(() => Book)
  async book(@Args('id', { type: () => Int }) id: number): Promise<Book> {
    return this.booksService.findOne(id);
  }

  // Mutation to create a new book
  @Mutation(() => Book)
  async createBook(
    @Args('createBookDto') createBookDto: CreateBookDto,
  ): Promise<Book> {
    return this.booksService.create(createBookDto);
  }

  // Mutation to update an existing book
  @Mutation(() => Book)
  async updateBook(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateBookDto') updateBookDto: UpdateBookDto,
  ): Promise<Book> {
    try {
      return this.booksService.update(id, updateBookDto);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(`Book with ID ${id} not found`);
      }
      throw error;
    }
  }

  // Mutation to delete a book
  @Mutation(() => Boolean)
  async removeBook(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<boolean> {
    try {
      await this.booksService.remove(id);
      return true;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(`Book with ID ${id} not found`);
      }
      throw error;
    }
  }
}

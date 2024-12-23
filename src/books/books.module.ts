import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { BooksResolver } from './resolvers/books.resolver';
import { Book } from './entities/Book';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Genre } from '../genres/entities/Genre';
import { Author } from '../authors/entities/Author';

@Module({
  imports: [TypeOrmModule.forFeature([Book, Genre, Author])],
  providers: [BooksService, BooksResolver],
  controllers: [BooksController]
})
export class BooksModule {}

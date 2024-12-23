import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Book } from '../../books/entities/Book';
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType() // Define GraphQL object type
@Entity('editions')
export class Edition {
  @PrimaryGeneratedColumn()
  @Field(() => Int) // Expose as an integer in GraphQL
  id: number;

  @Column({ type: 'int' })
  @Field(() => Int) // Expose as an integer in GraphQL
  year: number;

  @Column()
  @Field() // Expose as a string in GraphQL
  publisher: string;

  @ManyToOne(() => Book, (book) => book.editions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'bookId' })
  @Field(() => Book) // Expose related Book entity in GraphQL
  book: Book;

  constructor(id: number, year: number, publisher: string, book: Book) {
    this.id = id;
    this.year = year;
    this.publisher = publisher;
    this.book = book;
  }
}

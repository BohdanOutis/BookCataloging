import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';  // Import GraphQL decorators
import { Book } from '../../books/entities/Book';
import { User } from '../../users/entities/User';

// ReadingHistory Entity
@ObjectType()  // This decorator exposes the class as a GraphQL object type
@Entity('reading_history')
export class ReadingHistory {
  @PrimaryGeneratedColumn()
  @Field(() => Int)  // GraphQL field with Int type
  id: number;

  @Column({ type: 'date' })
  @Field()  // Expose the dateRead field in GraphQL
  dateRead: Date;

  @ManyToOne(() => User, (user) => user.readingHistory, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  @Field(() => User)  // Expose the user field and define its GraphQL type
  user: User;

  @ManyToOne(() => Book, (book) => book.readingHistory, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'bookId' })
  @Field(() => Book)  // Expose the book field and define its GraphQL type
  book: Book;

  constructor(id: number, user: User, book: Book, dateRead: Date) {
    this.id = id;
    this.user = user;
    this.book = book;
    this.dateRead = dateRead;
  }
}

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Book } from '../../books/entities/Book';
import { User } from '../../users/entities/User';
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
@Entity('ratings')
export class Rating {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int)
  @Column({ type: 'int' })
  rating: number;

  @ManyToOne(() => User, (user) => user.ratings, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Book, (book) => book.ratings, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'bookId' })
  book: Book;

  constructor(id: number, rating: number, user: User, book: Book) {
    this.id = id;
    this.rating = rating;
    this.user = user;
    this.book = book;
  }
}
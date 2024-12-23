import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Book } from '../../books/entities/Book';
import { User } from '../../users/entities/User';
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType() // Define GraphQL object type
@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn()
  @Field(() => Int) // Expose as an integer in GraphQL
  id: number;

  @Column('text')
  @Field() // Expose as a string in GraphQL
  content: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @Field() // Expose the timestamp in GraphQL
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.comments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  @Field(() => User) // Expose related User entity in GraphQL
  user: User;

  @ManyToOne(() => Book, (book) => book.comments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'bookId' })
  @Field(() => Book) // Expose related Book entity in GraphQL
  book: Book;

  constructor(
    id: number,
    content: string,
    user: User,
    book: Book,
    createdAt: Date,
  ) {
    this.id = id;
    this.content = content;
    this.user = user;
    this.book = book;
    this.createdAt = createdAt;
  }
}

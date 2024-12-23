import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql'; // Import GraphQL decorators
import { Book } from '../../books/entities/Book';
import { Rating } from '../../ratings/entities/Rating';
import { Comment } from '../../comments/entities/Comment';
import { ReadingHistory } from '../../reading_history/entities/ReadingHistory';

@ObjectType()  // Add this decorator to tell GraphQL this is an output type
@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => Int)  // GraphQL Field
  id: number;

  @Column({ unique: true })
  @Field()  // GraphQL Field
  username: string;

  @Column({ unique: true })
  @Field()  // GraphQL Field
  email: string;

  @Column()
  @Field()  // GraphQL Field
  password: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @Field()  // GraphQL Field
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  @Field()  // GraphQL Field
  updatedAt: Date;

  @OneToMany(() => Book, (book) => book.addedByUser)
  @Field(() => [Book])  // GraphQL Field, specifying this is a list of `Book` objects
  books: Book[];

  @OneToMany(() => Rating, (rating) => rating.user)
  @Field(() => [Rating])  // GraphQL Field, specifying this is a list of `Rating` objects
  ratings: Rating[];

  @OneToMany(() => Comment, (comment) => comment.user)
  @Field(() => [Comment])  // GraphQL Field, specifying this is a list of `Comment` objects
  comments: Comment[];

  @OneToMany(() => ReadingHistory, (history) => history.user)
  @Field(() => [ReadingHistory])  // GraphQL Field, specifying this is a list of `ReadingHistory` objects
  readingHistory: ReadingHistory[];

  constructor(
    id: number,
    username: string,
    email: string,
    password: string,
    createdAt: Date,
    updatedAt: Date
  ) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

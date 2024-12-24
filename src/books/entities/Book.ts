import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { User } from '../../users/entities/User';
import { Genres } from '../../genres/entities/Genre';
import { Author } from '../../authors/entities/Author';
import { Rating } from '../../ratings/entities/Rating';
import { Comment } from '../../comments/entities/Comment';
import { Edition } from '../../edition/entities/Edition';
import { ReadingHistory } from '../../reading_history/entities/ReadingHistory';
import { ObjectType, Field, Int, Float } from '@nestjs/graphql';

@ObjectType() // Define GraphQL object type
@Entity('books')
export class Book {
  @PrimaryGeneratedColumn()
  @Field(() => Int) // Expose as an integer in GraphQL
  id: number;

  @Column()
  @Field() // Expose title as a string in GraphQL
  title: string;

  @Column('text')
  @Field() // Expose description as a string in GraphQL
  description: string;

  @Column()
  @Field() // Expose coverUrl as a string in GraphQL
  coverUrl: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @Field() // Expose addedAt as a timestamp in GraphQL
  addedAt: Date;

  @Column({ type: 'float', default: 0 })
  @Field(() => Float) // Expose averageRating as a float in GraphQL
  averageRating: number;

  @ManyToOne(() => User, (user) => user.books, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'addedByUserId' })
  @Field(() => User) // Expose related User entity in GraphQL
  addedByUser: User;

  @ManyToMany(() => Genres)
  @JoinTable()
  @Field(() => [Genres]) // Expose genres as an array of Genre entities in GraphQL
  genres: Genres[];

  @ManyToMany(() => Author)
  @JoinTable()
  @Field(() => [Author]) // Expose authors as an array of Author entities in GraphQL
  authors: Author[];

  @OneToMany(() => Rating, (rating) => rating.book)
  @Field(() => [Rating]) // Expose ratings as an array of Rating entities in GraphQL
  ratings: Rating[];

  @OneToMany(() => Comment, (comment) => comment.book)
  @Field(() => [Comment]) // Expose comments as an array of Comment entities in GraphQL
  comments: Comment[];

  @OneToMany(() => Edition, (edition) => edition.book)
  @Field(() => [Edition]) // Expose editions as an array of Edition entities in GraphQL
  editions: Edition[];

  @OneToMany(() => ReadingHistory, (history) => history.book)
  @Field(() => [ReadingHistory]) // Expose readingHistory as an array of ReadingHistory entities in GraphQL
  readingHistory: ReadingHistory[];

  constructor(
    id: number,
    title: string,
    description: string,
    coverUrl: string,
    addedAt: Date,
    averageRating: number,
    addedByUser: User,
    genres: Genres[],
    authors: Author[],
    ratings: Rating[],
    comments: Comment[],
    editions: Edition[],
    readingHistory: ReadingHistory[],
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.coverUrl = coverUrl;
    this.addedAt = addedAt;
    this.averageRating = averageRating;
    this.addedByUser = addedByUser;
    this.genres = genres;
    this.authors = authors;
    this.ratings = ratings;
    this.comments = comments;
    this.editions = editions;
    this.readingHistory = readingHistory;
  }
}

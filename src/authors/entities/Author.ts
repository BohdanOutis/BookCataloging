import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Book } from '../../books/entities/Book';
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType() // Define GraphQL object type
@Entity('authors')
export class Author {
  @PrimaryGeneratedColumn()
  @Field(() => Int) // Expose as an integer in GraphQL
  id: number;

  @Column()
  @Field() // Expose name as a string in GraphQL
  name: string;

  @Column('text', { nullable: true })
  @Field({ nullable: true }) // Expose bio as an optional string in GraphQL
  bio: string;

  @ManyToMany(() => Book, (book) => book.authors)
  @Field(() => [Book]) // Expose books as an array of Book entities in GraphQL
  books: Book[];

  constructor(id: number, name: string, bio: string, books: Book[]) {
    this.id = id;
    this.name = name;
    this.bio = bio;
    this.books = books;
  }
}

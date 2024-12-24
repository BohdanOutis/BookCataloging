import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Book } from '../../books/entities/Book';
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType() // Define GraphQL object type
@Entity('genres')
export class Genres {
  @PrimaryGeneratedColumn()
  @Field(() => Int) // Expose this field as an integer in GraphQL
  id: number;

  @Column({ unique: true })
  @Field() // Expose this field as a string in GraphQL
  name: string;

  @ManyToMany(() => Book, (book) => book.genres)
  @JoinTable() // This creates the join table for the many-to-many relation
  @Field(() => [Book]) // Expose the related Book entities in GraphQL
  books: Book[];

  constructor(id: number, name: string, books: Book[]) {
    this.id = id;
    this.name = name;
    this.books = books;
  }
}

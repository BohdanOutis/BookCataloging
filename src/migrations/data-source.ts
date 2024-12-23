import { DataSource } from 'typeorm';
import { Book } from '../books/entities/Book';
import { Author } from '../authors/entities/Author';
import { Genre } from '../genres/entities/Genre';
import { Edition } from '../edition/entities/Edition';
import { Comment } from '../comments/entities/Comment';
import { Rating } from '../ratings/entities/Rating';
import { User } from '../users/entities/User';
import { ReadingHistory } from '../reading_history/entities/ReadingHistory';

export const AppDataSource = new DataSource({
  type: 'postgres', // your database type (e.g., postgres, mysql)
  host: 'localhost',
  port: 5432,
  username: 'testuser',
  password: 'testuser',
  database: 'book_catalog',
  synchronize: false, // Do not use synchronize in production
  logging: true,
  entities: [
    Book,
    Author,
    Genre,
    Edition,
    Comment,
    Rating,
    User,
    ReadingHistory,
  ],
  migrations: ['src/migrations/*.ts'], // Point to where migrations are located
});

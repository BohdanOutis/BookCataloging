import { DataSource } from 'typeorm';
import path from 'path';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'testuser',
  password: 'testuser',
  database: 'book_catalog',
  synchronize: true, // Avoid this in production
  logging: true,
  entities: [
    path.resolve(__dirname, 'books', 'entities', '*.ts'),
    path.resolve(__dirname, 'authors', 'entities', '*.ts'),
    path.resolve(__dirname, 'genres', 'entities', '*.ts'),
    path.resolve(__dirname, 'edition', 'entities', '*.ts'),
    path.resolve(__dirname, 'comments', 'entities', '*.ts'),
    path.resolve(__dirname, 'ratings', 'entities', '*.ts'),
    path.resolve(__dirname, 'users', 'entities', '*.ts'),
    path.resolve(__dirname, 'reading_history', 'entities', '*.ts'),
  ],
  migrations: [path.resolve(__dirname, 'src', 'migrations', '**', '*.ts')], // Ensure migration path is absolute
});

import { DataSource } from 'typeorm';
import { User } from '../users/entities/User';
import { Book } from '../books/entities/Book';
import { ReadingHistory } from '../reading_history/entities/ReadingHistory';
import { Rating } from '../ratings/entities/Rating';
import { Comment } from '../comments/entities/Comment';
import { Genres } from '../genres/entities/Genre';
import { Edition } from '../edition/entities/Edition';
import { Author } from '../authors/entities/Author';

const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'testuser', // Your database username
  password: 'testuser', // Your database password
  database: 'book_catalog', // Your database name
  synchronize: true,
  logging: true,
  entities: [User, Book, ReadingHistory, Rating, Comment, Genres, Edition, Author],
});

const seedDatabase = async () => {
  try {
    console.log('Connecting to the database...');
    await dataSource.initialize();
    console.log('Connection successful!');

    // Seed Users
    console.log('Seeding users...');
    const userRepository = dataSource.getRepository(User);
    const user = userRepository.create({
      username: 'example',
      email: 'example@example.com',
      password: 'password',
    });
    await userRepository.save(user);
    console.log('User seeded successfully!');

    // Seed Genres
    console.log('Seeding genres...');
    const genreRepository = dataSource.getRepository(Genres);
    const genre1 = genreRepository.create({ name: 'Fantasy' });
    const genre2 = genreRepository.create({ name: 'Science Fiction' });
    const genre3 = genreRepository.create({ name: 'Mystery' });
    await genreRepository.save([genre1, genre2, genre3]);
    console.log('Genres seeded successfully!');

    // Seed Authors
    console.log('Seeding authors...');
    const authorRepository = dataSource.getRepository(Author);
    const author1 = authorRepository.create({ name: 'J.K. Rowling', bio: 'British author' });
    const author2 = authorRepository.create({ name: 'Isaac Asimov', bio: 'American author' });
    await authorRepository.save([author1, author2]);
    console.log('Authors seeded successfully!');

    // Seed Books
    console.log('Seeding books...');
    const bookRepository = dataSource.getRepository(Book);
    const book1 = bookRepository.create({
      title: 'Harry Potter and the Sorcerer\'s Stone',
      description: 'A young wizard discovers his magical powers.',
      addedByUser: user,
      coverUrl: 'http://example.com/cover1.jpg',
      averageRating: 4.5,
    });
    const book2 = bookRepository.create({
      title: 'Foundation',
      description: 'A brilliant scientist tries to preserve humanity.',
      addedByUser: user,
      coverUrl: 'http://example.com/cover2.jpg',
      averageRating: 4.7,
    });
    await bookRepository.save([book1, book2]);
    console.log('Books seeded successfully!');

    // Seed Editions
    console.log('Seeding editions...');
    const editionRepository = dataSource.getRepository(Edition);
    const edition1 = editionRepository.create({ book: book1, year: 1997, publisher: 'Bloomsbury' });
    const edition2 = editionRepository.create({ book: book2, year: 1951, publisher: 'Gnome Press' });
    await editionRepository.save([edition1, edition2]);
    console.log('Editions seeded successfully!');

    // Seed Ratings
    console.log('Seeding ratings...');
    const ratingRepository = dataSource.getRepository(Rating);
    const rating1 = ratingRepository.create({ rating: 5, user: user, book: book1 });
    const rating2 = ratingRepository.create({ rating: 4, user: user, book: book2 });
    await ratingRepository.save([rating1, rating2]);
    console.log('Ratings seeded successfully!');

    // Seed Comments
    console.log('Seeding comments...');
    const commentRepository = dataSource.getRepository(Comment);
    const comment1 = commentRepository.create({
      content: 'Amazing book!',
      user: user,
      book: book1,
    });
    const comment2 = commentRepository.create({
      content: 'Great science fiction.',
      user: user,
      book: book2,
    });
    await commentRepository.save([comment1, comment2]);
    console.log('Comments seeded successfully!');

    // Seed Reading History
    console.log('Seeding reading history...');
    const readingHistoryRepository = dataSource.getRepository(ReadingHistory);
    const readingHistory1 = readingHistoryRepository.create({
      user: user,
      book: book1,
      dateRead: new Date(),
    });
    const readingHistory2 = readingHistoryRepository.create({
      user: user,
      book: book2,
      dateRead: new Date(),
    });
    await readingHistoryRepository.save([readingHistory1, readingHistory2]);
    console.log('Reading history seeded successfully!');

  } catch (error) {
    console.error('Error during seeding:', error);
  } finally {
    await dataSource.destroy(); // Ensure connection is closed after seeding
  }
};

seedDatabase();

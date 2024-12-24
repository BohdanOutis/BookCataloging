import { DataSource } from 'typeorm';
import { Book } from '../books/entities/Book';
import { Author } from '../authors/entities/Author';
import { Genres } from '../genres/entities/Genre';

export const seedData = async (dataSource: DataSource) => {
    console.log('Connecting to the database...');
    await dataSource.initialize();

    console.log('Seeding data...');

    // Seed Authors
    const authors = [
        { name: 'J.K. Rowling', bio: 'Author of the Harry Potter series' },
        { name: 'George R.R. Martin', bio: 'Author of A Song of Ice and Fire' },
    ];
    const authorEntities = authors.map((author) => dataSource.manager.create(Author, author));
    await dataSource.manager.save(authorEntities);

    // Seed Genres
    const genres = [{ name: 'Fantasy' }, { name: 'Adventure' }];
    const genreEntities = genres.map((genre) => dataSource.manager.create(Genres, genre));
    await dataSource.manager.save(genreEntities);

    // Seed Books
    const books = [
        {
            title: 'Harry Potter and the Sorcerer\'s Stone',
            description: 'A young wizard\'s journey begins.',
            year: 1997,
            authors: [authorEntities[0]],
            genres: [genreEntities[0]],
        },
        {
            title: 'A Game of Thrones',
            description: 'The first book in A Song of Ice and Fire.',
            year: 1996,
            authors: [authorEntities[1]],
            genres: [genreEntities[1]],
        },
    ];
    for (const book of books) {
        const bookEntity = dataSource.manager.create(Book, book);
        await dataSource.manager.save(bookEntity);
    }

    console.log('Seeding completed!');
    await dataSource.destroy();
};

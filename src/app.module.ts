import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { RatingsModule } from './ratings/ratings.module';
import { BooksModule } from './books/books.module';
import { AuthorsModule } from './authors/authors.module';
import { CommentsModule } from './comments/comments.module';
import { EditionModule } from './edition/edition.module';
import { GenresModule } from './genres/genres.module';
import { ReadingHistoryModule } from './reading_history/reading_history.module';
import { UsersResolver } from './users/resolvers/users.resolver';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'), // Auto-generate schema
      playground: true, // Enables GraphQL Playground
    }),
    TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'testuser',
    password: 'testuser',
    database: 'book_catalog',
    entities: [
      __dirname + '/typeorm/entities/User',
      __dirname + '/typeorm/entities/Book',
      __dirname + '/typeorm/entities/Genre',
      __dirname + '/typeorm/entities/Author',
      __dirname + '/typeorm/entities/Rating',
      __dirname + '/typeorm/entities/ReadingHistory',
      __dirname + '/typeorm/entities/Edition',
      __dirname + '/typeorm/entities/Comment',
    ],
    synchronize: true,
    logging: true,
  }), UsersModule, RatingsModule, BooksModule, AuthorsModule, CommentsModule, EditionModule, GenresModule, ReadingHistoryModule, ],
  controllers: [AppController],
  providers: [AppService, UsersResolver],
})
export class AppModule {}

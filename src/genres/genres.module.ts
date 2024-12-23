import { Module } from '@nestjs/common';
import { GenresService } from './genres.service';
import { GenresController } from './genres.controller';
import { GenresResolver } from './resolvers/genres.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Genre } from './entities/Genre';
import { Book } from '../books/entities/Book';
import { User } from '../users/entities/User';

@Module({
  imports: [TypeOrmModule.forFeature([Genre, Book])],
  providers: [GenresService, GenresResolver],
  controllers: [GenresController]
})
export class GenresModule {}

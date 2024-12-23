import { Module } from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { RatingsController } from './ratings.controller';
import { RatingsResolver } from './resolvers/ratings.resolver';
import { Rating } from './entities/Rating';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from '../books/entities/Book';
import { User } from '../users/entities/User';

@Module({
  imports: [TypeOrmModule.forFeature([Rating, Book, User])],
  providers: [RatingsService, RatingsResolver],
  controllers: [RatingsController]
})
export class RatingsModule {}

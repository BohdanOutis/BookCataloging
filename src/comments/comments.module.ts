import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { CommentsResolver } from './resolvers/comments.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/Comment';
import { User } from '../users/entities/User';
import { Book } from '../books/entities/Book';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, User, Book])],
  providers: [CommentsService, CommentsResolver],
  controllers: [CommentsController]
})
export class CommentsModule {}

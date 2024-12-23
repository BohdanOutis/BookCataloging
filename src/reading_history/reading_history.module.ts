import { Module } from '@nestjs/common';
import { ReadingHistoryService } from './reading_history.service';
import { ReadingHistoryController } from './reading_history.controller';
import { ReadingHistoryResolver } from './resolvers/reading_history.resolver';
import { ReadingHistory } from './entities/ReadingHistory';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/User';
import { Book } from '../books/entities/Book';

@Module({
  imports: [TypeOrmModule.forFeature([ReadingHistory, User, Book])],
  providers: [ReadingHistoryService, ReadingHistoryResolver],
  controllers: [ReadingHistoryController]
})
export class ReadingHistoryModule {}

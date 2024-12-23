import { Module } from '@nestjs/common';
import { EditionService } from './edition.service';
import { EditionController } from './edition.controller';
import { EditionResolver } from './resolvers/edition.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Edition } from './entities/Edition';
import { Book } from '../books/entities/Book';

@Module({
  imports: [TypeOrmModule.forFeature([Edition, Book])],
  providers: [EditionService, EditionResolver],
  controllers: [EditionController]
})
export class EditionModule {}

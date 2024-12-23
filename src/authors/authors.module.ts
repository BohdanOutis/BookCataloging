import { Module } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { AuthorsController } from './authors.controller';
import { AuthorsResolver } from './resolvers/authors.resolver';
import { Author } from './entities/Author';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Author])],
  providers: [AuthorsService, AuthorsResolver],
  controllers: [AuthorsController]
})
export class AuthorsModule {}

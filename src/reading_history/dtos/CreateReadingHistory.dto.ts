import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty } from 'class-validator';
import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateReadingHistoryDto {
  @ApiProperty({ description: 'Book ID being read' })
  @Field(() => Int) // GraphQL Field type
  @IsNotEmpty()
  bookId: number; // ID of the book read

  @ApiProperty({ description: 'Date the book was finished', required: false })
  @Field({ nullable: true }) // Mark as optional in GraphQL
  @IsNotEmpty()
  @IsDateString()
  dateRead: string; // ISO date string
}

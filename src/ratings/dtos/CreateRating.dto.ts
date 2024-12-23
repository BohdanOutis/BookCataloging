import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, Min, Max } from 'class-validator';
import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateRatingDto {
  @Field(() => Int)
  @ApiProperty({ description: 'Rating score (1-5)' })
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @Field(() => Int)
  @ApiProperty({ description: 'Book ID being rated' })
  @IsNotEmpty()
  bookId: number; // ID of the book being rated
}
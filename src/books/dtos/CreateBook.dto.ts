import { IsInt, IsNotEmpty, IsString, IsUrl, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateBookDto {
  @Field()
  @ApiProperty({ description: 'Book title' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @Field()
  @ApiProperty({ description: 'Book description' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @Field()
  @IsUrl()
  coverUrl: string;

  @Field(() => [Int])
  @ApiProperty({ description: 'Year', type: [Number] })
  @IsInt({ each: true }) // Кожен елемент має бути цілим числом
  @Min(1000, { each: true }) // Мінімальне значення 1000
  @Max(new Date().getFullYear(), { each: true }) // Максимальне значення - поточний рік
  year: number[]; // Масив років

  @Field(() => [Int])
  @ApiProperty({ description: 'Genre IDs', type: [Number] })
  @IsNotEmpty()
  genres: number[]; // Array of genre IDs

  @Field(() => [Int])
  @ApiProperty({ description: 'Authors IDs', type: [Number] })
  @IsNotEmpty()
  authors: number[]; // Array of author IDs
}
